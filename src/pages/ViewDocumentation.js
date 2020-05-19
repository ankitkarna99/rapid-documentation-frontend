import React from "react";
import Axios from "axios";
import Toaster from "../Toaster";
import DocViewer from "../components/DocViewer";
import RightNav from "../components/RightNav";

export default function ViewDocumentation({ history, match }) {
  const bookSlug = match.params.bookSlug || "";
  const pageSlug = match.params.pageSlug || "index";
  const subPageSlug = match.params.subPageSlug || "";

  const [bookJSON, setBookJSON] = React.useState({});
  const [documentation, setDocumentation] = React.useState({
    content: "",
    type: "html",
    title: "",
  });
  const [pageJSON, setPageJSON] = React.useState({});

  React.useEffect(() => {
    if (bookJSON.pages) {
      const matchedPages = bookJSON.pages.filter(
        page => page.slug === pageSlug
      );
      if (matchedPages.length > 0) {
        setPageJSON(matchedPages[0]);
      } else {
        setPageJSON({});
      }
    }
    //eslint-disable-next-line
  }, [bookJSON]);

  const getBookJSON = () => {
    Axios.get("/book/" + bookSlug)
      .then(({ data }) => {
        setBookJSON(data);
      })
      .catch(err => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          Toaster.toast("error", err.response.data.message);
        }
        setTimeout(getBookJSON, 2000);
      });
  };

  const getDocumentation = () => {
    let URL = "";
    if (subPageSlug.length === 0) {
      URL = "/book/" + bookSlug + "/" + pageSlug;
    } else {
      URL = "/book/" + bookSlug + "/" + pageSlug + "/" + subPageSlug;
    }

    Axios.get(URL)
      .then(({ data }) => {
        setDocumentation(data);
      })
      .catch(err => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          Toaster.toast("error", err.response.data.message);
        }

        setTimeout(getDocumentation, 2000);
      });
  };

  React.useEffect(() => {
    getDocumentation();
    getBookJSON();
    //eslint-disable-next-line
  }, [match.params]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
      <div>
        <DocViewer content={documentation.content} type={documentation.type} />
      </div>
      <RightNav pageJSON={pageJSON} />
    </div>
  );
}
