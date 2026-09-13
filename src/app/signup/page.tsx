'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [isAuthSuccess, setIsAuthSuccess] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleVerifyAuthCode = () => {
    if (authCode === '335673') {
      setIsAuthSuccess(true);
    } else {
      setIsAuthSuccess(false);
    }
  };

  const isPasswordMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword;
  const isPasswordMismatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword;

  const isFormValid = nickname.trim() !== '' && email.trim() !== '' && isAuthSuccess === true && isPasswordMatch;

  const handleSignUpSubmit = () => {
    if (isFormValid) {
      alert('회원가입이 완료되었습니다!');
      router.push('/'); 
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
                  className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition"
                />
                <button
                  type="button"
                  onClick={handleVerifyAuthCode}
                  disabled={!email.trim()}
                  className={`px-4 py-3 rounded-xl text-xs font-medium transition-all ${
                    email.trim()
                      ? 'bg-[#2b66d9] text-white cursor-pointer hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  인증하기
                </button>
              </div>

              {/* 인증번호 */}
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="인증번호를 입력해주세요."
                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:bg-white focus:border-blue-400 transition mt-2"
              />

              {/* 메시지 */}
              {isAuthSuccess === true && (
                <p className="text-[11px] text-[#2b66d9] mt-1 font-medium">이메일 인증이 완료되었습니다.</p>
              )}
              {isAuthSuccess === false && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">인증번호가 일치하지 않습니다.</p>
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

              {/* 메시지 */}
              {isPasswordMatch && (
                <p className="text-[11px] text-[#2b66d9] mt-1 font-medium">비밀번호가 일치합니다.</p>
              )}
              {isPasswordMismatch && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">비밀번호가 일치하지 않습니다.</p>
              )}
            </div>
          </div>

          {/* 회원가입 버튼 */}
          <button
            type="button"
            onClick={handleSignUpSubmit}
            disabled={!isFormValid}
            className={`w-full py-4 rounded-2xl text-sm font-bold transition-all shadow-sm ${
              isFormValid
                ? 'bg-[#2b66d9] text-white cursor-pointer hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            회원가입 하기
          </button>
        </div>

      </div>
    </div>
  );
}