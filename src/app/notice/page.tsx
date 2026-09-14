'use client';

import React from 'react';

export default function NoticePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-4 select-none">
      {/* 랜딩 페이지와 동일한 핸드폰 스펙 디바이스 프레임 */}
      <div className="w-[360px] h-[700px] bg-gray-50 rounded-[44px] border-[8px] border-gray-900 shadow-2xl flex flex-col overflow-hidden relative border-opacity-90 justify-between p-5">
        
        {/* 스마트폰 카메라 영역 */}
        <div className="w-32 h-4 bg-gray-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-700 mr-2" />
          <div className="w-8 h-1 bg-gray-800 rounded-full" />
        </div>

        {/* 상단 영역 여백 공간 */}
        <div className="h-4 w-full bg-transparent shrink-0" />

        {/* 메인 콘텐츠 영역 (멘토 선택 타이틀 & 중앙 안내 카드) */}
        <div className="flex flex-col items-center flex-1 w-full">
          <h2 className="text-center font-bold text-blue-600 text-base mb-5 mt-2">
            멘토 선택
          </h2>

          {/* 중앙 흰색 안내 카드 */}
          <div className="w-full flex-1 max-h-[440px] bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-sm border border-gray-100">
            <p className="text-gray-400 text-xs leading-relaxed whitespace-pre-line font-medium">
              현재 선택 가능한 멘토가 없어요 ㅠㅠ
              <br />
              멘토가 모집되면 이메일로 소식을 알려드릴게요!
            </p>
          </div>
        </div>

        {/* 하단 질문하기 비활성화 버튼 */}
        <div className="w-full mb-3">
          <button
            disabled
            className="w-full py-3.5 rounded-xl font-bold text-xs text-white bg-gray-300 cursor-not-allowed transition-all"
          >
            질문하기
          </button>
        </div>

        {/* 스마트폰 하단 홈 바 (Home Indicator) */}
        <div className="w-28 h-1 bg-gray-300 rounded-full absolute bottom-1.5 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  );
}