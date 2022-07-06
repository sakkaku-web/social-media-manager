import { SNSPost } from '@kumi-arts/core';
import { ForwardedRef, forwardRef } from 'react';

export interface TwitterProps {
  defaultPost: SNSPost;
  disabled: boolean;
}

function TwitterForm(
  { defaultPost }: TwitterProps,
  ref: ForwardedRef<unknown>
) {
  // const formRef = useRef<ProviderForm>();
  // useImperativeHandle(ref, () => ({
  //   submit: () => formRef.current?.submit(),
  // }));

  // const { setStatus } = useContext(SocialProviderContext);

  // const [post, setPost] = useState(defaultPost);
  // const [lastSubmittedId, setLastSubmittedId] = useState('');

  // const client = new TwitterClient();

  // const submitFn = async () => {
  //   try {
  //     const id = await client.postMedia({ ...post });
  //     setLastSubmittedId(id);
  //   } catch (err) {
  //     const { data } = err as HttpError;
  //     throw new Error(
  //       `${data.errors
  //         .map((e: Record<string, string>) => e.message)
  //         .join('\n')}`
  //     );
  //   }
  // };

  // const validation = {
  //   textImage: eitherRequired(post.text, post.media?.image), // Might have to change if file is editable in here
  // };

  // useEffect(() => setPost(defaultPost), [defaultPost]);
  // useEffect(() => {
  //   if (!isValid(validation)) {
  //     setStatus(SocialProvider.TWITTER, Status.ERROR);
  //   } else {
  //     setStatus(SocialProvider.TWITTER, Status.VALID);
  //   }
  // }, [post]);

  // const postLink = lastSubmittedId
  //   ? `https://twitter.com/anyuser/status/${lastSubmittedId}`
  //   : undefined;
  // return (
  //   <BaseForm
  //     provider={SocialProvider.TWITTER}
  //     link={postLink}
  //     submitFn={submitFn}
  //     ref={formRef}
  //   >
  //     <TextInputField
  //       label="Text"
  //       value={post.text}
  //       disabled={true}
  //       validationMessage={validation.textImage}
  //     />

  //     <TextInputField
  //       label="Image"
  //       value={post.media?.filename}
  //       disabled={true}
  //       validationMessage={validation.textImage}
  //     />
  //   </BaseForm>
  // );
  return <></>;
}

export default forwardRef(TwitterForm);