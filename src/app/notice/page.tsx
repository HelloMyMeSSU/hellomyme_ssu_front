'use client';

import React from 'react';

const SIDE = '10.5%';
const SAFE_TOP = 'env(safe-area-inset-top, 0px)';
const SAFE_BOTTOM = 'env(safe-area-inset-bottom, 0px)';

export default function NoticePage() {
  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.appContainer}>
        {/* 상단 바: 튜토리얼 3~5번 화면과 동일 */}
        <div style={styles.topBar}>
          <span style={styles.headerTitle}>멘토 선택</span>
          <img src="/icon-user.png" alt="프로필" draggable={false} style={styles.profileIcon} />
        </div>

        {/* 안내 카드 + 비활성 버튼 */}
        <div style={styles.content}>
          <div style={styles.card}>
            <p style={styles.noticeText}>
              현재 선택 가능한 멘토가 없어요 ㅠㅠ
              <br />
              멘토가 모집되면 이메일로 소식을 알려드릴게요!
            </p>
          </div>

          <button disabled style={styles.btnDisabled}>
            질문하기
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- 스타일 ---------------- */
const styles: { [key: string]: React.CSSProperties } = {
  bodyWrapper: {
    position: 'fixed',
    inset: 0,
    backgroundColor: '#121212',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
  },
  appContainer: {
    width: '100%',
    maxWidth: 430,
    height: '100dvh',
    maxHeight: 932,
    position: 'relative',
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
  },
  topBar: {
    height: `calc(${SAFE_TOP} + 100px)`,
    padding: `calc(${SAFE_TOP} + 60px) ${SIDE} 0`,
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  headerTitle: { fontSize: 15, fontWeight: 700, color: '#111', letterSpacing: '-0.3px' },
  profileIcon: { width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', display: 'block' },

  content: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: `24px ${SIDE} calc(${SAFE_BOTTOM} + 24px)`,
  },
  card: {
    flex: 1,
    minHeight: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  },
  noticeText: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.6,
    color: '#9E9E9E',
    letterSpacing: '-0.3px',
  },
  btnDisabled: {
    flexShrink: 0,
    width: '100%',
    height: 52,
    border: 'none',
    borderRadius: 14,
    backgroundColor: '#D9D9DB',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    fontFamily: 'inherit',
    cursor: 'not-allowed',
  },
};