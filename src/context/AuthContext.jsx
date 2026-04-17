import { createContext, useContext, useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase/config';
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, displayName) => {
    if (!auth) throw new Error("Firebase is not initialized. Please check config.");
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Note: Firebase doesn't take displayName on creation via email/pass directly
    // but you would typically update the profile here. We'll set a mock structure.
    setUser({ ...userCredential.user, displayName });
    return userCredential;
  };

  const login = async (email, password) => {
    if (!auth) throw new Error("Firebase is not initialized. Please check config.");
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    if (!auth) {
      alert("Firebase configuring is missing! Running in guest mode.");
      setUser({ displayName: "Guest User", email: "guest@example.com", photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guest" });
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logoutAction = async () => {
    if (!auth) {
      setUser(null);
      return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout: logoutAction }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
