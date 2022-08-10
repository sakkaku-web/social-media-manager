<script lang="ts">
  import env from "../environment";
  import { Configuration, PixivApi } from "../openapi";
  import { createEventDispatcher, onMount } from "svelte";
  import { addLoginToStorage, loadLoginsFromStorage } from "../storage";
  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";

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
      addLoginToStorage(token, provider);
      updateLogins();

      showLoginForm = false;
      username = "";
      password = "";
    } catch (e) {
      console.log("Failed to login to pixiv", e);
    } finally {
      loading = false;
    }
  };

  const updateLogins = () => {
    dispatch("login", { tokens: loadLoginsFromStorage(provider) });
  };

  onMount(() => updateLogins());
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
  } fixed inset-0 items-center justify-center backdrop-blur-sm flex-col`}
>
  <div class="fixed inset-0 -z-10" on:click={() => (showLoginForm = false)} />
  <h2 class="font-bold">Pixiv Login</h2>
  <form
    on:submit|preventDefault={() => loginPixiv()}
    class="flex flex-col gap-2 justify-center p-4 z-10"
  >
    <input
      type="text"
      class="bg-white border py-1 px-2 disabled:bg-gray-200"
      name="username"
      disabled={loading}
      placeholder="Username"
      required
      bind:value={username}
    />
    <input
      type="password"
      name="password"
      placeholder="Passwor"
      disabled={loading}
      required
      class="bg-white border py-1 px-2 disabled:bg-gray-200"
      bind:value={password}
    />

    <button type="submit" disabled={loading} class="disabled:text-gray-500"
      >Login</button
    >
  </form>
</div>
