import { useContext, useEffect, useState } from 'react';
import { SocialProviderContext, Tokens } from '../social-provider-context';
import './post-form.module.scss';
import { Group, SocialProvider } from '@kumi-arts/core';
import { ApiClient } from '@kumi-arts/api-client';
import ProviderSelect from './provider-select/provider-select';
import {
  Button,
  FilePicker,
  FormField,
  Label,
  Pane,
  SelectField,
  TextareaField,
  TextInputField,
} from 'evergreen-ui';

/* eslint-disable-next-line */
export interface PostFormProps {
  api: ApiClient;
}

export function PostForm({ api }: PostFormProps) {
  const { pinterest }: Tokens = useContext(SocialProviderContext);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [uploadImages, setImages] = useState([] as File[]);
  const [selectedProvider, setSelectedProvider] = useState(
    [] as SocialProvider[]
  );

  const [selectedGroup, setSelectedGroup] = useState('');

  const onFileUpload = (files: FileList) => {
    setImages(Array.from(files || []));
  };

  const onSubmit = async () => {
    selectedProvider.forEach(async (provider) => {
      api.postSNS(
        provider,
        { title, text, group: selectedGroup },
        uploadImages
      );
    });
  };

  const [groups, setGroup] = useState([] as Group[]);
  useEffect(() => {
    api.getGroups(SocialProvider.PINTEREST).then((res) => {
      setGroup(res);
      if (res.length > 0) {
        setSelectedGroup(res[0].id);
      }
    });
  }, []);
  const groupSelect = groups.map((b) => (
    <option key={b.id} value={b.id}>
      {b.name}
    </option>
  ));

  return (
    <div>
      <TextInputField
        label="Title"
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />

      <TextareaField
        label="Text"
        value={text}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
        }
      />

      <FormField label="Image">
        <FilePicker onChange={onFileUpload} />
      </FormField>

      <ProviderSelect
        selected={selectedProvider}
        onChange={setSelectedProvider}
      />

      {selectedProvider.includes(SocialProvider.PINTEREST) && (
        <SelectField
          label="Pinterest Board"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          {groupSelect}
        </SelectField>
      )}

      <Button onClick={onSubmit} appearance="primary">
        Submit
      </Button>
    </div>
  );
}

export default PostForm;
