import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export function meta() {
  return [
    { title: "Dodaj książkę" },
    { name: "description", content: "Formularz dodawania nowej książki" },
  ];
}

export default function NewBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState("twarda");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author || !pages || !price || !cover) return;
    if (!user) {
      alert("Musisz być zalogowany, aby dodać książkę.");
      return;
    }

    const newBook = {
      title,
      author,
      pages: parseInt(pages),
      price: parseFloat(price),
      cover,
      description,
      userId: user.uid, 
    };

    try {
      await addDoc(collection(db, "books"), newBook);
      setSuccessMessage("Książka została dodana!");
      
      setTitle("");
      setAuthor("");
      setPages("");
      setPrice("");
      setCover("twarda");
      setDescription("");
    } catch (error) {
      console.error("Błąd podczas dodawania książki:", error);
    }
  };

  return (
    <main className="list-vertical p-4">
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

      {successMessage && <p className="text-green-600">{successMessage}</p>}
    </main>
  );
}
