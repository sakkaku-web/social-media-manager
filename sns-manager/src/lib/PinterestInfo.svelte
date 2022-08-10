<script lang="ts">
  import { Configuration, OAuthToken, PinterestApi, User } from "../openapi";
  import { onMount } from "svelte";

  import env from "../environment";

  export let token: OAuthToken;

  let user: User;

  onMount(async () => {
    const api = new PinterestApi(
      new Configuration({
        basePath: env.apiBase,
        accessToken: token.accessToken,
      })
    );
    user = await api.userUserGet();
  });
</script>

{#if user}
  <a href={`https://pinterest.com/${user.name}`} target="_blank">{user.name}</a>
{/if}
