export interface Comment {
    userID: string;
    text: string;
    likes: any[];
    _id: string;
}

export interface Blog {
    _id: string;
    title: string;
    text: string;
    userID: string;
    likes: string[];
    comments: Comment[];
    __v: number;
}
