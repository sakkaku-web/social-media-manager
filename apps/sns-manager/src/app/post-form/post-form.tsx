import { useContext, useState } from 'react';
import { SocialProviderContext, Tokens } from '../social-provider-context';
import './post-form.module.scss';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialProvider } from '@kumi-arts/core';
import { ApiClient } from '@kumi-arts/api-client';
import ProviderSelect from './provider-select/provider-select';

/* eslint-disable-next-line */
export interface PostFormProps {
  api: ApiClient;
}

export function PostForm({ api }: PostFormProps) {
  const tokens: Tokens = useContext(SocialProviderContext);

  const [text, setText] = useState('');
  const [uploadImages, setImages] = useState([] as File[]);
  const [selectedProvider, setSelectedProvider] = useState(
    [] as SocialProvider[]
  );

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
  };

  const onSubmit = async () => {
    selectedProvider.forEach(async (provider) => {
      const images = await api.upload(provider, uploadImages);
      api.postSNS(provider, { text, images });
    });
  };

  return (
    <div>
      <div>
        <div>
          <label>Text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div>
          <label>Image</label>
          <input type="file" multiple onChange={onFileUpload} />
        </div>
      </div>

      <ProviderSelect
        selected={selectedProvider}
        onChange={setSelectedProvider}
      />

      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default PostForm;
