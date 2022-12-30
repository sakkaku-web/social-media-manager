<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { ReferenceImage, Status } from "../models";
  import ImageView from "./ImageView.svelte";
  import ExternalLink from "./ExternalLink.svelte";

  export let images: ReferenceImage[] = [];
  export let status = Status.FINISHED;
  export let focused = false;
  export let text = "";
  export let textLink = "";

  const dispatch = createEventDispatcher();

  let openImage: ReferenceImage;
  let elem: HTMLElement;

  // Keep size after initialized
  $: width = elem?.offsetWidth;
  $: height = elem?.offsetWidth * 1.1;
</script>

<div class="flex flex-col gap-2 grow">
  <div class="flex justify-between p-2">
    <div class="flex gap-2">
      {#if textLink}
        <ExternalLink url={textLink}>{text}</ExternalLink>
      {:else}
        <span> {text}</span>
      {/if}
      <button class="font-bold" on:click={() => dispatch("toggleFocus")}
        >v</button
      >
    </div>

    {#if !focused}
      <button class="font-bold" on:click={() => dispatch("remove")}>x</button>
    {/if}
  </div>
  <div class="flex flex-wrap" bind:this={elem}>
    {#each images as image}
      <button
        class="w-full bg-cover"
        style={`background-image: url(${image.image}); height: ${height}px; width: ${width}px`}
        on:click={() => (openImage = image)}><!--Empty --></button
      >
    {/each}
  </div>

  <div class="flex flex-col items-center text-gray-500 text-sm text-center">
    {#if status == Status.LOADED}
      <button class="p-8" on:click={() => dispatch("load")}>Load More...</button
      >
    {:else if status == Status.LOADING}
      <div class="p-8">LOADING</div>
    {:else if status == Status.ERROR}
      <div class="p-8 text-red-600">Error loading the data</div>
    {/if}
  </div>
</div>

{#if openImage}
  <ImageView image={openImage} on:close={() => (openImage = undefined)} />
{/if}
