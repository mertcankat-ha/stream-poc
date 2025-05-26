import { Stack, useRouter } from "expo-router";
import { useContext, useEffect, useMemo, useState } from "react";

import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StreamChat } from "stream-chat";
import { ChannelList, Chat, OverlayProvider } from "stream-chat-expo";
import { chatApiKey, chatUserId, chatUserToken } from "../chat.config";
import { AppContext } from '../contexts/AppContext';

const filters = {
  members: { $in: [chatUserId] },
//   type: "messaging",
};
const sort = { last_updated: -1 as const };
const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen() {
  const memoizedFilters = useMemo(() => filters, []);
  const router = useRouter();
  const { setChannel, client, setClient } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initChat = async () => {
      try {
        if (client) {
          setLoading(false);
          return;
        }
        
        const chatClient = StreamChat.getInstance(chatApiKey);
        
        await chatClient.connectUser(
          {
            id: chatUserId,
            name: chatUserId,
            image: `https://getstream.io/random_png/?id=${chatUserId}&name=${chatUserId}`,
          },
          chatUserToken,
        );
        
        setClient(chatClient);
        setLoading(false);
      } catch (error) {
        console.error('Error connecting to Stream Chat:', error);
        setLoading(false);
      }
    };

    initChat();
    
    return () => {
      // No need to disconnect here as we want to keep the connection
    };
  }, [client, setClient]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0E71EB" />
        <Text>Loading channels...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Channel List Screen" }} />
      {client && (
        <OverlayProvider>
          <Chat client={client}>
            <ChannelList 
              filters={filters} 
              options={options} 
              sort={sort}
              onSelect={(channel) => {
                setChannel(channel);
                router.push('/chat');
              }} 
            />
          </Chat>
        </OverlayProvider>
      )}
      {!client && (
        <View style={styles.loadingContainer}>
          <Text>Could not initialize chat client</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }
});