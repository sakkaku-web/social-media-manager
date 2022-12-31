<script lang="ts">
  export let focused: boolean | null;

  $: showContainer = focused || focused == null;
</script>

<div
  class={`${focused ? "basis-full" : "basis-1/6"} ${
    showContainer ? "flex" : "hidden"
  }`}
>
  <slot />
</div>
