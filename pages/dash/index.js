import React from "react";
import Sidebar from "../../components/layout/Sidebar";

function Dash() {
  const items = [
    {
      title: "Item 1",
      content: "Content of item 1",
    },
    {
      title: "Item 2",
      content: "Content of item 2",
    },
    {
      title: "Item 3",
      content: "Content of item 3",
    },
  ];
  return (
    <>
      <Sidebar items={items} />
    </>
  );
}

export default Dash;
