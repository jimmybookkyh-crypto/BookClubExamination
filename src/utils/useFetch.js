import { useState, useEffect } from "react";

const inProgress = {};

export default function useFetch(...urls) {
  const [data, setData] = useState(new Array(urls.length));
  const [loading, setLoading] = useState(true);

  function update() {
    inProgress[urls] =
      inProgress[urls] ||
      urls.map((url) => fetch(url).then((response) => response.json()));
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
