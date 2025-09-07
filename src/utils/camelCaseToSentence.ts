export const CamelCaseToSentence = (s: string): string => {
    return s.replace(/([A-Z])/g, ' $1').trim()
}