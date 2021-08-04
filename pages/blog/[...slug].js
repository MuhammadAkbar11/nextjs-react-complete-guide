import { useRouter } from "next/router";

const BlogPostsPage = () => {
  const router = useRouter();

  const { query } = router;
  return (
    <div>
      <h1>Blog {query?.slug.join("-")}</h1>
    </div>
  );
};

export default BlogPostsPage;
