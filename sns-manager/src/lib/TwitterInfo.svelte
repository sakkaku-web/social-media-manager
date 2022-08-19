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

  export let token: TwitterToken;

  let loading = false;
  let submittedUrl: string;
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
    try {
      loading = true;
      submittedUrl = "";
      const { url } = await api.twitterPostPostPost(form);
      submittedUrl = url;
    } catch (e) {
      console.log(`Failed to submit twitter post for user ${user.name}`, e);
    } finally {
      loading = false;
    }
  };
</script>

{#if user}
  <div class="flex flex-col gap-4 p-4 bg-white border rounded-md">
    <a href={`https://twitter.com/${user.id}`} target="_blank">{user.name}</a>

    <SubmitForm on:submit={() => submit()} url={submittedUrl} {loading}>
      <Input bind:value={form.text} placeholder="Text" disabled={loading} />
      <FileInput bind:files={form.images} accept="image/*" disabled={loading} />
    </SubmitForm>
  </div>
{/if}
