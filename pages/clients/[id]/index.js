import { useRouter } from "next/router";
import Link from "next/link";

function ClientProjectsPage() {
  const router = useRouter();

  const { query } = router;
  return (
    <div>
      <Link href="/clients">Back to list of clients</Link>
      <h1>The Projects of a Given Client</h1>
      <h4
        style={{
          textTransform: "capitalize",
        }}
      >
        By : {query.id}
      </h4>
    </div>
  );
}

export default ClientProjectsPage;
