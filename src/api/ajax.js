import Promise from 'bluebird';


const Ajax = (params) => {
	/*
	 Params: {method[str], action[str], headers[obj], body[obj], onProgress[fxn]}
	 */
	const xhr = new XMLHttpRequest();
	// Open API call
	xhr.open(params.method, params.action, true);

	// Attach authentication token
	//if (localStorage.TOKEN_NAME) xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.TOKEN_NAME);

	// Ajax call gets returned as a promise
	return new Promise((resolve, reject) => {

		// Reject on error
		xhr.onerror = (event) => reject(new Error(xhr.statusText));

		xhr.onload = (event) => {
			// Only resolve for 200 status responses
			if (xhr.status === 200){
				resolve(xhr.response);
			} else reject(new Error(xhr.statusText));
		}

		// Optional onProgress
		if (params.onProgress) xhr.onprogress = params.onProgress;

		// Optional request headers
		if (params.headers){
			Object.keys(params.headers).forEach(headerKey => {xhr.setRequestHeader(headerKey, params.headers[headerKey])})
		}

		xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

		// Send w/ optional request body
		xhr.send(JSON.stringify(params.body || {}));

	})

};

export default Ajax;
