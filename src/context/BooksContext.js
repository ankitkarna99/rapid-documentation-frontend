import React from "react";
import axios from "axios";

const BooksContext = React.createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = React.useState([]);
  const fetchBooks = () => {
    axios
      .get("/book/all")
      .then(({ data }) => {
        setBooks(data);
      })
      .catch((err) => {
        setTimeout(fetchBooks, 2000);
      });
  };

  React.useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  return (
    <BooksContext.Provider value={{ books, fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
}

export default BooksContext;
