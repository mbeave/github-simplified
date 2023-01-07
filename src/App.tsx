import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`You entered: ${url}`);
  }

  return (
    <div className=" flex-col">
      <h1 className="text-center p-12 font-mono text-3xl font-bold text-white bg-neutral-500">GitHub Simplified</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter URL:{""}
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} />
        </label>
        <input type="submit"/>
      </form>
      <h5>URL: {url}</h5>
    </div>
  );
};

export default App;
