import { ButtonHTMLAttributes, FC, PropsWithChildren } from "react"
import { BackBtnWrapper, BackBtnWrapperIcon } from "../styledComponents"

export interface BackBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
}

const BackBtn: FC<PropsWithChildren<BackBtnProps>> = (props) => {
  const { children, icon, ...anotherProps } = props
  return (
    <BackBtnWrapper {...anotherProps}>
      <BackBtnWrapperIcon>{icon}</BackBtnWrapperIcon>
      <span>{children}</span>
    </BackBtnWrapper>
  )
}

export default BackBtn