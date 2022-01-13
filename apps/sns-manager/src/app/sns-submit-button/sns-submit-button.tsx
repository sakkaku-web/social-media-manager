import { SocialProvider } from '@kumi-arts/core';
import { useContext } from 'react';
import { SocialProviderContext } from '../social-provider-context';
import './sns-submit-button.module.scss';

/* eslint-disable-next-line */
export interface SnsSubmitButtonProps {
  onSubmit: (p: SocialProvider) => void;
}

export function SnsSubmitButton({ onSubmit }: SnsSubmitButtonProps) {
  const { provider } = useContext(SocialProviderContext);

  return (
    <div>
      <button onClick={() => onSubmit(provider)}>Submit</button>
    </div>
  );
}

export default SnsSubmitButton;
