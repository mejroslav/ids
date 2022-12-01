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

    import SearchResult from './SourceSearchResult.svelte';
    import TwitterSource from './TwitterSource.svelte';

      import GuyFieri from "./TwitterSource.svelte"; //Delete later
  </script>  

<div class = "invisibleBox" on:click={_onCancel} on:keydown={()=>{}}>
    <div class= "content">
        <div>
            <input
            class = "searchbar"
            placeholder="Search URLs, Twitter handles, Spotify authors…"
            bind:this={searchBar}
            type="text"
              bind:value
              on:keydown={e => {
                  if(e.code === "Enter") _onOkay();
              }} />
          </div>

        <div class="results">

            <SearchResult/>

            <TwitterSource  Name = "Guy Fieri" Handle = "@fieriman" Bio = "A man with really cool hair that is kinda dark at the bottom but gets rly cool like whoosh blonde at the tips kinda looks like a fire but yellow yknow maybe a piss fire or something hold on is that why his name is Fieri I mean he is a guy too that can't be a conicnidence" />
        </div>
      
        <div>
            <button 
            class="cancelButton"
            on:click={_onCancel}>
                Cancel
            </button>
        </div>
    </div>
</div>

<style>      
    input {
          width: 100%;
      }
    
    .content {
        color: var(--primary-text);
        height: fit-content;
        border-radius: 0.7em;
        background-color: transparent;
        padding: 10px;
    }

    .invisibleBox {
        height: 70vh;
    }

    .searchbar {
        background-color: var(--primary-background);
        color: var(--primary-text);
        padding: 0.5em;
        border-radius: 0.7em;
        box-sizing: border-box; /* this is what makes the input actually as wide as it should be; otherwise it sizes itself such that its *content* is 'width' wide */
    }
    
    .cancelButton {
        border-radius: 0.7em;
        border-color: transparent;
        color: var(--primary-text);
        margin-top: 1em;
        background-color: var(--primary-background);
    }
    .cancelButton:focus {
        background-color: var(--accent);
    }

  </style>