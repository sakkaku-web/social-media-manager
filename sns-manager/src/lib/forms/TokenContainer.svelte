<script lang="ts">
  import { Configuration } from "../../openapi";
  import type { TokenType } from "src/storage";

  export let title: "Twitter" | "Reddit" | "Pixiv" | "Pinterest";
  export let tokens: TokenType;

  const api = new TwitterApi(
    new Configuration({
      basePath: env.apiBase,
      username: token.accessToken,
      password: token.accessSecret,
    })
  );
</script>

<div class="flex flex-col gap-2">
  <h1 class="font-bold">{title}</h1>
  <div class="flex flex-row gap-4">
    <slot />
  </div>
</div>
