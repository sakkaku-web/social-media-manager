import { SNSPost } from '@kumi-arts/core';
import { useState } from 'react';
import {
  Pane,
  Button,
  Heading,
  ListItem,
  SelectMenu,
  SelectMenuItem,
  TextInputField,
  UnorderedList,
  Spinner,
  Link,
  Text,
  FormField,
  FormFieldLabel,
} from 'evergreen-ui';
import { RedditClient } from '../clients/reddit';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

export interface RedditProps {
  defaultPost: SNSPost;
}

function RedditForm({ defaultPost }: RedditProps) {
  const [submitting, setSubmitting] = useState(false);
  const [selectedSubReddits, setSelectedSubReddits] = useState([] as string[]);
  const [lastSubmitted, setLastSubmitted] = useState([] as string[]);
  const [subreddits, setSubreddits] = useState([] as SelectMenuItem[]);

  const client = new RedditClient();

  const onSubmit = async () => {
    try {
      setSubmitting(true);
      const urls = await Promise.all(
        selectedSubReddits.map((sub) =>
          client.postMedia({ ...defaultPost, subreddit: sub })
        )
      );
      setLastSubmitted(urls);
    } catch (err) {
      console.log(err);
      setLastSubmitted([]);
    } finally {
      setSubmitting(false);
    }
  };

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
    setSelectedSubReddits(toggleSubreddit(selectedSubReddits, value));
  };

  const findMatchingUrl = (subreddit: string) => {
    return lastSubmitted.find((url) => url.includes(`/r/${subreddit}/`));
  };

  return (
    <Pane>
      <Pane display="flex" alignItems="center" gap="1em" marginBottom="1em">
        <Heading marginBottom={16}>Reddit</Heading>
        {submitting && <Spinner size={24} />}
      </Pane>

      <Pane display="flex" flexDirection="row" gap={32}>
        <Pane display="flex" flexDirection="column">
          <TextInputField
            label="Title"
            value={defaultPost.title}
            disabled={true}
          />

          <TextInputField
            label="Text"
            value={defaultPost.text}
            disabled={true}
          />

          <FormField label="File">
            <Text>{defaultPost.media?.name || ''}</Text>
          </FormField>

          <Button onClick={onSubmit}>Submit</Button>
        </Pane>

        <Pane display="flex" flexDirection="column" gap={32}>
          <SelectMenu
            title="Select subreddits"
            options={subreddits}
            selected={selectedSubReddits}
            onFilterChange={debounce(searchSubreddits, 500)}
            onSelect={(i) => updatePostSubreddit(i.value as string)}
          >
            <Button>Select subreddits</Button>
          </SelectMenu>

          <UnorderedList listStyle="none">
            {selectedSubReddits.map((p) => {
              const url = findMatchingUrl(p);
              return (
                <ListItem
                  key={p}
                  display="flex"
                  alignItems="center"
                  gap="0.5em"
                >
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    style={{ cursor: 'pointer' }}
                    onClick={() => updatePostSubreddit(p)}
                  />

                  <span>{p}</span>

                  {url && (
                    <Link href={url} target="_blank" padding={0}>
                      Go to post
                    </Link>
                  )}
                </ListItem>
              );
            })}
          </UnorderedList>
        </Pane>
      </Pane>
    </Pane>
  );
}

export default RedditForm;
