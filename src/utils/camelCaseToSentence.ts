export const CamelCaseToSentence = (s?: string): string => {
  if (!s) {
    return "";
  }

  return s
    .replace(/([a-z])And([A-Z])/g, "$1 and $2")
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/\s+/g, " ");
};
