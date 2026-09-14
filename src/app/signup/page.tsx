'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendEmailCodeAPI, verifyEmailCodeAPI, signUpAPI } from '@/api/auth';

export default function SignUpPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSending, setIsSending] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean | null>(null);
  const [authMessage, setAuthMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    message: '',
  });

  const showAlertModal = (message: string, onConfirm?: () => void) => {
    setModalConfig({
      isOpen: true,
      message,
      onConfirm,
    });
  };

  const closeModal = () => {
    if (modalConfig.onConfirm) {
      modalConfig.onConfirm();
    }
    setModalConfig({ isOpen: false, message: '' });
  };

  const handleSendCode = async () => {
    if (!email.trim()) return;
    setIsSending(true);
    setAuthMessage('');
    try {
      await sendEmailCodeAPI(email);
      showAlertModal('인증코드가 이메일로 발송되었습니다.');
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || '인증코드 발송에 실패했습니다.';
      showAlertModal(errorMsg);
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!email.trim() || !authCode.trim()) return;
    try {
      const res = await verifyEmailCodeAPI(email, authCode);
      if (res.isSuccess) {
        setIsAuthSuccess(true);
        setAuthMessage('이메일 인증이 완료되었습니다.');
      }
    } catch (error: any) {
      setIsAuthSuccess(false);
      setAuthMessage('인증번호가 일치하지 않습니다.');
    }
  };

  const isPasswordMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;

  const isFormValid = nickname.trim() !== '' && email.trim() !== '' && isAuthSuccess === true && isPasswordMatch;

  const handleSignUpSubmit = async () => {
    if (!isFormValid || isLoading) return;
    setIsLoading(true);

    try {
      const res = await signUpAPI({
        email,
        authCode,
        nickname,
        password,
        agreedTermIds: [1, 2],
      });

      if (res.isSuccess) {
        showAlertModal('회원가입이 성공적으로 완료되었습니다!', () => {
          router.push('/notice');
        });
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.';
      showAlertModal(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 select-none font-sans">
      {/* 랜딩/Notice와 동일한 핸드폰 스펙 디바이스 프레임 */}
      <div className="w-[360px] h-[700px] bg-gray-50 rounded-[44px] border-[8px] border-gray-900 shadow-2xl flex flex-col overflow-hidden relative border-opacity-90 justify-between p-5">
        
        {/* 스마트폰 노치 (카메라 영역) */}
        <div className="w-32 h-4 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-700 mr-2" />
          <div className="w-8 h-1 bg-gray-800 rounded-full" />
        </div>

        {/* 상단 노치 영역 공간 확보 */}
        <div className="h-3 w-full bg-transparent shrink-0" />

        {/* 메인 폼 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar py-2">
          <div className="space-y-4">
            <h2 className="text-center font-bold text-blue-600 text-lg mb-4 mt-1">
              회원가입
            </h2>

            {/* 닉네임 */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 ml-1">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."
                className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-300 shadow-sm focus:outline-none focus:border-blue-400 transition"
              />
            </div>

            {/* 이메일 & 인증하기 */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 ml-1">이메일</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요."
                  disabled={isAuthSuccess === true}
                  className="flex-1 bg-white border border-gray-100 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-300 shadow-sm focus:outline-none focus:border-blue-400 transition disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!email.trim() || isSending || isAuthSuccess === true}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 shadow-sm ${
                    email.trim() && !isSending && isAuthSuccess !== true
                      ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 active:scale-95'
                      : 'bg-gray-300 text-white cursor-not-allowed'
                  }`}
                >
                  {isSending ? '발송중...' : '인증하기'}
                </button>
              </div>

              {/* 인증번호 입력 & 확인 */}
              <div className="flex gap-2 mt-2">
                <input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value)}
                  placeholder="인증번호를 입력해주세요."
                  disabled={isAuthSuccess === true}
                  className="flex-1 bg-white border border-gray-100 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-300 shadow-sm focus:outline-none focus:border-blue-400 transition disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={!authCode.trim() || isAuthSuccess === true}
                  className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 shadow-sm ${
                    authCode.trim() && isAuthSuccess !== true
                      ? 'bg-gray-700 text-white cursor-pointer hover:bg-gray-800 active:scale-95'
                      : 'bg-gray-300 text-white cursor-not-allowed'
                  }`}
                >
                  확인
                </button>
              </div>

              {isAuthSuccess === true && (
                <p className="text-[10px] text-blue-600 mt-1.5 ml-1 font-medium">{authMessage}</p>
              )}
              {isAuthSuccess === false && (
                <p className="text-[10px] text-red-500 mt-1.5 ml-1 font-medium">{authMessage}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-700 ml-1">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요."
                className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-300 shadow-sm focus:outline-none focus:border-blue-400 transition"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 재입력해주세요."
                className="w-full bg-white border border-gray-100 rounded-2xl px-4 py-3 text-xs text-gray-800 placeholder-gray-300 shadow-sm focus:outline-none focus:border-blue-400 transition"
              />

              {isPasswordMatch && (
                <p className="text-[10px] text-blue-600 mt-1 ml-1 font-medium">비밀번호가 일치합니다.</p>
              )}
              {isPasswordMismatch && (
                <p className="text-[10px] text-red-500 mt-1 ml-1 font-medium">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>

          {/* 하단 회원가입 하기 버튼 */}
          <div className="pt-4">
            <button
              type="button"
              onClick={handleSignUpSubmit}
              disabled={!isFormValid || isLoading}
              className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                isFormValid && !isLoading
                  ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 active:scale-[0.99]'
                  : 'bg-gray-300 text-white cursor-not-allowed'
              }`}
            >
              {isLoading ? '처리 중...' : '회원가입 하기'}
            </button>
          </div>
        </div>

        {/* 커스텀 모달 알림 */}
        {modalConfig.isOpen && (
          <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-5 animate-fadeIn">
            <div className="bg-white rounded-3xl p-5 w-full max-w-[260px] text-center shadow-2xl space-y-4">
              <p className="text-xs font-bold text-gray-800 leading-relaxed whitespace-pre-wrap">
                {modalConfig.message}
              </p>

              <button
                type="button"
                onClick={closeModal}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md"
              >
                확인
              </button>
            </div>
          </div>
        )}

        {/* 스마트폰 하단 홈 바 */}
        <div className="w-28 h-1 bg-gray-300 rounded-full absolute bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}