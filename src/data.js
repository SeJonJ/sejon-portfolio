export const profile = {
  name: '장세존',
  handle: 'sejon',
  role: 'Backend Engineer · 4년차',
  headline: ['복잡한 문제를', '운영 가능한 구조로 풀어냅니다.'],
  summary:
    '실시간·분산 시스템부터 금융권 전자서명까지, Java/Spring Boot로 설계하고 운영하는 백엔드 개발자',
  emails: ['wkdtpwhs@gmail.com', 'wkdtpwhs@naver.com'],
  github: 'https://github.com/SeJonJ',
  blog: 'https://terianp.tistory.com',
  chatforyou: 'https://hjproject.kro.kr/chatforyou',
}

export const strengths = [
  {
    t: '실시간 분산 백엔드',
    d: 'WebRTC/Kurento 기반 N:M 실시간 미디어 플랫폼을 다중 인스턴스 환경에서 직접 설계·운영. Consistent Hashing 방 라우팅, Redis 상태 저장소, Kafka 이벤트 전파의 핵심 설계를 주도.',
  },
  {
    t: '금융권 전자서명 설계',
    d: 'Java/Spring Boot 중심으로 전자서명·전자인장 시스템의 RDB·API 설계를 주도하고, 핵심 인력으로 스펙 결정·기획 분석에 참여.',
  },
  {
    t: '책임 분리 관점의 기술 선택',
    d: 'Redis·Kafka·MinIO·Kubernetes를 통신·상태·이벤트·스토리지로 역할을 나눠 사용. HTTP·WebSocket·SSE·DataChannel의 trade-off를 이해하고 분리.',
  },
  {
    t: '운영 지향',
    d: '장애를 문서화하고 재발 방지 구조(timeout 정책, nginx sidecar, 예외 표준화, traceId 추적)를 만드는 개발.',
  },
]

export const skills = [
  { group: 'Language', items: [['Java', 3], ['Python', 2], ['Node.js', 2], ['JavaScript', 1]] },
  { group: 'Backend', items: [['Spring Boot', 3], ['Spring Data JPA', 2], ['Spring Security', 2]] },
  { group: 'Realtime', items: [['WebRTC', 3], ['Kurento', 3], ['WebSocket/STOMP', 3], ['SSE', 2]] },
  { group: 'State / MQ / Storage', items: [['Redis', 3], ['Kafka', 2], ['MinIO', 2]] },
  { group: 'Infra / DevOps', items: [['Docker', 3], ['Kubernetes(EKS)', 2], ['GitHub Actions', 2], ['Nginx', 2], ['Prometheus/Grafana', 1]] },
  { group: 'Database', items: [['MySQL', 2], ['MariaDB', 2]] },
]

export const experience = [
  {
    when: '2022.12 — 현재',
    org: 'FORCS · 백엔드 개발자',
    note: '전자문서 플랫폼(전자서명 SaaS) · SI 프로젝트 + 제품 본체 개발 병행',
    items: [
      ['[상시] 제품 개발·운영', '전자문서 플랫폼 기능 개발·버그 수정, OpenAPI 설계·개발 및 외부 연동 지원.'],
      ['[대형 증권사] 전자인장 고도화 + 전자서명 · 2026.04~', '핵심 인력(잔류 2인 중 1인)으로 팀장(수석)과 스펙 결정·기획 분석에 참여, RDB 설계 직접 작성. 내부 결재 연동 코드 전체 리팩토링으로 결재 요청→DB 저장 5초→2초 단축.'],
      ['[국내 금융공기업] 전자서명 · 2025.10~2026.03', '내부 시스템 분석 및 연동 API 설계·개발. DB 설계 리스크를 사전 파악하고 상주 동료와 소통해 일정 지연 없이 설계 분석 주도.'],
      ['[대형 증권사] 전자인장 · 2024.05~12', '내부 결재 연동, 법인인감·대외공문 등 도메인 개념을 제품 기본 설계에 녹여 백엔드 기능 개발.'],
      ['[대기업 계열사] 전자서명 · 2023.06~12', '내부 결재 연동 및 신규 별도 프로젝트 구축. RDB·API 직접 설계, 대량 문서 처리 시 연동 무결성 유지.'],
    ],
  },
  {
    when: '2020.07 — 2021.07',
    org: 'SK쉴더스 (구 SK인포섹) · 보안관제(SOC)',
    note: '',
    items: [['보안 관제 및 보안 접근 제어 시스템 운영', '']],
  },
]

export const projects = [
  {
    name: 'ChatForYou v2',
    one: 'WebRTC/Kurento 기반 N:M 화상채팅·실시간 협업 플랫폼',
    meta: ['2022.08 ~ 현재', '4인 · 팀장 (전반 개발 + 인프라 배포 주도)'],
    link: 'https://hjproject.kro.kr/chatforyou',
    repo: 'https://github.com/SeJonJ',
    desc: '"무료로 통화하는 Skype의 혁신을 직접 만들 수 있을까?"에서 출발해 1:1 → N:M → 다중 인스턴스 분산 운영까지 5년+ 발전시킨 사이드 프로젝트.',
    feats: [
      ['다중 인스턴스 WebRTC 분산 처리', 'WebRTC/Kurento 미디어 세션이 같은 방 참여자를 동일 인스턴스에서 처리하도록 Consistent Hashing + Redis room mapping·sticky session으로 라우팅, Kafka·SSE로 인스턴스 간 방 이벤트를 전파.'],
      ['Redis 런타임 상태 저장소', '방 상태·라우팅 매핑·인스턴스 heartbeat·sticky cookie·세션 관리.'],
      ['통신 방식 책임 분리', 'HTTP · WebSocket · SSE · WebRTC DataChannel · Kurento로 역할 분리.'],
      ['운영 / 배포', 'Docker·K8s(EKS), GitHub Actions CI/CD, 예외 표준화(ErrorCode·TraceId), MinIO·Electron.'],
    ],
    trouble: ['장기 WebSocket 연결 timeout 장애', 'Ingress/controller 계층만으로는 불안정하던 장기 연결을, 장애를 문서화·추적해 nginx sidecar + WebSocket timeout 정책으로 안정화.'],
    stack: ['Spring Boot', 'WebRTC', 'Kurento', 'Redis', 'Kafka', 'MinIO', 'K8s(EKS)', 'Docker'],
  },
  {
    name: 'Kokeetea 매출 관리·분석',
    one: '프랜차이즈 매출 관리 + Python 매출 분석·예측',
    meta: ['2022.11', '4인 · 팀장'],
    link: '',
    repo: '',
    desc: 'Spring Boot + JPA 매출 관리 + Python Flask/Pandas 분석·시각화. 50만 건+ 데이터 분석·매출 예측, Docker 기반 서비스 스택.',
    feats: [],
    trouble: null,
    stack: ['Spring Boot', 'JPA', 'Python', 'Flask', 'Pandas', 'Docker'],
  },
]

export const education = {
  edu: [
    '건국대학교 사회복지학과 졸업 (2020.07)',
    '자바 응용SW개발자 양성과정 수료 (2022.02~08)',
    '포스코 디지털 아카데미 1기 수료 (2022.10~12)',
  ],
  cert: ['리눅스 마스터 2급 (2021.03)'],
}
