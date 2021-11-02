import path from "path";
import fs from "fs/promises";
import { Fragment } from "react";

function ProductDetailPage(props) {
  console.log(props);
  return (
    <Fragment>
      <h2>Title</h2>
      <p>Description</p>
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

export default ProductDetailPage;
