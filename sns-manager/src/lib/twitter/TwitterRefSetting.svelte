<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";

  let newUser = "";

  const dispatch = createEventDispatcher();

  const addUser = (ev: KeyboardEvent) => {
    if (ev.key == "Enter") {
      dispatch("add", { user: newUser });
      newUser = "";
    }
  };
</script>

<h1 class="font-bold text-xl">Twitter</h1>

<input
  class="border"
  bind:value={newUser}
  placeholder="add user"
  on:keydown={addUser}
/>
