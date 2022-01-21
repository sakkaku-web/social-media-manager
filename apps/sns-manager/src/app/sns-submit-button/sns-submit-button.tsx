import { SocialProvider } from '@kumi-arts/core';
import { useContext } from 'react';
import { SocialProviderContext } from '../social-provider-context';
import './sns-submit-button.module.scss';

/* eslint-disable-next-line */
export interface SnsSubmitButtonProps {
  onSubmit: (p: SocialProvider) => void;
  provider: SocialProvider;
}

export function SnsSubmitButton({ onSubmit, provider }: SnsSubmitButtonProps) {
  return (
    <div>
      <button onClick={() => onSubmit(provider)}>Submit</button>
    </div>
  );
}

export default SnsSubmitButton;
