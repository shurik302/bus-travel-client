import React from "react";
import { makeAutoObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export default class Store {
  user: IUser = this.getInitialUser();
  isAuth = !!localStorage.getItem('accessToken');
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private getInitialUser(): IUser {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user && user.email ? user : { email: '', role: '', isActivated: false, id: '' };
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return { email: '', role: '', isActivated: false, id: '' };
    }
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string): Promise<AuthResponse | null> {
    this.setLoading(true);
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      return null;
    } finally {
      this.setLoading(false);
    }
  }

  async registration(email: string, password: string): Promise<AuthResponse | null> {
    this.setLoading(true);
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      return null;
    } finally {
      this.setLoading(false);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      this.setAuth(false);
      this.setUser({ email: '', role: '', isActivated: false, id: '' });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      // Реальний запит для перевірки токенів або оновлення сесії
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        // Можливо, тут буде запит до сервера для підтвердження токена
        this.setAuth(true);
      } else {
        this.setAuth(false);
        this.setUser({ email: '', role: '', isActivated: false, id: '' });
      }
    } catch (error) {
      console.error('Error during checkAuth:', error);
      this.setAuth(false);
      this.setUser({ email: '', role: '', isActivated: false, id: '' });
    } finally {
      this.setLoading(false);
    }
  }
}

export const store = new Store();
export const StoreContext = React.createContext(store);