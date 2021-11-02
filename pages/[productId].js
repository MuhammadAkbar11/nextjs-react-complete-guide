import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";
import Link from "next/link";

function ProductDetailPage(props) {
  const { product } = props;
  return (
    <Fragment>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <Link href="/">Back to all products</Link>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  console.log(context);

  const { params } = context;
  const { productId } = params;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data?.products?.find(product => product.id === productId);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: "p1" } },
      { params: { productId: "p2" } },
      { params: { productId: "p3" } },
      { params: { productId: "p4" } },
      { params: { productId: "p5" } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;
