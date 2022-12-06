<script lang="ts">
  import { TimeFeed } from "../sources/TimeFeed";
  import { RssSource } from "../sources/RssSource";
  import { consumeAsync } from "../utils/array";

  const urls = [
    "https://www.zive.cz/rss/sc-47/",
    "https://www.aktualne.cz/mrss/",
  ];
  const source = new TimeFeed(
    urls.map((_) => new URL(_)).map((_) => new RssSource(_))
  );

  const posts = consumeAsync(source);
  console.log('posts', posts);
</script>

<ul class="feed">
  {#await posts}
    <p>Chvíli strpení prosím.</p>
  {:then awaitedPosts}
    {#each awaitedPosts as post}
      <li class="post">
        <img
          src={post.author.profileImage.href}
          alt="post.author.profileImage"
        />
        <h2>{post.title}</h2>
        <p class="date">{post.published.toLocaleString("cs", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
        <p class="content">{post.content}</p>
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
      "logo date" max-content
      "logo content" max-content / 2.2rem 1fr;
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
      font-size: 1.1rem;
      color: var(--primary-text);
    }

    .date {
      grid-area: date;
      font-size: 0.8rem;
      margin-bottom: 0.5rem;
    }

    .content {
      grid-area: content;
    }
  }
</style>
