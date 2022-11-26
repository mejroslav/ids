<script>
    export let Name = "Rick Astley";
    export let Description = "singer at ur mum";
    export let Source = "twooter";
    export let Icon = "Ikona Modrý Pták";
</script>

<button>
<div class="content">
    <div class = "text-area">
        <h2>{Name}</h2>
        <h3>{Description}</h3>
        <h4>{Source}</h4>
    </div>
    <div class = "image">
        {Icon}
    </div>
</div>
</button>


<style lang="scss">
    button {
    background-color: var(--primary-background);
    padding: 0;
    border-color: transparent;
    border-width: 6px;
    border-style: solid;
    border-radius: 0.7em;
    margin-top: 0.4em;
    width: 100%;
    height: 100%;
    //transition: background-color 1s;    // why is this so laggy???
    //transition-timing-function: linear;
    }
    button:focus {
        background-color: var(--section-border);
    }

    h2, h3, h4{
        height: fit-content;
        margin: 0;
    }
    div {
        --image-width: min(5em, 20vw);
        --result-height: 5em;
    }

    .content {
        color: var(--primary-text);
        text-align: left;
        display:grid;
        grid-template: "text-area image" var(--result-height) / 1fr var(--image-width);
        grid-gap: 5px;
        background-color: transparent;
        width: 100%;
        height: 100%;
        margin: 0.6em;
    }

    .image{
        grid-area: image;
        border-radius: 1em;
    }

    .text-area{
        grid-area: text-area;
    }


</style>