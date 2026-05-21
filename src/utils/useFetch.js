import { useState, useEffect } from "react";

const inProgress = {};

async function retryFetch(url, retries = 5, delay = 1000) { // försöker fetcha url:en upp till 5 gånger med 1 sekunds mellanrum ifall Strapi inte hunnit starta än
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

export default function useFetch(...urls) {
  const [data, setData] = useState(new Array(urls.length));
  const [loading, setLoading] = useState(true);

  function update() {
    inProgress[urls] =
      inProgress[urls] ||
      urls.map((url) => retryFetch(url));
    (async () => {
      setData(combineDataAndMetaToAarray(await Promise.all(inProgress[urls])));
      setLoading(false);
      delete inProgress[urls];
    })();
  }

  useEffect(update, []);
  return [...data, loading, update];
}

function combineDataAndMetaToAarray(dataArray) {
  return dataArray.map(({ data, meta }) => Object.assign(data, meta));
}
