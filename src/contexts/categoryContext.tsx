import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";

interface CategoryContextType {
  selectedCategory: number;
  setSelectedCategory: Dispatch<SetStateAction<number>>;
}

interface Props {
  children: ReactNode;
}

const CategoryContext = createContext<CategoryContextType | null>(null);

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export const CategoryProvider = ({ children }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};
