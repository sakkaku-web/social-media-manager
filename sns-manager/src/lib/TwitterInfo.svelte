<script lang="ts">
  import { Configuration, TwitterApi, TwitterToken, User } from "../openapi";
  import { onMount } from "svelte";

  import env from "../environment";

  export let token: TwitterToken;

  let user: User;

  onMount(async () => {
    const api = new TwitterApi(
      new Configuration({
        basePath: env.apiBase,
        username: token.accessToken,
        password: token.accessSecret,
      })
    );
    user = await api.userUserGet();
  });
</script>

{#if user}
  <a href={`https://twitter.com/${user.id}`} target="_blank">{user.name}</a>
{/if}
