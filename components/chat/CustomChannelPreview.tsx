import React from 'react';
import { StyleSheet } from 'react-native';
import {
    ChannelPreviewMessenger,
    ChannelPreviewMessengerProps,
} from 'stream-chat-expo';

// A simplifiied preview component that lets Stream handle the details
export const CustomChannelPreview = (props: ChannelPreviewMessengerProps) => {
  // Just pass through to the default component with our custom styling
  return (
    <ChannelPreviewMessenger 
      {...props}
      // Use style instead of styles
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  message: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  date: {
    fontSize: 12,
    color: '#9A9A9A',
    marginTop: 4,
  },
}); 