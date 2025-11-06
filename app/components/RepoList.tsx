'use client';

import { useState, useMemo } from 'react';
import { GithubRepo } from '../../types/github';
import Link from 'next/link';

interface RepoListProps {
  repos: GithubRepo[];
  isLoading: boolean;
  error: Error | null;
  username: string;
}

type SortOption = 'none' | 'stars-asc' | 'stars-desc';

export default function RepoList({ 
  repos, 
  isLoading, 
  error, 
  username 
}: RepoListProps) {
  const [sortOption, setSortOption] = useState<SortOption>('none');

  // Sort repositories based on selected option
  const sortedRepos = useMemo(() => {
    if (sortOption === 'none') return repos;

    return [...repos].sort((a, b) => {
      switch (sortOption) {
        case 'stars-asc':
          return a.stargazers_count - b.stargazers_count;
        case 'stars-desc':
          return b.stargazers_count - a.stargazers_count;
        default:
          return 0;
      }
    });
  }, [repos, sortOption]);

  const handleSortChange = () => {
    // Cycle through sort options: none -> desc -> asc -> none
    switch (sortOption) {
      case 'none':
        setSortOption('stars-desc');
        break;
      case 'stars-desc':
        setSortOption('stars-asc');
        break;
      case 'stars-asc':
        setSortOption('none');
        break;
    }
  };

  const getSortButtonText = () => {
    switch (sortOption) {
      case 'stars-desc':
        return '⭐ Sort: Most Stars';
      case 'stars-asc':
        return '⭐ Sort: Fewest Stars';
      default:
        return '⭐ Sort by Stars';
    }
  };

  if (!username) {
    return (
      <div className="text-center text-gray-500 py-8">
        Enter a GitHub username to search for repositories
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-center">
        Error loading repositories: {error.message}
      </div>
    );
  }

  if (repos.length === 0 && username) {
    return (
      <div className="text-center text-gray-500 py-8">
        No repositories found for user {username}
      </div>
    );
  }

  return (
    <div>
      {/* Sort Button */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          Showing {repos.length} repositories
          {sortOption !== 'none' && (
            <span className="ml-2">
              (sorted by stars {sortOption === 'stars-desc' ? '↓' : '↑'})
            </span>
          )}
        </p>
        
        <button
          onClick={handleSortChange}
          className={`px-4 py-2 rounded-lg border transition-colors ${
            sortOption === 'none' 
              ? 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200' 
              : 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200'
          }`}
        >
          {getSortButtonText()}
        </button>
      </div>

      {/* Repository List */}
      <div className="flex flex-wrap flex-row gap-4">
        {sortedRepos.map((repo) => (
          <Link 
            key={repo.id} 
            href={`/repos/${repo.owner.login}/${repo.name}`}
          >
            <div
              className="w-[200px] h-auto bg-gray-100 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col justify-between text-center h-full">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {repo.name}
                </h3>
                
                {repo.description && (
                  <p className="text-gray-600 mb-3">{repo.description}</p>
                )}
                
                <div className="flex flex-row justify-between text-sm text-gray-500">
                  <div>
                    <span className="flex items-center">
                      ⭐
                    </span>
                    <span className="flex items-center">
                      {repo.stargazers_count.toLocaleString()} stars
                    </span>
                  </div>
                  <div>
                    <span className="flex items-center">
                      📌
                    </span>
                    <span className="flex items-center">
                      {repo.language || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}