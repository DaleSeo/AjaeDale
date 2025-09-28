import type { CollectionEntry } from "astro:content";

export interface GagWithLikes extends CollectionEntry<"gags"> {
  likes: number;
}

// GraphQL 쿼리 - 카테고리 필터링 제거하고 모든 discussions 가져오기
const DISCUSSIONS_QUERY = `
  query GetDiscussions($owner: String!, $name: String!, $after: String) {
    repository(owner: $owner, name: $name) {
      discussions(first: 100, after: $after) {
        nodes {
          title
          url
          category {
            name
            id
          }
          reactionGroups {
            content
            users {
              totalCount
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

// GitHub GraphQL API 호출
async function fetchFromGitHub(query: string, variables: Record<string, any>) {
  const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN || process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    return null;
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(
        `GitHub API 오류: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error("GitHub API 호출 실패:", error);
    return null;
  }
}

// 모든 discussions 가져오기 (페이지네이션 포함)
async function getAllDiscussions() {
  const discussions = [];
  let hasNextPage = true;
  let after = null;

  while (hasNextPage) {
    const result = await fetchFromGitHub(DISCUSSIONS_QUERY, {
      owner: "DaleSeo",
      name: "AjaeDale",
      after,
    });

    if (!result || result.errors) {
      console.error("❌ GitHub API 오류:", result?.errors || "Unknown error");
      break;
    }

    const { nodes, pageInfo } = result.data.repository.discussions;
    discussions.push(...nodes);

    hasNextPage = pageInfo.hasNextPage;
    after = pageInfo.endCursor;
  }

  return discussions;
}

// 개그 제목과 discussion 매칭
function matchGagToDiscussion(gagTitle: string, discussions: any[]) {
  return discussions.find((discussion) => discussion.title === gagTitle);
}

// 반응 수 계산 (전체 reactions)
function calculateTotalReactions(reactionGroups: any[]) {
  return reactionGroups.reduce((total, group) => {
    return total + group.users.totalCount;
  }, 0);
}

// 개그에 likes 데이터를 추가
export async function enrichGagsWithLikes(
  gags: CollectionEntry<"gags">[],
): Promise<GagWithLikes[]> {
  try {
    const discussions = await getAllDiscussions();

    if (!discussions) {
      return gags.map((gag) => ({ ...gag, likes: 0 }));
    }

    const enrichedGags: GagWithLikes[] = gags.map((gag) => {
      const discussion = matchGagToDiscussion(gag.data.title, discussions);
      const likes = discussion
        ? calculateTotalReactions(discussion.reactionGroups)
        : 0;
      return { ...gag, likes };
    });

    return enrichedGags;
  } catch (error) {
    console.error("likes 데이터 가져오기 실패:", error);
    return gags.map((gag) => ({ ...gag, likes: 0 }));
  }
}
