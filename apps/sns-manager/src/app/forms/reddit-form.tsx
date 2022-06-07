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
  Autocomplete,
  Button,
  ListItem,
  SelectField,
  SelectMenu,
  SelectMenuItem,
  TextInput,
  TextInputField,
  UnorderedList,
} from 'evergreen-ui';
import { eitherRequired, isValid } from './validation';
import { SocialProviderContext, Status } from '../social-provider-context';
import { RedditClient, RedditPost } from '../clients/reddit';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

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

  const [post, setPost] = useState({
    ...defaultPost,
    subreddits: [],
  } as RedditPost);
  const [lastSubmittedId, setLastSubmittedId] = useState('');
  const [subreddits, setSubreddits] = useState([] as SelectMenuItem[]);

  const client = new RedditClient();

  const submitFn = async () => {
    try {
      const id = await client.postMedia({ ...post });
      setLastSubmittedId(id);
    } catch (err) {
      console.log(err);
    }
  };

  const validation = {};

  useEffect(() => setPost((s) => ({ ...s, ...defaultPost })), [defaultPost]);
  useEffect(() => {
    if (!isValid(validation)) {
      setStatus(SocialProvider.REDDIT, Status.ERROR);
    } else {
      setStatus(SocialProvider.REDDIT, Status.VALID);
    }
  }, [post]);

  const searchSubreddits = async (text: string) => {
    const subreddits = await client.querySubreddit(text);
    setSubreddits(subreddits.map((s) => ({ label: s, value: s })));
  };

  const toggleSubreddit = (subreddits: string[], value: string) => {
    if (subreddits.includes(value)) {
      return subreddits.filter((sub) => sub !== value);
    }
    return [...subreddits, value];
  };

  const updatePostSubreddit = (value: string) => {
    setPost((s) => ({
      ...s,
      subreddits: toggleSubreddit(s.subreddits, value),
    }));
  };

  const postLink = lastSubmittedId;
  return (
    <BaseForm
      provider={SocialProvider.REDDIT}
      link={postLink}
      submitFn={submitFn}
      ref={formRef}
    >
      <TextInputField label="Title" value={post.title} disabled={true} />

      <TextInputField label="Text" value={post.text} disabled={true} />

      <SelectMenu
        title="Select subreddits"
        options={subreddits}
        selected={post.subreddits}
        onFilterChange={debounce(searchSubreddits, 500)}
        onSelect={(i) => updatePostSubreddit(i.value as string)}
      >
        <Button>Select subreddits</Button>
      </SelectMenu>

      <UnorderedList>
        {post.subreddits.map((p) => (
          <ListItem key={p}>
            {p}
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{ cursor: 'pointer' }}
              onClick={() => updatePostSubreddit(p)}
            />
          </ListItem>
        ))}
      </UnorderedList>
    </BaseForm>
  );
}

export default forwardRef(RedditForm);
