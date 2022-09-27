import { CustomOption } from "./components/reusable/FormField";

export interface ConstantProps {
  STEPPER_OPTION: Array<"Delivery" | "Payment" | "Finish">;
  SHIPMENT_OPTIONS: Array<{ estimatedTime: string } & CustomOption>;
  PAYMENT_OPTIONS: Array<{ amountLeft?: number } & CustomOption>;
  COST_OF_GOODS: number;
  DROPSHIPPING_FEE: number;
}

const CONSTANT: ConstantProps = {
  STEPPER_OPTION: ["Delivery","Payment","Finish"],
  SHIPMENT_OPTIONS: [
    {
      label: "GO-SEND",
      value: 15000,
      estimatedTime: "today"
    },
    {
      label: "JNE",
      value: 9000,
      estimatedTime: "2 days"
    },
    {
      label: "Personal Courier",
      value: 29000,
      estimatedTime: "1 day"
    },
  ],
  PAYMENT_OPTIONS: [
    {
      label: "e-Wallet",
      value: 0,
      amountLeft: 1500000
    },
    {
      label: "Bank Transfer",
      value: 1
    },
    {
      label: "Virtual Account",
      value: 2
    },
  ],
  COST_OF_GOODS: 500000,
  DROPSHIPPING_FEE: 5900,
}

export default CONSTANT