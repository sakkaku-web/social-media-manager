import { SNSPost, SocialProvider } from '@kumi-arts/core';
import {
  Alert,
  Card,
  Heading,
  Link,
  SelectField,
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
import { SocialProviderContext } from '../social-provider-context';
import { HttpError } from '../clients/client';

export interface PinterestProps {
  defaultPost: SNSPost;
}

function PinterestForm(
  { defaultPost }: PinterestProps,
  ref: ForwardedRef<unknown>
) {
  const { setError } = useContext(SocialProviderContext);

  const [boards, setBoards] = useState([] as Board[]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [status, setStatus] = useState({ error: false, message: '' });

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
    submit: () => {
      client
        .postMedia({
          ...defaultPost,
          board: selectedBoard,
        })
        .then((id) =>
          setStatus({
            error: false,
            message: `https://www.pinterest.at/pin/${id}`,
          })
        )
        .catch(({ data }: HttpError) => {
          setStatus({
            error: true,
            message: `${data.message} - code: ${data.code}`,
          });
          setError(SocialProvider.PINTEREST, true);
        });
    },
  }));

  const validation = {
    image: requiredMessage(defaultPost.media?.filename),
  };

  useEffect(() => {
    setError(SocialProvider.PINTEREST, !isValid(validation));
  }, [defaultPost]);

  const onSelectedBoardChange = (id: string) => {
    setSelectedBoard(id);
  };

  return (
    <Card border padding="1em" marginBottom="1em">
      <Heading>Pinterest</Heading>

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

      {status.message &&
        ((!status.error && (
          <Alert
            role="status"
            intent="success"
            title={<Link href={status.message}>Posted successfully</Link>}
          />
        )) || <Alert role="status" intent="danger" title={status.message} />)}
    </Card>
  );
}

export default forwardRef(PinterestForm);
