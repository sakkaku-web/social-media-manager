<script lang="ts">
  import LoginButton from "./LoginButton.svelte";
  import { TwitterToken, TwitterTokenFromJSON } from "../openapi";

  export let twitterLogins: TwitterToken[] = [];

  const addTwitterLogin = (tokenObj: object) => {
    const token = TwitterTokenFromJSON(tokenObj);

    if (!twitterLogins.find((t) => t.accessToken === token.accessToken)) {
      twitterLogins = [...twitterLogins, token];
    }
  };
</script>

<LoginButton
  provider="Twitter"
  on:login={(e) => addTwitterLogin(e.detail.token)}
/>
