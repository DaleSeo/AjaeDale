import { BetaAnalyticsDataClient } from "@google-analytics/data";

// 페이지 조회수 데이터 타입
export interface PageViewData {
  pagePath: string;
  pageViews: number;
  slug?: string;
}

// 캐시된 Analytics 데이터 타입
export interface AnalyticsCache {
  data: PageViewData[];
  timestamp: number;
}

// GA4 속성 ID (환경 변수에서 가져오기)
const GA4_PROPERTY_ID =
  import.meta.env.GA4_PROPERTY_ID || process.env.GA4_PROPERTY_ID;

// 캐시 유효 시간 (1시간)
const CACHE_DURATION = 60 * 60 * 1000;

// 메모리 캐시
let analyticsCache: AnalyticsCache | null = null;

/**
 * Google Analytics 클라이언트 초기화
 */
function getAnalyticsClient() {
  try {
    // 환경 변수에서 직접 JSON credentials를 제공하는 경우 (deployment용)
    const credentialsJson =
      import.meta.env.GOOGLE_ANALYTICS_CREDENTIALS_JSON ||
      process.env.GOOGLE_ANALYTICS_CREDENTIALS_JSON;

    if (credentialsJson) {
      const credentials = JSON.parse(credentialsJson);
      return new BetaAnalyticsDataClient({
        credentials,
      });
    }

    // 파일 경로를 통한 인증 (local development용)
    return new BetaAnalyticsDataClient();
  } catch (error) {
    console.error("❌ Google Analytics 클라이언트 초기화 실패:", error);
    return null;
  }
}

/**
 * 모든 페이지의 조회수 가져오기
 */
export async function fetchPageViews(): Promise<PageViewData[]> {
  // 캐시 확인
  if (analyticsCache) {
    const now = Date.now();
    if (now - analyticsCache.timestamp < CACHE_DURATION) {
      console.log("📊 Analytics 캐시 사용");
      return analyticsCache.data;
    }
  }

  // GA4 속성 ID 확인
  if (!GA4_PROPERTY_ID) {
    console.warn(
      "⚠️ GA4_PROPERTY_ID 환경 변수가 설정되지 않았습니다. 조회수 데이터를 가져올 수 없습니다.",
    );
    return [];
  }

  const analyticsClient = getAnalyticsClient();
  if (!analyticsClient) {
    return [];
  }

  try {
    console.log("📊 Google Analytics에서 페이지 조회수 가져오는 중...");

    // 조회수 집계 기간 설정
    // 전체 기간 누적 조회수 (GA4 시작일부터)
    const [response] = await analyticsClient.runReport({
      property: `properties/${GA4_PROPERTY_ID}`,
      dateRanges: [
        {
          startDate: "2025-01-01", // GA4 시작일부터 전체 기간
          endDate: "today", // 종료일: 오늘
        },
      ],
      dimensions: [
        {
          name: "pagePath",
        },
      ],
      metrics: [
        {
          name: "screenPageViews",
        },
      ],
      orderBys: [
        {
          metric: {
            metricName: "screenPageViews",
          },
          desc: true,
        },
      ],
      limit: 1000, // 최대 1000개 페이지
    });

    if (!response.rows) {
      console.log("📊 페이지 조회수 데이터가 없습니다.");
      return [];
    }

    // 데이터 변환
    const pageViews: PageViewData[] = response.rows.map((row) => {
      const pagePath = row.dimensionValues?.[0]?.value || "";
      const pageViews = parseInt(row.metricValues?.[0]?.value || "0", 10);

      // URL에서 slug 추출 (/gags/slug 또는 /en/gags/slug 형태)
      let slug: string | undefined;
      const gagMatch = pagePath.match(/\/gags\/([^/]+)/);
      if (gagMatch) {
        slug = gagMatch[1];
      }

      return {
        pagePath,
        pageViews,
        slug,
      };
    });

    // 캐시 업데이트
    analyticsCache = {
      data: pageViews,
      timestamp: Date.now(),
    };

    console.log(
      `✅ ${pageViews.length}개 페이지의 조회수 데이터를 가져왔습니다.`,
    );
    return pageViews;
  } catch (error) {
    console.error("❌ Google Analytics API 호출 실패:", error);
    return [];
  }
}

/**
 * 특정 개그 slug의 조회수 가져오기
 */
export async function getPageViewsBySlug(slug: string): Promise<number> {
  const allPageViews = await fetchPageViews();

  // 한국어와 영어 페이지 조회수를 합산
  const totalViews = allPageViews.reduce((total, page) => {
    if (page.slug === slug) {
      return total + page.pageViews;
    }
    return total;
  }, 0);

  return totalViews;
}

/**
 * slug별 조회수 맵 생성
 */
export async function getPageViewsMap(): Promise<Map<string, number>> {
  const allPageViews = await fetchPageViews();
  const viewsMap = new Map<string, number>();

  allPageViews.forEach((page) => {
    if (page.slug) {
      const currentViews = viewsMap.get(page.slug) || 0;
      viewsMap.set(page.slug, currentViews + page.pageViews);
    }
  });

  return viewsMap;
}

/**
 * 조회수 포맷팅 (1000 -> 1K, 1000000 -> 1M)
 */
export function formatViewCount(count: number): string {
  if (count < 1000) {
    return count.toString();
  }

  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}K`;
  }

  return `${(count / 1000000).toFixed(1)}M`;
}
