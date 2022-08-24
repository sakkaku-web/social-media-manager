<script lang="ts">
  import env from "../environment";

  import {
    Configuration,
    PixivApi,
    PixivPostPostPostRequest,
    PixivToken,
  } from "../openapi";
  import Card from "./components/Card.svelte";
  import ExternalLink from "./components/ExternalLink.svelte";
  import FileInput from "./components/FileInput.svelte";
  import Input from "./components/Input.svelte";
  import SubmitForm from "./forms/SubmitForm.svelte";

  export let token: PixivToken;

  let loading = false;
  let form: PixivPostPostPostRequest = {
    images: [],
    tags: "",
    title: "",
  };

  const api = new PixivApi(
    new Configuration({
      basePath: env.apiBase,
      accessToken: token.accessToken,
    })
  );

  const submit = async () => {
    const { url } = await api.pixivPostPostPost(form);
    return url;
  };
</script>

<Card>
  <ExternalLink url={`https://www.pixiv.net/users/${token.userId}`}
    >{token.name}</ExternalLink
  >

  <SubmitForm submitFn={submit} bind:loading>
    <Input
      bind:value={form.title}
      placeholder="Title *"
      required
      disabled={loading}
    />
    <Input bind:value={form.text} placeholder="Text" disabled={loading} />
    <Input
      bind:value={form.tags}
      placeholder="Tags *"
      required
      disabled={loading}
    />
    <FileInput
      bind:files={form.images}
      accept="image/*"
      required
      disabled={loading}
    />
  </SubmitForm>
</Card>
