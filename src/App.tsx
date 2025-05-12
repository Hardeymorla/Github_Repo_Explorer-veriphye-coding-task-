import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_REPOS } from './graphql/queries';
import RepoList from './components/RepoList';
import LanguageFilter from './components/LanguageFilter';
import SortSelector from './components/SortSelector';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage.tsx';
import Form from './components/Form.tsx';
import LoadMoreButton from './components/LoadMoreButton.tsx';

function App() {
  const [username, setUsername] = useState('');
  const [languageFilter, setLanguageFilter] = useState<string>('All');
  const [sortOption, setSortOption] = useState<string>('stars');

  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [fetchRepos, { data, loading, error, fetchMore }] = useLazyQuery(GET_USER_REPOS, {
    notifyOnNetworkStatusChange: true, // lets loading update during fetchMore
  });
  
  // on completed
  useEffect(() => {
    if (data?.user?.repositories) {
      const newRepos = data.user.repositories.nodes;
      const pageInfo = data.user.repositories.pageInfo;
      
      setRepositories(newRepos);
      setEndCursor(pageInfo.endCursor);
      setHasNextPage(pageInfo.hasNextPage);
    }
  }, [data]);
  
  // setting up the filter and sort
  const [repositories, setRepositories] = useState(data?.user?.repositories?.nodes ?? []);
  const filteredRepos = repositories
    .filter((repo: any) => {
      if (languageFilter === 'All') return true;
      return repo.primaryLanguage?.name === languageFilter;
  })
    .sort((a:any, b:any) => {
      if (sortOption === 'stars') {
        return b.stargazerCount - a.stargazerCount;
    } else {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setRepositories([]); // reset
    setEndCursor(null);
    setHasNextPage(false);
    
    if (username) {
      fetchRepos({ variables: { username, first: 10 } });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Form
        handleSubmit={handleSubmit}
        username={username}
        setUsername={setUsername}
      />

      {loading && <Loader />}
      {error && <ErrorMessage message={error.message} />}
      {data?.user?.repositories?.nodes &&
        <>
          <LanguageFilter value={languageFilter} onChange={setLanguageFilter} />
          <SortSelector value={sortOption} onChange={setSortOption} />
          <RepoList filteredRepos={filteredRepos}  />
          <LoadMoreButton
            username={username}
            endCursor={endCursor}
            fetchMore={fetchMore}
            setRepositories={setRepositories}
            setEndCursor={setEndCursor}
            setHasNextPage={setHasNextPage}
            hasNextPage={hasNextPage}
          />
        </>
      }
    </div>
  );
}

export default App;
