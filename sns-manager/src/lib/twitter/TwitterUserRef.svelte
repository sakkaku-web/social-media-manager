<script lang="ts">
  import type { TwitterApi } from "src/openapi";
  import { createEventDispatcher, onMount } from "svelte";
  import Gallery from "../components/Gallery.svelte";
  import type { ReferenceImage } from "../models";

  export let user: string;
  export let api: TwitterApi;
  export let focused: boolean;

  const dispatch = createEventDispatcher();
  const count = 100; // Number of tweets to fetch, those without images will be filtered out

  enum Status {
    LOADING,
    LOADED,
    FINISHED,
    ERROR,
  }

  let status = Status.LOADED;
  let lastId: string;
  let images: ReferenceImage[] = [];

  const removeUser = () => dispatch("remove");
  const toggleFocus = () => (focused ? dispatch("unfocus") : dispatch("focus"));

  onMount(() => loadTweetsForUser(user));

  const loadTweetsForUser = async (user: string) => {
    status = Status.LOADING;
    try {
      const x = await api.listTweetsTweetsUsernameGet({
        username: user,
        maxId: lastId,
        count,
      });

      if (x.images.length === 0) {
        status = Status.FINISHED;
        return;
      }

      const last = x.images[x.images.length - 1];
      lastId = last.tweetId;

      const loadedImages = x.images.map((i) => ({
        image: i.mediaUrl,
        link: i.link,
      }));

      images = [...images, ...loadedImages];
      status = Status.LOADED;
    } catch (e) {
      status = Status.ERROR;
    }
  };
</script>

<div class="flex flex-col gap-2 grow">
  <div class="flex gap-4">
    <span>{user}</span>
    <button class="font-bold" on:click={() => removeUser()}>x</button>

    <button class="font-bold" on:click={() => toggleFocus()}>v</button>
  </div>
  <Gallery {images} />

  <div class="flex flex-col items-center text-gray-500 text-sm text-center">
    {#if status == Status.LOADED}
      <button class="p-8" on:click={() => loadTweetsForUser(user)}
        >Load More...</button
      >
    {:else if status == Status.LOADING}
      <div class="p-8">LOADING</div>
    {:else if status == Status.ERROR}
      <div class="p-8 text-red-600">Error loading the data</div>
    {/if}
  </div>
</div>
