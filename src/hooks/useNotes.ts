import { useEffect, useState } from "react";

export interface Note {
  id: number;
  title: string;
  text: string;
  category: string;
  date: string;
  completed: boolean;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[] | null>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("notesData");
    storedData && setNotes(JSON.parse(storedData));
  }, []);

  return { notes };
};

export default useNotes;
