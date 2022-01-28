import { SNSPost } from '@kumi-arts/core';
import { Card, Heading, SelectField, TextInputField } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { Board, PinterestClient, PinterestPost } from '../clients/pinterest';
import { requiredMessage } from './validation';

export interface PinterestProps {
  client: PinterestClient;
  defaultPost: SNSPost;
  onPostChange: (p: PinterestPost) => void;
}

export function PinterestForm({
  defaultPost,
  client,
  onPostChange,
}: PinterestProps) {
  const [boards, setBoards] = useState([] as Board[]);
  const [selectedBoard, setSelectedBoard] = useState('');

  useEffect(() => {
    client.getBoards().then((boards) => {
      setBoards(boards);
      if (boards.length > 0) {
        onSelectedBoardChange(boards[0].id);
      }
    });
  }, []);

  const onSelectedBoardChange = (id: string) => {
    setSelectedBoard(id);
    onPostChange({ ...defaultPost, board: id });
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
        validationMessage={requiredMessage(defaultPost.media?.filename)}
        required={true}
        value={defaultPost.media?.filename}
        disabled={true}
      />
    </Card>
  );
}

export default PinterestForm;
