import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  AutoCompleteInput,
  MessageInput,
  MessageInputProps,
  useTheme
} from 'stream-chat-expo';

interface MessageInputContextProps {
  sendMessage: (...args: any[]) => void;
  text: string;
  toggleAttachmentPicker: () => void;
  resetInput: () => void;
  setText: (text: string) => void;
  handleSubmit: () => void;
}

/**
 * Custom message input component with template actions
 */
export const CustomMessageInput = (props: MessageInputProps) => {
  // Use default MessageInput to handle sending messages correctly
  return (
    <MessageInput showMoreOptions={true} {...props}>
      {(messageInputProps) => <CustomInputInner {...messageInputProps} />}
    </MessageInput>
  );
};

const CustomInputInner = (messageInputProps: MessageInputContextProps) => {
  const {
    sendMessage,
    text,
    toggleAttachmentPicker,
    resetInput,
  } = messageInputProps;
  
  const { theme } = useTheme();
  const [showActions, setShowActions] = useState(false);
  
  // Handle sending a message
  const handleSend = () => {
    if (!text.trim()) return;
    
    sendMessage();
    resetInput();
  };
  
  // Toggle additional actions menu
  const toggleActions = () => {
    setShowActions(!showActions);
  };
  
  // Send a template message
  const sendTemplate = (templateType: string) => {
    let templateText = '';
    
    switch (templateType) {
      case 'greeting':
        templateText = 'Hello! How can I help you today?';
        break;
      case 'thanks':
        templateText = 'Thank you for reaching out. I appreciate it!';
        break;
      case 'schedule':
        templateText = 'Would you like to schedule a call to discuss this further?';
        break;
      default:
        templateText = '';
    }
    
    if (templateText) {
      // Instead of directly sending, set the text and then send it
      messageInputProps.setText(templateText);
      messageInputProps.handleSubmit();
    }
    
    setShowActions(false);
  };
  
  // Send a location share message
  const shareLocation = () => {
    Alert.alert('Location Sharing', 'This would request and share your location');
    setShowActions(false);
  };
  
  return (
    <View style={styles.container}>
      {/* Template actions */}
      {showActions && (
        <View style={[
          styles.actionsContainer,
          { backgroundColor: theme.colors?.white_snow || '#F8F8F8' }
        ]}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => sendTemplate('greeting')}
          >
            <Ionicons name="hand-right" size={24} color="#4CAF50" />
            <Text style={styles.actionButtonText}>Greeting</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => sendTemplate('thanks')}
          >
            <Ionicons name="heart" size={24} color="#F44336" />
            <Text style={styles.actionButtonText}>Thanks</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => sendTemplate('schedule')}
          >
            <Ionicons name="calendar" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>Schedule</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={shareLocation}
          >
            <Ionicons name="location" size={24} color="#FF9800" />
            <Text style={styles.actionButtonText}>Location</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Input and buttons */}
      <View style={styles.inputContainer}>
        {/* Toggle actions button */}
        <TouchableOpacity
          onPress={toggleActions}
          style={[
            styles.iconButton,
            showActions && styles.activeIconButton,
          ]}
        >
          <MaterialIcons
            name="add-circle-outline"
            size={24}
            color={showActions ? theme.colors?.primary || '#006CFF' : '#757575'}
          />
        </TouchableOpacity>
        
        {/* Attachment button */}
        <TouchableOpacity
          onPress={toggleAttachmentPicker}
          style={styles.iconButton}
        >
          <Ionicons name="attach" size={24} color="#757575" />
        </TouchableOpacity>
        
        {/* Text input */}
        <View 
          style={[
            styles.inputWrapper,
            { backgroundColor: theme.colors?.white_snow || '#F8F8F8' }
          ]}
        >
          <AutoCompleteInput
            additionalTextInputProps={{
              placeholder: 'Type a message...',
              placeholderTextColor: '#AAAAAA',
            }}
          />
        </View>
        
        {/* Send button */}
        <TouchableOpacity
          disabled={!text.trim()}
          onPress={handleSend}
          style={[
            styles.sendButton,
            !text.trim() && styles.disabledSendButton,
            text.trim() && { 
              backgroundColor: theme.colors?.primary || '#006CFF' 
            },
          ]}
        >
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#EBEBEB',
    backgroundColor: 'red',
    paddingBottom: 100,
    paddingTop: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  actionButton: {
    alignItems: 'center',
    padding: 8,
  },
  actionButtonText: {
    fontSize: 12,
    marginTop: 4,
    color: '#333333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'transparent',
  },
  iconButton: {
    padding: 8,
    marginHorizontal: 2,
  },
  activeIconButton: {
    backgroundColor: 'rgba(0, 108, 255, 0.1)',
    borderRadius: 20,
  },
  inputWrapper: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    minHeight: 40,
    justifyContent: 'center',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledSendButton: {
    backgroundColor: '#CCCCCC',
  },
}); 