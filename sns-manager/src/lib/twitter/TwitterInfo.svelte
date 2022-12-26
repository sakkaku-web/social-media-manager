<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import ExternalLink from "../components/ExternalLink.svelte";
  import type { Token } from "../auth";
  import { removeLoginToken, updateLoginToken } from "../../storage";
  import Button from "../components/Button.svelte";
  import { Configuration, TwitterApi } from "../../openapi";
  import env from "../../environment";

  export let token: Token;

  let username: string;
  let user_id: string;
  let api: TwitterApi;

  $: loadUserData(token);

  const dispatch = createEventDispatcher();

  const loadUserData = async (token: Token) => {
    console.log(token);

    api = new TwitterApi(
      new Configuration({
        basePath: env.apiBase,
        username: token.token,
        password: token.secret,
      })
    );
    const user = await api.userUserGet();
    if (user == null) {
      await tryRefreshToken(token);
    } else {
      user_id = user.id;
      username = user.name;
    }
  };

  const tryRefreshToken = async (token: Token) => {
    // if (token.refreshToken) {
    //   console.log("Refreshing reddit token");
    //   const newToken = await api.refreshToken(token.refreshToken);
    //   if (newToken) {
    //     token = updateLoginToken(token, newToken, "reddit");
    //     if (token) {
    //       dispatch("refresh");
    //     } else {
    //       console.log("Failed to read token");
    //       removeToken();
    //     }
    //   } else {
    //     console.log("Failed to get new token. Removing current token");
    //     removeToken();
    //   }
    // }
  };

  const removeToken = () => {
    removeLoginToken(token, "twitter");
    dispatch("refresh");
  };
</script>

{#if username}
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <ExternalLink url={`https://twitter.com/${user_id}`}
        >Twitter - {username}</ExternalLink
      >
      <Button on:click={() => removeToken()}>x</Button>
    </div>

    <slot {api} />
  </div>
{/if}
