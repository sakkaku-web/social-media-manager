<script lang="ts">
  import type { TwitterApi } from "src/openapi";
  import { createEventDispatcher, onMount } from "svelte";
  import Gallery from "../components/Gallery.svelte";
  import type { ReferenceImage } from "../models";

  export let user: string;
  export let api: TwitterApi;

  const dispatch = createEventDispatcher();
  const count = 40;

  enum Status {
    LOADING,
    LOADED,
    FINISHED,
  }

  let status = Status.LOADED;
  let lastId: number;
  let images: ReferenceImage[] = [];

  const removeUser = () => dispatch("remove");

  onMount(() => loadTweetsForUser(user));

  const loadTweetsForUser = async (user: string) => {
    status = Status.LOADING;
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
  };
</script>

<div class="flex flex-col gap-2 basis-1/6">
  <div class="flex gap-4">
    <span>{user}</span><button class="font-bold" on:click={() => removeUser()}
      >x</button
    >
  </div>
  <Gallery {images} />
  {#if status == Status.LOADED}
    <button
      class="text-gray-500 text-sm"
      on:click={() => loadTweetsForUser(user)}>Load More...</button
    >
  {/if}

  {#if status == Status.LOADING}
    LOADING
  {/if}
</div>
