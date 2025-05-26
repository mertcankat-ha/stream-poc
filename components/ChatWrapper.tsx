import React, { ReactNode } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Chat, OverlayProvider, useCreateChatClient } from 'stream-chat-expo';
import { chatApiKey, chatUserId, chatUserName, chatUserToken } from '../chat.config';

// Custom theme for Stream Chat
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
  },
  messageList: {
    container: {
      backgroundColor: '#FFFFFF',
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

const user = {
  id: chatUserId,
  name: chatUserName,
};

interface ChatWrapperProps {
  children: ReactNode;
}

export const ChatWrapper = ({ children }: ChatWrapperProps) => {
  const chatClient = useCreateChatClient({
    apiKey: chatApiKey,
    userData: user,
    tokenOrProvider: chatUserToken,
  });

  if (!chatClient) {
    return (
      <SafeAreaView>
        <Text>Loading chat wrapper ...</Text>
      </SafeAreaView>
    );
  }

  return (
    <OverlayProvider value={{ style: chatTheme }}>
      <Chat client={chatClient} style={chatTheme}>{children}</Chat>
    </OverlayProvider>
  );
};