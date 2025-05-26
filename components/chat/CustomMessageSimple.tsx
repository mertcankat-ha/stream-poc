import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import {
  MessageSimple,
  MessageSimpleProps,
  MessageSystemProps,
  useMessageContext,
  useTheme
} from 'stream-chat-expo';

// This component handles both regular and system messages with HTML
export const CustomMessageSimple = (props: MessageSimpleProps | MessageSystemProps) => {
  // Safely get message context - may be undefined
  const messageContext = useMessageContext();
  const message = messageContext?.message;
  const { theme } = useTheme();
  
  // If message comes as a prop, use that instead
  const messageData = props.message || message;
  
  useEffect(() => {
    // Debug message content when component mounts or message changes
    if (messageData?.type === 'system') {
      console.log('System message received:', {
        id: messageData.id,
        text: messageData.text,
        type: messageData.type,
      });
    }
  }, [messageData]);
  
  // Safety check - if no message is available, render nothing
  if (!messageData) {
    console.warn('No message available in CustomMessageSimple');
    return null;
  }
  
  // Create a test system message (for demo purposes)
  // This will help verify our rendering is working
  if (messageData?.type === 'regular' && messageData?.text?.includes('[SYSTEM]')) {
    const testHtml = '<p>dsadsa This is a <b>test system message</b> with <i>formatting</i> and sda a <a href="https://getstream.io">link</a></p>';
    
    return (
      <View style={styles.systemMessageContainer}>
        <RenderHtml
          contentWidth={300}
          source={{ html: testHtml }}
          tagsStyles={{
            body: { textAlign: 'center', color: '#7A7A7A' },
            p: { textAlign: 'center', color: '#7A7A7A', fontSize: 14, fontStyle: 'italic' },
            a: { color: '#0E71EB', textDecorationLine: 'underline' },
            b: { fontWeight: 'bold' },
            strong: { fontWeight: 'bold' },
            i: { fontStyle: 'italic' },
            em: { fontStyle: 'italic' }
          }}
          baseStyle={{ textAlign: 'center' }}
        />
        <Text style={styles.debugText}>Test HTML rendering</Text>
      </View>
    );
  }
  
  // Handle system messages
  if (messageData?.type === 'system' && messageData?.text) {
    // Make sure the text is properly wrapped in HTML tags
    let htmlContent = messageData.text;
    
    // If it doesn't seem to be HTML, wrap it in a paragraph tag
    if (!(htmlContent.trim().startsWith('<') && htmlContent.trim().includes('>'))) {
      htmlContent = `<p>${htmlContent}</p>`;
    }
    
    // Debug the HTML content
    console.log('Rendering system message HTML:', htmlContent);
    
    return (
      <View style={styles.systemMessageContainer}>
        <RenderHtml
          contentWidth={300}
          source={{ html: htmlContent }}
          tagsStyles={{
            body: {
              color: theme.colors?.grey || '#7A7A7A',
              fontSize: 14,
              fontStyle: 'italic',
              textAlign: 'center',
            },
            p: {
              color: theme.colors?.grey || '#7A7A7A',
              textAlign: 'center',
              fontSize: 14,
              marginVertical: 4,
              fontStyle: 'italic',
            },
            a: {
              color: theme.colors?.primary || '#0E71EB',
              textDecorationLine: 'underline',
            },
            b: {
              fontWeight: 'bold',
            },
            strong: {
              fontWeight: 'bold',
            },
            i: {
              fontStyle: 'italic',
            },
            em: {
              fontStyle: 'italic',
            }
          }}
          baseStyle={{ textAlign: 'center' }}
          defaultTextProps={{
            selectable: true,
          }}
          renderersProps={{
            a: {
              onPress: (event, href) => {
                console.log('Link pressed:', href);
                // You can open the link here with Linking.openURL(href)
              }
            }
          }}
          enableExperimentalMarginCollapsing={true}
          debug={true}
        />
      </View>
    );
  }
  
  // For non-system messages, use the default MessageSimple
  return <MessageSimple {...props} />;
};

const styles = StyleSheet.create({
  systemMessageContainer: {
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
  },
  debugText: {
    color: '#F44336',
    fontSize: 10,
    marginTop: 4,
  }
}); 