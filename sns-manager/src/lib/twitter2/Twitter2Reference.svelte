<script lang="ts">
  import { onMount } from "svelte";
  import type { Twitter2Client } from "./twitter2";

  export let api: Twitter2Client;

  let items = [];

  onMount(async () => {
    // items = await api.getUpvoted(username);
  });

  addUser = () => {};
</script>

<input placeholder="add username" />

<div class="flex flex-row flex-wrap w-full">
  {#each items as item}
    <a
      href={"https://reddit.com" + item.link}
      class="w-1/2 h-50v sm:w-1/4 sm:h-25v lg:w-1/6 lg:h-15v bg-cover"
      style={`background-image: url(${item.image})`}><!--Empty --></a
    >
  {/each}
</div>
