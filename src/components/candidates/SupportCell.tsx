import { CamelCaseToSentence } from "../../utils/camelCaseToSentence";

export function renderSupportCell(
  supportValue: number,
  SupportEnum: Record<number, string>,
  yesValue: number,
  caveatsValue: number,
  noValue: number,
) {
  const supportLabel = CamelCaseToSentence(SupportEnum[supportValue]);
  const supportClass =
    supportValue === yesValue
      ? "support-yes"
      : supportValue === caveatsValue
        ? "support-caveats"
        : supportValue === noValue
          ? "support-no"
          : "support-neutral";
  return <span className={supportClass}>{supportLabel}</span>;
}
