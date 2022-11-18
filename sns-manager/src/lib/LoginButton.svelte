<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import env from "../environment";
  import { addLoginToken, Provider } from "../storage";

  export let provider: Provider;

  const dispatch = createEventDispatcher();

  const baseURL = () => window.location.origin + window.location.pathname;
  const buildURL = () => {
    return `${env.apiBase}/api/${provider}/auth?return_to=${encodeURIComponent(
      baseURL()
    )}`;
  };

  onMount(() => {
    const query = new URLSearchParams(window.location.search);
    const providerData = query.get(provider);

    if (providerData) {
      const data = JSON.parse(providerData);
      addLoginToken(data, provider);
      history.replaceState("", "", baseURL());
      dispatch("login");
    }
  });
</script>

<a href={buildURL()} class="flex flex-row items-center font-bold">
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  {provider}
</a>
