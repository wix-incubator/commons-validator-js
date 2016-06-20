"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.DomainValidator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Domains = require("./Domains");

var Domains = _interopRequireWildcard(_Domains);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _punycode = require("punycode");

var punycode = _interopRequireWildcard(_punycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomainValidator = exports.DomainValidator = function () {
	function DomainValidator() {
		_classCallCheck(this, DomainValidator);

		var domainLabelRegex = "[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?";
		var topLabelRegex = "[a-zA-Z](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?";
		var domainNameRegex = "^(?:" + domainLabelRegex + "\\.)*(" + topLabelRegex + ")\\.?$";
		this._domainRegex = new RegExp(domainNameRegex);
	}

	_createClass(DomainValidator, [{
		key: "_chompLeadingDot",
		value: function _chompLeadingDot(str) {
			if (str[0] === ".") {
				return str.substring(1);
			}
			return str;
		}
	}, {
		key: "_unicodeToASCII",
		value: function _unicodeToASCII(input) {
			return punycode.toASCII(input);
		}
	}, {
		key: "_arrayContains",
		value: function _arrayContains(sortedArray, key) {
			// TODO: use binary search
			return _lodash2.default.includes(sortedArray, key);
		}
	}, {
		key: "isValidCountryCodeTld",
		value: function isValidCountryCodeTld(ccTld) {
			var key = this._chompLeadingDot(this._unicodeToASCII(ccTld).toLowerCase());
			return this._arrayContains(Domains.countryCodeTlds, key);
		}
	}, {
		key: "isValidGenericTld",
		value: function isValidGenericTld(gTld) {
			var key = this._chompLeadingDot(this._unicodeToASCII(gTld).toLowerCase());
			return this._arrayContains(Domains.genericTlds, key);
		}
	}, {
		key: "isValidInfrastructureTld",
		value: function isValidInfrastructureTld(iTld) {
			var key = this._chompLeadingDot(this._unicodeToASCII(iTld).toLowerCase());
			return this._arrayContains(Domains.infrastructureTlds, key);
		}
	}, {
		key: "isValidTld",
		value: function isValidTld(tld) {
			tld = this._unicodeToASCII(tld);
			return this.isValidInfrastructureTld(tld) || this.isValidGenericTld(tld) || this.isValidCountryCodeTld(tld);
		}
	}, {
		key: "extractTld",
		value: function extractTld(domain) {
			if (!domain) {
				return false;
			}

			domain = this._unicodeToASCII(domain);
			if (domain.length > 253) {
				return false;
			}
			var groups = domain.match(this._domainRegex);
			if (groups) {
				return groups[1];
			}
			return null;
		}
	}, {
		key: "isValid",
		value: function isValid(domain) {
			var tld = this.extractTld(domain);
			if (!tld) {
				return null;
			}
			return this.isValidTld(tld);
		}
	}]);

	return DomainValidator;
}();