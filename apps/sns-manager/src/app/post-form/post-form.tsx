import { useState } from 'react';
import './post-form.module.scss';
import { SNSMedia, SNSPost, SocialProvider } from '@kumi-arts/core';
import {
  Button,
  FilePicker,
  FormField,
  TextareaField,
  TextInputField,
} from 'evergreen-ui';
import Pinterest from '../pinterest/pinterest';
import ProviderSelect from './provider-select/provider-select';

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

  const isSelected = (provider: SocialProvider) =>
    selectedProvider.includes(provider);

  const file = uploadImages.length ? uploadImages[0] : null;
  const media: SNSMedia | undefined = file
    ? { filename: file.name, image: file }
    : undefined;
  const post: SNSPost = {
    media,
    text,
    title,
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

      {isSelected(SocialProvider.PINTEREST) && <Pinterest defaultPost={post} />}
    </div>
  );
}

export default PostForm;
