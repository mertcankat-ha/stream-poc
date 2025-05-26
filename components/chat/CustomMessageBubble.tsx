import React from 'react';
import { StyleSheet } from 'react-native';
import {
    MessageSimple,
    MessageSimpleProps,
    useMessageContext,
    useTheme
} from 'stream-chat-expo';

/**
 * Custom message bubble component with enhanced styling and content filtering
 */
export const CustomMessageBubble = (props: MessageSimpleProps) => {
  const messageContext = useMessageContext();
  const { theme } = useTheme();
  
  // Extract content from the message
  const message = messageContext.message;
  
  // Filter out emails from the message text for privacy
  const filterSensitiveContent = (text: string) => {
    if (!text) return '';
    // Replace email addresses with [EMAIL HIDDEN]
    return text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '[EMAIL HIDDEN]');
  };
  
  // Get filtered message text
  const originalText = message.text || '';
  const filteredText = filterSensitiveContent(originalText);
  
  // Apply text filtering by modifying the message with filtered text
  if (originalText !== filteredText) {
    const messageWithFilteredText = { ...message, text: filteredText };
    return <MessageSimple {...props} message={messageWithFilteredText} />;
  }
  
  // If no filtering needed, use default MessageSimple
  return <MessageSimple {...props} />;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 12,
    maxWidth: '85%',
    minHeight: 40,
    marginVertical: 2,
  },
  myMessage: {
    borderBottomRightRadius: 4,
    marginLeft: 'auto',
  },
  theirMessage: {
    borderBottomLeftRadius: 4,
    marginRight: 'auto',
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#000',
  },
  metadataTag: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  metadataText: {
    fontSize: 12,
  },
}); 