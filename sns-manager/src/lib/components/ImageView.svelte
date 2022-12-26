<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { ReferenceImage } from "../models";

  export let image: ReferenceImage;

  const dispatch = createEventDispatcher();
</script>

<div
  class="fixed inset-0 flex items-center backdrop-blur justify-center"
  style="background: rgba(0,0,0,0.75)"
  on:click={() => dispatch("close")}
>
  <a href={image.link} on:click|stopPropagation target="_blank">
    <img
      src={image.image}
      alt="close up of reference"
      class="max-h-[75vh] mx-auto"
    />
  </a>
</div>
