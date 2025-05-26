import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { AttachmentProps, useTheme } from 'stream-chat-expo';

/**
 * Custom file attachment component with enhanced UI and support for different file types
 */
export const CustomFileAttachment: React.FC<AttachmentProps> = (props) => {
  const { attachment } = props;
  const { theme } = useTheme();
  
  if (!attachment) return null;
  
  // Handle opening the file
  const handleFileOpen = async () => {
    if (!attachment.asset_url) {
      Alert.alert('Error', 'Unable to open file. URL is missing.');
      return;
    }
    
    try {
      const canOpen = await Linking.canOpenURL(attachment.asset_url);
      if (canOpen) {
        await Linking.openURL(attachment.asset_url);
      } else {
        Alert.alert('Error', 'Cannot open this file type on your device.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open file.');
      console.error('Error opening file:', error);
    }
  };
  
  // Get file size in readable format
  const getReadableFileSize = () => {
    const fileSizeBytes = attachment.file_size || 0;
    
    if (fileSizeBytes < 1024) {
      return `${fileSizeBytes} B`;
    } else if (fileSizeBytes < 1024 * 1024) {
      return `${(fileSizeBytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  };
  
  // Get appropriate icon based on mime type
  const getFileIcon = () => {
    const mimeType = attachment.mime_type || '';
    
    if (mimeType.includes('pdf')) {
      return <MaterialCommunityIcons name="file-pdf-box" size={40} color="#E44D26" />;
    } else if (mimeType.includes('image')) {
      return <Ionicons name="image" size={40} color="#4CAF50" />;
    } else if (mimeType.includes('video')) {
      return <Ionicons name="videocam" size={40} color="#2196F3" />;
    } else if (mimeType.includes('audio')) {
      return <Ionicons name="musical-notes" size={40} color="#9C27B0" />;
    } else if (mimeType.includes('word') || mimeType.includes('officedocument.wordprocessing')) {
      return <MaterialCommunityIcons name="file-word" size={40} color="#2B579A" />;
    } else if (mimeType.includes('excel') || mimeType.includes('officedocument.spreadsheet')) {
      return <MaterialCommunityIcons name="file-excel" size={40} color="#217346" />;
    } else if (mimeType.includes('powerpoint') || mimeType.includes('officedocument.presentation')) {
      return <MaterialCommunityIcons name="file-powerpoint" size={40} color="#D24726" />;
    } else {
      return <MaterialCommunityIcons name="file-document-outline" size={40} color="#607D8B" />;
    }
  };
  
  return (
    <TouchableOpacity
      onPress={handleFileOpen}
      style={[
        styles.container,
        { backgroundColor: theme.colors?.white_snow || '#F0F0F0' },
      ]}
    >
      <View style={styles.fileIconContainer}>
        {getFileIcon()}
      </View>
      
      <View style={styles.fileInfo}>
        <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
          {attachment.title || 'File'}
        </Text>
        <Text style={styles.fileDetails}>
          {getReadableFileSize()} • {attachment.mime_type?.split('/')[1] || 'file'}
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.downloadButton}
        onPress={handleFileOpen}
      >
        <Ionicons 
          name="open-outline" 
          size={24} 
          color={theme.colors?.primary || '#006CFF'} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  fileIconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  fileName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  fileDetails: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  downloadButton: {
    padding: 8,
  },
}); 