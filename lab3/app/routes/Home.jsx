import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";
import Book from "../Components/Book";

export function meta() {
  return [
    { title: "Book Search App" },
    { name: "description", content: "Wyszukiwarka książek z filtrami" },
  ];
}

export default function Home() {
  const categories = ["twarda", "miękka"];
  const { bookList } = useContext(BooksContext);

  const [query, setQuery] = useState("");
  const [searchInDescription, setSearchInDescription] = useState("");
  const [selectedCover, setSelectedCover] = useState("");
  const [minPages, setMinPages] = useState("");
  const [maxPages, setMaxPages] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

 

  const filteredBooks = bookList
    .filter((book) => book.title.toLowerCase().includes(query.toLowerCase()))
    .filter((book) =>
      searchInDescription
        ? book.description?.toLowerCase().includes(searchInDescription.toLowerCase())
        : true
    )
    .filter((book) => (selectedCover ? book.cover === selectedCover : true))
    .filter((book) => {
      const minPagesValid = minPages ? book.pages >= minPages : true;
      const maxPagesValid = maxPages ? book.pages <= maxPages : true;
      return minPagesValid && maxPagesValid;
    })
    .filter((book) => {
      const minPriceValid = minPrice ? book.price >= minPrice : true;
      const maxPriceValid = maxPrice ? book.price <= maxPrice : true;
      return minPriceValid && maxPriceValid;
    })
    

  return (
    <main className="list-vertical p-4">
      <input
        placeholder="Szukaj książek po tytule..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2"
      />
      <input
        placeholder="Szukaj w opisie..."
        value={searchInDescription}
        onChange={(e) => setSearchInDescription(e.target.value)}
        className="mb-2"
      />

      <select
        value={selectedCover}
        onChange={(e) => setSelectedCover(e.target.value)}
        className="mb-4"
      >
        <option value="">Wszystkie Okładki</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div className="filters-grid">
        <div className="filters-grid">
          <label className="text-white" htmlFor="minPages">Min. liczba stron:</label>
          <input
            type="number"
            id="minPages"
            value={minPages}
            onChange={(e) => setMinPages(e.target.value)}
            placeholder="Min"
            className="ml-2 p-1 rounded"
          />
        </div>
        <div className="filters-grid">
          <label className="text-white" htmlFor="maxPages">Max. liczba stron:</label>
          <input
            type="number"
            id="maxPages"
            value={maxPages}
            onChange={(e) => setMaxPages(e.target.value)}
            placeholder="Max"
            className="ml-2 p-1 rounded"
          />
        </div>
        <div className="filters-grid">
          <label className="text-white" htmlFor="minPrice">Min. cena:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="ml-2 p-1 rounded"
          />
        </div>
        <div className="filters-grid">
          <label className="text-white" htmlFor="maxPrice">Max. cena:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="ml-2 p-1 rounded"
          />
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <div
            key={book.id}
            className="list-vertical p-2 border rounded bg-green-100 my-2"
          >
            <Book book={book} />
            <div className="list-horizontal gap-2 mt-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
              >
                Edytuj
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Usuń
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Brak książek spełniających kryteria.</p>
      )}
    </main>
  );
}
