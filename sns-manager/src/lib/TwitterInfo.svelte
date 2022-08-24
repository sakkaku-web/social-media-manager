<script lang="ts">
  import {
    Configuration,
    TwitterApi,
    TwitterPostPostPostRequest,
    TwitterToken,
    User,
  } from "../openapi";
  import { onMount } from "svelte";

  import env from "../environment";
  import SubmitForm from "./forms/SubmitForm.svelte";
  import Input from "./components/Input.svelte";
  import FileInput from "./components/FileInput.svelte";
  import ExternalLink from "./components/ExternalLink.svelte";

  export let token: TwitterToken;

  let loading = false;
  let user: User;
  let form: TwitterPostPostPostRequest = {
    text: "",
    images: [],
  };

  const api = new TwitterApi(
    new Configuration({
      basePath: env.apiBase,
      username: token.accessToken,
      password: token.accessSecret,
    })
  );

  onMount(async () => {
    user = await api.userUserGet();
  });

  const submit = async () => {
    const { url } = await api.twitterPostPostPost(form);
    return url;
  };
</script>

{#if user}
  <div class="flex flex-col gap-4 p-4 bg-white border rounded-md">
    <ExternalLink url={`https://twitter.com/${user.id}`}
      >{user.name}</ExternalLink
    >

    <SubmitForm submitFn={submit} bind:loading>
      <Input bind:value={form.text} placeholder="Text" disabled={loading} />
      <FileInput bind:files={form.images} accept="image/*" disabled={loading} />
    </SubmitForm>
  </div>
{/if}
