<!--Pop up modal to look up a source for the rss feed-->

<script lang="ts">
    import { text } from 'stream/consumers';
    import { getContext } from 'svelte';
      export let hasForm = false;
      export let onCancel = () => {};
      export let onOkay = (x:string) => {};
      
      let value;
      let onChange = (x:string) => {};
      
      function _onCancel() {
          onCancel();
          close();
      }
      
      function _onOkay() {
          onOkay(value);
          close();
      }
      
      $: onChange(value)
  </script>
  
  <style>
      
      input {
          width: 100%;
      }
      
      .buttons {
          display: flex;
          justify-content: space-between;
      }
      
      .hidden {
          display: none;
      }
  </style>
  
  {#if hasForm}
  <div>
      <input
      type="text"
        bind:value
        on:keydown={e => {
            if(e.code === "Enter") _onOkay();
        }} />
    </div>
  {/if}
  
  <div class="buttons">
      <button on:click={_onCancel}>
          Cancel
      </button>
      <button on:click={_onOkay}>
          Okay
      </button>
  </div>