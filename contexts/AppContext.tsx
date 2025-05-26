import React, { ReactNode, useState } from "react";
import { Channel as ChannelType, StreamChat } from "stream-chat";

type AppContextType = {
  channel: ChannelType | null;
  setChannel: (channel: ChannelType | null) => void;
  thread: any | null;
  setThread: (thread: any | null) => void;
  client: StreamChat | null;
  setClient: (client: StreamChat | null) => void;
};

export const AppContext = React.createContext<AppContextType>({
  channel: null,
  setChannel: () => {},
  thread: null,
  setThread: () => {},
  client: null,
  setClient: () => {},
});

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [channel, setChannel] = useState<ChannelType | null>(null);
  const [thread, setThread] = useState<any | null>(null);
  const [client, setClient] = useState<StreamChat | null>(null);

  return (
    <AppContext.Provider value={{ channel, setChannel, thread, setThread, client, setClient }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);