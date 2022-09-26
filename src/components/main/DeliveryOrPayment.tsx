import { FC, Fragment } from "react"
import { BackBtn, FormField } from "../reusable"
import { FieldType } from "../reusable/FormField"
import { CustomSubTitleWrapper, CustomTitleWrapper, FlexRow, FlexRowResponsive, LeftContentWrapper, NextButton, RightContentLabel, RightContentMainWrapper, RightContentValue, RightContentWrapper } from "../styledComponents"
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'

const defaultValues = {
  name: "",
  isDropshipper: true,
  radio: null,
  fieldArray: [{value:"tes"},{value:"tes2"}]
}

const DeliveryOrPayment: FC = () => {
  const { handleSubmit, control, formState: { errors }, setValue, watch } = useForm<typeof defaultValues>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange"
  })
  const { fields } = useFieldArray({
    control,
    name: "fieldArray"
  })
  const submitHandler: SubmitHandler<typeof defaultValues> = async (vals) => {
    console.log(vals)
    console.log(watch())
  }
  return (
    <Fragment>
      <BackBtn icon='arrow_back' style={{marginTop: 50}}>Back to cart</BackBtn>
      <FlexRowResponsive style={{marginTop: 25}}>
        <LeftContentWrapper>
          <FlexRowResponsive>
            <div><CustomTitleWrapper>Delivery details</CustomTitleWrapper></div>
            <FormField
              errors={errors}
              name="isDropshipper"
              label="Send as dropshipper"
              fieldType={FieldType.SINGLE_CHECKBOX}
              control={control}
            />
          </FlexRowResponsive>
          <FormField
            errors={errors}
            name="radio"
            label="Testing"
            fieldType={FieldType.RADIOBOX}
            control={control}
            rules={{
              required: {
                message: "Is Promo is required!",
                value: true
              }
            }}
            options={[
              {
                label: "TEST 0",
                value: 0
              },
              {
                label: "TEST 1",
                value: 1
              },
              {
                label: "TEST 2",
                value: 2
              },
            ]}
          />
          {fields.map((field, index) => 
            <FormField 
              key={field.id}
              errors={errors}
              disabled
              name={`fieldArray.${index}.value`}
              label="Testing Array"
              fieldType={FieldType.TEXT}
              control={control}
              rules={{
                required: {
                  message: "Is Promo is required!",
                  value: true
                }
              }}
            />
          )}
          <button onClick={handleSubmit(submitHandler)}>AZ</button>
        </LeftContentWrapper>
        <RightContentWrapper>
          <RightContentMainWrapper>
            <CustomSubTitleWrapper>Summary</CustomSubTitleWrapper>
            <FlexRow>
              <RightContentLabel>10 items purchased</RightContentLabel>
            </FlexRow>
          </RightContentMainWrapper>
          <RightContentMainWrapper>
            <FlexRow>
              <RightContentLabel>Cost of goods</RightContentLabel>
              <RightContentValue>500.000</RightContentValue>
            </FlexRow>
            <FlexRow>
              <RightContentLabel>Dropshipping Fee</RightContentLabel>
              <RightContentValue>500.000</RightContentValue>
            </FlexRow>
            <FlexRow>
              <RightContentLabel><b>GO-SEND</b> shipment</RightContentLabel>
              <RightContentValue>500.000</RightContentValue>
            </FlexRow>
            <CustomSubTitleWrapper style={{margin: '20px 0 20px 0'}}>
              <FlexRow>
                <span>Total</span>
                <span>500.000</span>
              </FlexRow>
            </CustomSubTitleWrapper>
            <NextButton>Continue to Payment</NextButton>
          </RightContentMainWrapper>
        </RightContentWrapper>
      </FlexRowResponsive>
    </Fragment>
  )
}

export default DeliveryOrPayment