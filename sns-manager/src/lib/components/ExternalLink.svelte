<script lang="ts">
  export let url: string;
</script>

<a href={url} class="text-blue-900 hover:underline" target="_blank">
  <slot />
</a>
