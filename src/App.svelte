<script lang="ts">
  import { createComponentValueStore } from "./componentValueStore";
  import { dojoStore } from "./stores";
  import { derived } from "svelte/store";

  $: ({ clientComponents, torii, burnerManager, client } = $dojoStore);

  $: entity = derived(dojoStore, ($store) =>
    $store
      ? torii.poseidonHash([burnerManager.getActiveAccount()?.address!])
      : undefined
  );

  $: position = createComponentValueStore(clientComponents.Position, entity);
</script>

<main>
  {#if $dojoStore}
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
