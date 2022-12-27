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
  let firstId: string;
  let images: ReferenceImage[] = [];

  const cacheStorageKey = `sns-manager-twitter-ref-cache-${user}`;
  const cacheSize = 30;

  const removeUser = () => dispatch("remove");
  const toggleFocus = () => (focused ? dispatch("unfocus") : dispatch("focus"));

  onMount(() => {
    loadFromCache();
    loadTweetsForUser(user, undefined, firstId, false);
  });

  const loadTweetsForUser = async (
    user: string,
    max = lastId,
    since = undefined,
    finishOnEmpty = true
  ) => {
    status = Status.LOADING;
    try {
      const x = await api.listTweetsTweetsUsernameGet({
        username: user,
        maxId: max,
        sinceId: since,
        count,
      });

      if (x.images.length === 0) {
        if (finishOnEmpty) {
          status = Status.FINISHED;
        } else {
          status = Status.LOADED;
        }
        return;
      }

      const last = x.images[x.images.length - 1];
      lastId = last.tweetId;
      if (!firstId) {
        firstId = x.images[0].tweetId;
      }

      const loadedImages = x.images.map((i) => ({
        image: i.mediaUrl,
        link: i.link,
      }));

      images = [...images, ...loadedImages];
      status = Status.LOADED;
      updateCache();
    } catch (e) {
      status = Status.ERROR;
    }
  };

  const loadFromCache = () => {
    const cache = JSON.parse(localStorage.getItem(cacheStorageKey) || "{}");
    images = cache.images || [];
    firstId = cache.firstId;
    lastId = cache.lastId;
  };

  const updateCache = () => {
    localStorage.setItem(
      cacheStorageKey,
      JSON.stringify({ images: images.slice(0, cacheSize), lastId, firstId })
    );
  };
</script>

<div class="flex flex-col gap-2 grow">
  <div class="flex justify-between p-2">
    <div class="flex gap-2">
      <span>{user}</span>
      <button class="font-bold" on:click={() => toggleFocus()}>v</button>
    </div>

    {#if !focused}
      <button class="font-bold" on:click={() => removeUser()}>x</button>
    {/if}
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
