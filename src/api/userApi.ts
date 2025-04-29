import api from "../lib/api";
import { API_ENDPOINTS } from "../lib/api.config";
import LoginRequest from "../model/loginRequest.model";
import User from "../model/user.model";

export const loginUser = (credentials: LoginRequest) =>
  api.post(API_ENDPOINTS.LOGIN, credentials);

export const getUserList = () => api.get(API_ENDPOINTS.GET_USER_LIST);

export const getUserById = (id: number) =>
  api.get(`${API_ENDPOINTS.GET_USER}/${id}`);

export const createUser = (userData: User) =>
  api.post(API_ENDPOINTS.CREATE_USER, userData);

export const deleteUser = (id: number) =>
  api.delete(`${API_ENDPOINTS.DELETE_USER}/${id}`);

export const getEmployeesByDepartment = (department: string) =>
  api.get(`${API_ENDPOINTS.GET_EMPLOYEES_BY_DEPARTMENT}/${department}`);

export const searchUsers = (keyword: string) =>
  api.get(`${API_ENDPOINTS.GET_USERS_BY_KEYWORD}?keyword=${keyword}`);
