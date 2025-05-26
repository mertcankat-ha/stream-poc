# Chat POC Mobile App

This is a proof of concept chat application using Stream Chat and React Native with Expo.

## Setup Instructions

### Stream Chat API Setup

1. Create an account on [Stream](https://getstream.io/) if you don't have one already
2. Create a new Stream Chat application in the Stream dashboard
3. Get your API key from the Stream dashboard
4. Generate a user token for testing. You can use Stream's [token generator](https://getstream.io/chat/docs/react-native/tokens_and_authentication/?language=javascript)

### Configuration

1. Copy `chat.config.template.ts` to `chat.config.ts`:
   ```
   cp chat.config.template.ts chat.config.ts
   ```

2. Edit `chat.config.ts` and replace the placeholder values with your actual Stream API credentials:
   ```typescript
   export const chatApiKey = "YOUR_STREAM_API_KEY"; // From Stream dashboard
   export const chatUserId = "YOUR_USER_ID";        // Any user ID you want to use
   export const chatUserName = "YOUR_USER_NAME";    // Name for the user
   export const chatUserToken = "YOUR_USER_TOKEN";  // Generated token for this user
   ```

### Running the Application

1. Install dependencies:
   ```
   npm install
   ```

2. Start the Expo development server:
   ```
   npm start
   ```

3. Follow the instructions in the terminal to run the app on your device or emulator

## Important Notes

- Make sure to add `chat.config.ts` to your `.gitignore` file to avoid committing your API keys
- For production use, you should implement proper user authentication and token generation on your backend
