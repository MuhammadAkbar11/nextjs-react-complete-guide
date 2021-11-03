function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}
export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  // console.log(req);

  return {
    props: {
      username: "Ji",
    },
  };
}
