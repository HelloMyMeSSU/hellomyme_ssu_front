import axios from 'axios';
import { 
  ApiResponse, 
  SignUpReqDTO, 
  SignUpResDTO,
  LoginReqDTO,
  LoginResDTO
} from '@/types/auth';

const API = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. 이메일 인증코드 발송 (/auth/email/send)
export const sendEmailCodeAPI = async (email: string) => {
  const response = await API.post<ApiResponse<null>>('/auth/email/send', { email });
  return response.data;
};

// 2. 이메일 인증코드 검증 (/auth/email/verify)
export const verifyEmailCodeAPI = async (email: string, code: string) => {
  const response = await API.post<ApiResponse<null>>('/auth/email/verify', { email, code });
  return response.data;
};

// 3. 회원가입 (/users/signup)
export const signUpAPI = async (data: SignUpReqDTO) => {
  const response = await API.post<ApiResponse<SignUpResDTO>>('/users/signup', data);
  return response.data;
};

// 4. 로그인 (/users/login)
export const loginAPI = async (data: LoginReqDTO) => {
  const response = await API.post<ApiResponse<LoginResDTO>>('/users/login', data);
  return response.data;
};