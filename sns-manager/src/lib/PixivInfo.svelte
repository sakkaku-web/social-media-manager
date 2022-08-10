<script lang="ts">
  import { PixivToken, User } from "../openapi";

  export let token: PixivToken;
</script>

<a href={`https://www.pixiv.net/users/${token.userId}`} target="_blank"
  >{token.name}</a
>
