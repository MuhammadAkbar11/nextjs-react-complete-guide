import path from "path";
import fs from "fs/promises";
import Link from "next/link";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          {product.title} <Link href={`/${product.id}`}>Detail</Link>{" "}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  console.log("(Re-) Generating");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    // notFound: true, // Menampilkan 404 page
    // redirect:
  };
}

export default HomePage;
