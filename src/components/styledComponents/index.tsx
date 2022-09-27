import styled from 'styled-components'
import { FieldStatus } from '../reusable/FormField'

export const responsiveSmallerMobileBreakpoint = 420
export const responsiveMobileBreakpoint = 768
export const responsiveDesktopBreakpoint = 1440
export const themeBgColor = '#FFFAE6'
export const themeFontColor = '#FF8A00'
export const themeDisableFontColor = '#F8E6BA'
export const themeSuccessFontColor = '#1BD97B'
export const themeDisableField = 'rgba(238,238,238,1)'

interface StepperOptionProps {
  readonly isActive: boolean;
  disabled?: boolean;
}
interface InputWrapperProps {
  status: FieldStatus;
  disabled?: boolean;
}

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  // height: ${window.innerHeight < 500 ? 500 : window.innerHeight}px;
  overflow: hidden;
  background: ${themeBgColor};
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
    margin-left: 20px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: ${themeBgColor};
    border-radius: 20px;
  }
  
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${themeDisableFontColor}; 
    border-radius: 20px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${themeFontColor};
  }
`
export const Content = styled.div`
  margin: 55px 0 55px 0;
  width: ${responsiveDesktopBreakpoint - 300}px;
  background: #FFFFFF;
  box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
  border-radius: 4px;
  padding: 25px;
  transition: all 0.3s;

  @media only screen and (max-width: ${responsiveDesktopBreakpoint}px) {
    width: 80%;
  }
  @media only screen and (max-width: ${responsiveMobileBreakpoint}px) {
    margin: 0;
    padding: 55px 25px 25px 25px;
    width: 100%;
  }
`
export const StepperWrapper = styled.ol`
  background: ${themeBgColor};
  padding: 20px 30px;
  position: fixed;
  top: 5px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 35px;
  transition: all 0.3s;
  display: flex;
  gap: 15px;
  z-index: 1;

  @media only screen and (max-width: ${responsiveMobileBreakpoint}px) {
    top: 0;
    border-radius: 0 0 35px 35px;
    gap: 5px;
    margin: 0;
  }

  @media only screen and (max-width: ${responsiveSmallerMobileBreakpoint}px) {
    top: 0;
    border-radius: 0;
    gap: 5px;
    margin: 0;
  }
`
export const StepperOptionWrapper = styled.li<StepperOptionProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: ${(props) => props.isActive ? 'pointer' : 'not-allowed'};
  color: ${themeFontColor};

  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  &:not(:last-child) {
    &:after {
      content: "keyboard_arrow_right";
      color: ${themeFontColor};
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      font-size: 24px;
      line-height: 24px;
    }
  }

  @media only screen and (max-width: ${responsiveMobileBreakpoint}px) {
    font-size: 14px;

    &:not(:last-child) {
      &:after {
        content: "keyboard_arrow_right";
        color: ${themeFontColor};
        font-family: 'Material Icons';
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 24px;
      }
    }
  }
`
export const StepperOptionNumber = styled.div<StepperOptionProps>`
  background: ${(props) => props.isActive ? themeFontColor : themeDisableFontColor};
  color: ${(props) => props.isActive ? '#FFFFFF' : themeFontColor};
  box-shadow: 0px 2px 4px rgba(255, 138, 0, 0.3);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
`
export const LeftContentWrapper = styled.div`
  width: 65%;

  @media only screen and (max-width: ${responsiveMobileBreakpoint}px) {
    width: 100%;
  }
`
export const LeftContentFinishWrapper = styled(LeftContentWrapper)`
  align-items: center;
  justify-content: center;
`
export const RightContentWrapper = styled.div`
  width: 35%;
  border-left: 1px solid rgba(255, 138, 0, .2);
  padding-left: 15px;
  display: flex;
  flex-direction: column;
  gap: 100px;
  justify-content: space-between;

  @media only screen and (max-width: ${responsiveMobileBreakpoint}px) {
    border-left: none;
    border-top: 1px solid rgba(255, 138, 0, .2);
    padding-left: 0;
    padding-top: 15px;
    width: 100%;
  }
`
export const RightContentMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const RightContentLabel = styled.div`
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const RightContentValue = styled.div`
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const BackBtnWrapper = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0px;

  font-family: 'Inter UI';
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #000000;
  mix-blend-mode: normal;
  opacity: 0.6;
