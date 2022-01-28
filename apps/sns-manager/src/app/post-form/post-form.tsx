import './post-form.module.scss';
import { SNSPost } from '@kumi-arts/core';
import {
  FilePicker,
  FormField,
  TextareaField,
  TextInputField,
} from 'evergreen-ui';

/* eslint-disable-next-line */
export interface PostFormProps {
  post: SNSPost;
  onPostChange: (post: SNSPost) => void;
}

export function PostForm({ post, onPostChange }: PostFormProps) {
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
    <div>
      <TextInputField
        label="Title"
        value={post.title}
        onChange={onTitleChange}
      />

      <TextareaField label="Text" value={post.text} onChange={onTextChange} />

      <FormField label="Image">
        <FilePicker onChange={onFileUpload} accept="image/*" />
      </FormField>
    </div>
  );
}

export default PostForm;
