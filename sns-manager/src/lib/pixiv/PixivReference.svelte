<script lang="ts">
  import { onMount } from "svelte";
  import type { PixivClient } from "./pixiv";

  export let api: PixivClient;
  export let userId: string;

  let items = [];

  onMount(async () => {
    items = await api.getBookmarks(userId);
    console.log(items);
  });
</script>

<div class="flex flex-row flex-wrap w-full">
  {#each items as item}
    <a
      href={"https://reddit.com" + item.link}
      class="w-1/2 h-50v sm:w-1/4 sm:h-25v lg:w-1/6 lg:h-15v bg-cover"
      style={`background-image: url(${item.image})`}><!--Empty --></a
    >
  {/each}
</div>
