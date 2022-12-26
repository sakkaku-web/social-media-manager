<script lang="ts">
  import type { ReferenceImage } from "../models";

  export let images: ReferenceImage[] = [];

  let elem: HTMLElement;

  $: height = elem?.offsetWidth * 1.1;
</script>

<div class="flex flex-col" bind:this={elem}>
  {#each images as image}
    <a
      href={image.link}
      target="_blank"
      class="w-full bg-cover"
      style={`background-image: url(${image.image}); height: ${height}px`}
      ><!--Empty --></a
    >
  {/each}
</div>
