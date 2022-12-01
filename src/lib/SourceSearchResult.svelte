<script>

    export let Name = "Source Name";
    export let Description = "lengthy source description that tries to describe the source at great length";
    export let Source = "Name of the site whence the source is from";
    export let Handle = "";

    import TemplateIcon from "./IconComponents/TemplateIcon.svelte";

    export let Icon = TemplateIcon;

</script>

<button>
<div class="content">
    <div class = "text-area">
        <div class = "Name">{Name}</div> <div class="Handle">{Handle}</div> 
        <div class = "Description">{Description}</div>
        <div class="Source">{Source}</div>
    </div>
    <div class = "icon">
        <Icon/>
    </div>
</div>
</button>


<style lang="scss">
    div {
        --image-width: min(8em, 20vw);
    }

    button {
    background-color: var(--primary-background);
    padding: 0;
    border-color: transparent;
    border-width: 6px;
    border-style: solid;
    border-radius: 0.7em;
    margin-top: 0.4em;
    width: 100%;
    height: fit-content;
    //transition: background-color 1s;    // why is this so laggy???
    //transition-timing-function: linear;
    }
    button:focus {
        background-color: var(--section-border);
    }

    .content {
        color: var(--primary-text);
        text-align: left;
        display:grid;
        grid-template: "text-area icon" 1fr / 1fr var(--image-width);
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
        justify-content: center;

    }

    .text-area{
        grid-area: text-area;
    }

    .Name{
        display: inline;
        font-size: 25px;
        font-weight: bold;
        margin-right: 0.4em;
    }
    .Handle{
        display: inline;
        font-size: small;
        font-weight: lighter;
    }
    .Description{
        text-align: justify;
        text-justify: auto;
        text-overflow: ellipsis;
        overflow: hidden;
        margin: 7px 0px 7px 0px;
        --max-result-height: 5em;
        //height: var(--max-result-height);
    }

    .Source{
        font-size: small;
        font-weight: lighter;
    }


</style>