import { NavLink, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  
  const handleLogout = async () => {
    await signOut(auth);
  };

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    
    return () => unsubscribe();
  }, []);

  return (
    <nav className="flex gap-4 p-4 bg-gray-800 text-white items-center">
      <NavLink to="/">Przeglądaj Książki</NavLink>
      <NavLink to="/new">Dodaj Nową</NavLink>

      {user ? (
        <>
          <span className="ml-auto text-white">Zalogowany jako: {user.displayName}</span>
          <button
            className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            onClick={handleLogout}
          >
            Wyloguj się
          </button>
        </>
      ) : (
        <button
          className="ml-auto bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
          onClick={handleLogin}
        >
          Zaloguj się
        </button>
      )}
    </nav>
  );
}
