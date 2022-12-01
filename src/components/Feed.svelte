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
        list-style: none;
        margin: 0.5rem 5rem;
        padding: 1rem;

        background-color: var(--secondary-background);
        border: 1px solid var(--section-border);
        border-radius: var(--primary-radius);

        color: var(--secondary-text);

        h2 {
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
            color: var(--primary-text);
        }

        p {
        }
    }
</style>
