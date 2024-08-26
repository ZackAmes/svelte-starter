<script lang="ts">
  import { createComponentValueStore } from "./componentValueStore";
  import { setupStore } from "./main";
  import { derived } from "svelte/store";

  $: ({ clientComponents, torii, burnerManager, client } = $setupStore);

  $: entity = derived(setupStore, ($store) =>
    $store
      ? torii.poseidonHash([burnerManager.getActiveAccount()?.address!])
      : undefined
  );

  $: position = createComponentValueStore(clientComponents.Position, entity);
</script>

<main>
  {#if $setupStore}
    <p>Setup completed</p>
  {:else}
    <p>Setting up...</p>
  {/if}

  <button
    on:click={async () => {
      const account = burnerManager.getActiveAccount();
      if (account) {
        await client.actions.spawn({ account });
      } else {
        console.error("No active account found");
      }
    }}>spawn</button
  >

  <div>
    {$position?.vec.x}
  </div>
</main>
