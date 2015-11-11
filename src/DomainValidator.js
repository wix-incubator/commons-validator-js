"use strict"

import * as Domains from "./Domains.js"
import _ from 'lodash'
import * as punycode from 'punycode'

let domainLabelRegex = "[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?"
let topLabelRegex = "[a-zA-Z](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?"
let domainNameRegex = "^(?:" + domainLabelRegex + "\\.)*(" + topLabelRegex + ")\\.?$"

let domainRegex = new RegExp(domainNameRegex)

function chompLeadingDot(str) {
	if (str[0] === ".") {
		return str.substring(1)
	}
	return str
}

function unicodeToASCII(input) {
	return punycode.toASCII(input);
}

function arrayContains(sortedArray, key) {
	// TODO: use binary search
	return _.includes(sortedArray, key)
}

export function isValidCountryCodeTld(ccTld) {
	let key = chompLeadingDot(unicodeToASCII(ccTld).toLowerCase())
	return arrayContains(Domains.countryCodeTlds, key)
}

export function isValidGenericTld(gTld) {
	let key = chompLeadingDot(unicodeToASCII(gTld).toLowerCase())
	return arrayContains(Domains.genericTlds, key)
}

export function isValidInfrastructureTld(iTld) {
	let key = chompLeadingDot(unicodeToASCII(iTld).toLowerCase())
	return arrayContains(Domains.infrastructureTlds, key)
}

export function isValidTld(tld) {
	tld = unicodeToASCII(tld)
	return isValidInfrastructureTld(tld) || isValidGenericTld(tld) || isValidCountryCodeTld(tld)
}

export function extractTld(domain) {
	if (!domain) {
		return false
	}
	
	domain = unicodeToASCII(domain)
	if (domain.length > 253) {
		return false
	}
	let groups = domain.match(domainRegex)
	if (groups) {
		return groups[1]
	}
	return null
}

export function isValid(domain) {
	let tld = extractTld(domain)
	if (!tld) {
		return null
	}
	return isValidTld(tld)
}
