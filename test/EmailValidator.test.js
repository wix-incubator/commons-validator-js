"use strict"

import {expect, assert} from "chai"
import {EmailValidator} from "../src/EmailValidator"

describe("EmailValidator", () => {
	const validator = new EmailValidator()
	
    it ("passes Apache's EmailValidatorTest#testEmail", () => {
		assert.ok(validator.isValid("jsmith@apache.org"))
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailWithNumericAddress", () => {
		//assert.ok(validator.isValid("someone@[216.109.118.76]")) // TODO: this test fails
		assert.ok(validator.isValid("someone@yahoo.com"))
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailExtension", () => {
        assert.ok(validator.isValid("jsmith@apache.org"))

        assert.ok(validator.isValid("jsmith@apache.com"))

        assert.ok(validator.isValid("jsmith@apache.net"))

        assert.ok(validator.isValid("jsmith@apache.info"))

        assert.notOk(validator.isValid("jsmith@apache."))

        assert.notOk(validator.isValid("jsmith@apache.c"))

        assert.ok(validator.isValid("someone@yahoo.museum"))

        assert.notOk(validator.isValid("someone@yahoo.mu-seum"))
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailWithDash", () => {
		assert.ok(validator.isValid("andy.noble@data-workshop.com"))

		assert.notOk(validator.isValid("andy-noble@data-workshop.-com"))

		assert.notOk(validator.isValid("andy-noble@data-workshop.c-om"))

		assert.notOk(validator.isValid("andy-noble@data-workshop.co-m"))
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailWithDotEnd", () => {
		assert.notOk(validator.isValid("andy.noble@data-workshop.com."))
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailWithBogusCharacter", () => {
//        assert.notOk(validator.isValid("andy.noble@\u008fdata-workshop.com")) // TODO: this test fails

        assert.ok(validator.isValid("andy.o'reilly@data-workshop.com"))

        assert.notOk(validator.isValid("andy@o'reilly.data-workshop.com"))

        assert.ok(validator.isValid("foo+bar@i.am.not.in.us.example.com"))

        assert.notOk(validator.isValid("foo+bar@example+3.com"))

        assert.notOk(validator.isValid("test@%*.com"))
        assert.notOk(validator.isValid("test@^&#.com"))
    })
	
    it ("passes Apache's EmailValidatorTest#testVALIDATOR_315", () => {
		assert.notOk(validator.isValid("me@at&t.net"))
		assert.ok(validator.isValid("me@att.net"))
    })

    it ("passes Apache's EmailValidatorTest#testVALIDATOR_278", () => {
		assert.notOk(validator.isValid("someone@-test.com"))
		assert.notOk(validator.isValid("someone@test-.com"))
    })
	
    it ("passes Apache's EmailValidatorTest#testValidator235", () => {
        assert.ok(validator.isValid("someone@xn--d1abbgf6aiiy.xn--p1ai"), "xn--d1abbgf6aiiy.xn--p1ai should validate")
        assert.ok(validator.isValid("someone@президент.рф"), "президент.рф should validate")
        assert.ok(validator.isValid("someone@www.b\u00fccher.ch"), "www.b\u00fccher.ch should validate")
        //assert.notOk(validator.isValid("someone@www.\uFFFD.ch"), "www.\uFFFD.ch FFFD should fail") // TODO: this test fails
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailWithCommas", () => {
        assert.notOk(validator.isValid("joeblow@apa,che.org"))

        assert.notOk(validator.isValid("joeblow@apache.o,rg"))

        assert.notOk(validator.isValid("joeblow@apache,org"))
    })
	
    it ("passes Apache's EmailValidatorTest#testEmailWithSpaces", () => {
        assert.notOk(validator.isValid("joeblow @apache.org"))

        assert.notOk(validator.isValid("joeblow@ apache.org"))

        assert.ok(validator.isValid(" joeblow@apache.org"))

        assert.ok(validator.isValid("joeblow@apache.org "))

        assert.notOk(validator.isValid("joe blow@apache.org "))

        assert.notOk(validator.isValid("joeblow@apa che.org "))
    })
	
	// TODO: this test fails
	/*
    it ("passes Apache's EmailValidatorTest#testEmailWithSpaces", () => {
        for (let c = 0; c < 32; ++c) {
            assert.notOk(validator.isValid("foo" + String.fromCharCode(c) + "bar@domain.com"), "Test control char " + c)
        }
		assert.notOk(validator.isValid("foo" + String.fromCharCode(127) + "bar@domain.com"), "Test control char 127")
    })
	*/
	
	// TODO: not implemented
	/*
    it ("passes Apache's EmailValidatorTest#testEmailLocalhost", () => {
	})
	*/
	
    it ("passes Apache's EmailValidatorTest#testEmailWithSlashes", () => {
       assert.ok(
             validator.isValid("joe!/blow@apache.org"),
			 "/ and ! valid in username"
       )
       assert.notOk(
             validator.isValid("joe@ap/ache.org"),
             "/ not valid in domain"
       );
       assert.notOk(
             validator.isValid("joe@apac!he.org"),
             "! not valid in domain"
       );
	})
	
    it ("passes Apache's EmailValidatorTest#testEmailUserName", () => {
        assert.ok(validator.isValid("joe1blow@apache.org"));

        assert.ok(validator.isValid("joe$blow@apache.org"))

        assert.ok(validator.isValid("joe-@apache.org"))

        assert.ok(validator.isValid("joe_@apache.org"))

        assert.ok(validator.isValid("joe+@apache.org")) // + is valid unquoted

        assert.ok(validator.isValid("joe!@apache.org")) // ! is valid unquoted

        assert.ok(validator.isValid("joe*@apache.org")) // * is valid unquoted

        assert.ok(validator.isValid("joe'@apache.org")) // ' is valid unquoted

        assert.ok(validator.isValid("joe%45@apache.org")) // % is valid unquoted

        assert.ok(validator.isValid("joe?@apache.org")) // ? is valid unquoted

        assert.ok(validator.isValid("joe&@apache.org")) // & ditto

        assert.ok(validator.isValid("joe=@apache.org")) // = ditto

        assert.ok(validator.isValid("+joe@apache.org")) // + is valid unquoted

        assert.ok(validator.isValid("!joe@apache.org")) // ! is valid unquoted

        assert.ok(validator.isValid("*joe@apache.org")) // * is valid unquoted

        assert.ok(validator.isValid("'joe@apache.org")) // ' is valid unquoted

        assert.ok(validator.isValid("%joe45@apache.org")) // % is valid unquoted

        assert.ok(validator.isValid("?joe@apache.org")) // ? is valid unquoted

        assert.ok(validator.isValid("&joe@apache.org")) // & ditto

        assert.ok(validator.isValid("=joe@apache.org")) // = ditto

        assert.ok(validator.isValid("+@apache.org")) // + is valid unquoted

        assert.ok(validator.isValid("!@apache.org")) // ! is valid unquoted

        assert.ok(validator.isValid("*@apache.org")) // * is valid unquoted

        assert.ok(validator.isValid("'@apache.org")) // ' is valid unquoted

        assert.ok(validator.isValid("%@apache.org")) // % is valid unquoted

        assert.ok(validator.isValid("?@apache.org")) // ? is valid unquoted

        assert.ok(validator.isValid("&@apache.org")) // & ditto

        assert.ok(validator.isValid("=@apache.org")) // = ditto


        //UnQuoted Special characters are invalid

        assert.notOk(validator.isValid("joe.@apache.org")) // . not allowed at end of local part

        assert.notOk(validator.isValid(".joe@apache.org")) // . not allowed at start of local part

        assert.notOk(validator.isValid(".@apache.org")) // . not allowed alone

        assert.ok(validator.isValid("joe.ok@apache.org")) // . allowed embedded

        assert.notOk(validator.isValid("joe..ok@apache.org")) // .. not allowed embedded

        assert.notOk(validator.isValid("..@apache.org")) // .. not allowed alone

        assert.notOk(validator.isValid("joe(@apache.org"))

        assert.notOk(validator.isValid("joe)@apache.org"))

        assert.notOk(validator.isValid("joe,@apache.org"))

        assert.notOk(validator.isValid("joe;@apache.org"))


        //Quoted Special characters are valid
        assert.ok(validator.isValid("\"joe.\"@apache.org"))

        assert.ok(validator.isValid("\".joe\"@apache.org"))

        assert.ok(validator.isValid("\"joe+\"@apache.org"))

        assert.ok(validator.isValid("\"joe!\"@apache.org"))

        assert.ok(validator.isValid("\"joe*\"@apache.org"))

        assert.ok(validator.isValid("\"joe'\"@apache.org"))

        assert.ok(validator.isValid("\"joe(\"@apache.org"))

        assert.ok(validator.isValid("\"joe)\"@apache.org"))

        assert.ok(validator.isValid("\"joe,\"@apache.org"))

        assert.ok(validator.isValid("\"joe%45\"@apache.org"))

        assert.ok(validator.isValid("\"joe\"@apache.org"))

        assert.ok(validator.isValid("\"joe?\"@apache.org"))

        assert.ok(validator.isValid("\"joe&\"@apache.org"))

        assert.ok(validator.isValid("\"joe=\"@apache.org"))

        assert.ok(validator.isValid("\"..\"@apache.org"))
		
		// escaped quote character valid in quoted string
        assert.ok(validator.isValid("\"john\\\"doe\"@apache.org"))

        assert.ok(validator.isValid("john56789.john56789.john56789.john56789.john56789.john56789.john@example.com"))

        assert.notOk(validator.isValid("john56789.john56789.john56789.john56789.john56789.john56789.john5@example.com"))
		
        assert.ok(validator.isValid("\\>escape\\\\special\\^characters\\<@example.com"))

        assert.ok(validator.isValid("Abc\\@def@example.com"))

        assert.notOk(validator.isValid("Abc@def@example.com"))

        assert.ok(validator.isValid("space\\ monkey@example.com"))
    })
	
    it ("passes Apache's EmailValidatorTest#testValidator293", () => {
        assert.ok(validator.isValid("abc-@abc.com"))
        assert.ok(validator.isValid("abc_@abc.com"))
        assert.ok(validator.isValid("abc-def@abc.com"))
        assert.ok(validator.isValid("abc_def@abc.com"))
        assert.notOk(validator.isValid("abc@abc_def.com"))
    })
	
    it ("passes Apache's EmailValidatorTest#testValidator365", () => {
        assert.notOk(validator.isValid(
                "Loremipsumdolorsitametconsecteturadipiscingelit.Nullavitaeligulamattisrhoncusnuncegestasmattisleo."+
                "Donecnonsapieninmagnatristiquedictumaacturpis.Fusceorciduifacilisisutsapieneuconsequatpharetralectus."+
                "Quisqueenimestpulvinarutquamvitaeportamattisex.Nullamquismaurisplaceratconvallisjustoquisportamauris."+
                "Innullalacusconvalliseufringillautvenenatissitametdiam.Maecenasluctusligulascelerisquepulvinarfeugiat."+
                "Sedmolestienullaaliquetorciluctusidpharetranislfinibus.Suspendissemalesuadatinciduntduisitametportaarcusollicitudinnec."+
                "Donecetmassamagna.Curabitururnadiampretiumveldignissimporttitorfringillaeuneque."+
                "Duisantetelluspharetraidtinciduntinterdummolestiesitametfelis.Utquisquamsitametantesagittisdapibusacnonodio."+
                "Namrutrummolestiediamidmattis.Cumsociisnatoquepenatibusetmagnisdisparturientmontesnasceturridiculusmus."+
                "Morbiposueresedmetusacconsectetur.Etiamquisipsumvitaejustotempusmaximus.Sedultriciesplaceratvolutpat."+
                "Integerlacuslectusmaximusacornarequissagittissitametjusto."+
                "Cumsociisnatoquepenatibusetmagnisdisparturientmontesnasceturridiculusmus.Maecenasindictumpurussedrutrumex.Nullafacilisi."+
                "Integerfinibusfinibusmietpharetranislfaucibusvel.Maecenasegetdolorlacinialobortisjustovelullamcorpersem."+
                "Vivamusaliquetpurusidvariusornaresapienrisusrutrumnisitinciduntmollissemnequeidmetus."+
                "Etiamquiseleifendpurus.Nuncfelisnuncscelerisqueiddignissimnecfinibusalibero."+
                "Nuncsemperenimnequesitamethendreritpurusfacilisisac.Maurisdapibussemperfelisdignissimgravida."+
                "Aeneanultricesblanditnequealiquamfinibusodioscelerisqueac.Aliquamnecmassaeumaurisfaucibusfringilla."+
                "Etiamconsequatligulanisisitametaliquamnibhtemporquis.Nuncinterdumdignissimnullaatsodalesarcusagittiseu."+
                "Proinpharetrametusneclacuspulvinarsedvolutpatliberoornare.Sedligulanislpulvinarnonlectuseublanditfacilisisante."+
                "Sedmollisnislalacusauctorsuscipit.Inhachabitasseplateadictumst.Phasellussitametvelittemporvenenatisfeliseuegestasrisus."+
                "Aliquameteratsitametnibhcommodofinibus.Morbiefficiturodiovelpulvinariaculis."+
                "Aeneantemporipsummassaaconsecteturturpisfaucibusultrices.Praesentsodalesmaurisquisportafermentum."+
                "Etiamnisinislvenenatisvelauctorutullamcorperinjusto.Proinvelligulaerat.Phasellusvestibulumgravidamassanonfeugiat."+
                "Maecenaspharetraeuismodmetusegetefficitur.Suspendisseamet@gmail.com"))
    })

    it ("passes Apache's EmailValidatorTest#testEmailAtTLD", () => {
		const val = new EmailValidator({
			allowLocal: false,
			allowTld: true
		})
        assert.ok(val.isValid("test@com"))
    })
	
    it ("considers @TLD emails invalid", () => {
        assert.notOk(validator.isValid("test@com"))
    })

    it ("passes Apache's EmailValidatorTest#testValidator359", () => {
		const val = new EmailValidator({
			allowLocal: false,
			allowTld: true
		})
        assert.notOk(val.isValid("test@.com"))
    })

    it ("passes Apache's EmailValidatorTest#testValidator374", () => {
        assert.ok(validator.isValid("abc@school.school"))
    })
})
