'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper';
import { useRouter } from 'next/navigation';
import 'swiper/css';

const YELLOW = '#FFE94D';


const guideText: React.CSSProperties = {
  color: '#FFFFFF',
  fontFamily: 'Pretendard, "Noto Sans KR", -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeight: 300,
  fontSize: 20,
  letterSpacing: '-0.3px',
};const SIDE = '10.5%';

const SAFE_TOP = 'env(safe-area-inset-top, 0px)';
const SAFE_BOTTOM = 'env(safe-area-inset-bottom, 0px)';

/* ---------------- 작은 SVG 아이콘 ---------------- */
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#fff" strokeWidth="3">
    <path d="M2 2L16 16M16 2L2 16" />
  </svg>
);

const Chevron = ({ up }: { up?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#555" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d={up ? 'M2 9l5-5 5 5' : 'M2 5l5 5 5-5'} />
  </svg>
);

// 1번 화면: "예시 문제로 질문해보기" 옆 곡선 화살표 (카드 쪽을 가리킴)
const GuideArrowLeft = () => (
  <svg width="34" height="36" viewBox="0 0 34 36" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round">
    <path d="M32 33C10 33 4 24 4 4M4 3L0 10M4 3L8 10" />
  </svg>
);

// 4번 화면: "자세한 답변 확인하기" 옆 곡선 화살표 (박스 쪽을 가리킴)
const GuideArrowRight = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="#fff" strokeWidth="1.2" strokeLinecap="round">
    <path d="M2 56C34 56 54 42 54 6M54 4L49 12M54 4L59 12" />
  </svg>
);

const camIcon = {
  width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: '#fff',
  strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
};
const MoonIcon = () => (<svg {...camIcon}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>);
const FlashOffIcon = () => (<svg {...camIcon}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /><path d="M3 3l18 18" /></svg>);
const LiveOffIcon = () => (<svg {...camIcon}><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" /><path d="M4 4l16 16" /></svg>);
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
    {[5, 12, 19].flatMap((x) => [5, 12, 19].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />))}
  </svg>
);
const FlipIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 11a8 8 0 0 0-14-4M4 4v4h4M4 13a8 8 0 0 0 14 4M20 20v-4h-4" />
  </svg>
);

/* ---------------- 공용 조각 ---------------- */
function Profile() {
  return <img src="/icon-user.png" alt="프로필" draggable={false} style={styles.profileIcon} />;
}

// 3~5번 화면 공통: "질문한 문제" 라벨 + 교재 카드
function QuestionedProblem({ tooltip }: { tooltip?: React.ReactNode }) {
  return (
    <>
      <span style={{ ...styles.sectionTag, marginTop: 'clamp(24px, 4.5dvh, 40px)' }}>질문한 문제</span>
      <div style={styles.bookCardWrap}>
        <div style={styles.bookCard}>
          <img src="/problem-book.png" alt="문제 교재 이미지" draggable={false} style={styles.bookCardImg} />
        </div>
        {tooltip}
      </div>
    </>
  );
}

// 4·5번 화면 공통: 멘토 답변 헤더 (흰 알약)
function MentorBar({ open }: { open: boolean }) {
  return (
    <div style={styles.mentorAnswerBar}>
      <div style={styles.mentorInfo}>
        <img src="/icon-mentor-avatar.png" alt="멘토 아바타" draggable={false} style={styles.mentorAvatar} />
        <span style={styles.mentorName}>
          기니피자<span style={styles.mentorMeta}>(컴퓨터학부 24)</span>의 풀이 과정
        </span>
      </div>
      <Chevron up={open} />
    </div>
  );
}

