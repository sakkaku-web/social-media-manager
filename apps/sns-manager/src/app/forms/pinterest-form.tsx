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
} from 'react';
import { Board, PinterestClient } from '../clients/pinterest';
import { isValid, requiredMessage } from './validation';
import { SocialProviderContext, Status } from '../social-provider-context';
import { HttpError } from '../clients/client';

export interface PinterestProps {
  defaultPost: SNSPost;
  disabled: boolean;
}

function PinterestForm(
  { defaultPost, disabled }: PinterestProps,
  ref: ForwardedRef<unknown>
) {
  const { setStatus } = useContext(SocialProviderContext);

  const [boards, setBoards] = useState([] as Board[]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [message, setMessage] = useState({ error: false, message: '' });

  const client = new PinterestClient();

  useEffect(() => {
    client.getBoards().then((boards) => {
      setBoards(boards);
      if (boards.length > 0) {
        onSelectedBoardChange(boards[0].id);
      }
    });
  }, []);

  const updateStatus = (s: Status) => setStatus(SocialProvider.PINTEREST, s);

  useImperativeHandle(ref, () => ({
    submit: async () => {
      try {
        updateStatus(Status.SUBMITTING);
        const id = await client.postMedia({
          ...defaultPost,
          board: selectedBoard,
        });

        setMessage({
          error: false,
          message: `https://www.pinterest.at/pin/${id}`,
        });
        updateStatus(Status.SUCCESS);
      } catch (e) {
        const { data } = e as HttpError;
        setMessage({
          error: true,
          message: `${data.message} - code: ${data.code}`,
        });
        updateStatus(Status.ERROR);
      }
    },
  }));

  const validation = {
    image: requiredMessage(defaultPost.media?.filename),
  };

  useEffect(() => {
    if (!isValid(validation)) {
      setStatus(SocialProvider.PINTEREST, Status.ERROR);
    } else {
      setStatus(SocialProvider.PINTEREST, Status.VALID);
    }
  }, [defaultPost]);

  const onSelectedBoardChange = (id: string) => {
    setSelectedBoard(id);
  };

  return (
    <Card border padding="1em" marginBottom="1em">
      <Pane display="flex" alignItems="center" gap="1em" marginBottom="1em">
        <Heading>Pinterest</Heading>
        <Spinner size={24} />
      </Pane>

      <TextInputField label="Title" value={defaultPost.title} disabled={true} />
      <TextInputField
        label="Description"
        value={defaultPost.text}
        disabled={true}
      />

      <SelectField
        label="Board"
        required={true}
        value={selectedBoard}
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
        value={defaultPost.media?.filename || ''}
        disabled={true}
      />

      {message.message &&
        ((!message.error && (
          <Alert
            role="status"
            intent="success"
            title={<Link href={message.message}>Posted successfully</Link>}
          />
        )) || <Alert role="status" intent="danger" title={message.message} />)}
    </Card>
  );
}

export default forwardRef(PinterestForm);
