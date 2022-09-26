import { ReactNode, useEffect, useState } from 'react';
import './App.css'
import GlobalFonts from './components/fonts';
import DeliveryOrPayment from './components/main/DeliveryOrPayment';
import Finish from './components/main/Finish';
import Stepper, { StepperOption } from './components/reusable/Stepper';
import { Content, Wrapper } from "./components/styledComponents";
import { getLocalStorage, setToLocalStorage } from './helper/local_storage';

interface StaticStepperOption extends StepperOption {
  component: ReactNode;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const options: Array<StaticStepperOption> = [
    {
      value: 0,
      label: "Delivery",
      component: <DeliveryOrPayment />
    },
    {
      value: 1,
      label: "Payment",
      component: <DeliveryOrPayment />
    },
    {
      value: 2,
      label: "Finish",
      component: <Finish />
    },
  ]
  const stepperSetter: (newValue: number) => void = (nv) => {
    setCurrentStep(nv)
    setToLocalStorage({
      stepOption: nv
    })
  }
  const firstInit = () => {
    const storage = getLocalStorage()
    setCurrentStep(storage.stepOption)
  }
  useEffect(firstInit, [])
  return (
    <Wrapper>
      <GlobalFonts />
      <Stepper 
        setValue={stepperSetter}
        value={currentStep}
        options={options}
      />
      <Content>
        {options[currentStep].component}
      </Content>
    </Wrapper>
  );
}

export default App;
