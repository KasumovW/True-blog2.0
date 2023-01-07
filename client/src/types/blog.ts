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
    image?: string;
    user: {
        _id: string;
        login: string;
        avatar: string;
        password: string;
        role: string;
        posts: string[];
        likes: string[];
        comments: string[];
        createdAt: string;
    }
    likes: string[];
    comments: Comment[];
    __v: number;
}
