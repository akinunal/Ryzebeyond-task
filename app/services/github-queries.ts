import { useQuery } from '@tanstack/react-query';
import { githubApi } from './github-api';
import { GithubContributor, GithubRepo } from '@/types/github';

export const queryKeys = {
  repos: {
    byUser: (username: string) => ['repos', 'user', username] as const,
    byId: (owner: string, repo: string) => ['repo', 'detail', owner, repo] as const,
    byContributors: (owner: string, repo: string) => ['contributors', owner, repo] as const,
  },
} as const;

export const useGetUserRepos = (username: string) => {
  return useQuery<GithubRepo[], Error>({
    queryKey: queryKeys.repos.byUser(username),
    queryFn: () => githubApi.getUserRepos(username),
    enabled: !!username.trim(),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetRepo = (owner: string, repo: string) => {
  return useQuery<GithubRepo, Error>({
    queryKey: queryKeys.repos.byId(owner, repo),
    queryFn: () => githubApi.getRepo(owner, repo),
    enabled: !!owner && !!repo,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetContributors = (owner: string, repo: string) => {
  return useQuery<GithubContributor[], Error>({
    queryKey: queryKeys.repos.byContributors(owner, repo),
    queryFn: () => githubApi.getContributors(owner, repo),
    enabled: !!owner && !!repo,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};