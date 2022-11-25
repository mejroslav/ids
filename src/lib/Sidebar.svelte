<script>
import SourcesModal from './SourcesModal.svelte';

import { getContext } from 'svelte';
const { open } = getContext('simple-modal');  
const showSourcesModal = () => open(SourcesModal);
</script>


<p>This is the sidebar.</p>
<button 
class="button"
on:click={showSourcesModal}
>+</button>
