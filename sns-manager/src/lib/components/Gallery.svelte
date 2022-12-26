<script lang="ts">
  import type { ReferenceImage } from "../models";
  import ImageView from "./ImageView.svelte";

  export let images: ReferenceImage[] = [];

  let openImage: ReferenceImage;
  let elem: HTMLElement;

  $: height = elem?.offsetWidth * 1.1;
</script>

<div class="flex flex-col" bind:this={elem}>
  {#each images as image}
    <button
      class="w-full bg-cover"
      style={`background-image: url(${image.image}); height: ${height}px`}
      on:click={() => (openImage = image)}><!--Empty --></button
    >
  {/each}
</div>

{#if openImage}
  <ImageView image={openImage} on:close={() => (openImage = undefined)} />
{/if}