export default function TutorialPage() {
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [splashFade, setSplashFade] = useState<boolean>(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t1 = setTimeout(() => setSplashFade(true), 2500);
    const t2 = setTimeout(() => setShowSplash(false), 2850);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleSplashClick = () => {
    setSplashFade(true);
    setTimeout(() => setShowSplash(false), 350);
  };

  const goToSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <div style={styles.bodyWrapper}>
      <div style={styles.appContainer}>

        {/* 1. 접속 화면 (스플래시) */}
        {showSplash && (
          <div
            style={{ ...styles.splashScreen, opacity: splashFade ? 0 : 1 }}
            onClick={handleSplashClick}
          >
            <div style={styles.splashLogoWrap}>
              <img src="/logo.png" alt="서비스 로고" draggable={false} style={styles.imgFit} />
            </div>
          </div>
        )}

        {/* 닫기 버튼 (모든 슬라이드 위에 고정) */}
        <button style={styles.btnClose} aria-label="닫기" onClick={() => router.replace('/main')}>
          <CloseIcon />
        </button>

        {/* 2. 스와이프 튜토리얼 5단계 */}
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          direction="horizontal"
          speed={350}
          grabCursor={true}
          style={{ width: '100%', height: '100%' }}
        >

          {/* [SLIDE 1] 메인 메뉴 */}
          <SwiperSlide style={styles.swiperSlide}>
            <div style={styles.slide}>
              <div style={styles.topBar}>
                <img src="/logo.png" alt="Hello myme" draggable={false} style={styles.logoImg} />
                <Profile />
              </div>

              <div style={styles.slide1Content}>
                <span style={{ ...styles.clickText, marginBottom: 6 }}>Click!</span>

                <div style={styles.cardQuestionWrap}>
                  <div style={styles.cardQuestion} onClick={() => goToSlide(1)}>
                    <img src="/icon-question-illust.png" alt="질문하기 일러스트" draggable={false} style={styles.questionIllust} />
                    <span style={styles.subTag}>&lt;컴퓨터공학응용기초&gt;</span>
                    <span style={styles.cardTitle}>문제 풀이 질문하기</span>
                  </div>

                  <div style={styles.arrowGuide}>
                    <GuideArrowLeft />
                    <span>예시 문제로 질문해보기</span>
                  </div>
                </div>

                <div style={styles.cardChat}>
                  <img src="/icon-chat-illust.png" alt="대화하기 일러스트" draggable={false} style={styles.chatIllust} />
                  <span style={styles.chatSubtext}>같은 학교, 같은 과, 같은 진로</span>
                  <span style={styles.chatTitle}>선배와 대화하기</span>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* [SLIDE 2] 카메라 촬영 */}
          <SwiperSlide style={styles.swiperSlide}>
            <div style={styles.cameraContainer}>
              <div style={styles.cameraTop}>
                <span style={styles.cameraDot} />
                <div style={styles.cameraPill}>
                  <MoonIcon />
                  <FlashOffIcon />
                  <LiveOffIcon />
                  <GridIcon />
                </div>
              </div>

              <div style={styles.cameraViewfinder}>
                <img src="/problem-book.png" alt="문제 교재 이미지" draggable={false} style={styles.bookImage} />
              </div>

              <div style={styles.cameraBottom}>
                <div style={styles.shutterRow}>
                  <div style={styles.shutterBtn} onClick={() => goToSlide(2)} />
                  <span style={styles.shutterClickLabel}>Click!</span>
                </div>

                <div style={styles.cameraModeRow}>
                  <img src="/problem-book.png" alt="최근 사진" draggable={false} style={styles.galleryThumb} />
                  <div style={styles.modePill}>
                    <span style={styles.modeItem}>비디오</span>
                    <span style={{ ...styles.modeItem, ...styles.modeActive }}>사진</span>
                  </div>
                  <div style={styles.flipBtn}><FlipIcon /></div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* [SLIDE 3] 업로드 + 멘토 대기 */}
          <SwiperSlide style={styles.swiperSlide}>
            <div style={styles.slide}>
              <div style={styles.topBar}>
                <span style={styles.headerTitle}>문제 풀이 질문하기</span>
                <Profile />
              </div>

              <div style={{ ...styles.qContent, paddingBottom: `calc(${SAFE_BOTTOM} + 20px)` }}>
                <QuestionedProblem
                  tooltip={
                    <div style={styles.overlayTooltip}>
                      질문을 업로드하면<br />
                      인증된 멘토가 문제를 직접 풀어요.<br /><br />
                      멘토가 즉각적인 응답이 어려울 수 있으니,<br />
                      문제를 다시 읽으며 기다려주세요!
                    </div>
                  }
                />

                <div style={styles.lowerBlock}>
                  <span style={styles.sectionTag}>문제 풀이</span>
                  <div style={styles.waitingCard} onClick={() => goToSlide(3)}>
                    <span style={styles.waitingText}>멘토의 답변을 기다리는 중...</span>
                    <img
                      src="/icon-question-illust.png"
                      alt="처리 중 일러스트"
                      draggable={false}
                      style={{ height: 70, width: 'auto', marginTop: 14, opacity: 0.45 }}
                    />
                  </div>
                  <span style={{ ...styles.clickText, marginTop: 6 }}>Click!</span>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* [SLIDE 4] 멘토 답변 도착 */}
          <SwiperSlide style={styles.swiperSlide}>
            <div style={styles.slide}>
              <div style={styles.topBar}>
                <span style={styles.headerTitle}>문제 풀이 질문하기</span>
                <Profile />
              </div>

              <div style={{ ...styles.qContent, paddingBottom: `calc(${SAFE_BOTTOM} + 20px)` }}>
                <QuestionedProblem />

                <div style={styles.lowerBlock}>
                  <div style={styles.highlightBox} onClick={() => goToSlide(4)}>
                    <div style={styles.highlightHeader}>
                      <span style={styles.sectionTagInline}>문제 풀이</span>
                      <span style={styles.clickText}>Click!</span>
                    </div>
                    <MentorBar open={false} />
                  </div>

                  <div style={styles.guideWrap}>
                    <div style={styles.guideCallout}>
                      멘토가 답변했어요!<br />
                      자세한 답변 확인하기
                    </div>
                    <div style={styles.guideArrowRight}>
                      <GuideArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* [SLIDE 5] 펼쳐진 풀이 과정 */}
          <SwiperSlide style={styles.swiperSlide}>
            <div style={styles.slide}>
              <div style={styles.topBar}>
                <span style={styles.headerTitle}>문제 풀이 질문하기</span>
                <Profile />
              </div>

              <div style={styles.qContent}>
                <QuestionedProblem />

                <div style={styles.lowerBlock}>
                  <span style={styles.sectionTag}>문제 풀이</span>
                  <div style={{ marginBottom: 6 }}>
                    <MentorBar open={true} />
                  </div>

                  <div style={styles.solutionCard}>
                    <p style={styles.solP}>처음에는 두 수를 입력받는 것부터 생각하면 돼요!</p>
                    <p style={styles.solP}>예를 들어 10과 7을 입력받았다고 해볼게요.</p>
                    <ol style={styles.solList}>
                      <li>먼저 첫 번째 수와 두 번째 수를 변수에 저장해요.</li>
                      <li>두 수를 비교해서 어떤 수가 더 큰지 확인해요.</li>
                      <li>첫 번째 수가 더 크다면 첫 번째 수를 출력하고, 그렇지 않다면 두 번째 수를 출력하면 돼요.</li>
                    </ol>
                    <p style={styles.solP}>파이썬으로 작성하면 이렇게 만들 수 있어요.</p>
                    <pre style={styles.codeBlock}>{`a = int(input())\nb = int(input())\nif a > b:\n    print(a)\nelse:\n    print(b)`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

        </Swiper>
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
    backgroundColor: '#595A5C',
    overflow: 'hidden',
    boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
  },
  btnClose: {
    position: 'absolute',
    top: `calc(${SAFE_TOP} + 30px)`,
    right: 18,
    width: 36,
    height: 36,
    padding: 0,
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 50,
  },

  /* 스플래시 */
  splashScreen: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#F5F5F5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    cursor: 'pointer',
    transition: 'opacity 350ms ease',
  },
  splashLogoWrap: { width: 180, display: 'flex', justifyContent: 'center' },
  imgFit: { width: '100%', height: 'auto', display: 'block', overflow: 'visible' },

  /* 슬라이드 공통 */
  swiperSlide: { height: '100%', backgroundColor: '#595A5C', overflow: 'hidden' },
  slide: { height: '100%', display: 'flex', flexDirection: 'column' },
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
  logoImg: { height: 34, width: 'auto', objectFit: 'contain', display: 'block' },
  clickText: { color: YELLOW, fontSize: 15, fontWeight: 500, textAlign: 'center', lineHeight: 1.2 },

  /* SLIDE 1 */
  slide1Content: {
    flex: 1,
    minHeight: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: `clamp(60px, 9dvh, 90px) ${SIDE} clamp(90px, 15dvh, 150px)`,
  },
  cardQuestionWrap: { position: 'relative', flex: 1, minHeight: 0, display: 'flex' },
  cardQuestion: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer',
  },
  questionIllust: { height: 'clamp(90px, 13dvh, 110px)', width: 'auto', marginBottom: 22 },
  subTag: { fontSize: 13, color: '#9E9E9E', marginBottom: 8 },
  cardTitle: { fontSize: 22, fontWeight: 700, color: '#000', letterSpacing: '-0.5px' },
  arrowGuide: {
    ...guideText,
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: '38%',
    display: 'flex',
    alignItems: 'flex-end',
    gap: 4,
    zIndex: 3,
    color: '#F2F2F2',
    fontSize: 13,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  },
  cardChat: {
    flex: 1,
    minHeight: 0,
    marginTop: 20,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIllust: { height: 'clamp(80px, 11dvh, 100px)', width: 'auto', marginBottom: 18, filter: 'brightness(0.55)' },
  chatSubtext: { fontSize: 13, color: '#8C8D90', marginBottom: 6 },
  chatTitle: { fontSize: 22, fontWeight: 700, color: '#0F0F10', letterSpacing: '-0.5px' },

  /* SLIDE 2 (카메라) */
  cameraContainer: { height: '100%', backgroundColor: '#000', display: 'flex', flexDirection: 'column' },
  cameraTop: {
    height: `calc(${SAFE_TOP} + 116px)`,
    flexShrink: 0,
    boxSizing: 'border-box',
    padding: '0 12px 12px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },
  cameraDot: {
    position: 'absolute',
    top: `calc(${SAFE_TOP} + 8px)`,
    left: '50%',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#34C759',
  },
  cameraPill: {
    height: 32,
    padding: '0 16px',
    borderRadius: 999,
    backgroundColor: '#2B2B2D',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  cameraViewfinder: { flex: 1, minHeight: 0, overflow: 'hidden', backgroundColor: '#222' },
  bookImage: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' },
  cameraBottom: {
    flexShrink: 0,
    height: `calc(${SAFE_BOTTOM} + clamp(170px, 24dvh, 210px))`,
    boxSizing: 'border-box',
    padding: `16px 0 calc(${SAFE_BOTTOM} + 24px)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  shutterRow: { position: 'relative', display: 'flex', justifyContent: 'center' },
  shutterBtn: {
    width: 70,
    height: 70,
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '4px solid #000',
    boxShadow: '0 0 0 3px #fff',
    cursor: 'pointer',
  },
  shutterClickLabel: {
    position: 'absolute',
    left: 'calc(50% + 62px)',
    top: '50%',
    transform: 'translateY(-50%)',
    color: YELLOW,
    fontSize: 15,
    fontWeight: 500,
  },
  cameraModeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 8%',
  },
  galleryThumb: { width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', display: 'block' },
  modePill: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 999,
    backgroundColor: '#1C1C1E',
  },
  modeItem: { padding: '9px 18px', fontSize: 13, color: '#fff', borderRadius: 999 },
  modeActive: { color: YELLOW, backgroundColor: '#3A3A3C' },
  flipBtn: {
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: '#2C2C2E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* SLIDE 3~5 공통 */
  qContent: { flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: `0 ${SIDE}` },
  sectionTag: { display: 'block', fontSize: 12, lineHeight: '14px', color: '#111', marginBottom: 8, flexShrink: 0 },
  sectionTagInline: { fontSize: 12, lineHeight: '14px', color: '#111' },
  bookCardWrap: { position: 'relative', flex: 1, minHeight: 0 },
  bookCard: { position: 'absolute', inset: 0, borderRadius: 22, overflow: 'hidden', backgroundColor: '#3A3A3A' },
  bookCardImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'top',
    filter: 'brightness(0.6)',
    display: 'block',
  },
  overlayTooltip: {
    ...guideText,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -22,
    textAlign: 'center',
    color: '#fff',
    fontSize: 13,
    lineHeight: 1.35,
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
    pointerEvents: 'none',
  },
  lowerBlock: {
    flex: '0 0 auto',
    height: 'clamp(260px, 34dvh, 320px)',
    marginTop: 'clamp(24px, 4.5dvh, 40px)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },

  /* SLIDE 3 */
  waitingCard: {
    flex: '0 0 auto',
    height: 'clamp(150px, 22dvh, 200px)',
    backgroundColor: '#fff',
    borderRadius: 22,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  waitingText: { fontSize: 12, color: '#C4C4C6' },

  /* SLIDE 4 */
  highlightBox: {
    position: 'relative',
    margin: '0 -5px',
    padding: '4px 5px 6px',
    border: '3px solid #1E9BFF',
    borderRadius: 4,
    cursor: 'pointer',
    flexShrink: 0,
  },
  highlightHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    padding: '0 2px',
  },
  guideWrap: { position: 'relative', height: 64, marginTop: 12, flexShrink: 0 },
  guideCallout: {
    ...guideText,
    position: 'absolute',
    left: '46%',
    top: 0,
    transform: 'translateX(-50%)',
    textAlign: 'center',
    color: '#F0F0F0',
    fontSize: 12,
    lineHeight: '18px',
    whiteSpace: 'nowrap',
  },
  guideArrowRight: { position: 'absolute', left: '71%', top: -6 },

  /* SLIDE 4·5 답변 헤더 */
  mentorAnswerBar: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: '0 18px 0 14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  mentorInfo: { display: 'flex', alignItems: 'center', gap: 8 },
  mentorAvatar: { width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' },
  mentorName: { fontSize: 14, fontWeight: 600, color: '#111', letterSpacing: '-0.3px' },
  mentorMeta: { fontSize: 9, fontWeight: 400, color: '#333' },

  /* SLIDE 5 */
  solutionCard: {
    flex: 1,
    minHeight: 0,
    backgroundColor: '#fff',
    borderRadius: '14px 14px 0 0',
    padding: `18px 16px calc(${SAFE_BOTTOM} + 16px)`,
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    color: '#222',
    fontSize: 12,
    lineHeight: 1.55,
  },
  solP: { margin: '0 0 12px' },
  solList: { margin: '0 0 12px', paddingLeft: 18 },
  codeBlock: {
    margin: 0,
    fontFamily: 'ui-monospace, Menlo, Consolas, monospace',
    fontSize: 12,
    color: '#222',
    whiteSpace: 'pre-wrap',
  },

};