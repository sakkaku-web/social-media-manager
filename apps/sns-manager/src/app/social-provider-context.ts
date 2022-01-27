import { SocialProvider } from '@kumi-arts/core';
import { createContext } from 'react';

export type LoggedIn = { [p in SocialProvider]?: boolean };

export interface SocialProviderValue {
  loggedIn: LoggedIn;
  setLoggedIn: (provider: SocialProvider, value: boolean) => void;
}

export const SocialProviderContext = createContext({} as SocialProviderValue);
