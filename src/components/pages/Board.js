import React, { useEffect, useState } from "react";

import Post from "../Post";

import firebase from "../../firebase";

const Board = () => {
  const [books, setBooks] = useState([]);
  // get all books ( limit order by time )

  const fetchBooks = async () => {
    const db = firebase.firestore();
    const booksRef = db.collection("books").orderBy("timeStamp", "desc");
    const booksData = await booksRef.get();
    console.log("Book in board");
    const booksTmp = [];
    // TODO use lazy loading
    booksData.docs.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      booksTmp.push({ key: doc.id, ...doc.data() });
      // https://stackoverflow.com/a/61615437/14697633
      // setBooks([...books, { key: doc.id, ...doc.data() }]);
      // https://www.pluralsight.com/guides/consume-data-from-firebase-firestore-in-a-react-app
      // console.log(doc.id);
    });
    setBooks([...books, ...booksTmp]);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onDeleteBook = (key) => {
    console.log(key);

    setBooks(
      books.filter((book) => {
        console.log(book);
        return book.key !== key;
      })
    );

    const db = firebase.firestore();
    const bookRef = db.collection("books").doc(key);
    bookRef.delete().then(() => {});
  };

  return (
    <>
      {books &&
        books.map((book) => {
          // console.log(book);
          return (
            <Post key={book.key} book={book} onDeleteBook={onDeleteBook} />
          );
        })}
      {/* <Post /> */}
      {/* <Post /> */}
    </>
  );
};

export default Board;
