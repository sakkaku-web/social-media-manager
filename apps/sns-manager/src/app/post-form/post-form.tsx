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

  const imgurToken = tokens[SocialProvider.IMGUR];

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
  };

  const onSubmit = async () => {
    const images: string[] = [];
    if (uploadImages.length > 0 && imgurToken) {
      images.push(...(await api.upload(SocialProvider.IMGUR, uploadImages)));
    }

    selectedProvider.forEach((provider) => {
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
          <label>
            Image
            <FontAwesomeIcon
              title="Imgur is needed for image uploads"
              icon={faInfo}
            />
          </label>
          <input
            type="file"
            multiple
            onChange={onFileUpload}
            disabled={!tokens[SocialProvider.IMGUR]}
          />
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
