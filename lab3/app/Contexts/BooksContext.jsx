import React, { createContext, useState } from "react";


export const BooksContext = createContext();


export const BooksProvider = ({ children }) => {
  
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Władca Pierścieni",
      cover: "twarda",
      author: "Tolkien",
      description: "Frodo idzie z pierscieniem w góry",
      pages: 100,
      price: 1000,
     
    },
    {
      id: 2,
      title: "Programowanie Interfejsow Webowych",
      cover: "miękka",
      author: "Doktor",
      description: "Jak zrobic strone internetową",
      pages: 200,
      price: 500,
      
    },
    {
      id: 3,
      title: "Matemtyka",
      cover: "miękka",
      author: "Pan Matematyk",
      description: "ksiazka matematyczna",
      pages: 300,
      price: 50,
      
    },
  ]);

  return (
    <BooksContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BooksContext.Provider>
  );
};
