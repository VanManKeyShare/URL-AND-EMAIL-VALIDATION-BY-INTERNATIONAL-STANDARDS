/*
 * Internationalized URLs for the HTTP scheme
 * 
 * Definitions from (unless otherwise noted):
 * - [RFC 2616] Hypertext Transfer Protocol -- HTTP/1.1
 * - [RFC 3986] URI Generic Syntax
 * - [RFC 2396] URI Generic Syntax (obseleted by RFC 3986)
 * 
 * Requires iri.js
 */

// internationalized
var ialpha =
	"(" +
		ALPHA +
		"|" + ucschar +
	")";

// internationalized
var ialphaNum =
	"(" +
		ALPHA +
		"|" + DIGIT +
		"|" + ucschar +
	")";

// internationalized
var idomainLabel =
	"(" +
		ialphaNum +
		"|(" +
			ialphaNum +
			iunreserved + "*" +
			ialphaNum +
		")" +
	")";

// internationalized
// uses unreserved characters from [RFC 3987] IRI
var itopLabel =
	"(" +
		ialpha +
		"|(" +
			ialpha +
			iunreserved + "*" +
			ialpha +
		")" +
	")";

// internationalized
var ihostName =
	"(" +
		idomainLabel +
		"\\." +
	")*" +
	itopLabel +
	"\\.?";

// [RFC 2396] URI Generic Syntax
// modified to allow IPLiteral
var ihost =
	"(" +
		IPLiteral +
		"|" + IPv4address +
		"|" + ihostName +
	")";

// [RFC 3987] IRI
var iauthority =
	"(" +
		"(" + iuserinfo + "@)?" +
		ihost +
		"(:" + port + ")?" +
	")";

var scheme = "(https?)";

// custom
var httpIRI =
	scheme + ":\\/\\/" +
	iauthority +
	ipathAbsolute + "?" +
	"(\\?" + iquery + ")?" +
	"(\\#" + ifragment + ")?";