`
export const BackBtnWrapperIcon = styled.span`
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
`
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 15px;
  transition: all 0.3s;
`
export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  transition: all 0.3s;
`
export const FlexRowResponsive = styled(FlexRow)`
  @media only screen and (max-width: ${responsiveMobileBreakpoint}px) {
    flex-direction: column;
  }
`
export const CustomTitleWrapper = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: ${themeFontColor};
  background: linear-gradient(0deg, rgba(238, 238, 238, 0) 0%, rgba(238, 238, 238, 0) 16%, rgba(238, 238, 238, 1) 16%, rgba(238, 238, 238, 1) 41%, rgba(238, 238, 238, 0) 41%);
`
export const CustomSubTitleWrapper = styled.span`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  color: ${themeFontColor};
`
const getColorByStatus = (status: FieldStatus) => {
  if(status === "success") return themeSuccessFontColor
  else if(status === "error") return themeFontColor
  else return "#CCCCCC"
}
export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  background: #FFFFFF;
`
export const InputLabel = styled.span<InputWrapperProps>`
  color: ${(props) => getColorByStatus(props.status)};
  font-family: 'Montserrat';
  font-size: 12px;
  background: #FFFFFF;
  position: absolute;
  top: -10px;
  left: 8px;
  padding: 3px;
`
export const InputBoxWrapper = styled.div<InputWrapperProps>`
  border: 1px solid ${(props) => getColorByStatus(props.status)};
  background: ${props => props.disabled ? themeDisableField : "#FFFFFF"};
  padding: 10px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const MaxCharacterMessage = styled.div<InputWrapperProps>`
  color: ${(props) => getColorByStatus(props.status)};
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
`
export const InputErrorMessage = styled.span<InputWrapperProps>`
  color: ${(props) => getColorByStatus(props.status)};
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 300;
  font-size: 12px;
`
export const InputErrorIcon = styled.span<InputWrapperProps>`
  color: ${(props) => getColorByStatus(props.status)};
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
`
export const InputText = styled.input`
  border: none;
  font-family: 'Inter UI';
  font-style: normal;
  font-size: 16px;
  width: 100%;
  background: none;
  
  &:focus {
    outline: none;
  }
`
export const InputCheckboxWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`
export const InputCheckboxLabel = styled.span`
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #2D2A40;
`
export const InputTextArea = styled.textarea`
  border: none;
  font-family: 'Inter UI';
  font-style: normal;
  font-size: 16px;
  width: 100%;
  background: none;
  
  &:focus {
    outline: none;
  }
`
export const RadioInputWrapper = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(180px,1fr));
  grid-gap: 10px;
  gap: 10px;
`
export const RadioInput = styled.div<StepperOptionProps>`
  position: relative;
  background: ${props => props.isActive ? "rgba(27, 217, 123, 0.1)" : "#FFFFFF"};
  border: ${props => props.isActive ? `2px solid ${themeSuccessFontColor}` : "1px solid #CCCCCC" };

  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
  opacity: ${props => props.isActive ? "1" : ".6" };

  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  ${props => props.isActive && `
    &:after {
      content: "check";
      font-family: 'Material Icons';
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 18px;
      color: ${themeSuccessFontColor};
    }
  `}
`
export const NextButton = styled.button<Omit<InputWrapperProps, "status">>`
  background: ${props => props.disabled ? themeDisableField : themeFontColor};
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${props => props.disabled ? "none" : "3px 5px 10px rgba(255, 138, 0, 0.2)" };
  border-radius: 2px;
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #FFFFFF;
  padding: 15px 0 15px 0;
  cursor: ${props => props.disabled ? "not-allowed" : "pointer" };
`
export const SummaryTopInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  &:before {
    content: "";
    border-top: 1px solid #D8D8D8;
    width: 80px;
    margin: 10px 0 10px 0;
  }
`
export const SummaryTopInfoLabel = styled.div`
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #000000;
`
export const SummaryTopInfoValue = styled.div`
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: ${themeSuccessFontColor};
`
export const WarningAlertWrapper = styled.div`
  background: ${themeBgColor};
  color: ${themeFontColor};
  font-family: 'Inter UI';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 15px;
  border-radius: 5px;
`
export const WarningAlertTitle = styled.div`
font-family: 'Inter UI';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: ${themeFontColor};
`
export const WarningAlertIcon = styled.div`
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: ${themeFontColor};
`