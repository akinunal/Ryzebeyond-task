'use client';

import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import { useGetUserRepos } from './services/github-queries';
import RepoList from './components/RepoList';
import SearchInput from './components/SearchInput';

export default function Home() {
  const [username, setUsername] = useState('');
  const debouncedUsername = useDebounce(username, 500);

  const { 
    data: repos = [], 
    isLoading, 
    error 
  } = useGetUserRepos(debouncedUsername);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          GitHub Repository Explorer
        </h1>
        
        <SearchInput
          value={username}
          onChange={setUsername}
          placeholder="Enter GitHub username..."
        />

        <RepoList
          repos={repos}
          isLoading={isLoading}
          error={error}
          username={debouncedUsername}
        />
      </div>
    </div>
  );
}