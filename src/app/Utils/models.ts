export class LoginRequest {
    email: string;
    password: string;
}

export class SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    rePassword: string;
}

export class ArticleModel {
    user: string;
    title: string;
    categories: string = "0";
    readingTime: number;
    tags: string;
    description: string;
    content: string;
}

export class CommentModel {
    user: string;
    comment: string;
}