<script lang="ts">
  import {
    Configuration,
    OAuthToken,
    RedditApi,
    RedditPostPostPostRequest,
    User,
  } from "../openapi";
  import { onMount } from "svelte";

  import env from "../environment";
  import ExternalLink from "./components/ExternalLink.svelte";
  import SubmitForm from "./forms/SubmitForm.svelte";
  import Input from "./components/Input.svelte";
  import FileInput from "./components/FileInput.svelte";
  import Card from "./components/Card.svelte";

  export let token: OAuthToken;

  let user: User;
  let loading = false;
  let form: RedditPostPostPostRequest = {
    title: "",
    subreddit: "",
    images: [],
  };

  const api = new RedditApi(
    new Configuration({
      basePath: env.apiBase,
      accessToken: token.accessToken,
    })
  );

  onMount(async () => {
    user = await api.userUserGet();
  });

  const submit = async () => {
    const defaultUrl = `https://www.reddit.com/user/${user.name}/submitted/`;
    const { url } = await api.redditPostPostPost(form);
    return url || defaultUrl;
  };
</script>

{#if user}
  <Card>
    <ExternalLink url={`https://reddit.com/u/${user.name}`}
      >{user.name}</ExternalLink
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
        bind:value={form.subreddit}
        placeholder="Subreddit *"
        required
        disabled={loading}
      />
      <Input bind:value={form.flair} placeholder="Flair" disabled={loading} />
      <FileInput bind:files={form.images} accept="image/*" disabled={loading} />
    </SubmitForm>
  </Card>
{/if}
