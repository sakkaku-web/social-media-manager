<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import ExternalLink from "../components/ExternalLink.svelte";
  import type { Token, User } from "../auth";
  import { removeLoginToken, updateLoginToken } from "../../storage";
  import { PixivClient } from "./pixiv";
  import Button from "../components/Button.svelte";

  export let token: Token;

  let user: User;
  let api: PixivClient;

  $: loadUserData(token);

  const dispatch = createEventDispatcher();

  const loadUserData = async (token: Token) => {
    api = new PixivClient(token.token);
    const userData = await api.getUser();
    if (userData == null) {
      await tryRefreshToken(token);
    } else {
      user = { id: token.userId, name: token.username };
    }
  };

  const tryRefreshToken = async (token: Token) => {
    if (token.refreshToken) {
      console.log("Refreshing pixiv token");
      const newToken = await api.refreshToken(token.refreshToken);
      if (newToken) {
        token = updateLoginToken(token, newToken, "pixiv");
        if (token) {
          dispatch("refresh");
        } else {
          console.log("Failed to read token");
          removeToken();
        }
      } else {
        console.log("Failed to get new token. Removing current token");
        removeToken();
      }
    }
  };

  const removeToken = () => {
    removeLoginToken(token, "pixiv");
    dispatch("refresh");
  };
</script>

{#if user}
  <div class="flex flex-col gap-2">
    <div class="flex justify-between">
      <ExternalLink url={`https://www.pixiv.net/users/${user.id}`}
        >Pixiv - {user.name}</ExternalLink
      >
      <Button on:click={() => removeToken()}>x</Button>
    </div>

    <slot {api} />
  </div>
{/if}
