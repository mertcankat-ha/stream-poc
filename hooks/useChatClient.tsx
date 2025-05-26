import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { chatApiKey, chatUserId, chatUserToken } from '../chat.config';

/**
 * Custom hook to initialize and manage the Stream Chat client
 */
export const useChatClient = () => {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initChat = async () => {
      if (chatClient) return;

      setLoading(true);

      try {
        // Initialize a new chat client with API key
        const client = StreamChat.getInstance(chatApiKey);

        // Connect the user
        await client.connectUser(
          {
            id: chatUserId,
            name: chatUserId,
            image: `https://getstream.io/random_png/?id=${chatUserId}&name=${chatUserId}`,
          },
          chatUserToken,
        );

        setChatClient(client);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
          console.error('Error connecting to Stream Chat:', err);
        } else {
          const genericError = new Error('An unknown error occurred');
          setError(genericError);
          console.error('Unknown error connecting to Stream Chat:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup function
    return () => {
      if (chatClient) {
        chatClient.disconnectUser().then(() => {
          console.log('User disconnected');
        });
      }
    };
  }, []);

  return {
    chatClient,
    loading,
    error,
  };
}; 