<script lang="ts">
  import env from "src/environment";

  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import { OAuthToken, OAuthTokenFromJSON } from "../openapi";

  export let pixivLogins: OAuthToken[] = [];

  const loginPixiv = async () => {
    const url = `${env.apiBase}/pixiv/auth`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        // TODO: get username and password
        Authorization: `Basic ${Buffer.from("username:password").toString(
          "base64"
        )}`,
      },
    });

    if (res.status === 200) {
      const token = OAuthTokenFromJSON(await res.json());
      if (!pixivLogins.find((t) => t.accessToken === token.accessToken)) {
        pixivLogins = [...pixivLogins, token];
      }
    } else {
      console.log("Pixiv login failed");
    }
  };
</script>

<button class="flex flex-row items-center" on:click={loginPixiv}>
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  Pixiv
</button>
