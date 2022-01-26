import { useContext, useEffect, useState } from 'react';
import { SocialProviderContext, Tokens } from '../social-provider-context';
import './post-form.module.scss';
import { Group, SocialProvider } from '@kumi-arts/core';
import { ApiClient } from '@kumi-arts/api-client';
import ProviderSelect from './provider-select/provider-select';
import axios from 'axios';

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

  const [selectedGroup, setSelectedGroup] = useState('');

  const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(Array.from(event.target.files || []));
  };

  const onSubmit = async () => {
    selectedProvider.forEach(async (provider) => {
      api.postSNS(provider, { text, group: selectedGroup }, uploadImages);
    });
  };

  const [groups, setGroup] = useState([] as Group[]);
  useEffect(() => {
    api.getGroups(SocialProvider.PINTEREST).then((res) => setGroup(res));
  }, []);
  const groupSelect = groups.map((b) => (
    <option key={b.id} value={b.id}>
      {b.name}
    </option>
  ));

  return (
    <div>
      <div>
        <div>
          <label>Text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        </div>

        <div>
          <label>Image</label>
          <input type="file" onChange={onFileUpload} />
        </div>
      </div>

      <ProviderSelect
        selected={selectedProvider}
        onChange={setSelectedProvider}
      />

      <select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
      >
        {groupSelect}
      </select>

      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default PostForm;
