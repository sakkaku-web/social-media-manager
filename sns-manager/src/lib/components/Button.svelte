<script lang="ts">
  export let disabled = false;
  export let type = "button";
</script>

<button
  class="disabled:text-gray-500 font-semibold border p-2 rounded"
  on:click
  {disabled}
  {type}><slot /></button
>
