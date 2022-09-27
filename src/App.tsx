import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import './App.css'
import GlobalFonts from './components/fonts';
import { BackBtn, FormField, SummaryTopInfo } from './components/reusable';
import { FieldType } from './components/reusable/FormField';
import Stepper from './components/reusable/Stepper';
import { Content, CustomSubTitleWrapper, CustomTitleWrapper, FlexCol, FlexRow, FlexRowResponsive, LeftContentFinishWrapper, LeftContentWrapper, NextButton, RightContentLabel, RightContentMainWrapper, RightContentValue, RightContentWrapper, Wrapper } from "./components/styledComponents";
import CONSTANT from './Constant';
import { generateRandomAlphanumeric, numFormatter } from './helper';
import { getLocalStorage, initialStore, setToLocalStorage } from './helper/local_storage';

function App() {
  const { handleSubmit, control, formState: { errors, isValid }, watch, resetField, setValue, reset } = useForm<typeof initialStore>({
    defaultValues: getLocalStorage(),
    mode: "onChange",
    reValidateMode: "onChange"
  })
  const submitHandler: SubmitHandler<typeof initialStore> = async (vals) => {
    const selectedStepOptionIndex = CONSTANT.STEPPER_OPTION.findIndex(option => option === watch("stepOption"))
    if(selectedStepOptionIndex < CONSTANT.STEPPER_OPTION.length) {
      setValue("stepOption", CONSTANT.STEPPER_OPTION[selectedStepOptionIndex + 1])
      setToLocalStorage({...vals, stepOption: CONSTANT.STEPPER_OPTION[selectedStepOptionIndex + 1]})
    }
  }
  const isDropshipperWatcher = () => {
    if(!watch("isDropshipper")) {
      resetField("dropshipperName")
      resetField("dropshipperPhoneNumber")
    }
  }
  const shipmentInfoRenderer = () => {
    if(watch("shipment")) {
      const findSelectedShipment = CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment"))
      if(findSelectedShipment) return (
        <FlexRow>
          <RightContentLabel><b>{findSelectedShipment.label}</b> shipment</RightContentLabel>
          <RightContentValue>{numFormatter(findSelectedShipment.value, ",")}</RightContentValue>
        </FlexRow>
      )
    }
  }
  useEffect(isDropshipperWatcher, [watch("isDropshipper")])
  useEffect(()=>setToLocalStorage(watch()), [watch()])
  const stepperSetter: (newValue: "Delivery" | "Payment" | "Finish") => void = (nv) => {
    setValue("stepOption", nv)
    setToLocalStorage({
      stepOption: nv
    })
  }
  const firstInit = () => {
    const storage = getLocalStorage()
    setValue("stepOption", storage.stepOption)
  }
  const getLabelBtnByStatus = () => {
    if(watch("stepOption") === "Delivery") return "Continue to Payment"
    else if(watch("stepOption") === "Payment") {
      if(typeof watch("payment") === "number" && CONSTANT.PAYMENT_OPTIONS.find(option => option.value === watch("payment"))) return `Pay with ${CONSTANT.PAYMENT_OPTIONS.find(option => option.value === watch("payment"))?.label}`
      else return null
    }
  }
  const getTotalPayment = () => {
    let result = 0
    result += CONSTANT.COST_OF_GOODS
    if(watch("isDropshipper")) result += CONSTANT.DROPSHIPPING_FEE
    result += CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment"))?.value ?? 0

    return numFormatter(result, ",")
  }
  const goBackHandler = () => {
    const selectedStepperIndex = CONSTANT.STEPPER_OPTION.findIndex(option => option === watch("stepOption"))
    if(selectedStepperIndex > 0) {
      if(selectedStepperIndex === CONSTANT.STEPPER_OPTION.length - 1) {
        reset(initialStore)
        setToLocalStorage(initialStore)
      }
      else {
        setValue("stepOption", CONSTANT.STEPPER_OPTION[selectedStepperIndex - 1])
        setToLocalStorage({
          stepOption: CONSTANT.STEPPER_OPTION[selectedStepperIndex - 1]
        })
      }
    }
  }
  const getLabelBackBtn = () => {
    const selectedStepperIndex = CONSTANT.STEPPER_OPTION.findIndex(option => option === watch("stepOption"))
    if(selectedStepperIndex > 0) return CONSTANT.STEPPER_OPTION[selectedStepperIndex - 1].toLowerCase()
    else return "cart"
  }
  useEffect(firstInit, [])
  return (
    <Wrapper>
      <GlobalFonts />
      <Stepper 
        setValue={stepperSetter}
        value={watch("stepOption")}
      />
      <Content>
        {watch("stepOption") !== "Finish" && 
        <BackBtn 
          icon='arrow_back' 
          style={{marginTop: 50}}
          onClick={goBackHandler}
        >
          Back to {getLabelBackBtn()}
        </BackBtn>}
        <FlexRowResponsive style={{marginTop: 25}}>
          <LeftContentWrapper style={{display: watch("stepOption") === "Delivery" ? 'block' : 'none'}}>
            <FlexRowResponsive>
              <div><CustomTitleWrapper>Delivery details</CustomTitleWrapper></div>
              <FormField
                errors={errors}
                name="isDropshipper"
                label="Send as Dropshipper"
                fieldType={FieldType.SINGLE_CHECKBOX}
                control={control}
              />
            </FlexRowResponsive>
            <FlexRowResponsive>
              <div style={{width: "100%"}}>
                <FormField
                  errors={errors}
                  name="email"
                  label="Email"
                  fieldType={FieldType.TEXT}
                  rules={{
                    required: {
                      message: "Email Address is required!",
                      value: true
                    },
                    pattern: {
                      message: "Email Address is wrong format!",
                      value: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
                    }
                  }}
                  control={control}
                />
                <FormField
                  errors={errors}
                  name="phone"
                  label="Phone Number"
                  rules={{
                    required: {
                      message: "Phone Number is required!",
                      value: true
                    },
                    pattern: {
                      message: "Phone Number is wrong format!",
                      value: /^[0-9|-|+|(|)]*$/
                    },
                    minLength: {
                      message: "Phone Number minimal 6 digit",
                      value: 6
                    },
                    maxLength: {
                      message: "Phone Number maximal 20 digit",
                      value: 20
                    },
                  }}
                  fieldType={FieldType.TEXT}
                  control={control}
                />
                <FormField
                  errors={errors}
                  name="address"
                  label="Delivery Address"
                  rules={{
                    required: {
                      message: "Delivery Address is required!",
                      value: true
                    },
                    maxLength: {
                      message: "Max character is 120",
                      value: 120
                    }
                  }}
                  fieldType={FieldType.TEXTAREA}
                  control={control}
                />
              </div>
              <div style={{width: "100%"}}>
                <FormField
                  errors={errors}
                  name="dropshipperName"
                  label="Dropshipper Name"
                  rules={{
                    required: {
                      message: "Dropshipper Address is required!",
                      value: watch("isDropshipper")
                    }
                  }}
                  fieldType={FieldType.TEXT}
                  control={control}
                  disabled={!watch("isDropshipper")}
                />
                <FormField
                  errors={errors}
                  name="dropshipperPhoneNumber"
                  label="Dropshipper Phone Number"
                  rules={{
                    required: {
                      message: "Dropshipper Phone Number is required!",
                      value: watch("isDropshipper")
                    },
                    pattern: {
                      message: "Dropshipper Phone Number is wrong format!",
                      value: /^[0-9|-|+|(|)]*$/
                    },
                    minLength: {
                      message: "Phone Number minimal 6 digit",
                      value: 6
                    },
                    maxLength: {
                      message: "Phone Number maximal 20 digit",
                      value: 20
                    },
                  }}
                  fieldType={FieldType.PHONE}
                  control={control}
                  disabled={!watch("isDropshipper")}
                />
              </div>
            </FlexRowResponsive>
          </LeftContentWrapper>
          <LeftContentWrapper style={{display: watch("stepOption") === "Payment" ? 'block' : 'none'}}>
            <div><CustomTitleWrapper>Shipment</CustomTitleWrapper></div>
            <FormField
              errors={errors}
              name="shipment"
              label="Shipment"
              rules={{
                required: {
                  message: "Shipment is required!",
                  value: watch("stepOption") === "Payment"
                },
              }}
              options={CONSTANT.SHIPMENT_OPTIONS.map(option => ({
                label: (
                  <FlexCol>
                    <span>{option.label}</span>
                    <b style={{fontSize: 16}}>{numFormatter(option.value, ',')}</b>
                  </FlexCol>
                ),
                value: option.value
              }))}
              fieldType={FieldType.RADIOBOX}
              control={control}
            />
            <div style={{marginTop: 40}}><CustomTitleWrapper>Payment</CustomTitleWrapper></div>
            <FormField
              errors={errors}
              name="payment"
              label="Payment"
              rules={{
                required: {
                  message: "Payment is required!",
                  value: watch("stepOption") === "Payment"
                },
              }}
              options={CONSTANT.PAYMENT_OPTIONS.map(option => ({
                label: (
                  <FlexCol>
                    <span>{option.label}</span>
                    {option.amountLeft && <b style={{fontSize: 16}}>{numFormatter(option.amountLeft, ',')} left</b>}
                  </FlexCol>
                ),
                value: option.value
              }))}
              fieldType={FieldType.RADIOBOX}
              control={control}
            />
          </LeftContentWrapper>
          <LeftContentFinishWrapper style={{display: watch("stepOption") === "Finish" ? 'flex' : 'none'}}>
            <div>
              <div style={{marginBottom: 30}}><CustomTitleWrapper>Thank you</CustomTitleWrapper></div>
              <RightContentValue>Order ID : {generateRandomAlphanumeric(5, ["1","I","0","O"])}</RightContentValue>
              <RightContentLabel>Your order will be delivered {CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment"))?.estimatedTime} with {CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment"))?.label}</RightContentLabel>
              <BackBtn 
                icon='arrow_back' 
                style={{marginTop: 50}}
                onClick={goBackHandler}
              >
                Go to homepage
              </BackBtn>
            </div>
          </LeftContentFinishWrapper>
          <RightContentWrapper>
            <RightContentMainWrapper>
              <CustomSubTitleWrapper>Summary</CustomSubTitleWrapper>
              <FlexRow><RightContentLabel>10 items purchased</RightContentLabel></FlexRow>
              {typeof watch("shipment") === "number" && CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment")) &&
                <SummaryTopInfo 
                  label="Delivery estimation"
                  value={`${CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment"))?.estimatedTime} by ${CONSTANT.SHIPMENT_OPTIONS.find(option => option.value === watch("shipment"))?.label}`}
                />
              }
              {typeof watch("payment") === "number" && CONSTANT.PAYMENT_OPTIONS.find(option => option.value === watch("payment")) &&
                <SummaryTopInfo 
                  label="Payment Method"
                  value={CONSTANT.PAYMENT_OPTIONS.find(option => option.value === watch("payment"))?.label}
                />
              }
            </RightContentMainWrapper>
            <RightContentMainWrapper>
              <FlexRow>
                <RightContentLabel>Cost of goods</RightContentLabel>
                <RightContentValue>{numFormatter(CONSTANT.COST_OF_GOODS, ",")}</RightContentValue>
              </FlexRow>
              {watch("isDropshipper") &&
                <FlexRow>
                  <RightContentLabel>Dropshipping Fee</RightContentLabel>
                  <RightContentValue>{numFormatter(CONSTANT.DROPSHIPPING_FEE, ",")}</RightContentValue>
                </FlexRow>
              }
              {shipmentInfoRenderer()}
              <CustomSubTitleWrapper style={{margin: '20px 0 20px 0'}}>
                <FlexRow>
                  <span>Total</span>
                  <span>{getTotalPayment()}</span>
                </FlexRow>
              </CustomSubTitleWrapper>
              {getLabelBtnByStatus() && 
                <NextButton onClick={handleSubmit(submitHandler)}>
                  {getLabelBtnByStatus()}
                </NextButton>
              }
            </RightContentMainWrapper>
          </RightContentWrapper>
        </FlexRowResponsive>
      </Content>
    </Wrapper>
  );
}

export default App;
