'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendEmailCodeAPI, verifyEmailCodeAPI, signUpAPI } from '@/api/auth';

const BLUE = '#2F6BFF';
const INDIGO = '#4459B4';
const RED = '#F0392B';
const GRAY_BTN = '#D3D3D3';
const SIDE = '8.5%';
const SAFE_TOP = 'env(safe-area-inset-top, 0px)';
const SAFE_BOTTOM = 'env(safe-area-inset-bottom, 0px)';

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

  const canSend = !!email.trim() && !isSending && isAuthSuccess !== true;
  const canVerify = !!authCode.trim() && isAuthSuccess !== true;

  return (
    <div style={styles.bodyWrapper}>
      {/* placeholder 색상은 인라인으로 못 바꿔서 여기서만 지정 */}
      <style>{`.su-input::placeholder{color:#C8C8CC;opacity:1}.su-input:focus{outline:none}`}</style>

      <div style={styles.appContainer}>
        {/* 스크롤 영역: 작은 화면에서는 폼만 스크롤 */}
        <div style={styles.scrollArea}>
          <h2 style={styles.title}>회원가입</h2>

          {/* 닉네임 */}
          <div style={{ ...styles.section, marginTop: 0 }}>
            <label style={styles.label}>닉네임</label>
            <input
              className="su-input"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요."
              style={styles.input}
            />
          </div>

          {/* 이메일 & 인증번호 */}
          <div style={styles.section}>
            <label style={styles.label}>이메일</label>
            <div style={styles.row}>
              <input
                className="su-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요."
                disabled={isAuthSuccess === true}
                style={{ ...styles.input, ...(isAuthSuccess === true ? styles.inputLocked : null), flex: 1, minWidth: 0 }}
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!canSend}
                style={{ ...styles.sideBtn, backgroundColor: canSend ? INDIGO : GRAY_BTN, cursor: canSend ? 'pointer' : 'not-allowed' }}
              >
                {isSending ? '발송중...' : '인증하기'}
              </button>
            </div>

            <div style={{ ...styles.inputWrap, marginTop: 9 }}>
              <input
                className="su-input"
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="인증번호를 입력해주세요."
                disabled={isAuthSuccess === true}
                style={{ ...styles.input, ...(isAuthSuccess === true ? styles.inputLocked : null), paddingRight: canVerify ? 76 : 18 }}
              />
              {/* 시안에는 없지만 인증 확인 동작에 필요해서, 입력이 있을 때만 입력창 안에 작게 표시 */}
              {canVerify && (
                <button type="button" onClick={handleVerifyCode} style={styles.verifyInlineBtn}>
                  확인
                </button>
              )}
            </div>

            {isAuthSuccess === true && <p style={{ ...styles.msg, color: BLUE }}>{authMessage}</p>}
            {isAuthSuccess === false && <p style={{ ...styles.msg, color: RED }}>{authMessage}</p>}
          </div>

          {/* 비밀번호 */}
          <div style={styles.section}>
            <label style={styles.label}>비밀번호</label>
            <input
              className="su-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              style={styles.input}
            />
            <input
              className="su-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 재입력해주세요."
              style={{ ...styles.input, marginTop: 9 }}
            />

            {isPasswordMatch && <p style={{ ...styles.msg, color: BLUE }}>비밀번호가 일치합니다.</p>}
            {isPasswordMismatch && <p style={{ ...styles.msg, color: RED }}>비밀번호가 일치하지 않습니다.</p>}
          </div>
        </div>

        {/* 하단 회원가입 하기 버튼 */}
        <div style={styles.bottomArea}>
          <button
            type="button"
            onClick={handleSignUpSubmit}
            disabled={!isFormValid || isLoading}
            style={{
              ...styles.submitBtn,
              backgroundColor: isFormValid && !isLoading ? INDIGO : GRAY_BTN,
              cursor: isFormValid && !isLoading ? 'pointer' : 'not-allowed',
            }}
          >
            {isLoading ? '처리 중...' : '회원가입 하기'}
          </button>
        </div>

        {/* 알림 모달 (메인 화면 팝업과 같은 스타일) */}
        {modalConfig.isOpen && (
          <div style={styles.dim}>
            <div style={styles.dialog} role="dialog" aria-modal="true">
              <p style={styles.dialogText}>{modalConfig.message}</p>
              <button type="button" onClick={closeModal} style={styles.dialogBtn}>
                확인
              </button>
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
  scrollArea: {
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
    padding: `calc(${SAFE_TOP} + 83px) ${SIDE} 16px`,
    scrollbarWidth: 'none',
  },
  title: {
    margin: '0 0 42px',
    textAlign: 'center',
    fontSize: 22,
    lineHeight: '28px',
    fontWeight: 700,
    color: BLUE,
    letterSpacing: '-0.5px',
  },
  section: { marginTop: 22 },
  label: {
    display: 'block',
    marginBottom: 12,
    fontSize: 13,
    lineHeight: '16px',
    fontWeight: 700,
    color: '#222',
  },
  row: { display: 'flex', gap: 9 },
  inputWrap: { position: 'relative' },
  input: {
    display: 'block',
    width: '100%',
    boxSizing: 'border-box',
    height: 54,
    padding: '0 18px',
    border: 'none',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#222',
    fontFamily: 'inherit',
  },
  inputLocked: { color: '#8A8A8A', WebkitTextFillColor: '#8A8A8A', opacity: 1 },
  sideBtn: {
    flexShrink: 0,
    width: 78,
    height: 54,
    border: 'none',
    borderRadius: 14,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 600,
    fontFamily: 'inherit',
  },
  verifyInlineBtn: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 54,
    height: 36,
    border: 'none',
    borderRadius: 10,
    backgroundColor: INDIGO,
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  msg: { margin: '8px 0 0 8px', fontSize: 12, lineHeight: '16px' },

  bottomArea: {
    flexShrink: 0,
    padding: `12px ${SIDE} calc(${SAFE_BOTTOM} + 48px)`,
  },
  submitBtn: {
    width: '100%',
    height: 54,
    border: 'none',
    borderRadius: 14,
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 600,
    fontFamily: 'inherit',
  },

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
    backgroundColor: '#FFFFFF',
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
    whiteSpace: 'pre-wrap',
  },
  dialogBtn: {
    width: '100%',
    height: 44,
    border: 'none',
    borderRadius: 8,
    backgroundColor: INDIGO,
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
};