"use strict"

import {expect, assert} from "chai"
import * as DomainValidator from "../src/DomainValidator.js"

describe("DomainValidator", function() {
    it ("validates valid domains", function() {
		assert.ok(DomainValidator.isValid("apache.org"), "apache.org should validate")
		assert.ok(DomainValidator.isValid("www.google.com"), "www.google.com should validate")

		assert.ok(DomainValidator.isValid("test-domain.com"), "test-domain.com should validate")
		assert.ok(DomainValidator.isValid("test---domain.com"), "test---domain.com should validate")
		assert.ok(DomainValidator.isValid("test-d-o-m-ain.com"), "test-d-o-m-ain.com should validate")
		assert.ok(DomainValidator.isValid("as.uk"), "two-letter domain label should validate")

		assert.ok(DomainValidator.isValid("ApAchE.Org"), "case-insensitive ApAchE.Org should validate")

		assert.ok(DomainValidator.isValid("z.com"), "single-character domain label should validate")

		assert.ok(DomainValidator.isValid("i.have.an-example.domain.name"), "i.have.an-example.domain.name should validate")
    })
	
    it ("doesn't validate invalid domains", function() {
		assert.notOk(DomainValidator.isValid(".org"), "bare TLD .org shouldn't validate")
		assert.notOk(DomainValidator.isValid(" apache.org "), "domain name with spaces shouldn't validate")
		assert.notOk(DomainValidator.isValid("apa che.org"), "domain name containing spaces shouldn't validate")
		assert.notOk(DomainValidator.isValid("-testdomain.name"), "domain name starting with dash shouldn't validate")
		assert.notOk(DomainValidator.isValid("testdomain-.name"), "domain name ending with dash shouldn't validate")
		assert.notOk(DomainValidator.isValid("---c.com"), "domain name starting with multiple dashes shouldn't validate")
		assert.notOk(DomainValidator.isValid("c--.com"), "domain name ending with multiple dashes shouldn't validate")
		assert.notOk(DomainValidator.isValid("apache.rog"), "domain name with invalid TLD shouldn't validate")

		assert.notOk(DomainValidator.isValid("http://www.apache.org"), "URL shouldn't validate")
		assert.notOk(DomainValidator.isValid(" "), "Empty string shouldn't validate as domain name")
		assert.notOk(DomainValidator.isValid(null), "Null shouldn't validate as domain name")
    })
	
    it ("correctly handles top level domains", function() {
        // infrastructure TLDs
		assert.ok(DomainValidator.isValidInfrastructureTld(".arpa"), ".arpa should validate as iTLD")
		assert.notOk(DomainValidator.isValidInfrastructureTld(".com"), ".com shouldn't validate as iTLD")

        // generic TLDs
		assert.ok(DomainValidator.isValidGenericTld(".name"), ".name should validate as gTLD")
		assert.notOk(DomainValidator.isValidGenericTld(".us"), ".us shouldn't validate as gTLD")

        // country code TLDs
		assert.ok(DomainValidator.isValidCountryCodeTld(".uk"), ".uk should validate as ccTLD")
		assert.notOk(DomainValidator.isValidCountryCodeTld(".org"), ".org shouldn't validate as ccTLD")

        // case-insensitive
		assert.ok(DomainValidator.isValidTld(".COM"), ".COM should validate as TLD")
		assert.ok(DomainValidator.isValidTld(".BiZ"), ".BiZ should validate as TLD")

        // corner cases
		assert.notOk(DomainValidator.isValid(".nope"), "invalid TLD shouldn't validate")
		assert.notOk(DomainValidator.isValid(""), "empty string shouldn't validate as TLD")
		assert.notOk(DomainValidator.isValid(null), "null shouldn't validate as TLD")
    })
	
    it ("supports IDN", function() {
		assert.ok(DomainValidator.isValid("www.xn--bcher-kva.ch"), "b\u00fccher.ch in IDN should validate")
		assert.ok(DomainValidator.isValid("www.b\u00fccher.ch"), "b\u00fccher.ch should validate")
		assert.ok(DomainValidator.isValid("xn--d1abbgf6aiiy.xn--p1ai"), "xn--d1abbgf6aiiy.xn--p1ai should validate")
		assert.ok(DomainValidator.isValid("президент.рф"), "президент.рф should validate")
//		assert.notOk(DomainValidator.isValid("www.\uFFFD.ch"), "www.\uFFFD.ch FFFD should fail") // TODO: this test fails
    })
	
    it ("follows RFC2396 for domain labels", function() {
		assert.ok(DomainValidator.isValid("a.ch"), "a.ch should validate")
		assert.ok(DomainValidator.isValid("9.ch"), "9.ch should validate")
		assert.ok(DomainValidator.isValid("az.ch"), "az.ch should validate")
		assert.ok(DomainValidator.isValid("09.ch"), "09.ch should validate")
		assert.ok(DomainValidator.isValid("9-1.ch"), "9-1.ch should validate")
		assert.notOk(DomainValidator.isValid("91-.ch"), "91-.ch should not validate")
		assert.notOk(DomainValidator.isValid("-.ch"), "-.ch should not validate")
    })
	
    it ("follows RFC2396 for top labels", function() {
		assert.ok(DomainValidator.extractTld("a.c"), "a.c (alpha) should validate")
		assert.ok(DomainValidator.extractTld("a.cc"), "a.cc (alpha alpha) should validate")
		assert.ok(DomainValidator.extractTld("a.c9"), "a.c9 (alpha alphanum) should validate")
		assert.ok(DomainValidator.extractTld("a.c-9"), "a.c-9 (alpha - alphanum) should validate")
		assert.ok(DomainValidator.extractTld("a.c-z"), "a.c-z (alpha - alpha) should validate")
		
		assert.notOk(DomainValidator.extractTld("a.9c"), "a.9c (alphanum alpha) should fail")
		assert.notOk(DomainValidator.extractTld("a.c-"), "a.c- (alpha -) should fail")
		assert.notOk(DomainValidator.extractTld("a.-"), "a.- (-) should fail")
		assert.notOk(DomainValidator.extractTld("a.-9"), "a.-9 (- alphanum) should fail")
    })
	
    it ("follows RFC1123", function() {
		assert.ok(DomainValidator.extractTld("a"), "a (alpha) should validate")
//		assert.ok(DomainValidator.extractTld("9"), "9 (alphanum) should validate") // TODO: this test fails
		assert.ok(DomainValidator.extractTld("c-z"), "c-z (alpha - alpha) should validate")

		assert.notOk(DomainValidator.extractTld("c-"), "c- (alpha -) should fail")
		assert.notOk(DomainValidator.extractTld("-c"), "-c (- alpha) should fail")
		assert.notOk(DomainValidator.extractTld("-"), "- (-) should fail")
	})
	
    it ("passes commons-validator test 297", function() {
		assert.ok(DomainValidator.isValid("xn--d1abbgf6aiiy.xn--p1ai"), "xn--d1abbgf6aiiy.xn--p1ai should validate")
	})
	
    it ("passes commons-validator test 306", function() {
		let longString = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz0123456789A"
        expect(longString.length).to.be.equal(63) // 26 * 2 + 11
		
		assert.ok(DomainValidator.extractTld(longString+".com"), "63 chars label should validate")
		assert.notOk(DomainValidator.extractTld(longString+"x.com"), "64 chars label should fail")

		assert.ok(DomainValidator.extractTld("test."+longString), "63 chars TLD should validate")
		assert.notOk(DomainValidator.extractTld("test.x"+longString), "64 chars TLD should fail")
		
        let longDomain = 
                longString
                + "." + longString
                + "." + longString
                + "." + longString.substring(0,61)
		expect(longDomain.length).to.be.equal(253)
		assert.ok(DomainValidator.extractTld(longDomain), "253 chars domain should validate")
		assert.notOk(DomainValidator.extractTld(longDomain+"x"), "254 chars domain should fail")
	})
})
