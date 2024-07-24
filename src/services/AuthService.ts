import $api from "../http"; // Импортуйте ваш настроєний екземпляр axios
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import axios from "axios";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            const response = await $api.post<AuthResponse>("/login", { email, password });
            localStorage.setItem('role', response.data.user.role);
            localStorage.setItem('accessToken', response.data.accessToken);
            document.cookie = `refreshToken=${response.data.refreshToken};path=/;secure;HttpOnly`;
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data?.message || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            throw error;
        }
    }
    

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        try {
            const response = await $api.post<AuthResponse>("/registration", { email, password });
            localStorage.setItem('role', response.data.user.role);
            document.cookie = `token=${response.data.accessToken};path=/;secure;HttpOnly`;
            return response;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data?.message || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            throw error;
        }
    }

    static async logout(): Promise<void> {
        try {
            await $api.post("/logout");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            document.cookie = 'token=; Max-Age=0; path=/; secure; HttpOnly';
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data?.message || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            throw error;
        }
    }

    static async activate(link: any) {
        try {
            return axios.get(`${process.env.API_URL}/activate/${link}`);
        } catch (e) {
            console.error(e);
        }
    }

    static async refresh() {
        try {
            return $api.get('/refresh', { withCredentials: true });
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("Error response:", error.response?.data?.message || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            throw error;
        }
    }
}
