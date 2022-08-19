<script lang="ts">
  export let files: Blob[];
  export let label = "";
  export let accept = "";
  export let disabled = false;

  const id = label.replaceAll(" ", "-");

  let fileList: FileList;

  $: {
    files = Array.from(fileList || []);
  }
</script>

<div class="flex flex-row gap-2">
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <input {id} type="file" bind:files={fileList} multiple {accept} {disabled} />
</div>
