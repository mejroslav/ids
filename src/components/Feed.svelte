<script lang="ts">
    import { rssToItems } from "../sources/extractSources";
    const testURL = "https://www.aktualne.cz/mrss/";

    const posts = rssToItems(testURL);
</script>

<ul class="feed">
    {#await posts}
        <p>Chvíli strpení prosím.</p>
    {:then awaitedPosts}
        {#each awaitedPosts as post}
            <li class="post">
                <img src={post.author.profileImage.href} alt="post.author.profileImage" />
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </li>
        {/each}
    {/await}
</ul>

<style lang="scss">
    .feed {
        display: flex;
        flex-direction: column;
    }
    .post {
        display: grid;
        grid-template:
            "logo title" max-content
            "logo description" max-content / 2.2rem 1fr;
        column-gap: 1rem;

        list-style: none;
        margin: 0.5rem 5rem;
        padding: 1rem;

        background-color: var(--secondary-background);
        border: 1px solid var(--section-border);
        border-radius: var(--primary-radius);

        color: var(--secondary-text);

        img {
            grid-area: logo;
            height: 2.2rem;
            border-radius: 50%;
        }
        h2 {
            grid-area: title;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            color: var(--primary-text);
        }

        p {
            grid-area: description;
        }
    }
</style>
