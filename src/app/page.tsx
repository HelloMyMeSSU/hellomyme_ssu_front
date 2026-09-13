'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<number>(1);
  const [inputTypedText, setInputTypedText] = useState('');
  
  const [typedIndex, setTypedIndex] = useState(0);
  const [codeLineIndex, setCodeLineIndex] = useState(0);

  const [userQuery, setUserQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const targetInputText = '38페이지 5-3번 문제 풀이과정 설명해줘.';

  const textContent = `[5-3번 문제]
사용자에게 두 수를 입력받아 큰 수를 출력하는
프로그램을 작성하시오.

[풀이 과정]
 1. 두 수를 입력받는다.
 2. 두 수를 비교한다.
 3. 첫 번째 수가 더 크면 첫 번째 수를 출력한다.
 4. 그렇지 않으면 두 번째 수를 출력한다.

[파이썬 코드]`;

  const pythonCodeLines = [
    'a = int(input("첫 번째 수: "))',
    'b = int(input("두 번째 수: "))',
    'if a > b:',
    '    print(a)',
    'else:',
    '    print(b)'
  ];

  useEffect(() => {
    if (step === 1) {
      setInputTypedText('');
      setTypedIndex(0);
      setCodeLineIndex(0);
      let index = 0;
      const timer = setInterval(() => {
        if (index < targetInputText.length) {
          setInputTypedText(targetInputText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 110);
      return () => clearInterval(timer);
    }
  }, [step]);

  useEffect(() => {
    if (step === 3) {
      setTypedIndex(0);
      setCodeLineIndex(0);
      
      let currentIndex = 0;
      const textTimer = setInterval(() => {
        if (currentIndex < textContent.length) {
          currentIndex++;
          setTypedIndex(currentIndex);
        } else {
          clearInterval(textTimer);
          
          let lineIdx = 0;
          const codeTimer = setInterval(() => {
            if (lineIdx < pythonCodeLines.length) {
              lineIdx++;
              setCodeLineIndex(lineIdx);
            } else {
              clearInterval(codeTimer);
              setTimeout(() => {
                setStep(4);
              }, 3000);
            }
          }, 400);
        }
      }, 50);

      return () => {
        clearInterval(textTimer);
      };
    }
  }, [step]);

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
      setTimeout(() => setStep(3), 500);
    } else if (step === 4) {
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4 font-sans select-none">
      <div className="relative w-full max-w-[390px] h-[780px] rounded-[36px] shadow-2xl overflow-hidden border-4 border-slate-700 flex flex-col transition-all duration-700">
        
        {/* 메인 뷰포트 */}
        <div
          className={`w-full h-full pt-10 pb-24 px-6 flex flex-col transition-colors duration-700 relative overflow-y-auto ${
            step === 4 && !showModal ? 'bg-white' : 'bg-[#a9a9a9]'
          }`}
        >
          {/* 과목 헤더 */}
          <div className="text-center mt-3 mb-6 transition-all duration-500">
            <h1 className="text-[#2563eb] font-extrabold text-[19px] tracking-tight">컴퓨터공학응용기초</h1>
            <p className="text-gray-700 text-[11px] mt-0.5 font-semibold">누구나 쉽게 컴퓨팅 사고 with 파이썬</p>
          </div>

          {/* Step 1~3: 데모 영역 */}
          {step <= 3 && (
            <div className="flex-1 flex flex-col space-y-4 justify-start">
              
              {/* 유저 질문 말풍선 */}
              {(step === 2 || step === 3) && (
                <div className="flex justify-end pl-8">
                  <div className="bg-white text-[#2563eb] text-[13.5px] font-semibold px-4 py-3 rounded-full shadow-sm text-center tracking-tight leading-snug max-w-[90%]">
                    {targetInputText}
                  </div>
                </div>
              )}

              {/* AI 답변 영역 */}
              {step === 3 && (
                <div className="w-full text-white text-[13.5px] space-y-3 pt-1 leading-[1.6] font-medium tracking-tight">
                  <div className="whitespace-pre-wrap">
                    {textContent.slice(0, typedIndex)}
                  </div>

                  {typedIndex >= textContent.length && (
                    <div className="bg-[#f8fafc] text-gray-900 rounded-[20px] p-5 shadow-sm border border-[#2563eb]/40 font-mono text-[13px] leading-[1.6] mt-2 space-y-0.5">
                      {pythonCodeLines.slice(0, codeLineIndex).map((line, idx) => {
                        if (line.trim().startsWith('if')) {
                          return (
                            <div key={idx}>
                              <span className="text-red-500 font-semibold">if</span>
                              {line.replace('if', '')}
                            </div>
                          );
                        }
                        if (line.trim().startsWith('else:')) {
                          return (
                            <div key={idx}>
                              <span className="text-red-500 font-semibold">else</span>:
                            </div>
                          );
                        }
                        return <div key={idx}>{line}</div>;
                      })}
                      {codeLineIndex < pythonCodeLines.length && (
                        <span className="inline-block w-1.5 h-3.5 bg-blue-600 animate-pulse"></span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4: 체험 완료 후 빈 채팅 화면 */}
          {step === 4 && !showModal && (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-400 space-y-2">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-xl font-bold mb-1">
                ?
              </div>
              <p className="text-sm font-medium text-gray-600">궁금한 문제나 개념을 물어보세요!</p>
              <p className="text-xs text-gray-400">교재 페이지나 문제를 입력하면 AI가 풀이과정을 설명해 드립니다.</p>
            </div>
          )}
        </div>

        {/* 팝업 모달 */}
        {showModal && (
          <div className="absolute inset-0 z-40 bg-black/20 backdrop-blur-[1px] flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-6 w-full max-w-[300px] text-center shadow-2xl space-y-6">
              <p className="text-[13px] font-bold text-gray-900 leading-snug">
                질문을 하려면 회원가입이 필요해요.<br />지금 회원가입 하시겠어요?
              </p>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 bg-[#f1f3f5] hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    router.push('/signup');
                  }}
                  className="flex-1 py-3 bg-[#4263eb] hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-sm"
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 하단 입력바 */}
        <div className="absolute bottom-5 left-4 right-4 z-20">
          <div className={`rounded-full px-4 py-3 shadow-md flex items-center justify-between gap-2 border ${
            step === 4 && !showModal ? 'bg-gray-100 border-gray-200' : 'bg-[#c2c5cb]/90 border-transparent'
          }`}>
            <div className="text-gray-700 font-bold text-sm tracking-widest pl-1 select-none">...</div>

            <div className="flex-1 text-xs text-gray-700 font-medium px-2">
              {step === 1 && (
                <span className="text-gray-800 truncate block">
                  {inputTypedText}
                  <span className="inline-block w-0.5 h-3.5 bg-blue-600 ml-0.5 align-middle animate-pulse"></span>
                </span>
              )}
              {(step === 2 || step === 3) && (
                <span className="text-gray-500/80 truncate block">어떤 문제의 풀이가 궁금하신가요?</span>
              )}
              {step === 4 && (
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleNextStep()}
                  placeholder="어떤 문제의 풀이가 궁금하신가요?"
                  className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-xs focus:outline-none"
                />
              )}
            </div>

            <button
              onClick={handleNextStep}
              className={`relative flex items-center justify-center w-8 h-8 rounded-full bg-[#2563eb] text-white transition-all duration-300 transform active:scale-95 shadow-md ${
                step === 1 || step === 4 ? 'hover:bg-blue-700 cursor-pointer' : 'opacity-90'
              }`}
            >
              {step === 1 && (
                <span className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 relative z-10"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}