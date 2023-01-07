import { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";

interface UrlProp {
  url: string;
}

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
      <RepoSimplifiedView url={url} />
    </div>
  );
}

function RepoSimplifiedView(props: UrlProp) {
  const [md, setMd] = useState('');

  const repoDownload = `${props.url}/archive/refs/heads/master.zip`;
  const urlSplit = props.url.split('/');
  const userName = urlSplit[3];
  const repoName = urlSplit[4];
  const repoMarkdown = `https://raw.githubusercontent.com/${userName}/${repoName}/master/README.md`;

  useEffect(() => {
    fetch(repoMarkdown)
      .then(res => res.text())
      .then(res => setMd(res))
  });

  return (
    <div>
      <a href={repoDownload}>
        <button>Download</button>
      </a>
      <Markdown>{md}</Markdown>
    </div>
  );
}

export default App;
