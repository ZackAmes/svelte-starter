<script lang="ts">
  import { setupStore } from "./main";
  import { getComponentValue } from "@dojoengine/recs";

  // Destructure the objects you need from the store
  $: ({ client, burnerManager, clientComponents, torii } = $setupStore);

  let position;
  $: {
    if (clientComponents && clientComponents.Position) {
      position = getComponentValue(
        clientComponents.Position,
        torii.poseidonHash([burnerManager.getActiveAccount()?.address!])
      );
    } else {
      position = null;
    }
  }
</script>

<main>
  {#if $setupStore}
    <p>Setup completed</p>
  {:else}
    <p>Setting up...</p>
  {/if}

  <button
    on:click={async () =>
      await client.actions.spawn({ account: burnerManager.getActiveAccount() })}
    >spawn</button
  >

  <div>
    {position.vec.x}
  </div>
</main>
