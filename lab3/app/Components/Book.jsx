import { useState } from "react";

export default function Book({ book }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article onClick={() => setExpanded(!expanded)} className="book-item">
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      {expanded && (
        <div className="book-details">
          <p><strong>Okładka:</strong> {book.cover}</p>
          <p><strong>Liczba stron:</strong> {book.pages}</p>
          <p><strong>Cena:</strong> {book.price} zł</p>
          <p><strong>Opis:</strong> {book.description || "Brak opisu."}</p>
        </div>
      )}
    </article>
  );
}
