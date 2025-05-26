import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomChatScreen } from '../components/chat';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        headerShown: false,
        title: "Chat"
      }} />
      <CustomChatScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 