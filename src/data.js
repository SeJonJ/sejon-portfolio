export const profile = {
  name: '장세존',
  handle: 'sejon',
  role: 'Backend Engineer · 4년차',
  headline: ['복잡한 문제를', '운영 가능한 구조로 풀어냅니다.'],
  summary:
    '실시간·분산 시스템부터 금융권 전자서명까지, Java/Spring Boot로 설계하고 운영하는 백엔드 개발자',
  bridge:
    "회사에서 익힌 '새 도메인을 내 방식으로 분석·적용하는 접근'으로, 회사에서 쓰지 않던 Redis·Kafka·K8s를 사이드 프로젝트 ChatForYou에서 직접 도입·운영하며 체득했습니다.",
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
    d: 'Java/Spring Boot로 전자서명·전자인장 시스템의 RDB·API 설계를 주도. 외부 결재 시스템 연동은 API를 에러 케이스까지 분석하고 팀 공용 Mock 서버를 구축해 연동 신뢰성을 확보. 핵심 인력으로 스펙 결정·설계 리뷰에 참여.',
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
    roles: [
      {
        title: '제품 개발·운영 (상시)',
        period: '',
        summary: 'eformsign 본체 기능 개발·운영 및 OpenAPI 설계',
        points: [
          'OpenAPI를 요청/응답·토큰·문서 검증 흐름까지 설계하고 위키 문서화·테스트 케이스로 검증',
          'CouchDB 레거시 문서 history의 웹↔PDF 불일치를 교차검증으로 해결해 신뢰성 개선',
        ],
      },
      {
        title: '전자인장 고도화 + 전자서명',
        org: '대형 증권사',
        period: '2026.04~',
        summary: '전자인장 잔류 2인 중 1인 핵심 인력 — 팀장(수석)과 스펙·설계 리뷰 주도',
        points: [
          'RDB 8~10개 테이블(서명·서명권한·문서) 직접 설계·컨펌',
          '내부 결재 연동 코드 전체 리팩토링(중복 코드·검증 제거) → 결재 요청·완료 체감 약 3초→1초',
          '결재 승인 장애를 로그·DB 분석 → Mock 재현 → 근본 수정·데이터 복구로 대응',
        ],
      },
      {
        title: '전자서명',
        org: '국내 공기업',
        period: '2025.10~2026.03',
        summary: 'eformsign 커스텀과 내부시스템 연동 두 프로젝트를 API로 연동 개발',
        points: [
          '연동 DB의 불필요한 중복 저장·삭제 정책(hard/soft) 비일관성 리스크를 사전 발견',
          '동료·팀장에 보고하고 DB 재설계를 이끌어 일정 지연 없이 진행',
        ],
      },
      {
        title: '전자인장',
        org: '대형 증권사',
        period: '2024.05~12',
        summary: '법인인감·대외공문 도메인을 학습하며 내부 결재 연동 개발',
        points: [
          '외부 API를 에러 케이스까지 분석하고, 결재/반려/회수가 가능한 팀 공용 Mock 서버 구축 — 연동 버그 사전 방어',
          '오류 시 전체 flow 기준 rollback을 설계해 예외 상황까지 복구',
        ],
      },
      {
        title: '전자서명',
        org: '대기업 계열사',
        period: '2023.06~12',
        summary: '대량 일괄 문서(100~1000건) 작성 기능을 신규 프로젝트로 구축',
        points: [
          'eformsign 비동기 batch를 생성 완료 Webhook으로 동기화',
          '1 batchId:N docId 구조를 N건씩 분할 처리 + 에러 로그·retry로 무결성·요청 단일성 보장',
        ],
      },
    ],
  },
  {
    when: '2020.07 — 2021.07',
    org: 'SK쉴더스 (구 SK인포섹) · 보안관제(SOC)',
    note: '',
    roles: [
      {
        title: '보안 관제 및 보안 접근 제어 시스템 운영',
        period: '',
        summary: '',
        points: [],
      },
    ],
  },
]

