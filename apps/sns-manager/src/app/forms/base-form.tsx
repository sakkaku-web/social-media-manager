import { SocialProvider } from '@kumi-arts/core';
import { Card, Pane, Heading, Spinner, Alert, Link } from 'evergreen-ui';
import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useState,
} from 'react';
import { SocialProviderContext, Status } from '../social-provider-context';
import { capitalize } from 'lodash';

export interface BaseFormProps {
  provider: SocialProvider;
  link?: string;
  submitFn: () => Promise<void>;
  children?: ReactNode;
}

export enum MessageType {
  LINK,
  ERROR,
  TEXT,
}

function BaseForm(
  { provider, children, link, submitFn }: BaseFormProps,
  ref: ForwardedRef<unknown>
) {
  const { status, setStatus } = useContext(SocialProviderContext);
  const [error, setError] = useState('');

  const isSubmitting = status[provider] === Status.SUBMITTING;

  useImperativeHandle(ref, () => ({
    submit: () => {
      setStatus(provider, Status.SUBMITTING);
      submitFn()
        .then(() => setStatus(provider, Status.SUCCESS))
        .catch((err) => {
          setError(err.message);
          setStatus(provider, Status.ERROR);
        });
    },
  }));

  return (
    <Card border padding="1em" marginBottom="1em">
      <Pane display="flex" alignItems="center" gap="1em" marginBottom="1em">
        <Heading>{capitalize(provider)}</Heading>
        {isSubmitting && <Spinner size={24} />}
      </Pane>

      {children}

      {link && (
        <Alert
          role="status"
          intent="success"
          title={<Link href={link}>{link}</Link>}
        />
      )}
      {error && <Alert role="status" intent="danger" title={error} />}
    </Card>
  );
}

export default forwardRef(BaseForm);
