import { IUser } from "../IUser";

export interface AuthResponse {
    user: {
        email: string;
        role: string;
        isActivated: boolean;
        id: string;
    };
    accessToken: string;
    refreshToken: string;
}
