'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bold } from 'lucide-react';

const SIDE = '10.5%';
const SAFE_TOP = 'env(safe-area-inset-top, 0px)';

type DialogKind = 'question' | 'profile' | 'chat';

const DIALOG_MESSAGE: Record<DialogKind, string> = {
  question: '질문을 하려면 회원가입이 필요해요.',
  profile: '내 정보를 보려면 회원가입이 필요해요.',
  chat: '선배와 대화하려면 회원가입이 필요해요.',
};

export default function MainPage() {
  const router = useRouter();
  const [dialog, setDialog] = useState<DialogKind | null>(null);
  const isLoggedIn = false; 

  const handleAction = (kind: DialogKind) => {
    if (!isLoggedIn) {
      setDialog(kind); 
      return;
    }
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.appContainer}>

        {/* 상단: 로고 + 프로필 */}
        <div style={styles.topBar}>
          <img src="/logo.png" alt="Hello myme" draggable={false} style={styles.logoImg} />
          <button style={styles.profileBtn} aria-label="내 정보" onClick={() => handleAction('profile')}>
            <img src="/icon-user.png" alt="" draggable={false} style={styles.profileIcon} />
          </button>
        </div>

        {/* 카드 2개 */}
        <div style={styles.content}>
          <div style={styles.card} onClick={() => handleAction('question')}>
            <img src="/icon-question-illust.png" alt="질문하기 일러스트" draggable={false} style={styles.questionIllust} />
            <span style={styles.subTag}>&lt;컴퓨터공학응용기초&gt;</span>
            <span style={styles.cardTitle}>문제 풀이 질문하기</span>
          </div>

          <div style={{ ...styles.card}} onClick={() => handleAction('chat')}>
            <img src="/icon-chat-illust.png" alt="대화하기 일러스트" draggable={false} style={styles.chatIllust} />
            <span style={styles.subTag}>같은 학교, 같은 과, 같은 진로</span>
            <span style={styles.cardTitle}>선배와 대화하기</span>
          </div>
        </div>

        {/* 회원가입 유도 팝업 */}
        {dialog && (
          <div style={styles.dim}>
            <div style={styles.dialog} role="dialog" aria-modal="true">
              <p style={styles.dialogText}>
                {DIALOG_MESSAGE[dialog]}<br />
                지금 회원가입 하시겠어요?
              </p>
              <div style={styles.dialogBtnRow}>
                <button style={styles.btnCancel} onClick={() => setDialog(null)}>취소</button>
                <button style={styles.btnSignup} onClick={() => router.push('/signup')}>회원가입</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
  logoImg: { height: 34, width: 'auto', objectFit: 'contain', display: 'block' },
  profileBtn: { padding: 0, border: 'none', background: 'none', cursor: 'pointer', display: 'block' },
  profileIcon: { width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', display: 'block' },

    content: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: `24px ${SIDE} calc(env(safe-area-inset-bottom, 0px) + 24px)`,
  },
  card: {
    flex: 1,
    minHeight: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
  },
  questionIllust: { height: 110, width: 'auto', marginBottom: 22 },
  chatIllust: { height: 96, width: 'auto', marginBottom: 18 },
  subTag: { fontSize: 13, color: '#9E9E9E', marginBottom: 8 },
  cardTitle: { fontSize: 22, fontWeight: 700, color: '#000', letterSpacing: '-0.5px' },

  dim: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  dialog: {
    width: '79%',
    maxWidth: 340,
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: '22px 16px 16px',
  },
  dialogText: {
    margin: '0 0 18px',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 1.5,
    color: '#111',
    letterSpacing: '-0.3px',
  },
  dialogBtnRow: { display: 'flex', gap: 8 },
  btnCancel: {
    flex: 1,
    height: 44,
    border: 'none',
    borderRadius: 8,
    backgroundColor: '#EFEFEF',
    color: '#2F3F9E',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  btnSignup: {
    flex: 1,
    height: 44,
    border: 'none',
    borderRadius: 8,
    backgroundColor: '#4459B4',
    color: '#fff',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
};