import { NavLink, useNavigate } from "react-router";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white items-center">
      <NavLink to="/">Przeglądaj Książki</NavLink>
      <NavLink to="/new">Dodaj Nową</NavLink>

      <button
        className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
        onClick={() => navigate("/login")}
      >
        Zaloguj się
      </button>
    </nav>
  );
}
