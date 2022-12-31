<script lang="ts">
  import { removeLoginToken, updateLoginToken } from "../../storage";
  import { createEventDispatcher, onMount } from "svelte";
  import type { Token } from "../auth";
  import FocusContainer from "../components/FocusContainer.svelte";
  import Gallery from "../components/Gallery.svelte";
  import type { ReferenceImage } from "../models";
  import { PinterestClient } from "./pinterest";

  export let token: Token;
  export let focused: string;

  let items: ReferenceImage[] = [];
  let username: string;

  const focusPrefix = "pinterest-";
  const dispatch = createEventDispatcher();
  const api = new PinterestClient(token.token);

  $: isFocused = focused == null ? null : focused === focusPrefix + username;

  onMount(async () => {
    await loadUserData(token);

    if (username) {
      items = await api.getPinsOfBoard();
    }
  });

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
      console.log("Refreshing pinterest token");
      const newToken = await api.refreshToken(token.refreshToken);
      if (newToken) {
        token = updateLoginToken(token, newToken, "pinterest");
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
    removeLoginToken(token, "pinterest");
    dispatch("refresh");
  };
</script>

<FocusContainer focused={isFocused}>
  {#if username}
    <Gallery
      images={items}
      text={"Pinterest: " + username}
      textLink={`https://reddit.com/u/${username}/upvoted`}
      focused={isFocused}
      on:toggleFocus={() => toggleFocus()}
    />
  {/if}
</FocusContainer>
