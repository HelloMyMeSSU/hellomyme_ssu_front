'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  const [step, setStep] = useState(0);

  const targetText = '38페이지 5-3번 문제 풀이과정 모르겠어요.';
  const [typedText, setTypedText] = useState('');

  const [visibleParagraphs, setVisibleParagraphs] = useState(0);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [userInput, setUserInput] = useState('');
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    if (step >= 5) return;

    let duration = 2000;

    if (step === 0) duration = 1500; 
    if (step === 1) duration = 2500; 
    if (step === 2) duration = 3200; 
    if (step === 3) duration = 2000; 
    if (step === 4) duration = 7800; 

    const timer = setTimeout(() => {
      setStep((prev) => prev + 1);
    }, duration);

    return () => clearTimeout(timer);
  }, [step]);

  useEffect(() => {
    if (step === 2) {
      setTypedText('');
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < targetText.length) {
          setTypedText((prev) => prev + targetText.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 80);

      return () => clearInterval(typingInterval);
    }
  }, [step]);

  useEffect(() => {
    if (step === 4) {
      setVisibleParagraphs(0);
      let count = 0;
      const pInterval = setInterval(() => {
        count++;
        setVisibleParagraphs(count);
        if (count >= 5) {
          clearInterval(pInterval);
        }
      }, 1150);

      return () => clearInterval(pInterval);
    }
  }, [step]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [visibleParagraphs, step]);

  const handleSendQuestion = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setShowSignupModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 select-none">
      {/* 핸드폰 스펙 디바이스 프레임 */}
      <div className="w-[360px] h-[700px] bg-gray-50 rounded-[44px] border-[8px] border-gray-900 shadow-2xl flex flex-col overflow-hidden relative border-opacity-90">
        
        {/* 스마트폰 노치 (카메라 영역) */}
        <div className="w-32 h-4 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-700 mr-2" />
          <div className="w-8 h-1 bg-gray-800 rounded-full" />
        </div>

        {/* 상단 노치 여백 */}
        <div className="h-6 w-full bg-transparent shrink-0" />

        {/* ================= STEP 0 ~ 1: 멘토 선택 시연 ================= */}
        {step <= 1 && (
          <div className="flex-1 p-5 flex flex-col justify-between animate-fadeIn relative">
            <div>
              <h2 className="text-center font-bold text-blue-600 text-base mb-5 mt-2">
                멘토 선택
              </h2>

              <div className="grid grid-cols-2 gap-3.5">
                {/* 코코몽 멘토 */}
                <div
                  className={`bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border-2 shadow-sm transition-all duration-200 ${
                    step === 1
                      ? 'border-blue-600 scale-105 shadow-md animate-pulse ring-2 ring-blue-300 ring-offset-1'
                      : 'border-transparent'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center mb-1.5">
                    <span className="text-gray-400 text-lg">👤</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-xs text-gray-800">
                    코코몽 
                    <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5">컴퓨터학부 24</span>
                </div>

                {/* 오뜨 멘토 */}
                <div className="bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border-2 border-transparent shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mb-1.5">
                    <span className="text-lg">👤</span>
                  </div>
                  <div className="flex items-center gap-1 font-bold text-xs text-gray-800">
                    오뜨 
                    <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[9px] text-gray-400 mt-0.5">글로벌미디어 24</span>
                </div>

                {/* 몬치치 멘토 */}
                <div className="bg-white rounded-2xl p-3.5 flex flex-col items-center justify-center border-2 border-transparent shadow-sm">
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex items-center justify-center mb-1.5">
                    <span className="text-gray-400 text-lg">👤</span>
                  </div>
                  <div className="font-bold text-xs text-gray-800">몬치치</div>
                  <span className="text-[10px] text-gray-400 mt-0.5">컴퓨터학부 25</span>
                </div>
              </div>
            </div>

            {/* 질문하기 버튼 */}
            <button
              className={`w-full py-3.5 rounded-xl font-bold text-xs text-white transition-all duration-300 ${
                step === 1
                  ? 'bg-blue-600 shadow-md scale-[1.02]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              질문하기
            </button>
          </div>
        )}

        {/* 멘토 채팅 시연 */}
        {step >= 2 && step < 5 && (
          <div className="flex-1 flex flex-col justify-between p-3.5 bg-gray-50 animate-fadeIn min-h-0">
            {/* 상단 멘토 프로필 */}
            <div className="flex flex-col items-center py-1 border-b border-gray-100 shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mb-0.5">
                👤
              </div>
              <div className="flex items-center gap-1 font-bold text-xs text-blue-600">
                코코몽 멘토 
                <svg className="w-3 h-3 text-blue-500 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[9px] text-gray-400">컴퓨터학부 24</span>
            </div>

            {/* 채팅 말풍선 영역 */}
            <div
              ref={chatContainerRef}
              className="flex-1 py-2 flex flex-col gap-2 overflow-y-auto scroll-smooth"
            >
              {step >= 3 && (
                <div className="self-end bg-blue-500 text-white text-[11px] px-3 py-2 rounded-2xl rounded-tr-none max-w-[85%] shadow-sm animate-fadeIn shrink-0">
                  38페이지 5-3번 문제 풀이과정 모르겠어요.
                </div>
              )}

              {/* 애니메이션 */}
              {step >= 4 && (
                <div className="self-start bg-white text-gray-800 text-[10px] leading-relaxed p-3 rounded-2xl rounded-tl-none max-w-[94%] shadow-sm border border-gray-100 space-y-2">
                  {visibleParagraphs >= 1 && (
                    <p className="transition-all duration-700 ease-out animate-fadeIn">
                      이 문제는 두 수를 입력받아서 둘 중 더 큰 수를 출력하면 돼요!
                    </p>
                  )}
                  
                  {visibleParagraphs >= 2 && (
                    <p className="transition-all duration-700 ease-out animate-fadeIn">
                      먼저 input()을 사용해서 첫 번째 수와 두 번째 수를 각각 입력받아요. 입력받은 값은 문자열이기 때문에 int()를 사용해서 숫자로 바꿔줍니다.
                    </p>
                  )}

                  {visibleParagraphs >= 3 && (
                    <p className="transition-all duration-700 ease-out animate-fadeIn">
                      그다음 if문으로 두 수를 비교하면 돼요.<br />
                      a &gt; b라면 ➔ 첫 번째 수 a가 더 크니까 a를 출력하고, 그렇지 않다면 ➔ 두 번째 수 b를 출력하면 됩니다.
                    </p>
                  )}

                  {visibleParagraphs >= 4 && (
                    <div className="space-y-1.5 transition-all duration-700 ease-out animate-fadeIn">
                      <p>코드는 이렇게 작성할 수 있어요.</p>
                      <div className="font-mono text-[9.5px] bg-gray-50 p-2 rounded-lg text-gray-700 leading-tight border border-gray-100">
                        a = int(input(&quot;첫 번째 수: &quot;))<br />
                        b = int(input(&quot;두 번째 수: &quot;))<br />
                        if a &gt; b:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;print(a)<br />
                        else:<br />
                        &nbsp;&nbsp;&nbsp;&nbsp;print(b)
                      </div>
                    </div>
                  )}

                  {visibleParagraphs >= 5 && (
                    <p className="transition-all duration-700 ease-out animate-fadeIn">
                      예를 들어 a에 10, b에 7을 입력하면 10 &gt; 7이 참이니까 10이 출력되는 방식이에요.
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* 하단 입력창 */}
            <div className="relative flex items-center bg-white rounded-full px-3.5 py-1.5 border border-gray-200 shadow-sm shrink-0 mt-1">
              <span className="text-gray-400 mr-1.5 text-xs">...</span>
              
              <div className="w-full text-xs text-gray-700 bg-transparent flex items-center overflow-hidden">
                {step === 2 ? (
                  <span>
                    {typedText}
                    <span className="inline-block w-0.5 h-3.5 bg-blue-600 ml-0.5 animate-pulse" />
                  </span>
                ) : (
                  <span className="text-gray-300 text-[11px]">어떤 문제의 풀이가 궁금하신가요?</span>
                )}
              </div>

              {/* 전송 버튼 */}
              <button
                className={`ml-1.5 p-1.5 rounded-full text-white transition-all shrink-0 ${
                  step === 2 && typedText.length === targetText.length
                    ? 'bg-blue-600 scale-110 animate-pulse'
                    : 'bg-blue-500'
                }`}
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* 실제 실행 화면 */}
        {step === 5 && (
          <div className="flex-1 flex flex-col justify-between p-4 bg-gray-50 animate-fadeIn">
            <div className="flex flex-col items-center py-6">
              <div className="w-11 h-11 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 mb-1.5">
                👤
              </div>
              <div className="flex items-center gap-1 font-bold text-sm text-blue-600">
                코코몽 멘토 
                <svg className="w-3.5 h-3.5 text-blue-500 fill-current" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-[11px] text-gray-400 mt-0.5">컴퓨터학부 24</span>
            </div>

            <div className="flex-1" />

            <form
              onSubmit={handleSendQuestion}
              className="relative flex items-center bg-white rounded-full px-3.5 py-2.5 border border-gray-200 shadow-sm"
            >
              <span className="text-gray-400 mr-2 text-xs">...</span>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="어떤 문제의 풀이가 궁금하신가요?"
                className="w-full text-xs text-gray-700 bg-transparent outline-none"
              />
              <button
                type="submit"
                className="ml-2 p-1.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-colors shrink-0"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* 회원가입 필요 모달 */}
        {showSignupModal && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-5 z-50 animate-fadeIn">
            <div className="bg-white rounded-2xl p-5 w-full max-w-[260px] shadow-2xl flex flex-col items-center text-center">
              <p className="text-xs font-medium text-gray-800 leading-relaxed mb-5">
                질문을 하려면 회원가입이 필요해요.
                <br />
                지금 회원가입 하시겠어요?
              </p>

              <div className="flex w-full gap-2">
                <button
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                  className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs transition-colors"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 스마트폰 홈 바 */}
        <div className="w-28 h-1 bg-gray-300 rounded-full absolute bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}