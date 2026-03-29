import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export const useChargers = () => {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "stations"),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setChargers(data);
      }
    );

    return () => unsubscribe();
  }, []);

  return chargers;
};