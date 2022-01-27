import { SNSPost } from '@kumi-arts/core';
import { Button, Heading, Pane, SelectField } from 'evergreen-ui';
import { useEffect, useState } from 'react';
import { Board, PinterestClient } from '../clients/pinterest';

export interface PinterestProps {
  defaultPost: SNSPost;
}

export function Pinterest({ defaultPost }: PinterestProps) {
  const [boards, setBoards] = useState([] as Board[]);
  const [selectedBoard, setSelectedBoard] = useState('');

  const client = new PinterestClient();

  useEffect(() => {
    client.getBoards().then((boards) => {
      setBoards(boards);
      if (boards.length > 0) {
        setSelectedBoard(boards[0].id);
      }
    });
  }, []);

  const onSubmit = async () => {
    await client.postMedia({
      ...defaultPost,
      board: selectedBoard,
    });
  };

  return (
    <Pane>
      <Heading>Pinterest</Heading>
      <SelectField
        label="Pinterest Board"
        value={selectedBoard}
        onChange={(e) => setSelectedBoard(e.target.value)}
      >
        {boards.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </SelectField>

      <Button onClick={onSubmit} appearance="primary">
        Submit
      </Button>
    </Pane>
  );
}

export default Pinterest;
