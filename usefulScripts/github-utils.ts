export const GITHUB_URL = 'https://api.github.com/repos/m93a/ids/commits';

export interface Commit {
    sha: string;
    node_id: string;
    commit: {
        author?: Author;
        comitter: Author;
        message: string;
        tree: { sha: string; url: string; };
        url: string;
        comment_count: number;
        verification: { verified: boolean; reason: string; signature: any; payload: any; };
    }
    url: string;
    author?: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        url: string;
    }
}

export interface Author {
    name: string;
    email: string;
    date: string;
}