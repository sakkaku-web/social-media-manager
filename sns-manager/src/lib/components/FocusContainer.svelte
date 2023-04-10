<script lang="ts">
  export let focused: boolean | null;

  $: showContainer = focused || focused == null;
</script>

<div class={`basis-full ${showContainer ? "flex" : "hidden"}`}>
  <slot />
</div>
