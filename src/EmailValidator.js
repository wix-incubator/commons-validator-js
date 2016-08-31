"use strict"

import {DomainValidator} from "./DomainValidator"

export class EmailValidator {
	constructor() {
		//const specialChars = "\\p{Cntrl}\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]" // TODO: \\p{Cntrl}
		const specialChars = "\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]"
		const validChars = "(\\\\.)|[^\\s" + specialChars + "]"
		const quotedUser = "(\"[^\"]*\")"
		const word = "((" + validChars + "|')+|" + quotedUser + ")"
		const userRegex = "^\\s*" + word + "(\\." + word + ")*$"
		this._userPattern = new RegExp(userRegex)

		const emailRegex = "^\\s*?(.+)@(.+?)\\s*$"
		this._emailPattern = new RegExp(emailRegex)
		
		this._domainValidator = new DomainValidator()
	}
	_isValidDomain(domain) {
		return this._domainValidator.isValid(domain)
	}
	_isValidUser(user) {
		if (!user || (user.length > 64)) {
			return false
		}
		
		return user.match(this._userPattern)
	}
	isValid(email) {
		if (!email) {
			return false
		}
		
		if (email[email.length - 1] === ".") {
			return false
		}
		
		const groups = email.match(this._emailPattern)
		if (!groups) {
			return false
		}
		
		if (!this._isValidUser(groups[1])) {
			return false
		}
		
		if (!this._isValidDomain(groups[2])) {
			return false
		}

		return true
	}
}