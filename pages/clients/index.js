import Link from "next/link";

function ClientsPage() {
  return (
    <div>
      <Link href="/">Back to home</Link>
      <h1>The Clients Page</h1>

      <h5>Clients: </h5>
      <ul>
        {["Winter", "Dubu", "Suzy", "Sharon"].map((client, i) => {
          const key = i;
          return (
            <li key={key}>
              <Link href={`/clients/${client}`}>{client}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ClientsPage;
