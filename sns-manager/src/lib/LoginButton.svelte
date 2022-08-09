<script lang="ts">
  import { OAuthToken, OAuthTokenFromJSON, TwitterToken } from "../openapi";

  import { createEventDispatcher, onMount } from "svelte";

  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import env from "../environment";

  export let provider: string;

  const TOKEN_PROVIDER_PREFIX = "sns-manager-tokens-";
  const providerKey = TOKEN_PROVIDER_PREFIX + provider;

  const dispatch = createEventDispatcher();
  const lowerProvider = provider.toLowerCase();

  type TokenType = TwitterToken | OAuthToken;

  const baseURL = () => window.location.origin + window.location.pathname;
  const buildURL = () => {
    return `${
      env.apiBase
    }/api/${lowerProvider}/auth?return_to=${encodeURIComponent(baseURL())}`;
  };

  const addLoginToStorage = (data: TokenType) => {
    const logins: TokenType[] = loadLoginsFromStorage();
    if (logins.findIndex((l) => l.accessToken === data.accessToken) === -1) {
      logins.push(data);
      sessionStorage.setItem(providerKey, JSON.stringify(logins));
    } else {
      console.warn("User is already logged in. Ignoring");
    }
  };

  const loadLoginsFromStorage = (): TokenType[] => {
    return JSON.parse(sessionStorage.getItem(providerKey) || "[]");
  };

  onMount(() => {
    const query = new URLSearchParams(window.location.search);
    const providerData = query.get(lowerProvider);

    if (providerData) {
      const token = OAuthTokenFromJSON(JSON.parse(providerData));
      addLoginToStorage(token);
      history.replaceState("", "", baseURL());
    }

    dispatch("login", { tokens: loadLoginsFromStorage() });
  });
</script>

<a href={buildURL()} class="flex flex-row items-center">
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  {provider}
</a>
