import type { MouseEvent } from "react";

import { DsListRowDefaultProps, type DsListRowProps } from "./DsListRow.Types";

export const mergeDsListRowProps = (InProps: DsListRowProps) =>
  ({ ...DsListRowDefaultProps, ...InProps }) as DsListRowProps &
    Required<typeof DsListRowDefaultProps>;

export const getDsListRowFlags = ({
  type,
  showChevron,
  interactable,
}: Pick<DsListRowProps, "type" | "showChevron" | "interactable">) => {
  const isSelectionType = type === "selection";
  const isInfoType = type === "info";

  return {
    isSelectionType,
    isInfoType,
    resolvedShowChevron: showChevron ?? (!isSelectionType && !isInfoType),
    isInteractable: isSelectionType || !!interactable,
  };
};

export const stopPropagationAndCall = <TElement extends HTMLElement>(
  event: MouseEvent<TElement>,
  callback?: (event: MouseEvent<TElement>) => void,
) => {
  event.stopPropagation();
  callback?.(event);
};
