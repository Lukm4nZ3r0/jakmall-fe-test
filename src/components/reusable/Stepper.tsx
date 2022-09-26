import { FC } from "react"
import { StepperOptionNumber, StepperOptionWrapper, StepperWrapper } from "../styledComponents"

export interface StepperOption {
  label: string;
  value: number;
}

export interface StepperProps {
  value: number;
  options: Array<StepperOption>
  setValue: (newValue: number) => void;
}

const Stepper: FC<StepperProps> = (props) => {
  return (
    <StepperWrapper>
      {props.options.map((option, index)=>
        <StepperOptionWrapper isActive={index <= props.value} key={index}>
          <StepperOptionNumber isActive={index <= props.value}>{index+1}</StepperOptionNumber>
          <div>{option.label}</div>
        </StepperOptionWrapper>
      )}
    </StepperWrapper>
  )
}

export default Stepper