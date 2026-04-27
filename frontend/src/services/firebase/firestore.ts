// Placeholder for basic DB calls not processed via Backend API
import { db } from './config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const getDocument = async <T>(collection: string, id: string): Promise<T | null> => {
  const docRef = doc(db, collection, id);
  const snap = await getDoc(docRef);
  return snap.exists() ? (snap.data() as T) : null;
};
export const setDocument = async (collection: string, id: string, data: any) => {
  return setDoc(doc(db, collection, id), data, { merge: true });
};
