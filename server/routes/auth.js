import jwt from 'jsonwebtoken';

/* SECRET KEY SHOULD BE CHANGED FOR EACH APP */
const secret = 'afLKNAFBa2lkf35PFK4Mdfskl';

export function generateToken(data){
	return jwt.sign(data, secret);
}

export function readToken(token){
	return jwt.verify(token, secret);
}

export function readTokenFromHeaders(headers){
	return jwt.verify(headers.authorization.split('Bearer ')[1], secret);
}
