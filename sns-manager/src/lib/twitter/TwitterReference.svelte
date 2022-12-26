<script lang="ts">
  import env from "../../environment";
  import { createEventDispatcher } from "svelte";
  import { Configuration, TwitterApi } from "../../openapi";
  import TwitterUserRef from "./TwitterUserRef.svelte";

  export let users: string[];

  let focused: string;

  const api = new TwitterApi(new Configuration({ basePath: env.apiBase }));

  const dispatch = createEventDispatcher();
</script>

{#each users as user (user)}
  <div
    style={focused == user ? "flex-basis: 100%" : ""}
    class={`basis-1/6 ${!focused || focused == user ? "flex" : "hidden"}`}
  >
    <TwitterUserRef
      {api}
      {user}
      focused={focused === user}
      on:remove={() => dispatch("remove", { user })}
      on:focus={() => (focused = user)}
      on:unfocus={() => (focused = undefined)}
    />
  </div>
{/each}
