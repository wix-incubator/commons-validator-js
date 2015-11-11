"use strict"

import {DomainValidator} from "./DomainValidator.js"

export class EmailValidator {
	constructor() {
		//let specialChars = "\\p{Cntrl}\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]" // TODO: \\p{Cntrl}
		let specialChars = "\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]"
		let validChars = "[^\\s" + specialChars + "]"
		let quotedUser = "(\"[^\"]*\")"
		let word = "((" + validChars + "|')+|" + quotedUser + ")"
		let userRegex = "^\\s*" + word + "(\\." + word + ")*$"
		this._userPattern = new RegExp(userRegex)

		let emailRegex = "^\\s*?(.+)@(.+?)\\s*$"
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
		
		let groups = email.match(this._emailPattern)
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