

// firebase.js
import { getApps, initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyBlZcQ0Dcmcgd2dmtwrrk3cWkrirhwgeKY",
  authDomain: "miapp-106f6.firebaseapp.com",
  projectId: "miapp-106f6",
  storageBucket: "miapp-106f6.firebasestorage.app",
  messagingSenderId: "600919479401",
  appId: "1:600919479401:web:0379e94e975115aeac7ef8"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Autenticación anónima minimalista
export async function ensureAuth() {
  if (auth.currentUser) return auth.currentUser;
  const { user } = await signInAnonymously(auth);
  return user;
}
