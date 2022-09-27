import { FC, ReactNode } from "react";
import { SummaryTopInfoLabel, SummaryTopInfoValue, SummaryTopInfoWrapper } from "../styledComponents";

export interface SummaryTopInfoProps {
  label: ReactNode;
  value: ReactNode;
}

const SummaryTopInfo: FC<SummaryTopInfoProps> = (props) => {
  return (
    <SummaryTopInfoWrapper>
      <SummaryTopInfoLabel>{props.label}</SummaryTopInfoLabel>
      <SummaryTopInfoValue>{props.value}</SummaryTopInfoValue>
    </SummaryTopInfoWrapper>
  )
}

export default SummaryTopInfo