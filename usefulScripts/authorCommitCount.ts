import { Commit, GITHUB_URL } from "./github-utils.ts";

const response = await fetch(GITHUB_URL); // GET is the default method
const commits: Commit[] = await response.json(); // read response body and parse as JSON
const authors = commits.map(x => x.author?.login)


const authorsWithCommits = new Map<string | undefined, number>();
for (const name of authors) {
    const numOfCommits = authorsWithCommits.get(name) ?? 0;
    authorsWithCommits.set(name, numOfCommits + 1);
}

console.log([...authorsWithCommits.entries()].map(([author, num]) => `${author} made ${num} commits`).join("\n"));
