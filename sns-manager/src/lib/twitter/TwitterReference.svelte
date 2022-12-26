<script lang="ts">
  import env from "../../environment";
  import { createEventDispatcher, onMount } from "svelte";
  import { Configuration, TwitterApi } from "../../openapi";
  import TwitterUserRef from "./TwitterUserRef.svelte";

  export let users: string[];

  const api = new TwitterApi(new Configuration({ basePath: env.apiBase }));

  const dispatch = createEventDispatcher();
</script>

{#each users as user}
  <TwitterUserRef {api} {user} on:remove={() => dispatch("remove", { user })} />
{/each}
