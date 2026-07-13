export interface UserModel {
    id: number;
    name: string;
    email: string;
    created_date: Date;
    last_login_date: Date;
    role_name?: string;
    avatarUrl?: string;
}
