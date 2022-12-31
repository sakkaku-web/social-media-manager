<script lang="ts">
  import { removeLoginToken, updateLoginToken } from "../../storage";
  import { createEventDispatcher, onMount } from "svelte";
  import type { Token } from "../auth";
  import Gallery from "../components/Gallery.svelte";
  import type { ReferenceImage } from "../models";
  import { RedditClient } from "./reddit";
  import FocusContainer from "../components/FocusContainer.svelte";

  export let token: Token;
  export let focused: string;

  let items: ReferenceImage[] = [];
  let username: string;

  const focusPrefix = "reddit-";
  const dispatch = createEventDispatcher();
  const api = new RedditClient(token.token);

  $: isFocused = focused == null ? null : focused === focusPrefix + username;

  onMount(async () => {
    await loadUserData(token);

    if (username) {
      items = await api.getUpvoted(username);
    }
  });

  const toggleFocus = () => {
    if (focused) {
      dispatch("unfocus");
    } else {
      dispatch("focus", { username: focusPrefix + username });
    }
  };

  const loadUserData = async (token: Token) => {
    const user = await api.getUser();
    if (user == null) {
      await tryRefreshToken(token);
    } else {
      username = user.name;
    }
  };

  const tryRefreshToken = async (token: Token) => {
    if (token.refreshToken) {
      console.log("Refreshing reddit token");
      const newToken = await api.refreshToken(token.refreshToken);
      if (newToken) {
        token = updateLoginToken(token, newToken, "reddit");
        if (token) {
          dispatch("refresh");
        } else {
          console.log("Failed to read token");
          removeToken();
        }
      } else {
        console.log("Failed to get new token. Removing current token");
        removeToken();
      }
    }
  };

  const removeToken = () => {
    removeLoginToken(token, "reddit");
    dispatch("refresh");
  };
</script>

<FocusContainer focused={isFocused}>
  {#if username}
    <Gallery
      images={items}
      text={"Reddit: " + username}
      textLink={`https://reddit.com/u/${username}/upvoted`}
      focused={isFocused}
      on:toggleFocus={() => toggleFocus()}
    />
  {/if}
</FocusContainer>
