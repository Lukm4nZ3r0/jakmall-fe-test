export const numFormatter = (n: string | number | bigint, decimalSymbol?: string) => {
	let splitStr = n.toString().split(decimalSymbol || '.')
	splitStr[0] = splitStr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	return splitStr.join(decimalSymbol || '.')
}