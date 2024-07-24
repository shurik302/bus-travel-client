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
  user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
  isAuth = !!localStorage.getItem('accessToken');
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
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
      localStorage.clear(); // Clear all localStorage
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      this.setAuth(true);
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
