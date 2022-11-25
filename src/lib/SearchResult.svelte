<script>
    export let Name = "Rick Astley";
    export let Description = "singer at ur mum";
    export let Source = "twooter";
</script>

<div class="content">
    <div class = "image">
        Modrý<br>
        Pták
    </div>
    <div class = "description">
        <h2>{Name}</h2>
        <h3>{Description}</h3>
        <h4>{Source}</h4>
    </div>
</div>

<style lang="scss">
    h2, h3, h4{
        height: fit-content;
        margin: 0;
    }
    div {
        --image-width: 3em;//min(5em, 0.2vw);
    }

    .content {
        display:grid;
        grid-template: "image description" 5em/ var(--image-width) 1fr;
        grid-gap: 5px;
    }

    .image{
        grid-area: image;
    }

    .description{
        grid-area: description;
    }
</style>