import { useEffect, useState } from "react";

function LastSelesPage() {
  const [sales, setSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://nextjs-app-ce56a-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
    )
      .then(response => response.json())
      .then(data => {
        const toArr = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        setTimeout(() => {
          setSales(toArr);
          setIsLoading(false);
        }, 2000);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          {sales ? (
            <ul>
              {sales.map(sale => (
                <li key={sale.id}>
                  {sale?.username} ({sale?.volume})
                </li>
              ))}
            </ul>
          ) : (
            <p>Empty Data</p>
          )}
        </>
      )}
    </div>
  );
}

export default LastSelesPage;
