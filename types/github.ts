export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  size: number;
  default_branch: string;
  visibility: string;
  archived: boolean;
  fork: boolean;
}

export interface GithubContributor {
  login: string;
  contributions: string;
}