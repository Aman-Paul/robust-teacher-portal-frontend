import apiClient from '../apiClient';
import { SignIn } from '../interfaces/index';

export const signIn = async (data: Partial<SignIn>): Promise<any> => {
  try {
    const response = await apiClient.post('auth/signin', data);
    return response.data;
  } catch (error) {
    console.log("error", error)
    return error;
  }
}