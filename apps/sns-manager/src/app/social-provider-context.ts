import { SocialProvider } from '@kumi-arts/core';
import { createContext } from 'react';

export type ProviderStatus = { [p in SocialProvider]?: boolean };

export interface SocialProviderValue {
  loggedIn: ProviderStatus;
  errors: ProviderStatus;
  setLoggedIn: (provider: SocialProvider, value: boolean) => void;
  setError: (provider: SocialProvider, err: boolean) => void;
}

export const SocialProviderContext = createContext({} as SocialProviderValue);
