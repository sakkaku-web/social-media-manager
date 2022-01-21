import { SocialProvider } from '@kumi-arts/core';
import { createContext } from 'react';

export type Tokens = { [p in SocialProvider]?: string | null };

export const SocialProviderContext = createContext({} as Tokens);
