<!--Pop up modal to look up a source for the rss feed-->
<!--suggest results via on change colorcode sources (actuall import sources from somewhere)-->

<script lang="ts">
    import { getContext, onMount } from 'svelte';
      const { close } = getContext('simple-modal') as any;
      export let onCancel = () => {};
      export let onOkay = (x:string) => {};
      
      let searchBar:HTMLInputElement;
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
      onMount(() => searchBar.focus());
      
      $: onChange(value)

      import SearchResult from './SearchResult.svelte';
  </script>
  
  <style>      
    input {
          width: 100%;
      }
    
    .content {
        height: fit-content;
        border-radius: 0.7em;
        background: white;
        padding: 10px;
    }

    .invisibleBox {
        height: 70vh;
    }

  </style>
  

<div class = "invisibleBox">
    <div class= "content">  
        <div>
            <input
            bind:this={searchBar}
            type="text"
              bind:value
              on:keydown={e => {
                  if(e.code === "Enter") _onOkay();
              }} />
          </div>

        <div class="results">
            <SearchResult/>
        </div>
      
        <div>
            <button on:click={_onCancel}>
                Cancel
            </button>
        </div>
    </div>
</div>