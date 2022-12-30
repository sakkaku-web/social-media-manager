<script lang="ts">
  import type { TwitterApi } from "src/openapi";
  import { createEventDispatcher, onMount } from "svelte";
  import Gallery from "../components/Gallery.svelte";
  import { ReferenceImage, Status } from "../models";

  export let user: string;
  export let api: TwitterApi;
  export let focused: boolean;

  const dispatch = createEventDispatcher();
  const count = 100; // Number of tweets to fetch, those without images will be filtered out

  let status: Status = Status.LOADED;
  let lastId: string;
  let firstId: string;
  let images: ReferenceImage[] = [];

  const cacheStorageKey = `sns-manager-twitter-ref-cache-${user}`;
  const cacheSize = 30;

  const removeUser = () => dispatch("remove");
  const toggleFocus = () => (focused ? dispatch("unfocus") : dispatch("focus"));

  onMount(() => {
    loadFromCache();
    loadTweetsForUser(user, null, firstId, false);
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
        maxId: max ?? undefined,
        sinceId: since ?? undefined,
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

      if (
        !lastId ||
        last.tweetId.length < lastId.length ||
        last.tweetId.localeCompare(lastId) < 0
      ) {
        lastId = last.tweetId;
      }

      const newFirst = x.images[0].tweetId;
      if (
        !firstId ||
        newFirst.length > firstId.length ||
        newFirst.localeCompare(firstId) > 0
      ) {
        firstId = newFirst;
      }

      const loadedImages = x.images.map((i) => ({
        image: i.mediaUrl,
        link: i.link,
      }));

      if (max == null) {
        images = [...loadedImages, ...images];
      } else {
        images = [...images, ...loadedImages];
      }
      status = Status.LOADED;
      updateCache();
    } catch (e) {
      console.error(e);
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

<Gallery
  {images}
  text={user}
  textLink={`https://twitter.com/${user}/media`}
  {status}
  {focused}
  on:remove={() => removeUser()}
  on:load={() => loadTweetsForUser(user)}
  on:toggleFocus={() => toggleFocus()}
/>
