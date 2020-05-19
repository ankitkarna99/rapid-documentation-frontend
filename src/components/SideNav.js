import React from "react";
import BooksContext from "../context/BooksContext";
import { Link, withRouter } from "react-router-dom";

function SideNav({ location, history }) {
  const { books } = React.useContext(BooksContext);

  return (
    <div className="uk-padding">
      <p className="uk-text-muted" style={{ marginBottom: "0.5rem" }}>
        <Link to="/">Documentation</Link>
      </p>
      <div style={{ height: "0.4rem" }}></div>
      <div className="uk-inline">
        <span
          className="uk-form-icon uk-form-icon-flip"
          uk-icon="icon: gitter"
        ></span>
        <input
          className="uk-input"
          style={{ fontSize: "14px" }}
          type="text"
          placeholder="Filter by Title"
        />
      </div>
      <ul className="uk-nav uk-nav-default tm-nav">
        {books.map(book => (
          <React.Fragment key={book.slug}>
            <li>
              <Link to={"/" + book.slug}>{book.title}</Link>
            </li>
            {book.pages &&
              book.pages.map(page => (
                <ul
                  key={page.slug}
                  className="uk-nav uk-nav-default tm-nav"
                  style={{ paddingLeft: "1rem" }}
                >
                  {page.slug !== "index" && (
                    <li>
                      <Link to={"/" + book.slug + "/" + page.slug}>
                        {page.title}
                      </Link>
                    </li>
                  )}
                </ul>
              ))}
          </React.Fragment>
        ))}
      </ul>
      <p className="uk-margin">
        {location.pathname === "/" && (
          <Link to="/create">
            <button className="uk-button uk-button-primary">Create Book</button>
          </Link>
        )}
        {/^\/[a-zA-Z0-9-]+\/?$/.test(location.pathname) && (
          <button
            style={{ cursor: "pointer" }}
            className="uk-button uk-button-primary"
            onClick={() => {
              history.push(location.pathname + "/create");
            }}
          >
            Create Page
          </button>
        )}
        {/^\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\/?$/.test(location.pathname) &&
          !location.pathname.includes("/create") && (
            <button
              onClick={() => {
                history.push(location.pathname + "/create");
              }}
              style={{ cursor: "pointer" }}
              className="uk-button uk-button-primary"
            >
              New SubPage
            </button>
          )}
      </p>
    </div>
  );
}

export default withRouter(SideNav);
