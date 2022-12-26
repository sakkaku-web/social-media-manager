<script lang="ts">
  import { onMount } from "svelte";
  import Gallery from "../components/Gallery.svelte";
  import type { ReferenceImage } from "../models";
  import type { RedditClient } from "./reddit";

  export let api: RedditClient;
  export let username: string;

  let items: ReferenceImage[] = [];

  onMount(async () => {
    items = await api.getUpvoted(username);
  });
</script>

<Gallery images={items} />
