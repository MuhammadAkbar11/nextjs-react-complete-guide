import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";
import Link from "next/link";

function ProductDetailPage(props) {
  const { product } = props;

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <h2>{product?.title}</h2>
      <p>{product?.description}</p>
      <Link href="/">Back to all products</Link>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  console.log(context);

  const { params } = context;
  const { productId } = params;

  const data = await getData();

  const product = data?.products?.find(product => product.id === productId);
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const productIds = data.products.map(prod => prod.id);
  const pathWithParams = productIds.map(id => ({
    params: { productId: id },
  }));
  return {
    paths: pathWithParams,
    fallback: false, // false, true, blocking
  };
}

export default ProductDetailPage;
