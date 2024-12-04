import React from "react";
import { Helmet } from "react-helmet";

// Page component to render a page with a specified title
export default function Page(props) {
  const { title, children } = props;

  return (
    <>
      <Helmet>
        <title>SDRCloud</title>
      </Helmet>
      <div>{children}</div>
    </>
  );
}
