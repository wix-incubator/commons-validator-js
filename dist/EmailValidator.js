"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.EmailValidator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DomainValidator = require("./DomainValidator");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EmailValidator = exports.EmailValidator = function () {
	function EmailValidator() {
		_classCallCheck(this, EmailValidator);

		//const specialChars = "\\p{Cntrl}\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]" // TODO: \\p{Cntrl}
		var specialChars = "\\(\\)<>@,;:'\\\\\\\"\\.\\[\\]";
		var validChars = "[^\\s" + specialChars + "]";
		var quotedUser = "(\"[^\"]*\")";
		var word = "((" + validChars + "|')+|" + quotedUser + ")";
		var userRegex = "^\\s*" + word + "(\\." + word + ")*$";
		this._userPattern = new RegExp(userRegex);

		var emailRegex = "^\\s*?(.+)@(.+?)\\s*$";
		this._emailPattern = new RegExp(emailRegex);

		this._domainValidator = new _DomainValidator.DomainValidator();
	}

	_createClass(EmailValidator, [{
		key: "_isValidDomain",
		value: function _isValidDomain(domain) {
			return this._domainValidator.isValid(domain);
		}
	}, {
		key: "_isValidUser",
		value: function _isValidUser(user) {
			if (!user || user.length > 64) {
				return false;
			}

			return user.match(this._userPattern);
		}
	}, {
		key: "isValid",
		value: function isValid(email) {
			if (!email) {
				return false;
			}

			if (email[email.length - 1] === ".") {
				return false;
			}

			var groups = email.match(this._emailPattern);
			if (!groups) {
				return false;
			}

			if (!this._isValidUser(groups[1])) {
				return false;
			}

			if (!this._isValidDomain(groups[2])) {
				return false;
			}

			return true;
		}
	}]);

	return EmailValidator;
}();