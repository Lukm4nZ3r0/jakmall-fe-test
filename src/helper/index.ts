export const numFormatter = (n: string | number | bigint, separator?: string) => {
	let splitStr = n.toString().split(separator || '.')
	splitStr[0] = splitStr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	return splitStr.join(separator || '.')
}

export const generateRandomAlphanumeric = (n: number, letterException?: Array<string>) => {
	let result = ""
	let alphanumerics = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	if(letterException) {
		letterException.forEach(letter => {
			alphanumerics = alphanumerics.split('').filter(l => l !== letter).join('')
		})
	}
	for(let i = 0 ; i < n ; i++) {
		result += alphanumerics[Math.floor(Math.random()*alphanumerics.length)]
	}
	return result
}