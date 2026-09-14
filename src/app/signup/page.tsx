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
        agreedTermIds: [9007199254740991, 9007199254740992],
      });

      if (res.isSuccess) {
        showAlertModal('회원가입이 성공적으로 완료되었습니다!', () => {
          router.push('/complete');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans select-none">
      <div className="relative w-full max-w-[390px] h-[780px] rounded-[36px] shadow-2xl overflow-hidden border-4 border-slate-700 bg-white flex flex-col p-6">
        
        <div className="flex-1 flex flex-col justify-between pt-6 pb-4">
          <div className="space-y-6">
            <h2 className="text-[#2b66d9] font-bold text-center text-xl mb-8">회원가입</h2>

            {/* 닉네임 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800">닉네임</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력해주세요."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition"
              />
            </div>

            {/* 이메일 & 인증하기 */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-800">이메일</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요."
                  disabled={isAuthSuccess === true}
                  className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!email.trim() || isSending || isAuthSuccess === true}
                  className={`px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                    email.trim() && !isSending && isAuthSuccess !== true
                      ? 'bg-[#2b66d9] text-white cursor-pointer hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
                  className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition disabled:bg-gray-100"
                />
                <button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={!authCode.trim() || isAuthSuccess === true}
                  className={`px-3 py-3 rounded-xl text-xs font-medium transition-all ${
                    authCode.trim() && isAuthSuccess !== true
                      ? 'bg-slate-700 text-white cursor-pointer hover:bg-slate-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  확인
                </button>
              </div>

              {isAuthSuccess === true && (
                <p className="text-[11px] text-[#2b66d9] mt-1 font-medium">{authMessage}</p>
              )}
              {isAuthSuccess === false && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">{authMessage}</p>
              )}
            </div>

            {/* 비밀번호 */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-800">비밀번호</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 재입력해주세요."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition"
              />

              {isPasswordMatch && (
                <p className="text-[11px] text-[#2b66d9] mt-1 font-medium">비밀번호가 일치합니다.</p>
              )}
              {isPasswordMismatch && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignUpSubmit}
            disabled={!isFormValid || isLoading}
            className={`w-full py-4 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              isFormValid && !isLoading
                ? 'bg-[#2b66d9] text-white cursor-pointer hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? '처리 중...' : '회원가입 하기'}
          </button>
        </div>

        {/* 안내/에러 알림 커스텀 모달 (첨부 이미지 디자인 재현) */}
        {modalConfig.isOpen && (
          <div className="absolute inset-0 z-50 bg-black/20 backdrop-blur-[1px] flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-[300px] text-center shadow-2xl space-y-6">
              <p className="text-[13px] font-bold text-gray-900 leading-snug whitespace-pre-wrap">
                {modalConfig.message}
              </p>

              <button
                type="button"
                onClick={closeModal}
                className="w-full py-3 bg-[#4263eb] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                확인
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}