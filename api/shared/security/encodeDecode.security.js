const crypto = require('crypto');
const algorithm = 'aes-192-cbc';

const encode = async (content) => {
	try {
		const iv = crypto.randomBytes(16)
		const cipher = crypto.createCipheriv(algorithm, Buffer.from(process.env.encrypt_key, 'utf8'), iv)
		const encrypt = cipher.update(content)
		const encrypted = Buffer.concat([encrypt, cipher.final()])
		return encrypted.toString('hex')+"-"+iv.toString('hex')
	} catch (error) {
		return null
	}
}

const decode = async (hash) => {
    try {
			const content = hash.split('-')
			const iv = Buffer.from(content[1], 'hex')
			const encrypted = Buffer.from(content[0], 'hex')
			const decipher = crypto.createDecipheriv(algorithm, Buffer.from(process.env.encrypt_key, 'utf8'), iv)
			const decrypt = decipher.update(encrypted)
			return Buffer.from([decrypt, decipher.final()]).toString()
		} catch (error) {
			return null
		}
}

module.exports = {
    encode,
    decode
}
