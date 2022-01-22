import { SocialProvider } from '@kumi-arts/core';
import { useContext } from 'react';
import { SocialProviderContext, Tokens } from '../../social-provider-context';
import './provider-select.module.scss';

/* eslint-disable-next-line */
export interface ProviderSelectProps {
  selected: SocialProvider[];
  onChange: (p: SocialProvider[]) => void;
}

export function ProviderSelect({ onChange, selected }: ProviderSelectProps) {
  const tokens: Tokens = useContext(SocialProviderContext);

  const onChecked = (provider: SocialProvider) => {
    if (selected.includes(provider)) {
      onChange(selected.filter((p) => p !== provider));
    } else {
      onChange([...selected, provider]);
    }
  };

  return (
    <div>
      {Object.keys(tokens)
        .map((key) => key as SocialProvider)
        .filter((p) => !!tokens[p])
        .map((p: SocialProvider) => {
          return (
            <span key={p}>
              <input
                id={p}
                type="checkbox"
                checked={selected.includes(p)}
                onChange={() => onChecked(p)}
              />
              <label htmlFor={p}>{p}</label>
            </span>
          );
        })}
    </div>
  );
}

export default ProviderSelect;
