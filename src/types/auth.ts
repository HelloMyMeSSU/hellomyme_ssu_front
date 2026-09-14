// 백엔드 공통 ApiResponse<T>
export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}

// 1. 이메일 인증 DTO (UserReqDTO.EmailRequest / UserReqDTO.EmailVerifyRequest)
export interface EmailRequest {
  email: string;
}

export interface EmailVerifyRequest {
  email: string;
  code: string;
}

// 2. 회원가입 DTO (UserReqDTO.SignUpDTO / UserResDTO.SignUpDTO)
export interface SignUpReqDTO {
  email: string;
  authCode: string; // 백엔드 @NotBlank 필수값
  nickname: string;
  password: string;
  agreedTermIds?: number[]; // List<Long> (미사용 시 빈 배열 전송)
}

export interface SignUpResDTO {
  id: number;
  createdAt: string;
}

// 3. 로그인 DTO (UserReqDTO.LoginDTO / UserResDTO.LoginDTO)
export interface LoginReqDTO {
  email: string;
  password: string;
}

export interface LoginResDTO {
  accessToken: string;
}