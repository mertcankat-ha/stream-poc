import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ChannelAvatar, useChannelContext, useTheme } from 'stream-chat-expo';

type CustomChannelHeaderProps = {
  onBackPress?: () => void;
  onInfoPress?: () => void;
};

export const CustomChannelHeader: React.FC<CustomChannelHeaderProps> = ({
  onBackPress,
  onInfoPress,
}) => {
  const { channel } = useChannelContext();
  const { theme } = useTheme();
  
  // Get channel name or use members if it's a direct message
  const getChannelName = () => {
    if (channel?.data?.name) return channel.data.name;
    
    // If no channel name, try to use member names (for DMs)
    const members = Object.values(channel?.state?.members || {})
      .filter(member => member.user?.id !== channel?._client?.userID)
      .map(member => member.user?.name || member.user?.id || 'Unknown');
    
    return members.join(', ') || 'Chat';
  };
  
  // Get online status text
  const getStatusText = () => {
    // Get count of online members excluding current user
    const onlineMembers = Object.values(channel?.state?.members || {})
      .filter(
        member => 
          member.user?.online && 
          member.user?.id !== channel?._client?.userID
      );
      
    if (onlineMembers.length > 0) {
      return 'Online';
    }
    
    return 'Offline';
  };
  
  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: theme.colors?.white_snow || '#FFFFFF' }
      ]}
    >
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Ionicons 
          name="chevron-back" 
          size={24} 
          color={theme.colors?.black || '#000000'} 
        />
      </TouchableOpacity>
      
      <View style={styles.channelInfo}>
        <ChannelAvatar channel={channel} size={40} />
        
        <View style={styles.textContainer}>
          <Text style={styles.channelName}>{getChannelName()}</Text>
          {/* <Text style={styles.statusText}>{getStatusText()}</Text> */}
        </View>
      </View>
      
      <TouchableOpacity onPress={onInfoPress} style={styles.infoButton}>
        <Ionicons 
          name="information-circle-outline" 
          size={24} 
          color={theme.colors?.accent_blue || '#006CFF'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    backgroundColor: 'green',
  },
  backButton: {
    padding: 8,
  },
  channelInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  textContainer: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  channelName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusText: {
    fontSize: 12,
    color: '#767676',
    marginTop: 2,
  },
  infoButton: {
    padding: 8,
  },
}); 