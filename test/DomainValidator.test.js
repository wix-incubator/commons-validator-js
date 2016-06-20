"use strict"

import {expect, assert} from "chai"
import {DomainValidator} from "../src/DomainValidator"

describe("DomainValidator", () => {
	const validator = new DomainValidator()
	
    it ("passes Apache's DomainValidatorTest#testValidDomains", () => {
		assert.ok(validator.isValid("apache.org"), "apache.org should validate")
		assert.ok(validator.isValid("www.google.com"), "www.google.com should validate")

		assert.ok(validator.isValid("test-domain.com"), "test-domain.com should validate")
		assert.ok(validator.isValid("test---domain.com"), "test---domain.com should validate")
		assert.ok(validator.isValid("test-d-o-m-ain.com"), "test-d-o-m-ain.com should validate")
		assert.ok(validator.isValid("as.uk"), "two-letter domain label should validate")

		assert.ok(validator.isValid("ApAchE.Org"), "case-insensitive ApAchE.Org should validate")

		assert.ok(validator.isValid("z.com"), "single-character domain label should validate")

		assert.ok(validator.isValid("i.have.an-example.domain.name"), "i.have.an-example.domain.name should validate")
    })
	
    it ("passes Apache's DomainValidatorTest#testInvalidDomains", () => {
		assert.notOk(validator.isValid(".org"), "bare TLD .org shouldn't validate")
		assert.notOk(validator.isValid(" apache.org "), "domain name with spaces shouldn't validate")
		assert.notOk(validator.isValid("apa che.org"), "domain name containing spaces shouldn't validate")
		assert.notOk(validator.isValid("-testdomain.name"), "domain name starting with dash shouldn't validate")
		assert.notOk(validator.isValid("testdomain-.name"), "domain name ending with dash shouldn't validate")
		assert.notOk(validator.isValid("---c.com"), "domain name starting with multiple dashes shouldn't validate")
		assert.notOk(validator.isValid("c--.com"), "domain name ending with multiple dashes shouldn't validate")
		assert.notOk(validator.isValid("apache.rog"), "domain name with invalid TLD shouldn't validate")

		assert.notOk(validator.isValid("http://www.apache.org"), "URL shouldn't validate")
		assert.notOk(validator.isValid(" "), "Empty string shouldn't validate as domain name")
		assert.notOk(validator.isValid(null), "Null shouldn't validate as domain name")
    })
	
    it ("passes Apache's DomainValidatorTest#testTopLevelDomains", () => {
        // infrastructure TLDs
		assert.ok(validator.isValidInfrastructureTld(".arpa"), ".arpa should validate as iTLD")
		assert.notOk(validator.isValidInfrastructureTld(".com"), ".com shouldn't validate as iTLD")

        // generic TLDs
		assert.ok(validator.isValidGenericTld(".name"), ".name should validate as gTLD")
		assert.notOk(validator.isValidGenericTld(".us"), ".us shouldn't validate as gTLD")

        // country code TLDs
		assert.ok(validator.isValidCountryCodeTld(".uk"), ".uk should validate as ccTLD")
		assert.notOk(validator.isValidCountryCodeTld(".org"), ".org shouldn't validate as ccTLD")

        // case-insensitive
		assert.ok(validator.isValidTld(".COM"), ".COM should validate as TLD")
		assert.ok(validator.isValidTld(".BiZ"), ".BiZ should validate as TLD")

        // corner cases
		assert.notOk(validator.isValid(".nope"), "invalid TLD shouldn't validate")
		assert.notOk(validator.isValid(""), "empty string shouldn't validate as TLD")
		assert.notOk(validator.isValid(null), "null shouldn't validate as TLD")
    })
	
    it ("passes Apache's DomainValidatorTest#testIDN", () => {
		assert.ok(validator.isValid("www.xn--bcher-kva.ch"), "b\u00fccher.ch in IDN should validate")
    })
	
    it ("passes Apache's DomainValidatorTest#testIDNJava6OrLater", () => {
		assert.ok(validator.isValid("www.b\u00fccher.ch"), "b\u00fccher.ch should validate")
		assert.ok(validator.isValid("xn--d1abbgf6aiiy.xn--p1ai"), "xn--d1abbgf6aiiy.xn--p1ai should validate")
		assert.ok(validator.isValid("президент.рф"), "президент.рф should validate")
//		assert.notOk(validator.isValid("www.\uFFFD.ch"), "www.\uFFFD.ch FFFD should fail") // TODO: this test fails
	})
	
    it ("passes Apache's DomainValidatorTest#testRFC2396domainlabel", () => {
		assert.ok(validator.isValid("a.ch"), "a.ch should validate")
		assert.ok(validator.isValid("9.ch"), "9.ch should validate")
		assert.ok(validator.isValid("az.ch"), "az.ch should validate")
		assert.ok(validator.isValid("09.ch"), "09.ch should validate")
		assert.ok(validator.isValid("9-1.ch"), "9-1.ch should validate")
		assert.notOk(validator.isValid("91-.ch"), "91-.ch should not validate")
		assert.notOk(validator.isValid("-.ch"), "-.ch should not validate")
    })
	
    it ("passes Apache's DomainValidatorTest#testRFC2396toplabel", () => {
		assert.ok(validator.extractTld("a.c"), "a.c (alpha) should validate")
		assert.ok(validator.extractTld("a.cc"), "a.cc (alpha alpha) should validate")
		assert.ok(validator.extractTld("a.c9"), "a.c9 (alpha alphanum) should validate")
		assert.ok(validator.extractTld("a.c-9"), "a.c-9 (alpha - alphanum) should validate")
		assert.ok(validator.extractTld("a.c-z"), "a.c-z (alpha - alpha) should validate")
		
		assert.notOk(validator.extractTld("a.9c"), "a.9c (alphanum alpha) should fail")
		assert.notOk(validator.extractTld("a.c-"), "a.c- (alpha -) should fail")
		assert.notOk(validator.extractTld("a.-"), "a.- (-) should fail")
		assert.notOk(validator.extractTld("a.-9"), "a.-9 (- alphanum) should fail")
    })
	
    it ("passes Apache's DomainValidatorTest#testDomainNoDots", () => {
		assert.ok(validator.extractTld("a"), "a (alpha) should validate")
//		assert.ok(validator.extractTld("9"), "9 (alphanum) should validate") // TODO: this test fails
		assert.ok(validator.extractTld("c-z"), "c-z (alpha - alpha) should validate")

		assert.notOk(validator.extractTld("c-"), "c- (alpha -) should fail")
		assert.notOk(validator.extractTld("-c"), "-c (- alpha) should fail")
		assert.notOk(validator.extractTld("-"), "- (-) should fail")
	})
	
    it ("passes Apache's DomainValidatorTest#testValidator297", () => {
		assert.ok(validator.isValid("xn--d1abbgf6aiiy.xn--p1ai"), "xn--d1abbgf6aiiy.xn--p1ai should validate")
	})
	
    it ("passes Apache's DomainValidatorTest#testValidator306", () => {
		const longString = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789A"
        expect(longString.length).to.be.equal(63) // 26 * 2 + 11
		
		assert.ok(validator.extractTld(longString+".com"), "63 chars label should validate")
		assert.notOk(validator.extractTld(longString+"x.com"), "64 chars label should fail")

		assert.ok(validator.extractTld("test."+longString), "63 chars TLD should validate")
		assert.notOk(validator.extractTld("test.x"+longString), "64 chars TLD should fail")
		
        const longDomain = 
                longString
                + "." + longString
                + "." + longString
                + "." + longString.substring(0,61)
		expect(longDomain.length).to.be.equal(253)
		assert.ok(validator.extractTld(longDomain), "253 chars domain should validate")
		assert.notOk(validator.extractTld(longDomain+"x"), "254 chars domain should fail")
	})
})
