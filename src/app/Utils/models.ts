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
    categories: string[];
    readingTime: number;
    tags: dropDownmodel[];
    description: string;
    content: string;
    featuredImage: File;
}

export class CommentModel {
    user: string;
    comment: string;
}
export class dropDownmodel {
    value: string;
    text: string;
}