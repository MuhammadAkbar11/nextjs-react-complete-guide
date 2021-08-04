import { useRouter } from "next/router";
import Link from "next/link";

function ClientProjectsPage() {
  const router = useRouter();

  const { query } = router;

  const loadProjectHandler = () => {
    // load data...
    router.push(`/clients/${query.id}/projectA`);
  };

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

      <br />
      <button onClick={loadProjectHandler}>Load Project {query.id}</button>
    </div>
  );
}

export default ClientProjectsPage;
