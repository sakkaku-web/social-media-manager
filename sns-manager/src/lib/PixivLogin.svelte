<script lang="ts">
  import env from "../environment";
  import { Configuration, PixivApi } from "../openapi";
  import { createEventDispatcher } from "svelte";
  import { addLoginToken } from "../storage";
  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import Input from "./components/Input.svelte";
  import Button from "./components/Button.svelte";

  const dispatch = createEventDispatcher();
  const provider = "pixiv";

  let username = "";
  let password = "";
  let showLoginForm = false;
  let loading = false;

  const loginPixiv = async () => {
    const api = new PixivApi(
      new Configuration({
        basePath: env.apiBase,
      })
    );

    loading = true;
    try {
      const token = await api.pixivAuthPost({
        login: { username, password },
      });
      addLoginToken(token, provider);
      dispatch("login");

      showLoginForm = false;
      username = "";
      password = "";
    } catch (e) {
      console.log("Failed to login to pixiv", e);
    } finally {
      loading = false;
    }
  };
</script>

<button
  on:click={() => (showLoginForm = !showLoginForm)}
  class="flex flex-row items-center font-bold"
>
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  Pixiv
</button>

<div
  class={`${
    showLoginForm ? "flex" : "hidden"
  } fixed justify-center items-center inset-0 backdrop-blur-sm `}
>
  <div class="fixed inset-0 -z-10" on:click={() => (showLoginForm = false)} />
  <div class="bg-white flex flex-col justify-center items-center p-4 gap-2">
    <h2 class="font-bold">Pixiv Login</h2>
    <form
      on:submit|preventDefault={() => loginPixiv()}
      class="flex flex-col gap-2 justify-center z-10"
    >
      <Input
        name="username"
        disabled={loading}
        placeholder="Username"
        required
        bind:value={username}
      />
      <Input
        name="password"
        disabled={loading}
        placeholder="Password"
        required
        password
        bind:value={password}
      />

      <div class="text-xs text-gray-500">
        Login might be slow or fail often.
      </div>

      <Button type="submit" disabled={loading}>Login</Button>
    </form>
  </div>
</div>
