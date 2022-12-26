<script lang="ts">
  import type { ReferenceImage } from "../models";

  export let images: ReferenceImage[] = [];
</script>

<div class="flex flex-col">
  {#each images as image}
    <a
      href={image.link}
      target="_blank"
      class="w-full h-[15vh] bg-cover"
      style={`background-image: url(${image.image})`}><!--Empty --></a
    >
  {/each}
</div>
