/**
 * @param {string} phone
 * @returns {Boolean}
 */
export function checkPhone(phone) {
	const reg = /^1[34578]\d{9}$/
	return reg.test(phone)
}

/**
 * @param {string} idNumber
 * @returns {Boolean}
 */
export function checkIdNumber(idNumber) {
	const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	return reg.test(idNumber)
}
