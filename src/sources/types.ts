export interface Item {
    title: string;
    content: string;
    author: Author;
    published: Date;
}

export interface Author {
    profileImage: URL;
    title: string;
}

export interface StreamOptions {
    filter: any;
}

export interface Source {

}
