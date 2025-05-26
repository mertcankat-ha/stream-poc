# Custom Chat Components

This directory contains custom chat components that extend and customize the Stream Chat SDK.

## Component Overview

- **CustomChatScreen**: Main chat screen that integrates all custom components
- **CustomChannelHeader**: Customized header with online status and navigation
- **CustomMessageSimple**: Custom message bubble with email filtering for privacy
- **CustomFileAttachment**: Enhanced file attachment handling with custom UI
- **CustomMessageInput**: Message input with template messages and additional actions
- **CustomChannelPreview**: Customized channel preview for the channel list

## Usage

Import the components from this directory and use them in your Stream Chat implementation:

```tsx
import { CustomChatScreen } from '../components/chat';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <CustomChatScreen />
    </View>
  );
}
```

## Customization

To customize these components further:

1. Each component is designed to be easily extended
2. Modify the styles in the respective component files
3. Add additional functionality by extending the props

Refer to the [Stream Chat SDK documentation](https://getstream.io/chat/docs/react-native/) for more details on the underlying components. 