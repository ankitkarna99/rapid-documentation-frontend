import React from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import Toaster from "../Toaster";
import BooksContext from "../context/BooksContext";

function RightNav({ pageJSON, match, location, history }) {
  const bookSlug = match.params.bookSlug || "";
  const pageSlug = match.params.pageSlug || "index";
  const subPageSlug = match.params.subPageSlug || "";
  const { fetchBooks } = React.useContext(BooksContext);

  const editDoc = () => {
    history.push(location.pathname + "/edit");
  };

  const switchDocType = () => {
    let URL;
    if (subPageSlug.length === 0) {
      URL = "/book/" + bookSlug + "/" + pageSlug + "/switch";
    } else {
      URL =
        "/book/" + bookSlug + "/" + pageSlug + "/" + subPageSlug + "/switch";
    }

    Axios.patch(URL)
      .then(({ data }) => {
        Toaster.toast("success", data.message);
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
      });
  };

  const deleteDoc = () => {
    let URL;
    if (subPageSlug.length === 0) {
      URL = "/book/" + bookSlug + "/" + pageSlug + "/delete";
    } else {
      URL =
        "/book/" + bookSlug + "/" + pageSlug + "/" + subPageSlug + "/delete";
    }

    Axios.delete(URL)
      .then(({ data }) => {
        fetchBooks();
        if (subPageSlug.length === 0) {
          history.push("/" + bookSlug);
        } else {
          history.push("/" + bookSlug + "/" + pageSlug);
        }
        Toaster.toast("success", data.message);
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
      });
  };

  const deleteBook = () => {
    Axios.delete("/book/" + bookSlug + "/deleteBook")
      .then(({ data }) => {
        fetchBooks();
        history.push("/");
        Toaster.toast("success", data.message);
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
      });
  };

  return (
    <div style={{ paddingLeft: "1.5rem" }}>
      {pageJSON.title && (
        <React.Fragment>
          <h5>In this article</h5>
          <ul className="uk-nav uk-nav-default tm-nav">
            <li>
              <Link
                to={
                  "/" +
                  match.params.bookSlug +
                  "/" +
                  (match.params.pageSlug || "")
                }
              >
                {pageJSON.title}
              </Link>
            </li>
            <ul
              className="uk-nav uk-nav-default tm-nav"
              style={{ paddingLeft: "1rem" }}
            >
              {pageJSON.pages &&
                pageJSON.pages.map(page => (
                  <li key={page.slug}>
                    <Link
                      to={
                        "/" +
                        match.params.bookSlug +
                        "/" +
                        match.params.pageSlug +
                        "/" +
                        page.slug
                      }
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </ul>
        </React.Fragment>
      )}
      <hr />
      <ul className="uk-nav uk-nav-default tm-nav">
        <li>
          <span uk-icon="icon: info"></span> Report Issue
        </li>
        <li
          className="uk-margin-top"
          style={{ cursor: "pointer" }}
          onClick={editDoc}
        >
          <span uk-icon="icon: pencil"></span> Edit This Page
        </li>
        <li
          className="uk-margin-top"
          onClick={switchDocType}
          style={{ cursor: "pointer" }}
        >
          <span uk-icon="icon: refresh"></span> HTML &lt;-&gt; MD
        </li>
        {!/^\/[a-zA-Z0-9-]+\/?$/.test(location.pathname) && (
          <li
            className="uk-margin-top"
            onClick={deleteDoc}
            style={{ cursor: "pointer" }}
          >
            <span uk-icon="icon: trash"></span> Delete Page
          </li>
        )}
        {/^\/[a-zA-Z0-9-]+\/?$/.test(location.pathname) && (
          <li
            className="uk-margin-top"
            onClick={deleteBook}
            style={{ cursor: "pointer" }}
          >
            <span uk-icon="icon: trash"></span> Delete Book
          </li>
        )}
      </ul>
    </div>
  );
}

export default withRouter(RightNav);
