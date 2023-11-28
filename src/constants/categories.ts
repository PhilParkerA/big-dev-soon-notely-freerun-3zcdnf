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
  [category: string]: string;
};

export const categoryColors: CategoryColors = {
  All: "#11b6ca",
  Personal: "#4299E1",
  Work: "#2B6CB0",
  Study: "#9820c0",
  Church: "#0E9AB1",
  Shopping: "#4C51BF",
  Travel: "#f4900d",
  Health: "#38A169",
  Ideas: "#f50481",
  Miscellaneous: "#4A5568",
};

export default categories;
