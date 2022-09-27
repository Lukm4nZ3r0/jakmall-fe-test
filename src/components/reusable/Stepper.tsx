import { FC } from "react"
import CONSTANT from "../../Constant";
import { StepperOptionNumber, StepperOptionWrapper, StepperWrapper } from "../styledComponents"

export interface StepperProps {
  value: "Delivery" | "Payment" | "Finish";
  setValue: (newValue: "Delivery" | "Payment" | "Finish") => void;
}

const Stepper: FC<StepperProps> = (props) => {
  const findSelectedStepperIndex = CONSTANT.STEPPER_OPTION.findIndex(option => option === props.value)
  return (
    <StepperWrapper>
      {CONSTANT.STEPPER_OPTION.map((option, index)=>
        <StepperOptionWrapper 
          isActive={index < findSelectedStepperIndex} 
          key={index}
          onClick={()=> index < findSelectedStepperIndex && props.setValue(option)}
        >
          <StepperOptionNumber isActive={index <= findSelectedStepperIndex}>{index + 1}</StepperOptionNumber>
          <div>{option}</div>
        </StepperOptionWrapper>
      )}
    </StepperWrapper>
  )
}

export default Stepper