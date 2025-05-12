interface filteredRepo {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  updatedAt: string;
  url: string;
  primaryLanguage: { name: string } | null;
}

const RepoList = ({ filteredRepos }: { filteredRepos: filteredRepo[] }) => {

  return (
    <ul className="space-y-4">
      {filteredRepos.map((repo) => (
        <li key={repo.name} className="border p-4 rounded shadow">
          <a href={repo.url} className="text-xl font-semibold text-blue-700"
            target="_blank" rel="noreferrer">
            {repo.name}
          </a>
          {repo.description && <p>{repo.description}</p>}
          <div className="text-sm text-gray-600 mt-2">
            ⭐ {repo.stargazerCount} | 🍴 {repo.forkCount} |
            Updated: {new Date(repo.updatedAt).toLocaleDateString()}
          </div>
          {repo.primaryLanguage?.name && (
            <div className="text-sm text-purple-600 mt-1">
              Language: {repo.primaryLanguage.name}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default RepoList;
