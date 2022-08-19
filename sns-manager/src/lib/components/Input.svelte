<script lang="ts">
  export let value: string;
  export let disabled: boolean = false;
  export let required: boolean = false;
  export let placeholder: string = "";
  export let name: string = "";
  export let password: boolean = false;
</script>

{#if password}
  <input
    class="bg-white border py-1 px-2 disabled:bg-gray-200"
    type="password"
    {name}
    {disabled}
    {required}
    {placeholder}
    bind:value
  />
{:else}
  <input
    class="bg-white border py-1 px-2 disabled:bg-gray-200"
    type="text"
    {name}
    {disabled}
    {required}
    {placeholder}
    bind:value
  />
{/if}
