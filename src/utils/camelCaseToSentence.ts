export const CamelCaseToSentence = (s?: string): string => {
  if (!s) {
    return "";
  }

  return s
    .replace(/and/g, " and ")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\s+/g, " ");
};
