import { FC, PropsWithChildren } from "react";
import { WarningAlertIcon, WarningAlertTitle, WarningAlertWrapper } from "../styledComponents";

export interface AlertMessageProps {
  variants?: "warning"
}

const AlertMessage: FC<PropsWithChildren<AlertMessageProps>> = (props: { children: any; }) => {
  return (
    <WarningAlertWrapper>
      <WarningAlertIcon>warning</WarningAlertIcon>
      <div>
        <WarningAlertTitle>Warning</WarningAlertTitle>
        {props.children && <div style={{marginTop: 10}}>{props.children}</div>}
      </div>
    </WarningAlertWrapper>
  )
}

export default AlertMessage