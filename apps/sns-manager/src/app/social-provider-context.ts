import { SocialProvider } from '@kumi-arts/core';
import { createContext } from 'react';

export type ProviderStatus = { [p in SocialProvider]?: Status };
export type ProviderBool = { [p in SocialProvider]?: boolean };

export enum Status {
  ERROR,
  SUCCESS,
  VALID,
  SUBMITTING,
}

export interface SocialProviderValue {
  loggedIn: ProviderBool;
  status: ProviderStatus;
  setLoggedIn: (provider: SocialProvider, value: boolean) => void;
  setStatus: (provider: SocialProvider, status: Status) => void;
}

export const SocialProviderContext = createContext({} as SocialProviderValue);
