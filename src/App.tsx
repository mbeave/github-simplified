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
    <div className="flex flex-col justify-center items-center bg-neutral-300">
      <h1 className="text-center w-screen p-8 h-24 font-mono text-3xl font-bold text-white bg-neutral-500">GitHub Simplified</h1>
      <form className="bg-slate-100 font-bold py-5 px-52" onSubmit={handleSubmit}>
        <label>
          Enter URL:{""}
          <input className="" type="url" value={url} onChange={e => setUrl(e.target.value)} />
        </label>
      </form>
      <h5 className="text-left bg-neutral-700 text-white font-bold py-5 px-52">URL: {url}</h5>
      <div className="text-center">
        <RepoSimplifiedView url={url} />
      </div>
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
    <div className="">
      <a href={repoDownload}>
        <button className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-5 px-10 rounded">Download</button>
      </a>
      <div className="prose prose-slate prose-lg w-screen text-left">
        <Markdown>{md}</Markdown>
      </div>
    </div>
  );
}

export default App;
