import MainFooter from "./MainFooter";
import MainHeader from "./MainHeader";

function Layout(props) {
  return (
    <>
      <div
        style={{
          minHeight: "100vh",
        }}
        className="  d-flex flex-column "
      >
        <MainHeader />
        <main className="flex-shrink-0">{props.children}</main>
        <MainFooter />
      </div>
    </>
  );
}

export default Layout;
