<script lang="ts">
  import type { RedditApi } from "../../openapi";
  import { onMount } from "svelte";

  export let api: RedditApi;

  let items = null;

  onMount(async () => {
    const { result } = await api.upvotedUpvotedGet();
    items = result;
  });
</script>

{#if items}
  <div class="flex flex-row flex-wrap w-full">
    {#each items as item}
      <a
        href={"https://reddit.com" + item.link}
        class="w-1/2 h-50v sm:w-1/4 sm:h-25v lg:w-1/6 lg:h-15v bg-cover"
        style={`background-image: url(${item.image})`}><!--Empty --></a
      >
    {/each}
  </div>
{/if}
