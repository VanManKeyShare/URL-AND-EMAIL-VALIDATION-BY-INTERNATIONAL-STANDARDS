/*
 * IRIs
 * 
 * Definitions from (unless otherwise noted):
 * - [RFC 3987] IRI
 */

// [RFC 2234] ABNF
var ALPHA = "[a-z]"; //"[A-Za-z]";
var DIGIT = "\\d";
var HEXDIG = "[\\da-f]"; //"[\\dA-Fa-f]";

var genDelims = "[:\\/\\?#\\[\\]@]";
var subDelims = "[!\\$&'\\(\\)\\*\\+,;=]";

var reserved =
	"(" +
		genDelims +
		"|" + subDelims +
	")";

var unreserved =
	"(" +
		ALPHA +
		"|" + DIGIT +
		"|-" +
		"|\\." +
		"|_" +
		"|~" +
	")";

var pctEncoded =
	"(" +
		"%" +
		HEXDIG + "{2}" +
	")";

var decOctet =
	"(" +
		DIGIT +
		"|[1-9]" + DIGIT +
		"|1" + DIGIT + DIGIT +
		"|2" + "[0-4]" + DIGIT +
		"|25" + "[0-5]" +
	")";

var IPv4address =
	"(" +
		decOctet +
		"\\." +
		decOctet +
		"\\." +
		decOctet +
		"\\." +
		decOctet +
	")";

var h16 = HEXDIG + "{1,4}";
var ls32 =
	"(" +
		"(" + h16 + ":" + h16 + ")" +
		"|" + IPv4address +
	")";

var IPv6address = "";
//   IPv6address    =                            6( h16 ":" ) ls32
//                  /                       "::" 5( h16 ":" ) ls32
//                  / [               h16 ] "::" 4( h16 ":" ) ls32
//                  / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
//                  / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
//                  / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
//                  / [ *4( h16 ":" ) h16 ] "::"              ls32
//                  / [ *5( h16 ":" ) h16 ] "::"              h16
//                  / [ *6( h16 ":" ) h16 ] "::"

var IPvFuture =
	"(" +
		"v" +
		HEXDIG + "{1,}" +
		"\\." +
		"(" +
			unreserved +
			"|" + subDelims +
			"|:" +
		")+" +
	")";

var IPLiteral =
	"(" +
		"\\[" +
		"(" +
			IPv6address +
			"|" + IPvFuture +
		")" +
		"\\]" +
	")";

var port = DIGIT + "*";

var scheme =
	"(" +
		ALPHA +
		"(" +
			ALPHA +
			"|" + DIGIT +
			"|\\+" +
			"|-" +
			"|\\." +
		")*" +
	")";

var iprivate =
	"[" +
		"\\uE000-\\uF8FF" +
		
		// UTF-16 characters - unsupported in JavaScript
		// / %xF0000-FFFFD / %x100000-10FFFD
	"]";

var ucschar =
	"[" +
		"\\u00A0-\\uD7FF" +
		"\\uF900-\\uFDCF" +
		"\\uFDF0-\\uFFEF" +
		
		// UTF-16 characters - unsupported in JavaScript
		// / %x10000-1FFFD / %x20000-2FFFD / %x30000-3FFFD
		// / %x40000-4FFFD / %x50000-5FFFD / %x60000-6FFFD
		// / %x70000-7FFFD / %x80000-8FFFD / %x90000-9FFFD
		// / %xA0000-AFFFD / %xB0000-BFFFD / %xC0000-CFFFD
		// / %xD0000-DFFFD / %xE1000-EFFFD
	"]";

var iunreserved =
	"(" +
		ALPHA +
		"|" + DIGIT +
		"|-" +
		"|\\." +
		"|_" +
		"|~" +
		"|" + ucschar +
	")";

var ipchar =
	"(" +
		iunreserved +
		"|" + pctEncoded +
		"|" + subDelims +
		"|:" +
		"|@" +
	")";

var ifragment =
	"(" +
		ipchar +
		"|\\/" +
		"|\\?" +
	")*";

var iquery =
	"(" +
		ipchar +
		"|" + iprivate +
		"|\\/" +
		"|\\?" +
	")*";

var isegment = ipchar + "*";
var isegmentNz = ipchar + "+";
var isegmentNzNc =
	"(" +
		iunreserved +
		"|" + pctEncoded +
		"|" + subDelims +
		"|@" +
	")+";

var ipathAbempty =
	"(" +
		"\\/" + isegment +
	")*";
var ipathAbsolute =
	"(" +
		"\\/" +
		"(" +
			isegmentNz +
				"(" +
					"\\/" + isegment +
				")*" +
		")?" +
	")";
var ipathNoscheme =
	"(" +
		isegmentNzNc +
		"(" +
			"\\/" + isegment +
		")*" +
	")";
var ipathRootless =
	"(" +
		isegmentNz +
		"(" +
			"\\/" + isegment +
		")*" +
	")";
var ipathEmpty =
	"(" +
		ipchar +
	"){0}";

var ipath =
	"(" +
		ipathAbempty +
		"|" + ipathAbsolute +
		"|" + ipathNoscheme +
		"|" + ipathRootless +
		"|" + ipathEmpty +
	")";

var iregName =
	"(" +
		iunreserved +
		"|" + pctEncoded +
		"|" + subDelims +
	")*";

var ihost =
	"(" +
		IPLiteral +
		"|" + IPv4address +
		"|" + iregName +
	")";

var iuserinfo =
	"(" +
		iunreserved +
		"|" + pctEncoded +
		"|" + subDelims +
		"|:" +
	")*";

var iauthority =
	"(" +
		"(" + iuserinfo + "@)?" +
		ihost +
		"(:" + port + ")?" +
	")";

var irelativePart =
	"(" +
		"\\/\\/" + iauthority + ipathAbempty +
		"|" + ipathAbsolute +
		"|" + ipathNoscheme +
		"|" + ipathEmpty +
	")";

var irelativeRef =
	"(" +
		irelativePart +
		"(\\?" + iquery + ")?" +
		"(\\#" + ifragment + ")?" +
	")";

var ihierPart =
	"(" +
		"\\/\\/" + iauthority + ipathAbempty +
		"|" + ipathAbsolute +
		"|" + ipathRootless +
		"|" + ipathEmpty +
	")";

var absoluteIRI =
	"(" +
		scheme + ":" + ihierPart +
		"(" + iquery + ")?" +
	")";

var IRI =
	scheme + ":" + ihierPart +
	"(\\?" + iquery + ")?" +
	"(\\#" + ifragment + ")?";

var IRIReference =
	"(" +
		IRI +
		"|" + irelativeRef +
	")";
