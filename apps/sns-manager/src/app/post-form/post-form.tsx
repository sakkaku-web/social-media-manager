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
export interface PostFormProps {}

export function PostForm(props: PostFormProps) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [uploadImages, setImages] = useState([] as File[]);
  const [selectedProvider, setSelectedProvider] = useState(
    [] as SocialProvider[]
  );

  const onFileUpload = (files: FileList) => {
    setImages(Array.from(files || []));
  };

  const onSubmit = async () => {
    selectedProvider.forEach(async (provider) => {
      // api.postSNS(provider, { title, text }, uploadImages);
    });
  };

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

      <Button onClick={onSubmit} appearance="primary">
        Submit
      </Button>
    </div>
  );
}

export default PostForm;
