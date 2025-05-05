import { NavLink, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase-config"; 

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogin = async (e) =>{
    const provider = await new GoogleAuthProvider
    return signInWithPopup(auth,provider)
  }

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white items-center">
      <NavLink to="/">Przeglądaj Książki</NavLink>
      <NavLink to="/new">Dodaj Nową</NavLink>

      <button
        className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
        onClick={handleLogin}
      >
        Zaloguj się
      </button>
    </nav>
  );
}
