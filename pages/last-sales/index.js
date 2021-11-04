import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSelesPage() {
  const [sales, setSales] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then(res => res.json());

  const { data, error } = useSWR(
    "https://nextjs-app-ce56a-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const toArr = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));

      setTimeout(() => {
        setSales(toArr);
      }, 2000);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(
  //     "https://nextjs-app-ce56a-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  //   )
  //     .then(response => response.json())
  //     .then(data => {
  //       const toArr = Object.keys(data).map(key => ({
  //         id: key,
  //         ...data[key],
  //       }));

  //       setTimeout(() => {
  //         setSales(toArr);
  //         setIsLoading(false);
  //       }, 2000);
  //     })
  //     .catch(err => {
  //       setIsLoading(false);
  //       console.log(err);
  //     });
  // }, []);

  if (error) {
    return <p>failed to load</p>;
  }

  console.log(data);

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {sales ? (
        <ul>
          {sales.map(sale => (
            <li key={sale.id}>
              {sale?.username} ({sale?.volume})
            </li>
          ))}
        </ul>
      ) : (
        <p>Empty Data.</p>
      )}
    </div>
  );
}

export default LastSelesPage;
