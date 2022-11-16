<!-- <script lang="ts">
  import { OAuthToken, PixivToken, TwitterToken } from "../../openapi";
  import PinterestInfo from "src/lib/PinterestInfo.svelte";
  import RedditInfo from "src/lib/RedditInfo.svelte";
  import TwitterInfo from "src/lib/TwitterInfo.svelte";
  import PixivInfo from "src/lib/PixivInfo.svelte";
  import TokenContainer from "src/lib/forms/TokenContainer.svelte";

  let twitterLogins: TwitterToken[] = [];
  let redditLogins: OAuthToken[] = [];
  let pixivLogins: PixivToken[] = [];
  let pinterestLogins: OAuthToken[] = [];
</script>

<div class="flex flex-col gap-8">
  {#if twitterLogins.length}
    <TokenContainer title="Twitter">
      {#each twitterLogins as login}
        <TwitterInfo token={login} />
      {/each}
    </TokenContainer>
  {/if}

  {#if redditLogins.length}
    <TokenContainer title="Reddit">
      {#each redditLogins as login}
        <RedditInfo token={login} />
      {/each}
    </TokenContainer>
  {/if}

  {#if pixivLogins.length}
    <TokenContainer title="Pixiv">
      {#each pixivLogins as login}
        <PixivInfo token={login} />
      {/each}
    </TokenContainer>
  {/if}

  {#if pinterestLogins.length}
    <TokenContainer title="Pinterest">
      {#each pinterestLogins as login}
        <PinterestInfo token={login} />
      {/each}
    </TokenContainer>
  {/if}
</div>
 -->
