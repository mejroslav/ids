<script lang="ts">
  import Fa from "svelte-fa";
  import {
    faBackward,
    faCirclePlay,
    faForward,
  } from "@fortawesome/free-solid-svg-icons";

  import Modal from "svelte-simple-modal";
  import Sidebar from "./lib/Sidebar.svelte";
  import Feed from "./components/Feed.svelte";
</script>

<Modal closeButton={false} styleWindow={{ background: "none" }}>
  <main>
    <Feed />
  </main>
  <aside>
    <Sidebar />
  </aside>
  <footer>
    <div class="left-footer">
      <p><a href="https://youtu.be/dQw4w9WgXcQ">Never Gonna Give You Up</a></p>
      <p><a href="https://youtu.be/dQw4w9WgXcQ">Rick Astley</a></p>
    </div>
    <div class="music-controls">
      <span class="skip-backward"><Fa icon={faBackward} /></span>
      <span class="play fa-regular"><Fa icon={faCirclePlay} /></span>
      <span class="skip-forward"><Fa icon={faForward} /></span>
    </div>
    <div class="right-footer" />
  </footer>
</Modal>

<style lang="scss">

  :global(#app) {
    display: grid;
    grid-template:
      "sidebar main" 1fr
      "footer footer" var(--footer-height) / var(--sidebar-width) 1fr;
    background: var(--primary-background);

    color: var(--primary-text);
    font-family: sans;
  }

  button {
    background-image: var(--primary-gradient);
    border: 1px solid var(--section-border);
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  aside {
    grid-area: sidebar;
    border-right: 1px solid var(--section-border);
    padding: 15px;
  }

  main {
    grid-area: main;
    padding: 15px;
    overflow-y: scroll;
  }

  footer {
    grid-area: footer;
    border-top: 1px solid var(--section-border);

    display: grid;
    grid-template: "left-footer music-controls right-footer" 1fr / 1fr max-content 1fr;

    .left-footer {
      grid-area: left-footer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 15px;
      font-size: 0.9em;

      p {
        margin: 0;
      }
    }

    .music-controls {
      grid-area: music-controls;
      display: flex;
      align-items: center;

      .play {
        font-size: 2em;
        margin: 0 10px;
        color: var(--accent);
        cursor: pointer;
      }

      .skip-backward,
      .skip-forward {
        padding-top: 3px;
        font-size: 1.3em;
        cursor: pointer;
      }
    }
  }
</style>
