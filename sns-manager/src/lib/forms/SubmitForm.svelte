<script lang="ts">
  import Button from "../components/Button.svelte";

  export let url: string = "";
  export let loading = false;
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault disabled={loading}>
  <slot />

  <Button type="submit" disabled={loading}>Submit</Button>

  {#if url}
    <a href={url} target="_blank">Open tweet</a>
  {/if}
</form>
