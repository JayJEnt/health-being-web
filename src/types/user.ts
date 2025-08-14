export interface UserBaseModel {
    username: string;
    email: string;
}

export interface UserCreate extends UserBaseModel {
    password: string;
}

export interface User extends UserBaseModel {
    id: number;
    role: string;
}
