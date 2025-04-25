import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";

export function meta() {
  return [
    { title: "Dodaj książkę" },
    { name: "description", content: "Formularz dodawania nowej książki" },
  ];
}

export default function NewBook() {
  const { bookList, setBookList } = useContext(BooksContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("twarda");
  const [description, setDescription] = useState("");

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!title || !author || !pages || !price || !cover) return;

    const newBook = {
      id: bookList.length + 1,
      title,
      author,
      pages: parseInt(pages),
      price: parseFloat(price),
      cover,
      description,
      read: false,
    };

    setBookList((prev) => [...prev, newBook]);

    
    setTitle("");
    setAuthor("");
    setPages("");
    setPrice("");
    setCover("twarda");
    setDescription("");
  };

  return (
    <main className="list-vertical">
      <form className="list-vertical" onSubmit={handleAddBook}>
        <input
          placeholder="Tytuł książki"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="number"
          placeholder="Liczba stron"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cena (PLN)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <select value={cover} onChange={(e) => setCover(e.target.value)}>
          <option value="twarda">Twarda</option>
          <option value="miękka">Miękka</option>
        </select>
        <textarea
          placeholder="Opis książki (opcjonalnie)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Dodaj książkę</button>
      </form>
    </main>
  );
}
