import { useState } from 'react';
import './post-form.module.scss';

/* eslint-disable-next-line */
export interface PostFormProps {
  text: string;
  setText: (t: string) => void;
}

export function PostForm({ text, setText }: PostFormProps) {
  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
}

export default PostForm;
