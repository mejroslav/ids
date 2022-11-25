<script>

import SourcesModal from './SourcesModal.svelte';

import { getContext } from 'svelte';
const { open } = getContext('simple-modal');  
const showSourcesModal = () => open(SourcesModal, {hasForm: true});
</script>


<p>This is the sidebar.</p>
<button 
on:click={showSourcesModal}
>Press me</button>
