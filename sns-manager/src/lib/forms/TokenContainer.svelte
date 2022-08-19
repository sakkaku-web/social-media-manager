<script lang="ts">
  export let title: string;
</script>

<div class="flex flex-col gap-2">
  <h1 class="font-bold">{title}</h1>
  <div class="flex flex-row gap-4">
    <slot />
  </div>
</div>
