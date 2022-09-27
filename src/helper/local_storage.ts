export const initialStore = {
  stepOption: "Delivery" as "Delivery" | "Payment" | "Finish",
  email: "",
  phone: "",
  address: "",
  isDropshipper: false,
  dropshipperName: "",
  dropshipperPhoneNumber: "",
  shipment: null,
  payment: null
}

export const setToLocalStorage = (nv: Partial<typeof initialStore>) => {
  localStorage.setItem('fe-test-store', JSON.stringify({...getLocalStorage(), ...nv}))
}

export const getLocalStorage = (message?: string): typeof initialStore => {
  const parsedStorage = JSON.parse(localStorage.getItem('fe-test-store') ?? JSON.stringify(initialStore))
  if(message) console.log(message, parsedStorage)
  return parsedStorage
}