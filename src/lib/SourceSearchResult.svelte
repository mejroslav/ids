<script>

    export let Name = "Source Name";
    export let Description = "lengthy source description that tries to describe the source at great length";
    export let Source = "Name of the site whence the source is from";

    import TemplateIcon from "./IconComponents/TemplateIcon.svelte";

    export let Icon = TemplateIcon;

</script>

<button>
<div class="content">
    <div class = "text-area">
        <h2>{Name}</h2>
        <h3>{Description}</h3>
        <h4>{Source}</h4>
    </div>
    <div class = "icon">
        <Icon/>
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
    h3 {
        font-weight: normal;
        font-size: normal;
    }
    h4 {
        font-weight: lighter;
        font-size: small;
    }
    div {
        --image-width: min(5em, 20vw);
        --result-height: 5em;
    }

    .content {
        color: var(--primary-text);
        text-align: left;
        display:grid;
        grid-template: "text-area icon" var(--result-height) / 1fr var(--image-width);
        grid-gap: 5px;
        background-color: transparent;
        width: 100%;
        height: 100%;
        margin: 0.6em;
    }

    .icon{
        grid-area: icon;
        border-radius: 1em;
        display: flex;
        align-items: center;
    }

    .text-area{
        grid-area: text-area;
    }


</style>