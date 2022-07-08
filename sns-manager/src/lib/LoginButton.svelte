<script lang="ts">
  import LoginIcon from "svelte-icons/io/IoMdLogIn.svelte";
  import env from "../environment";

  export let provider: string;

  const buildURL = () => {
    return `${env.apiBase}/api/${provider.toLowerCase()}/auth`;
  };
</script>

<a href={buildURL()} class="flex flex-row items-center">
  <div class="w-4 h-4">
    <LoginIcon />
  </div>
  {provider}
</a>
