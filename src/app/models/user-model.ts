export interface UserModel {
    id: number;
    name: string;
    email: string;
    created_date: Date;
    last_login_date: Date;
    role?: string;
    avatarUrl?: string;
}
