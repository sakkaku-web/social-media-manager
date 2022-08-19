<script lang="ts">
  import Button from "../components/Button.svelte";
  import ExternalLink from "../components/ExternalLink.svelte";

  export let url: string = "";
  export let loading = false;
</script>

<form class="flex flex-col gap-4" on:submit|preventDefault disabled={loading}>
  <slot />

  <Button type="submit" disabled={loading}>Submit</Button>

  {#if url}
    <ExternalLink {url}>Open Tweet</ExternalLink>
  {/if}
</form>
