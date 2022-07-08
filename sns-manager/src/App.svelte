<script lang="ts">
  import "./global.css";
  import LoginButton from "./lib/LoginButton.svelte";
</script>

<main class="h-full flex flex-col items-center">
  <div class="flex flex-row gap-4 font-bold">
    <LoginButton provider="Reddit" />
    <LoginButton provider="Twitter" />
    <LoginButton provider="Pixiv" />
  </div>
</main>

<style>
</style>
