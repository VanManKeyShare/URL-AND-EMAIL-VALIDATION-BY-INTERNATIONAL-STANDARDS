/*
 * Internationalized URLs for the HTTP(S) and FTP schemes
 * 
 * Definitions from (unless otherwise noted):
 * - [RFC 2616] Hypertext Transfer Protocol -- HTTP/1.1
 * - [RFC 3986] URI Generic Syntax
 * - [RFC 2396] URI Generic Syntax (obseleted by RFC 3986)
 * 
 * Requires iri.http.js
 */

// [RFC 2396] URI Generic Syntax
var ihost =
	"(" +
		IPv4address +
		"|" + ihostName +
	")";

// [RFC 3987] IRI
var iauthority =
	"(" +
		"(" + iuserinfo + "@)?" +
		ihost +
		"(:" + port + ")?" +
	")";

// custom
var scheme = "(https?|ftp)";

// custom
var commonIRI =
	scheme + ":\\/\\/" +
	iauthority +
	ipathAbsolute + "?" +
	"(\\?" + iquery + ")?" +
	"(\\#" + ifragment + ")?";
