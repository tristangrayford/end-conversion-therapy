export const CamelCaseToSentence = (s?: string): string => {
  if (!s) {
    return "";
  }

  return s.replace(/([A-Z])/g, " $1").trim();
};