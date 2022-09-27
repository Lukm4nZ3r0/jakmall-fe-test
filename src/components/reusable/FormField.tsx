import { Fragment, KeyboardEventHandler, PropsWithChildren, ReactNode } from "react"
import { Controller, ControllerRenderProps, FieldValues, Control, FieldErrors, FieldPath, UseControllerProps } from "react-hook-form";
import CONSTANT from "../../Constant";
import { InputErrorMessage, InputLabel, InputBoxWrapper, InputWrapper, InputText, InputErrorIcon, InputTextArea, InputCheckboxWrapper, InputCheckboxLabel, RadioInputWrapper, RadioInput, MaxCharacterMessage, FlexRow } from "../styledComponents"

export type FieldStatus = "normal" | "success" | "error"
export enum FieldType {
  TEXT,
  PHONE,
  TEXTAREA,
  SINGLE_CHECKBOX,
  RADIOBOX
}
export interface CustomOption {
  label: ReactNode;
  value: number;
}
export interface FormFieldProps<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> extends UseControllerProps<TFieldValues, TName> {
  fieldType: FieldType;
  label: string;
  name: TName;
  control: Control<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  options?: Array<CustomOption>;
  disabled?: boolean;
}

const FormField = <T extends FieldValues, U extends FieldPath<T>>(props: PropsWithChildren<FormFieldProps<T,U>>) => {
  const getStatusIcon = (status: FieldStatus) => {
    if(status !== "normal") return <InputErrorIcon status={status}>{status === "success" ? "check" : "clear"}</InputErrorIcon>
    else return null
  }
  const getErrorMessage = () => {
    return props.control.getFieldState(props.name).error?.message
  }
  const getCurrentStatus = (): FieldStatus => {
    const { isTouched, error } = props.control.getFieldState(props.name)
    if(isTouched || error) {
      if(error) return "error"
      else return "success"
    }
    else return "normal"
  }
  const onKeyPressHandler: KeyboardEventHandler = (evt) => {
    const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Delete", "Backspace", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "Tab", "."]
    const finder = allowedKeys.find(key => key === evt.key)
    
    if(!finder) evt.preventDefault()
  }
  const renderSelectedField = (fieldProps: ControllerRenderProps<T, U>) => {
    const selectedField = [
      {
        type: FieldType.TEXT,
        component: <InputText {...fieldProps} disabled={props.disabled} data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + props.name} />
      },
      {
        type: FieldType.PHONE,
        component: <InputText {...fieldProps} onKeyDown={onKeyPressHandler} disabled={props.disabled} data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + props.name} />
      },
      {
        type: FieldType.TEXTAREA,
        component: <InputTextArea {...fieldProps} disabled={props.disabled} rows={4} data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + props.name} />
      }
    ]
    const selectedFinder = selectedField.find(selected => selected.type === props.fieldType)
    if(selectedFinder) return (
      <InputWrapper status={getCurrentStatus()}>
        <InputLabel status={getCurrentStatus()}>{props.label}</InputLabel>
        <InputBoxWrapper data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + props.name} status={getCurrentStatus()} disabled={props.disabled}>
          {selectedFinder.component}
          {getStatusIcon(getCurrentStatus())}
        </InputBoxWrapper>
        <FlexRow>
          {getErrorMessage() && <InputErrorMessage data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.ERROR_MESSAGE + props.name} status={getCurrentStatus()}>{getErrorMessage()}</InputErrorMessage>}
          {!!(props.rules?.maxLength as {message: string; value: number})?.value && 
            <MaxCharacterMessage data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_COUNTER + props.name} status={getCurrentStatus()}>
              {fieldProps.value.length}/{(props.rules?.maxLength as {message: string; value: number})?.value}
            </MaxCharacterMessage>
          }
        </FlexRow>
      </InputWrapper>
    )
    else if(props.fieldType === FieldType.SINGLE_CHECKBOX) {
      return (
        <Fragment>
          <InputCheckboxWrapper onClick={()=> !props.disabled && fieldProps.onChange({target:{value: !fieldProps.value, checked: !fieldProps.value}, currentTarget:{value: !fieldProps.value, checked: !fieldProps.value}})}>
            <input 
              type="checkbox" 
              onChange={(e)=>fieldProps.onChange(e)}
              checked={fieldProps.value} 
              readOnly={fieldProps.value} 
              disabled={props.disabled} 
              data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + props.name}
            />
            <InputCheckboxLabel>{props.label}</InputCheckboxLabel>
          </InputCheckboxWrapper>
          {getErrorMessage() && <InputErrorMessage data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.ERROR_MESSAGE + props.name} status={getCurrentStatus()}>{getErrorMessage()}</InputErrorMessage>}
        </Fragment>
      )
    }
    else return (
      <Fragment>
        <RadioInputWrapper>
          {props.options?.map((option, index) =>
            <RadioInput 
              key={index} 
              isActive={fieldProps.value === option.value}
              onClick={()=>{
                const valueOrNull = fieldProps.value === option.value ? null : option.value
                if(!props.disabled) fieldProps.onChange({target:{value: valueOrNull}, currentTarget:{value: valueOrNull}})
              }}
              data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + props.name}
            >
              {option.label}
            </RadioInput>
          )}
        </RadioInputWrapper>
        {getErrorMessage() && <InputErrorMessage data-testid={CONSTANT.UNIT_TEST_PREFIX_ID.ERROR_MESSAGE + props.name} status={getCurrentStatus()}>{getErrorMessage()}</InputErrorMessage>}
      </Fragment>
    )
  }
  return (
    <Controller
      {...props}
      name={props.name}
      control={props.control}
      render={(renderProps) => renderSelectedField(renderProps.field)}
    />
  )
}

export default FormField