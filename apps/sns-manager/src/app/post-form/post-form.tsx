import './post-form.module.scss';
import { SNSPost } from '@kumi-arts/core';
import {
  FilePicker,
  FormField,
  Pane,
  TextareaField,
  TextInputField,
} from 'evergreen-ui';

/* eslint-disable-next-line */
export interface PostFormProps {
  post: SNSPost;
  disabled: boolean;
  onPostChange: (post: SNSPost) => void;
}

export function PostForm({ post, disabled, onPostChange }: PostFormProps) {
  const onFileUpload = (files: FileList) => {
    if (files.length > 0) {
      const file = Array.from(files)[0];
      emitPostChange({ media: { filename: file.name, image: file } });
    }
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    emitPostChange({ title: e.target.value });
  };

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    emitPostChange({ text: e.target.value });
  };

  const emitPostChange = (update: Partial<SNSPost>) => {
    onPostChange({
      ...post,
      ...update,
    });
  };

  return (
    <Pane>
      <TextInputField
        label="Title"
        value={post.title}
        onChange={onTitleChange}
        disabled={disabled}
      />

      <TextareaField
        label="Text"
        value={post.text}
        onChange={onTextChange}
        disabled={disabled}
      />

      <FormField label="Image" marginBottom="1em">
        <FilePicker
          onChange={onFileUpload}
          accept="image/*"
          disabled={disabled}
        />
      </FormField>
    </Pane>
  );
}

export default PostForm;
