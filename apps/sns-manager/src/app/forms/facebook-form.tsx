import { SNSPost, SocialProvider } from '@kumi-arts/core';
import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FacebookClient } from '../clients/facebook';
import BaseForm from './base-form';
import { ProviderForm } from './form';

export interface FacebookFormProps {
  defaultPost: SNSPost;
  disabled: boolean;
}

function FacebookForm(
  { defaultPost }: FacebookFormProps,
  ref: ForwardedRef<unknown>
) {
  const formRef = useRef<ProviderForm>();
  useImperativeHandle(ref, () => ({
    submit: () => formRef.current?.submit(),
  }));

  const [post, setPost] = useState({ ...defaultPost });

  const client = new FacebookClient();

  const submitFn = async () => {
    try {
      client.getPages();
      // const id = await client.postMedia({ ...post });
      // setLastSubmittedId(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BaseForm
      provider={SocialProvider.FACEBOOK}
      submitFn={submitFn}
      ref={formRef}
    ></BaseForm>
  );
}

export default forwardRef(FacebookForm);
