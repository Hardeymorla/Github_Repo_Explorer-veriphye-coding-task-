import type { LazyQueryExecFunction, OperationVariables } from "@apollo/client"
import type { Dispatch, SetStateAction } from "react"

type FormProps = {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>,
  fetchRepos: LazyQueryExecFunction<any, OperationVariables>,
  setRepositories: React.Dispatch<React.SetStateAction<any[]>>,
  setEndCursor: React.Dispatch<React.SetStateAction<string | null>>,
  setHasNextPage: Dispatch<SetStateAction<boolean>>
}

const Form = ({ username, setUsername, fetchRepos, setRepositories,
  setEndCursor, setHasNextPage }: FormProps) => {
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
    <>
      <h1 className="text-2xl font-bold mb-4">GitHub Repositories Explorer</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="border p-2 flex-1 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>
    </>
  )
}

export default Form
