export function generateUUID(){
	let cryptoObj = window.crypto || window.msCrypto; // for IE 11
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ cryptoObj.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	)
}
