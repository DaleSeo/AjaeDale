# 아재달레 이미지 관리 가이드

## 📁 폴더 구조

```
src/
├── assets/
│   └── images/
│       ├── meme-templates/    # 재사용 가능한 밈 템플릿
│       ├── reactions/          # 반응 이미지/이모티콘
│       ├── illustrations/     # 일러스트레이션
│       └── screenshots/       # 스크린샷
├── content/
│   ├── gags/
│   │   ├── 2024-01-01-title.json
│   │   └── images/            # 개그별 고유 이미지
│   │       └── 2024-01-01-title.png
│   └── assets/                # 공유 에셋 메타데이터
│       └── meme-drake.json
```

## 🎨 이미지 사용 방법

### 1. 개그에 이미지 추가 (JSON)

```json
{
  "title": "버그 잡는 개발자",
  "format": "text",
  "body": "버그 하나 잡으면 두 개가 생긴다",
  "image": "./images/bug-hydra.png",
  "imageCaption": "하이드라인가?"
}
```

### 2. 개그에 이미지 추가 (Markdown)

```markdown
---
title: "버그 잡는 개발자"
format: text
image: ./images/bug-hydra.png
imageCaption: "하이드라인가?"
---

버그 하나 잡으면 두 개가 생긴다
```

### 3. Astro 컴포넌트에서 사용

```astro
---
import { Image } from "astro:assets";
import { getCollection } from "astro:content";

const gags = await getCollection("gags");
---

{
  gags.map((gag) => (
    <article>
      <h2>{gag.data.title}</h2>
      {gag.data.image && (
        <Image
          src={gag.data.image}
          alt={gag.data.imageCaption || gag.data.title}
          width={800}
          height={600}
          loading="lazy"
        />
      )}
    </article>
  ))
}
```

## 🚀 장점

1. **자동 최적화**: Astro가 빌드 시 이미지 최적화
   - WebP 변환
   - 반응형 이미지 생성
   - 레이지 로딩

2. **타입 안전성**: 스키마로 이미지 검증

   ```typescript
   image: image().optional(); // 이미지 파일 존재 여부 자동 체크
   ```

3. **버전 관리**: Git으로 이미지도 함께 관리
   - Git LFS 사용 권장 (대용량 이미지)

4. **유연한 구조**:
   - 개그별 고유 이미지: `content/gags/images/`
   - 재사용 템플릿: `assets/images/meme-templates/`

## 📝 Git LFS 설정

```bash
# Git LFS 초기화
git lfs install

# 이미지 파일 추적
git lfs track "*.png"
git lfs track "*.jpg"
git lfs track "*.jpeg"
git lfs track "*.gif"
git lfs track "*.webp"

# .gitattributes 커밋
git add .gitattributes
git commit -m "Configure Git LFS for images"
```

## 🎯 베스트 프랙티스

1. **파일명 규칙**: `YYYY-MM-DD-descriptive-name.png`
2. **최대 크기**: 원본 2MB 이하 권장
3. **Alt 텍스트**: 항상 의미 있는 설명 제공
4. **포맷**: PNG (투명), JPG (사진), WebP (최적화)

## 🔄 마이그레이션 계획

### Phase 1: 텍스트 개그

- 현재 구조 유지
- 이미지 없이 운영

### Phase 2: 이미지 추가

- 선택적으로 이미지 추가
- Astro Image 컴포넌트 활용

### Phase 3: 밈 템플릿

- 자주 쓰는 템플릿 assets으로 관리
- 재사용성 극대화
