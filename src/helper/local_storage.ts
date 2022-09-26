export const initialStore = {
  stepOption: 0,
  name: "",
  phone: "",
  address: "",
  isDropshipper: false,
  dropshipperName: "",
  dropshipperPhoneNumber: "",
  shipment: null,
  payment: null
}

export const setToLocalStorage = (nv: Partial<typeof initialStore>) => {
  localStorage.setItem('fe-test-store', JSON.stringify({...initialStore, ...nv}))
}

export const getLocalStorage = (): typeof initialStore => {
  return JSON.parse(localStorage.getItem('fe-test-store') ?? JSON.stringify(initialStore))
}