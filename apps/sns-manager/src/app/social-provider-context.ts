import { SocialProvider } from '@kumi-arts/core';
import { createContext } from 'react';

export interface SocialProviderContextValue {
  provider: SocialProvider;
}

export const SocialProviderContext = createContext({
  provider: SocialProvider.TWITTER,
} as SocialProviderContextValue);
