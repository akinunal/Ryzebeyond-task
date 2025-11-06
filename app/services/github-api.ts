import { GithubContributor, GithubRepo } from '@/types/github';

export const githubApi = {
  getUserRepos: async (username: string): Promise<GithubRepo[]> => {
    if (!username.trim()) return [];
    
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    return response.json();
  },

  getRepo: async (owner: string, repo: string): Promise<GithubRepo> => {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Repository "${owner}/${repo}" not found`);
      }
      throw new Error(`Failed to fetch repository: ${response.status}`);
    }

    return response.json();
  },
  getContributors: async (owner: string, repo: string): Promise<GithubContributor[]> => {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Contributors "${owner}/${repo}" not found`);
      }
      throw new Error(`Failed to fetch contributors: ${response.status}`);
    }

    return response.json();
  },
};