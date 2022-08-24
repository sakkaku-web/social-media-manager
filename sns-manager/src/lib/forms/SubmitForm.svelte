<script lang="ts">
  import Button from "../components/Button.svelte";
  import ExternalLink from "../components/ExternalLink.svelte";

  export let submitFn: () => Promise<string> = async () => null;
  export let loading = false;

  let submittedUrl: string;
  let error = false;

  const submit = async () => {
    try {
      loading = true;
      error = false;
      submittedUrl = "";

      submittedUrl = await submitFn();
    } catch (e) {
      error = true;
    } finally {
      loading = false;
    }
  };
</script>

<form
  class="flex flex-col gap-4"
  on:submit|preventDefault={() => submit()}
  disabled={loading}
>
  <slot />

  <Button type="submit" disabled={loading}>Submit</Button>

  {#if submittedUrl}
    <ExternalLink url={submittedUrl}>Open Post</ExternalLink>
  {/if}

  {#if error}
    <span class="text-red-500">Failed to submit</span>
  {/if}
</form>
