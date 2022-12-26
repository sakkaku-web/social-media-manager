<script lang="ts">
  import env from "../../environment";
  import { onMount } from "svelte";
  import { Configuration, TwitterApi } from "../../openapi";
  import TwitterUserRef from "./TwitterUserRef.svelte";

  const api = new TwitterApi(new Configuration({ basePath: env.apiBase }));

  const userListKey = "sns-manager-twitter-reference-users";

  let users: string[] = [];
  let newUser = "";

  onMount(async () => {
    users = JSON.parse(localStorage.getItem(userListKey) || "[]");
  });

  const addUser = (ev: KeyboardEvent) => {
    if (ev.key == "Enter") {
      users = [...users, newUser];
      localStorage.setItem(userListKey, JSON.stringify(users));
      newUser = "";
    }
  };

  const removeUser = (user: string) => {
    users = users.filter((u) => u !== user);
    localStorage.setItem(userListKey, JSON.stringify(users));
  };
</script>

<div class="flex flex-col gap-2">
  <h1 class="font-bold text-xl">Twitter</h1>

  <input bind:value={newUser} placeholder="add username" on:keydown={addUser} />

  {#each users as user}
    <TwitterUserRef {api} {user} on:remove={() => removeUser(user)} />
  {/each}
</div>
