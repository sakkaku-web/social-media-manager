<script lang="ts">
  import LoginButton from "./LoginButton.svelte";
  import { OAuthToken, OAuthTokenFromJSON } from "../openapi";

  export let redditLogins: OAuthToken[] = [];

  const addRedditLogin = (tokenObj: object) => {
    const token = OAuthTokenFromJSON(tokenObj);

    if (!redditLogins.find((t) => t.accessToken === token.accessToken)) {
      redditLogins = [...redditLogins, token];
    }
  };
</script>

<LoginButton
  provider="Reddit"
  on:login={(e) => addRedditLogin(e.detail.token)}
/>
