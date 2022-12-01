<script>

    import TwitterIcon from "./IconComponents/TwitterIcon.svelte";
    import SourceSearchResult from "./SourceSearchResult.svelte";
    const Source = "Twitter";

    export let Name = "Twitter Username";
    export let Handle = "@TwitterHandle";
    export let Bio = "Twitter bio";


</script>
<SourceSearchResult Name = {Name} Handle = {Handle} Description = {Bio}  Source = {Source} Icon = {TwitterIcon}/>