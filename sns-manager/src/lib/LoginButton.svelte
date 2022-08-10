<script lang="ts">
  import { OAuthTokenFromJSON, TwitterTokenFromJSON } from "../openapi";

  import { createEventDispatcher, onMount } from "svelte";

  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import env from "../environment";
  import { addLoginToStorage, loadLoginsFromStorage } from "../storage";

  export let provider: string;

  const dispatch = createEventDispatcher();
  const lowerProvider = provider.toLowerCase();

  const baseURL = () => window.location.origin + window.location.pathname;
  const buildURL = () => {
    return `${
      env.apiBase
    }/api/${lowerProvider}/auth?return_to=${encodeURIComponent(baseURL())}`;
  };

  onMount(() => {
    const query = new URLSearchParams(window.location.search);
    const providerData = query.get(lowerProvider);

    if (providerData) {
      const data = JSON.parse(providerData);
      const isTwitter = provider.toLowerCase() === "twitter";
      const token = isTwitter
        ? TwitterTokenFromJSON(data)
        : OAuthTokenFromJSON(data);

      addLoginToStorage(token, provider);
      history.replaceState("", "", baseURL());
    }

    dispatch("login", { tokens: loadLoginsFromStorage(provider) });
  });
</script>

<a href={buildURL()} class="flex flex-row items-center font-bold">
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  {provider}
</a>
