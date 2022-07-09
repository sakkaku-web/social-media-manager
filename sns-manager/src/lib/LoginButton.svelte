<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import env from "../environment";

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
      dispatch("login", { token: JSON.parse(providerData) });
      history.replaceState("", "", baseURL());
    }
  });
</script>

<a href={buildURL()} class="flex flex-row items-center">
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  {provider}
</a>
