const categories = [
  "All",
  "Personal",
  "Work",
  "Study",
  "Church",
  "Shopping",
  "Travel",
  "Health",
  "Ideas",
  "Miscellaneous",
] as const;

export const catColors = [
  "#EDF2F7",
  "#E2E8F0",
  "#CBD5E0",
  "#A0AEC0",
  "#718096",
  "#4A5568",
  "#2D3748",
  "#1A202C",
  "#171923",
];

type CategoryColors = {
  [category: string]: [string, string]; // Tuple of light and dark colors
};

export const categoryColors: CategoryColors = {
  All: ["#F7FAFC", "#CBD5E0"],
  Personal: ["#F1F8FF", "#4299E1"],
  Work: ["#E6FFFA", "#2F855A"],
  Study: ["#E2E8F0", "#718096"],
  Church: ["#F7FAFC", "#11b6ca"],
  Shopping: ["#F0F5FF", "#4C51BF"],
  Travel: ["#EBF4FF", "#2B6CB0"],
  Health: ["#F0FFF4", "#38A169"],
  Ideas: ["#EBF4FF", "#2C5282"],
  Miscellaneous: ["#F7FAFC", "#4A5568"],
};

export default categories;
