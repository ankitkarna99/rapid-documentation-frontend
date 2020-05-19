import React from "react";
import axios from "axios";
import Toaster from "../Toaster";
import BooksContext from "../context/BooksContext";

export default function CreateBook({ history }) {
  const titleRef = React.createRef();
  const indexPageTypeRef = React.createRef();
  const { fetchBooks } = React.useContext(BooksContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/book/create", {
        title: titleRef.current.value,
        indexPageType: indexPageTypeRef.current.value,
      })
      .then(({ data }) => {
        fetchBooks();
        Toaster.toast("success", data.message);
        history.push("/" + data.slug);
      })
      .catch((err) => {
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
    <div>
      <h2>Create Book</h2>
      <form action="" onSubmit={handleFormSubmit}>
        <div className="uk-margin">
          Book Title
          <br />
          <div className="uk-inline">
            <span className="uk-form-icon" uk-icon="icon: file-text"></span>
            <input className="uk-input" ref={titleRef} />
          </div>
        </div>
        <div className="uk-margin">
          Index Page Type
          <br />
          <div className="uk-inline">
            <select className="uk-select" ref={indexPageTypeRef}>
              <option value="md">Markdown</option>
              <option value="html">HTML</option>
            </select>
          </div>
        </div>
        <button type="submit" className="uk-button uk-button-primary">
          Create Book
        </button>
      </form>
    </div>
  );
}
