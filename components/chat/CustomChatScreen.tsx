import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StreamChat } from 'stream-chat';
import {
    Channel,
    Chat,
    MessageList,
    OverlayProvider,
    Thread,
} from 'stream-chat-expo';
import { chatApiKey, chatUserId, chatUserToken } from '../../chat.config';
import { AppContext } from '../../contexts/AppContext';
import { CustomChannelHeader } from './CustomChannelHeader';
import { CustomFileAttachment } from './CustomFileAttachment';
import { CustomMessageInput } from './CustomMessageInput';
import { CustomMessageSimple } from './CustomMessageSimple';

const chatTheme = {
  colors: {
    primary: '#0E71EB',
    secondary: '#FF9800',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    accent_blue: '#2196F3',
    grey: '#9E9E9E',
    grey_whisper: '#F8F8F8',
    white: '#FFFFFF',
    white_snow: '#F9F9F9',
    black: '#000000',
  },
  messageSimple: {
    content: {
      container: {
        borderRadius: 16,
        borderWidth: 0,
      },
      containerInner: {
        borderWidth: 0,
      },
      textContainer: {
        borderWidth: 0,
      },
    },
    avatarWrapper: {
      container: {
        marginRight: 8,
      },
    },
  },
  messageList: {
    container: {
      backgroundColor: '#F5F5F5',
    },
    dateSeparator: {
      container: {
        backgroundColor: '#0E71EB',
        height: 40,
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
      },
      text: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
      },
    },
  },
  channelPreview: {
    container: {
      backgroundColor: '#FFFFFF',
      borderBottomWidth: 1,
      borderBottomColor: '#EBEBEB',
    },
  },
};

interface CustomChatScreenProps {
  navigation?: any;
  channelId?: string;
  onBackPress?: () => void;
}

const MyCustomDateHeader = ({ dateString }: { dateString?: string | number }) => (
  <View style={{
    backgroundColor: '#0E71EB',
    height: 30,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 15,
    alignSelf: 'center',
  }}>
    <Text style={{
      color: 'white',
      fontSize: 14,
      fontWeight: 'bold',
    }}>
      {dateString || 'CUSTOM DATE'}
    </Text>
  </View>
);

export const CustomChatScreen: React.FC<CustomChatScreenProps> = ({
  navigation,
  channelId = 'travel',
  onBackPress,
}) => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [thread, setThread] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(false);
  const { channel, setClient } = useContext(AppContext);
  const router = useRouter();
  const clientRef = useRef<StreamChat | null>(null);

  useEffect(() => {
    const initChat = async () => {
      try {
        const client = StreamChat.getInstance(chatApiKey);
        client.recoverStateOnReconnect = true;

        client.on('connection.changed', (event) => {
          console.log('Connection changed:', event.online);
          setIsOnline(event.online || false);
        });

        await client.connectUser(
          {
            id: chatUserId,
            name: chatUserId,
            image: `https://getstream.io/random_png/?id=${chatUserId}&name=${chatUserId}`,
          },
          chatUserToken,
        );

        if (channel) {
          try {
            await (channel as any).watch();
          } catch (err) {
            console.log('Error watching channel:', err);
          }
        }

        clientRef.current = client;
        setChatClient(client);
        setClient(client);
        setIsOnline(true);
      } catch (error) {
        console.error('Error connecting to Stream Chat:', error);
        setIsOnline(false);
      } finally {
        setLoading(false);
      }
    };

    initChat();

    return () => {
      if (clientRef.current) {
        clientRef.current.off('connection.changed' as any);
        clientRef.current.disconnectUser().then(() => {
          console.log('User disconnected');
          setClient(null);
        });
      }
    };
  }, [setClient]);

  const handleBackPress = () => {
    if (onBackPress) onBackPress();
    else router.back();
  };

  const handleInfoPress = () => {
    alert('Chat info pressed');
  };
  
  const handleThreadClose = () => {
    setThread(null);
  };

  if (loading || !chatClient || !channel) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0E71EB" />
        <Text style={styles.loaderText}>Loading chat...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {!isOnline && (
        <View style={styles.offlineBar}>
          <Text style={styles.offlineText}>You are offline</Text>
        </View>
      )}
      <OverlayProvider value={{ style: chatTheme }}>
        <Chat client={chatClient} style={chatTheme}>
          <Channel 
            channel={channel as any}
            Attachment={CustomFileAttachment}
            DateHeader={MyCustomDateHeader}
            MessageSimple={CustomMessageSimple}
            MessageSystem={CustomMessageSimple}
            keyboardVerticalOffset={80}
            thread={thread}
            threadList={!!thread}
          >
            {thread ? (
              <>
                <View style={styles.threadHeader}>
                  <TouchableOpacity onPress={handleThreadClose} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#0E71EB" />
                  </TouchableOpacity>
                  <Text style={styles.threadTitle}>Thread Reply</Text>
                </View>
                <Thread onThreadDismount={handleThreadClose} />
              </>
            ) : (
              <>
                <CustomChannelHeader 
                  onBackPress={handleBackPress}
                  onInfoPress={handleInfoPress}
                />
                <View style={styles.channelContainer}>
                  <MessageList
                    onThreadSelect={message => setThread(message)}
                  />
                </View>
                <CustomMessageInput />
              </>
            )}
          </Channel>
        </Chat>
      </OverlayProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  channelContainer: {
    flex: 1,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888888',
  },
  threadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 10,
  },
  threadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  offlineBar: {
    backgroundColor: '#FF9800',
    padding: 8,
    alignItems: 'center',
  },
  offlineText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
 