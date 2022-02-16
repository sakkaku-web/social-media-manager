import { SNSPost, SocialProvider } from '@kumi-arts/core';
import {
  ForwardedRef,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ProviderForm } from './form';
import BaseForm from './base-form';
import { HttpError } from '../clients/client';
import {
  Button,
  SelectField,
  SelectMenu,
  SelectMenuItem,
  TextInputField,
} from 'evergreen-ui';
import { eitherRequired, isValid } from './validation';
import { SocialProviderContext, Status } from '../social-provider-context';
import { RedditClient, RedditPost } from '../clients/reddit';
import { debounce } from 'lodash';

export interface RedditProps {
  defaultPost: SNSPost;
  disabled: boolean;
}

function RedditForm({ defaultPost }: RedditProps, ref: ForwardedRef<unknown>) {
  const formRef = useRef<ProviderForm>();
  useImperativeHandle(ref, () => ({
    submit: () => formRef.current?.submit(),
  }));

  const { setStatus } = useContext(SocialProviderContext);

  const [post, setPost] = useState(defaultPost as RedditPost);
  const [lastSubmittedId, setLastSubmittedId] = useState('');
  const [subreddits, setSubreddits] = useState([] as SelectMenuItem[]);

  const client = new RedditClient();

  const submitFn = async () => {
    try {
      const id = await client.postMedia({ ...post });
      setLastSubmittedId(id);
    } catch (err) {
      const { data } = err as HttpError;
      throw new Error(
        `${data.errors
          .map((e: Record<string, string>) => e.message)
          .join('\n')}`
      );
    }
  };

  const validation = {};

  useEffect(() => setPost((s) => ({ ...s, ...defaultPost })), [defaultPost]);
  useEffect(() => {
    if (!isValid(validation)) {
      setStatus(SocialProvider.TWITTER, Status.ERROR);
    } else {
      setStatus(SocialProvider.TWITTER, Status.VALID);
    }
  }, [post]);

  const searchSubreddits = async (text: string) => {
    const subreddits = await client.querySubreddit(text);
    console.log(subreddits);
    setSubreddits(subreddits.map((s) => ({ label: s, value: s })));
  };

  const postLink = lastSubmittedId
    ? `https://twitter.com/anyuser/status/${lastSubmittedId}`
    : undefined;
  return (
    <BaseForm
      provider={SocialProvider.REDDIT}
      link={postLink}
      submitFn={submitFn}
      ref={formRef}
    >
      <TextInputField label="Text" value={post.text} disabled={true} />

      <SelectMenu
        isMultiSelect
        title="Select subreddits"
        options={subreddits}
        selected={post.subreddits}
        onFilterChange={debounce(searchSubreddits, 1000)}
        onSelect={(i) =>
          setPost((s) => ({
            ...s,
            subreddits: [...s.subreddits, i.value as string],
          }))
        }
        onDeselect={(i) =>
          setPost((s) => ({
            ...s,
            subreddits: s.subreddits.filter((p) => p !== i.value),
          }))
        }
      >
        <Button>Select subreddits</Button>
      </SelectMenu>
    </BaseForm>
  );
}

export default forwardRef(RedditForm);
