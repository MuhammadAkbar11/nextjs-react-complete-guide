import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();

  console.log(router);
  return (
    <div>
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, labore.
      </h1>

      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo
        repellendus et inventore delectus laboriosam vero officia aut rerum quia
        cum neque, beatae officiis alias voluptatibus sequi dicta error sed
        recusandae.
      </p>
    </div>
  );
}

export default SelectedClientProjectPage;
