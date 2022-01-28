import { SNSPost, SocialProvider } from '@kumi-arts/core';
import {
  Alert,
  Card,
  Heading,
  Link,
  Pane,
  SelectField,
  Spinner,
  TextInputField,
} from 'evergreen-ui';
import {
  useEffect,
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
  ForwardedRef,
  useRef,
} from 'react';
import { Board, PinterestClient, PinterestPost } from '../clients/pinterest';
import { isValid, requiredMessage } from './validation';
import { SocialProviderContext, Status } from '../social-provider-context';
import { HttpError } from '../clients/client';
import BaseForm from './base-form';
import { ProviderForm } from './form';

export interface PinterestProps {
  defaultPost: SNSPost;
  disabled: boolean;
}

function PinterestForm(
  { defaultPost, disabled }: PinterestProps,
  ref: ForwardedRef<unknown>
) {
  const { setStatus } = useContext(SocialProviderContext);

  const formRef = useRef<ProviderForm>();
  const [boards, setBoards] = useState([] as Board[]);
  const [lastSubmittedId, setLastSubmittedId] = useState('');
  const [post, setPost] = useState({
    ...defaultPost,
    board: '',
  } as PinterestPost);

  const client = new PinterestClient();

  useEffect(() => {
    client.getBoards().then((boards) => {
      setBoards(boards);
      if (boards.length > 0) {
        onSelectedBoardChange(boards[0].id);
      }
    });
  }, []);

  useImperativeHandle(ref, () => ({
    submit: () => formRef.current?.submit(),
  }));

  const submitFn = async () => {
    try {
      const id = await client.postMedia(post);

      setLastSubmittedId(id);
    } catch (e) {
      const { data } = e as HttpError;
      throw new Error(`${data.message} - code: ${data.code}`);
    }
  };

  const validation = {
    image: requiredMessage(post.media?.filename), // Might have to change if file is editable in here
  };

  useEffect(() => setPost((s) => ({ ...s, ...defaultPost })), [defaultPost]);
  useEffect(() => {
    if (!isValid(validation)) {
      setStatus(SocialProvider.PINTEREST, Status.ERROR);
    } else {
      setStatus(SocialProvider.PINTEREST, Status.VALID);
    }
  }, [post]);

  const onSelectedBoardChange = (id: string) => {
    setPost((s) => ({ ...s, board: id }));
  };

  const postLink = lastSubmittedId
    ? `https://www.pinterest.com/pin/${lastSubmittedId}`
    : undefined;
  return (
    <BaseForm
      provider={SocialProvider.PINTEREST}
      link={postLink}
      submitFn={submitFn}
      ref={formRef}
    >
      <TextInputField label="Title" value={post.title} disabled={true} />
      <TextInputField label="Description" value={post.text} disabled={true} />

      <SelectField
        label="Board"
        required={true}
        value={post.board}
        onChange={(e) => onSelectedBoardChange(e.target.value)}
        disabled={disabled}
      >
        {boards.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </SelectField>

      <TextInputField
        label="Image"
        validationMessage={validation.image}
        required={true}
        value={post.media?.filename}
        disabled={true}
      />
    </BaseForm>
  );
}

export default forwardRef(PinterestForm);
