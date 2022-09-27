import { fireEvent, render } from '@testing-library/react';
import App from './App';
import CONSTANT from './Constant';
import { numFormatter } from './helper';
import 'jest-styled-components';

describe.only("test every functionality by requirements", ()=> {
  test("the border will change color to green if the validation is successful", () => {
    const { getByTestId } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "email"), {
      target: {
        value: "test@test.com"
      }
    })
    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    setTimeout(()=>{
      expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + "email")).toHaveStyleRule('border','1px solid #1BD97B')
    }, 100)
  })
  test("the border will change color to orange if the validation is fail", () => {
    const { getByTestId } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "email"), {
      target: {
        value: "test"
      }
    })
    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    setTimeout(()=>{
      expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + "email")).toHaveStyleRule('border', '1px solid #FF8A00')
    }, 100)
  })
  test("if dropshipper not checked, dropshipper field will be empty", () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + "dropshipperName")).not.toHaveValue()
  })
  test("if dropshipper not checked, dropshipper field will be disabled", () => {
    const { getByTestId } = render(<App />);

    expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + "dropshipperName")).toHaveAttribute('disabled')
  })
  test("if dropshipper checked, dropshipper field will be enabled", () => {
    const { getByTestId } = render(<App />);

    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "isDropshipper"))

    expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + "dropshipperName")).not.toHaveAttribute('disabled')
  })
  test("if dropshipper checked, dropshipper field will be charge amount 5.900", () => {
    const { getByTestId, findByText } = render(<App />);

    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "isDropshipper"))

    findByText(numFormatter(CONSTANT.DROPSHIPPING_FEE, ','))
  })
  test("phone number can contain 0-9,-,+,(,)", () => {
    const { getByTestId } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "phone"), {
      target: {
        value: "08123456"
      }
    })
    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    setTimeout(()=>{
      expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_WRAPPER + "phone")).toHaveStyleRule('border','1px solid #1BD97B')
    }, 100)

  })
  test("phone number must more than equal 6", () => {
    const { getByTestId, findByText } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "phone"), {
      target: {
        value: "0812"
      }
    })
    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    findByText("Phone Number minimal 6 digit")
  })
  test("phone number must less than equal 20", () => {
    const { getByTestId, findByText } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "phone"), {
      target: {
        value: "08121111111111111111"
      }
    })
    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    findByText("Phone Number maximal 20 digit")
  })
  test("address is required", () => {
    const { getByTestId, findByText } = render(<App />);

    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    findByText("Delivery Address is required!")
  })
  test("address character must less than equal 120 chars", () => {
    const { getByTestId, findByText } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "address"), {
      target: {
        value: "testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting"
      }
    })
    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    findByText("Max character is 120")
  })
  test("there is number counter in address", () => {
    const { getByTestId } = render(<App />);
    const dummyStr = "testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting"

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "address"), {
      target: {
        value: dummyStr
      }
    })

    expect(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD_COUNTER + "address").innerHTML).toEqual(`${dummyStr.length}/120`)
  })
  test("must be valid email", () => {
    const { getByTestId, findByText } = render(<App />);

    fireEvent.input(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.FIELD + "email"), {
      target: {
        value: "test"
      }
    })

    fireEvent.click(getByTestId(CONSTANT.UNIT_TEST_PREFIX_ID.SUBMIT_BTN))

    findByText("Email Address is wrong format!")
  })
})