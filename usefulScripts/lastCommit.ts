import { Commit, GITHUB_URL } from "./github-utils.ts";


/**
 * Provede operaci, pokud není input undefined.
 * @param value - hodnota, která může být undefined
 * @param mapFn - funkce, která se má provést, pokud hodnota není undefined
 * @returns výsledek funkce anebo undefined
 */
function ifDefined<T, S>(value: T | undefined, mapFn: (v: T) => S | undefined): S | undefined {
    return value === undefined ? undefined : mapFn(value);
}


/**
 * Formátuje datum do českého formátu.
 */
function formatDate(d: Date) {
    return d.toLocaleDateString('cs-CZ', {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    });
}

const response = await fetch(GITHUB_URL); // GET is the default method
const commits: Commit[] = await response.json(); // read response body and parse as JSON

const lastCommit = commits[0];
const authorName = lastCommit.commit.author?.name ?? "Unknown Author";
const authorEmail = lastCommit.commit.author?.email ?? "Unknown Email";

const commitDate = lastCommit.commit.author?.date;
const commitDateParsed = ifDefined(commitDate, d => new Date(d));
const commitDateFormatted = ifDefined(commitDateParsed, d => formatDate(d)) ?? "Unknown Date";

const message =
`Last Commit: 
    date: ${commitDateFormatted}
    author: ${authorName}
    email: ${authorEmail}
`;

console.log(message);
