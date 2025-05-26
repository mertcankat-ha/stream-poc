# Stream Chat Proof of Concept

This project demonstrates a custom implementation of Stream Chat in React Native with Expo. The POC showcases various customization options for building a feature-rich chat experience.

## Features Implemented

1. **Custom Message Bubbles**: Enhanced styling with privacy features (email filtering)
2. **Custom Channel Header**: With online status and user info
3. **Custom File Attachments**: Special handling for different file types (PDF, images, etc.)
4. **Custom Message Input**: With quick actions and template messages
5. **Theme Customization**: Consistent design system across all components

## Component Structure

- `components/chat/CustomChannelHeader.tsx` - Custom header with back button and info button
- `components/chat/CustomMessageBubble.tsx` - Custom message bubble with sensitive content filtering
- `components/chat/CustomFileAttachment.tsx` - Enhanced file attachments with specialized UI
- `components/chat/CustomMessageInput.tsx` - Custom input with template actions
- `components/chat/CustomChatScreen.tsx` - Main component that puts everything together
- `hooks/useChatClient.tsx` - Custom hook for initializing and managing Stream Chat client

## Testing the POC

1. **Navigate to the Chat Screen**:
   Open the app and navigate to the Chat screen (via the `/chat` route)

2. **Test Message Sending**:
   - Type a message in the input field and send it
   - Messages should appear in the custom bubble format
   - Messages containing email addresses should have them hidden

3. **Test Template Messages**:
   - Tap the '+' button next to the input field
   - Select one of the template messages (Greeting, Thanks, etc.)
   - The template should be sent as a message

4. **Test File Attachments**:
   - Tap the attachment button
   - Select a file to upload (try different file types like PDFs, images)
   - The attachment should appear with the custom UI based on file type

5. **Test UI Responsiveness**:
   - Test in both portrait and landscape orientations
   - Test with different message lengths

## Customization Options

You can further customize this implementation by:

1. **Modifying the Theme**:
   - Edit the `chatTheme` object in `CustomChatScreen.tsx`

2. **Adding More Template Actions**:
   - Extend the `sendTemplate` function in `CustomMessageInput.tsx`

3. **Enhancing Message Privacy**:
   - Modify the `filterSensitiveContent` function in `CustomMessageBubble.tsx`

4. **Supporting More File Types**:
   - Add more conditions to the `getFileIcon` function in `CustomFileAttachment.tsx`

## Configuration

The Stream API credentials are configured in `chat.config.ts`. For a production app, these values should be retrieved securely from a backend service.

## Notes

- This POC uses the `stream-chat-expo` package, which is designed specifically for Expo projects.
- Custom components leverage the various context hooks provided by Stream Chat for accessing data.
- The implementation follows React Native performance best practices with proper memoization. 