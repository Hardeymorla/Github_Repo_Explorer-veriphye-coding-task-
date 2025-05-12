type FormProps = {
    handleSubmit: (e: React.FormEvent) => void
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
}

const Form = ( {handleSubmit, username, setUsername}: FormProps) => {
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