export const projects = [
  {
    name: 'ChatForYou v2',
    one: 'WebRTC/Kurento 기반 N:M 화상채팅·실시간 협업 플랫폼',
    meta: ['2022.08 ~ 현재', '4인 · 팀장 (전반 개발 + 인프라 배포 주도)'],
    link: 'https://hjproject.kro.kr/chatforyou',
    repo: 'https://github.com/SeJonJ',
    desc: '"무료로 통화하는 Skype의 혁신을 직접 만들 수 있을까?"에서 출발해 1:1 → N:M → 다중 인스턴스 분산 운영까지 5년+ 발전시킨 사이드 프로젝트. 회사에서 다루지 않은 Redis·Kafka·K8s를, 업무에서 익힌 \'새 기술을 두려워하지 않는 접근\'으로 직접 도입·운영한 무대이기도 하다.',
    feats: [
      ['다중 인스턴스 WebRTC 분산 처리', 'WebRTC/Kurento 미디어 세션이 같은 방 참여자를 동일 인스턴스에서 처리하도록 Consistent Hashing + Redis room mapping·sticky session으로 라우팅, Kafka·SSE로 인스턴스 간 방 이벤트를 전파.'],
      ['Redis 런타임 상태 저장소', '방 상태·라우팅 매핑·인스턴스 heartbeat·sticky cookie·세션 관리.'],
      ['통신 방식 책임 분리', 'HTTP · WebSocket · SSE · WebRTC DataChannel · Kurento로 역할 분리.'],
      ['CatchMind 실시간 드로잉 게임', 'WebRTC DataChannel로 한 사용자가 그리는 그림을 다른 참여자 화면에 실시간 전송. 출제 주제는 Python AI 서버로 생성(장애 시 기본 주제 fallback)하는 등 Python·AI 연동을 직접 구현.'],
      ['운영 / 배포', 'Docker·K8s(EKS), GitHub Actions CI/CD, 예외 표준화(ErrorCode·TraceId), MinIO·Electron.'],
    ],
    troubles: [
      ['장기 WebSocket 연결 timeout 장애', 'Ingress/controller 계층만으로는 불안정하던 장기 연결을, 장애를 문서화·추적해 nginx sidecar + WebSocket timeout 정책으로 안정화.'],
      ['CatchMind 정답 인식 개선 (음성 → 음성+채팅)', '기존엔 음성으로만 정답을 맞출 수 있었으나, 음성 인식 정확도를 프론트·백엔드 양쪽에서 개선하고 Komoran 형태소 분석 기반 정답 힌트를 추가. 음성 인식 실패 시 채팅으로도 정답 입력이 가능하도록 보완.'],
    ],
    stack: ['Spring Boot', 'WebRTC', 'Kurento', 'Redis', 'Kafka', 'MinIO', 'K8s(EKS)', 'Docker'],
  },
  {
    name: 'SAGE',
    one: 'AI 코딩 에이전트 거버넌스·검증 하네스',
    meta: ['2025 ~ 현재', '개인 프로젝트 · 설계 / 구현 / 검증'],
    link: '',
    repo: 'https://github.com/SeJonJ/SAGE',
    desc: 'AI 코딩 에이전트가 고위험 변경의 계획·검증 단계를 건너뛰거나 생성 산출물이 drift되는 문제를 줄이기 위해 개발한 Python 기반 거버넌스 하네스.',
    feats: [
      ['Spec 기반 설정 생성·검증', 'Hook·agent·skill 설정을 단일 spec에서 생성하고, 생성물과 spec의 drift를 검증.'],
      ['위험도·PDCA 게이트', '고위험 변경의 계획 문서와 단계 전환 조건을 검증해 누락 시 실행을 차단.'],
      ['AI 품질 검증 자동화', 'Claude Code·Codex 양쪽 runtime을 지원하고, hook 회귀 테스트와 CI로 동작을 검증.'],
    ],
    troubles: [],
    stack: ['Python', 'JSON Schema', 'Bash', 'GitHub Actions', 'Claude Code', 'Codex'],
  },
  {
    name: 'Kokeetea 매출 관리·분석',
    one: '프랜차이즈 매출 관리 + Python 매출 분석·예측',
    meta: ['2022.11', '4인 · 팀장'],
    link: '',
    repo: '',
    desc: 'Spring Boot + JPA 매출 관리 + Python Flask/Pandas 분석·시각화. 50만 건+ 데이터 분석·매출 예측, Docker 기반 서비스 스택.',
    feats: [],
    troubles: [],
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
