// 한글 태그를 영문 슬러그로 변환하는 유틸리티

const TAG_MAPPING: Record<string, string> = {
  // 한글 기본
  왕: "wang",
  킹콩: "kingkong",
  괌: "guam",
  과메기: "guamegi",
  애기: "baby",

  // 영문/혼합
  "DJ DOC": "dj-doc",
  이란: "iran",
  국적: "nationality",

  // 기타 일반적인 태그들 (기존 데이터 기반으로 추가 예정)
  비: "rain",
  로스앤젤레스: "los-angeles",
  가수: "singer",
  노루: "deer",
  길: "road",
  산: "mountain",
  물: "water",
  사과: "apple",
  돈: "money",
  발: "foot",
  감기: "cold",
  남녀: "couple",
  해돋이: "sunrise",
  팥: "redbean",
  콩: "bean",
  대학생: "student",
  학: "crane",
  침: "saliva",
  백: "hundred",
  꽃: "flower",
  병원: "hospital",
  숫소: "bull",
  암소: "cow",
  나폴레옹: "napoleon",
  전쟁: "war",
  빨간: "red",
  벨트: "belt",
  로봇: "robot",
  형사: "detective",
  가제트: "gadget",
  이탈리아: "italy",
  날씨: "weather",
  병아리: "chick",
  약: "medicine",
  피: "blood",
  누릉지: "nurungji",
  옥수수: "corn",
  북한: "north-korea",
  일본: "japan",
  무: "radish",
  눈물: "tear",
  기독교: "christian",
  강아지: "dog",
  오리: "duck",
  시험: "exam",
  구조대: "rescue-team",
  이세돌: "lee-sedol",
  기사: "knight",
  아들: "son",
  돌잔치: "doljanchi",
  어린: "young",
  물고기: "fish",
  숫자: "number",
  화: "anger",
  고양이: "cat",
  지옥: "hell",
  아빠: "dad",
  차: "car",
  다리미: "iron",
  음식: "food",
  얼굴: "face",
  예쁜: "pretty",
  속: "inside",
  여자: "woman",
  이상한: "strange",
  사람: "people",
  바나나: "banana",
  우유: "milk",
  슈퍼주니어: "super-junior",
  신동: "shindong",
  설날: "lunar-new-year",
  세뱃돈: "new-year-money",
  몸: "body",
  소: "cow-general",
  노래: "song",
  처음: "first",
  장사: "business",
  동물: "animal",
  자유: "freedom",
  여신상: "statue-of-liberty",
  자동차: "automobile",
  수자원: "water-resource",
  발전소: "power-plant",
  소장: "director",
  한의사: "oriental-doctor",
  카지노: "casino",
  팥쥐: "patjwi",
  독: "poison",
  시간: "time",
  미꾸라지: "loach",
  하늘: "sky",
  달: "moon",
  나무: "tree-general",
  아차산: "achasan",
  신사: "gentleman",
  예술가: "artist",
  스님: "monk",
  공중부양: "levitation",
  딸기: "strawberry",
  직장: "job",
  생활: "life",
  지혜: "wisdom",
  속담: "proverb",
  거짓말: "lie",
  입: "mouth",
  암탉: "hen",
  집: "house",
  높은: "high",
  곳: "place",
  착한: "kind",
  사자: "lion",
  돼지: "pig",
  침대: "bed",
  택시: "taxi",
  도둑: "thief",
  과자: "snack",
  아이스크림: "ice-cream",
  소금: "salt",
  유통기한: "expiration-date",
  욕심: "greed",
  베를린: "berlin",
  반대말: "antonym",
  공룡: "dinosaur",
  멸종: "extinction",
  잔인한: "cruel",
  비빔밥: "bibimbap",
  머리: "head",
  빡빡: "bald",
  중: "monk-general",
  혀: "tongue",
  맥주: "beer",
  능: "tomb",
  개미: "ant",
  목구멍: "throat",
  펭귄: "penguin",
  고등학교: "high-school",
  어부: "fisherman",
  막대기: "stick",
  바람: "wind",
  외국: "foreign",
  한식: "korean-food",

  // 추가 매핑 (한글 URL 방지)
  "119": "emergency",
  "3월": "march",
  결혼: "marriage",
  과일: "fruit",
  나라: "country",
  높은곳: "high-place",
  다섯: "five",
  닭: "chicken",
  도끼: "axe",
  도로: "road-street",
  도시: "city",
  떡집: "rice-cake-shop",
  만원: "ten-thousand-won",
  말: "horse",
  목마름: "thirsty",
  미남: "handsome",
  미안: "sorry",
  바나나우유: "banana-milk",
  백곱하기: "hundred-times",
  사랑: "love",
  사자성어: "four-character-idiom",
  술: "alcohol",
  스파게티: "spaghetti",
  식물: "plant",
  엘리베이터: "elevator",
  영어: "english",
  영화: "movie",
  옷: "clothes",
  외국인: "foreigner",
  웃음: "laughter",
  유명: "famous",
  인물: "person",
  인사: "greeting",
  자유의여신상: "statue-of-liberty-full",
  잔인: "cruel-general",
  전주: "jeonju",
  정치: "politics",
  주식: "stock",
  죽: "porridge",
  지역: "region",
  짧게: "short",
  차도: "roadway",
  참깨: "sesame",
  천원: "thousand-won",
  치아: "teeth",
  파산: "bankruptcy",
  할아버지: "grandfather",
  호박: "pumpkin",
  힘: "strength",
};

/**
 * 한글 태그를 영문 슬러그로 변환
 */
export function tagToSlug(tag: string): string {
  // 직접 매핑이 있는 경우 사용
  if (TAG_MAPPING[tag]) {
    return TAG_MAPPING[tag];
  }

  // 매핑이 없는 경우 에러를 발생시켜 한글 URL 방지
  console.error(`Warning: No English mapping found for Korean tag: "${tag}"`);
  console.error(`Please add mapping in src/utils/tagUtils.ts`);

  // 개발 환경에서는 에러를 발생시키고, 프로덕션에서는 기본 처리
  if (import.meta.env.DEV) {
    throw new Error(
      `No English mapping for tag: "${tag}". Please add it to TAG_MAPPING in tagUtils.ts`,
    );
  }

  // 프로덕션에서는 경고만 하고 영문/숫자만 있는 태그는 그대로 사용
  if (/^[a-z0-9-]+$/i.test(tag)) {
    return tag.toLowerCase().replace(/\s+/g, "-");
  }

  // 한글이 포함된 경우 에러
  throw new Error(`Korean tag "${tag}" needs English mapping in tagUtils.ts`);
}

/**
 * 영문 슬러그를 한글 태그로 역변환
 */
export function slugToTag(slug: string): string | null {
  // 매핑에서 해당 슬러그를 가진 태그 찾기
  for (const [tag, mappedSlug] of Object.entries(TAG_MAPPING)) {
    if (mappedSlug === slug) {
      return tag;
    }
  }

  return null; // 매핑을 찾을 수 없는 경우
}

/**
 * 모든 가능한 태그 슬러그 목록 반환
 */
export function getAllTagSlugs(): string[] {
  return Object.values(TAG_MAPPING);
}

/**
 * 특정 태그가 매핑되어 있는지 확인
 */
export function isTagMapped(tag: string): boolean {
  return tag in TAG_MAPPING;
}
