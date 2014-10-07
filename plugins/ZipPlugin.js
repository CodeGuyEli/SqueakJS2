/* Smalltalk from Squeak4.5 with VMMaker 4.13.6 translated as JS source on 7 October 2014 4:13:18 pm */
/* Automatically generated by
	JSPluginCodeGenerator VMMakerJS-bf.9 uuid: 106da862-799b-4ae6-b42f-b80f05dcc86b
   from
	DeflatePlugin VMMaker-bf.351 uuid: af5fd014-b9f4-4d17-80fa-2abd7b2b263b
 */

module("users.bert.SqueakJS.plugins.ZipPlugin").requires("users.bert.SqueakJS.vm").toRun(function() {

var VM_PROXY_MAJOR = 1;
var VM_PROXY_MINOR = 11;

/*** Functions ***/
function CLASSOF(obj) { return typeof obj === "number" ? interpreterProxy.classSmallInteger() : obj.sqClass }
function SIZEOF(obj) { return obj.pointers ? obj.pointers.length : obj.words ? obj.words.length : obj.bytes ? obj.bytes.length : 0 }
function BYTESIZEOF(obj) { return obj.bytes ? obj.bytes.length : obj.words ? obj.words.length * 4 : 0 }
function DIV(a, b) { return Math.floor(a / b) | 0; }   // integer division
function MOD(a, b) { return a - DIV(a, b) * b | 0; }   // signed modulus
function SHL(a, b) { return b > 31 ? 0 : a << b; }     // fix JS shift
function SHR(a, b) { return b > 31 ? 0 : a >>> b; }    // fix JS shift
function SHIFT(a, b) { return b < 0 ? (b < -31 ? 0 : a >>> (0-b) ) : (b > 31 ? 0 : a << b); }

/*** Constants ***/
var DeflateHashMask = 32767;
var DeflateHashShift = 5;
var DeflateHashTableSize = 32768;
var DeflateMaxDistance = 32768;
var DeflateMaxDistanceCodes = 30;
var DeflateMaxLiteralCodes = 286;
var DeflateMaxMatch = 258;
var DeflateMinMatch = 3;
var DeflateWindowMask = 32767;
var DeflateWindowSize = 32768;
var MaxBits = 16;
var StateNoMoreData = 1;

/*** Variables ***/
var interpreterProxy = null;
var moduleName = "ZipPlugin 7 October 2014 (e)";
var readStreamInstSize = 0;
var writeStreamInstSize = 0;
var zipBaseDistance = [
0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 
256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576];
var zipBaseLength = [
0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 
32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0];
var zipBitBuf = 0;
var zipBitPos = 0;
var zipBlockPos = 0;
var zipBlockStart = 0;
var zipCollection = null;
var zipCollectionSize = 0;
var zipCrcTable = [
0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 
498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 
997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 
651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 
1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 
1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 
1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 
1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 
3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 
4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 
3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 
3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 
2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 
2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 
2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918000, 2847714899, 3736837829, 1202900863, 817233897, 
3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
var zipDistTable = null;
var zipDistTableSize = 0;
var zipDistanceCodes = [
0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 
8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 
10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 
11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 
12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 
13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 
14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 
14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 
14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 
14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 
15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 
22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 
24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 
25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 
26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 
26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 
27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 
27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 
28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 
28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 
28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 
28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 
29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 
29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 
29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 
29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29];
var zipDistanceFreq = null;
var zipDistances = null;
var zipExtraDistanceBits = [
0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 
7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
var zipExtraLengthBits = [
0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 
3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
var zipHashHead = null;
var zipHashTail = null;
var zipHashValue = 0;
var zipLitTable = null;
var zipLitTableSize = 0;
var zipLiteralCount = 0;
var zipLiteralFreq = null;
var zipLiteralSize = 0;
var zipLiterals = null;
var zipMatchCount = 0;
var zipMatchLengthCodes = [
257, 258, 259, 260, 261, 262, 263, 264, 265, 265, 266, 266, 267, 267, 268, 268, 
269, 269, 269, 269, 270, 270, 270, 270, 271, 271, 271, 271, 272, 272, 272, 272, 
273, 273, 273, 273, 273, 273, 273, 273, 274, 274, 274, 274, 274, 274, 274, 274, 
275, 275, 275, 275, 275, 275, 275, 275, 276, 276, 276, 276, 276, 276, 276, 276, 
277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 277, 
278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 278, 
279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 279, 
280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 280, 
281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 
281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 281, 
282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 
282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 282, 
283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 
283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 283, 
284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 
284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284];
var zipPosition = 0;
var zipReadLimit = 0;
var zipSource = null;
var zipSourceLimit = 0;
var zipSourcePos = 0;
var zipState = 0;



/*	Compare the two strings and return the length of matching characters.
	minLength is a lower bound for match lengths that will be accepted.
	Note: here and matchPos are zero based. */

function comparewithmin(here, matchPos, minLength) {
	var length;


	/* First test if we can actually get longer than minLength */

	if ((zipCollection[here + minLength]) !== (zipCollection[matchPos + minLength])) {
		return 0;
	}
	if ((zipCollection[(here + minLength) - 1]) !== (zipCollection[(matchPos + minLength) - 1])) {
		return 0;
	}
	if ((zipCollection[here]) !== (zipCollection[matchPos])) {
		return 0;
	}
	if ((zipCollection[here + 1]) !== (zipCollection[matchPos + 1])) {
		return 1;
	}
	length = 2;
	while ((length < DeflateMaxMatch) && ((zipCollection[here + length]) === (zipCollection[matchPos + length]))) {
		++length;
	}
	return length;
}


/*	Continue deflating the receiver's collection from blockPosition to lastIndex.
	Note that lastIndex must be at least MaxMatch away from the end of collection */

function deflateBlockchainLengthgoodMatch(lastIndex, chainLength, goodMatch) {
	var flushNeeded;
	var hasMatch;
	var here;
	var hereLength;
	var hereMatch;
	var i;
	var matchResult;
	var newLength;
	var newMatch;

	if (zipBlockPos > lastIndex) {
		return false;
	}
	if (zipLiteralCount >= zipLiteralSize) {
		return true;
	}
	hasMatch = false;
	here = zipBlockPos;
	while (here <= lastIndex) {
		if (!hasMatch) {

			/* Find the first match */

			matchResult = findMatchlastLengthlastMatchchainLengthgoodMatch(here, DeflateMinMatch - 1, here, chainLength, goodMatch);
			insertStringAt(here);
			hereMatch = matchResult & 65535;
			hereLength = matchResult >>> 16;
		}
		matchResult = findMatchlastLengthlastMatchchainLengthgoodMatch(here + 1, hereLength, hereMatch, chainLength, goodMatch);
		newMatch = matchResult & 65535;

		/* Now check if the next match is better than the current one.
		If not, output the current match (provided that the current match
		is at least MinMatch long) */

		newLength = matchResult >>> 16;
		if ((hereLength >= newLength) && (hereLength >= DeflateMinMatch)) {

			/* Encode the current match */


			/* Insert all strings up to the end of the current match.
			Note: The first string has already been inserted. */

			flushNeeded = encodeMatchdistance(hereLength, here - hereMatch);
			for (i = 1; i <= (hereLength - 1); i++) {
				insertStringAt((++here));
			}
			hasMatch = false;
			++here;
		} else {

			/* Either the next match is better than the current one or we didn't
			have a good match after all (e.g., current match length < MinMatch).
			Output a single literal. */

			flushNeeded = encodeLiteral(zipCollection[here]);
			++here;
			if ((here <= lastIndex) && (!flushNeeded)) {

				/* Cache the results for the next round */

				insertStringAt(here);
				hasMatch = true;
				hereMatch = newMatch;
				hereLength = newLength;
			}
		}
		if (flushNeeded) {
			zipBlockPos = here;
			return true;
		}
	}
	zipBlockPos = here;
	return false;
}


/*	Determine the inst size of the class above DeflateStream by
	 looking for the first class whose inst size is less than 13. */

function determineSizeOfReadStream(rcvr) {
	var sq_class;

	sq_class = CLASSOF(rcvr);
	while ((!sq_class.isNil) && ((sq_class.classInstSize()) >= 13)) {
		sq_class = sq_class.superclass();
	}
	if (sq_class.isNil) {
		return false;
	}
	readStreamInstSize = sq_class.classInstSize();
	return true;
}


/*	Determine the inst size of the class above DeflateStream or
	 ZipEncoder by looking for the first class whose inst size is less than 7. */

function determineSizeOfWriteStream(rcvr) {
	var sq_class;

	sq_class = CLASSOF(rcvr);
	while ((!sq_class.isNil) && ((sq_class.classInstSize()) >= 7)) {
		sq_class = sq_class.superclass();
	}
	if (sq_class.isNil) {
		return false;
	}
	writeStreamInstSize = sq_class.classInstSize();
	return true;
}


/*	Encode the given literal */

function encodeLiteral(lit) {
	zipLiterals[zipLiteralCount] = lit;
	zipDistances[zipLiteralCount] = 0;
	zipLiteralFreq[lit]++;
	++zipLiteralCount;
	return (zipLiteralCount === zipLiteralSize) || (((zipLiteralCount & 4095) === 0) && (shouldFlush()));
}


/*	Encode the given match of length length starting at dist bytes ahead */

function encodeMatchdistance(length, dist) {
	var distance;
	var literal;

	zipLiterals[zipLiteralCount] = (length - DeflateMinMatch);
	zipDistances[zipLiteralCount] = dist;
	literal = zipMatchLengthCodes[length - DeflateMinMatch];
	zipLiteralFreq[literal]++;
	if (dist < 257) {
		distance = zipDistanceCodes[dist - 1];
	} else {
		distance = zipDistanceCodes[256 + ((dist - 1) >>> 7)];
	}
	zipDistanceFreq[distance]++;
	++zipLiteralCount;
	++zipMatchCount;
	return (zipLiteralCount === zipLiteralSize) || (((zipLiteralCount & 4095) === 0) && (shouldFlush()));
}


/*	Find the longest match for the string starting at here.
	If there is no match longer than lastLength return lastMatch/lastLength.
	Traverse at most maxChainLength entries in the hash table.
	Stop if a match of at least goodMatch size has been found. */

function findMatchlastLengthlastMatchchainLengthgoodMatch(here, lastLength, lastMatch, maxChainLength, goodMatch) {
	var bestLength;
	var chainLength;
	var distance;
	var length;
	var limit;
	var matchPos;
	var matchResult;


	/* Compute the default match result */


	/* There is no way to find a better match than MaxMatch */

	matchResult = (lastLength << 16) | lastMatch;
	if (lastLength >= DeflateMaxMatch) {
		return matchResult;
	}

	/* Compute the distance to the (possible) match */

	matchPos = zipHashHead[updateHashAt((here + DeflateMinMatch) - 1)];

	/* Note: It is required that 0 < distance < MaxDistance */

	distance = here - matchPos;
	if (!((distance > 0) && (distance < DeflateMaxDistance))) {
		return matchResult;
	}

	/* Max. nr of match chain to search */

	chainLength = maxChainLength;
	if (here > DeflateMaxDistance) {

		/* Limit for matches that are too old */

		limit = here - DeflateMaxDistance;
	} else {
		limit = 0;
	}
	bestLength = lastLength;
	while (true) {

		/* Compare the current string with the string at match position */


		/* Truncate accidental matches beyound stream position */

		length = comparewithmin(here, matchPos, bestLength);
		if ((here + length) > zipPosition) {
			length = zipPosition - here;
		}
		if ((length === DeflateMinMatch) && ((here - matchPos) > (DeflateMaxDistance >> 2))) {
			length = DeflateMinMatch - 1;
		}
		if (length > bestLength) {

			/* We have a new (better) match than before */
			/* Compute the new match result */

			matchResult = (length << 16) | matchPos;

			/* There is no way to find a better match than MaxMatch */

			bestLength = length;
			if (bestLength >= DeflateMaxMatch) {
				return matchResult;
			}
			if (bestLength > goodMatch) {
				return matchResult;
			}
		}
		if (!(((--chainLength)) > 0)) {
			return matchResult;
		}
		matchPos = zipHashTail[matchPos & DeflateWindowMask];
		if (matchPos <= limit) {
			return matchResult;
		}
	}
}


/*	Note: This is hardcoded so it can be run from Squeak.
	The module name is used for validating a module *after*
	it is loaded to check if it does really contain the module
	we're thinking it contains. This is important! */

function getModuleName() {
	return moduleName;
}

function halt() {
	;
}


/*	Insert the string at the given start position into the hash table.
	Note: The hash value is updated starting at MinMatch-1 since
	all strings before have already been inserted into the hash table
	(and the hash value is updated as well). */

function insertStringAt(here) {
	var prevEntry;

	zipHashValue = updateHashAt((here + DeflateMinMatch) - 1);
	prevEntry = zipHashHead[zipHashValue];
	zipHashHead[zipHashValue] = here;
	zipHashTail[here & DeflateWindowMask] = prevEntry;
}

function loadDeflateStreamFrom(rcvr) {
	var oop;

	if (!((interpreterProxy.isPointers(rcvr)) && ((SIZEOF(rcvr)) >= 15))) {
		return false;
	}
	oop = interpreterProxy.fetchPointerofObject(0, rcvr);
	if (!(interpreterProxy.isBytes(oop))) {
		return false;
	}
	if (writeStreamInstSize === 0) {
		if (!(determineSizeOfWriteStream(rcvr))) {
			return false;
		}
		if ((SIZEOF(rcvr)) < (writeStreamInstSize + 5)) {
			writeStreamInstSize = 0;
			return false;
		}
	}
	zipCollection = oop.bytes;
	zipCollectionSize = BYTESIZEOF(oop);
	zipPosition = interpreterProxy.fetchIntegerofObject(1, rcvr);

	/* zipWriteLimit := interpreterProxy fetchInteger: 3 ofObject: rcvr. */

	zipReadLimit = interpreterProxy.fetchIntegerofObject(2, rcvr);
	oop = interpreterProxy.fetchPointerofObject(writeStreamInstSize + 0, rcvr);
	if (!((interpreterProxy.isWords(oop)) && ((SIZEOF(oop)) === DeflateHashTableSize))) {
		return false;
	}
	zipHashHead = oop.words;
	oop = interpreterProxy.fetchPointerofObject(writeStreamInstSize + 1, rcvr);
	if (!((interpreterProxy.isWords(oop)) && ((SIZEOF(oop)) === DeflateWindowSize))) {
		return false;
	}
	zipHashTail = oop.words;
	zipHashValue = interpreterProxy.fetchIntegerofObject(writeStreamInstSize + 2, rcvr);

	/* zipBlockStart := interpreterProxy fetchInteger: writeStreamInstSize + 4 ofObject: rcvr. */

	zipBlockPos = interpreterProxy.fetchIntegerofObject(writeStreamInstSize + 3, rcvr);
	oop = interpreterProxy.fetchPointerofObject(writeStreamInstSize + 5, rcvr);
	if (!(interpreterProxy.isBytes(oop))) {
		return false;
	}
	zipLiteralSize = SIZEOF(oop);
	zipLiterals = oop.bytes;
	oop = interpreterProxy.fetchPointerofObject(writeStreamInstSize + 6, rcvr);
	if (!((interpreterProxy.isWords(oop)) && ((SIZEOF(oop)) >= zipLiteralSize))) {
		return false;
	}
	zipDistances = oop.words;
	oop = interpreterProxy.fetchPointerofObject(writeStreamInstSize + 7, rcvr);
	if (!((interpreterProxy.isWords(oop)) && ((SIZEOF(oop)) === DeflateMaxLiteralCodes))) {
		return false;
	}
	zipLiteralFreq = oop.words;
	oop = interpreterProxy.fetchPointerofObject(writeStreamInstSize + 8, rcvr);
	if (!((interpreterProxy.isWords(oop)) && ((SIZEOF(oop)) === DeflateMaxDistanceCodes))) {
		return false;
	}
	zipDistanceFreq = oop.words;
	zipLiteralCount = interpreterProxy.fetchIntegerofObject(writeStreamInstSize + 9, rcvr);
	zipMatchCount = interpreterProxy.fetchIntegerofObject(writeStreamInstSize + 10, rcvr);
	return !(interpreterProxy.failed());
}

function loadZipEncoderFrom(rcvr) {
	var oop;

	if (writeStreamInstSize === 0) {
		if (!(determineSizeOfWriteStream(rcvr))) {
			return false;
		}
		if ((SIZEOF(rcvr)) < (writeStreamInstSize + 3)) {
			writeStreamInstSize = 0;
			return false;
		}
	}
	if (!((interpreterProxy.isPointers(rcvr)) && ((SIZEOF(rcvr)) >= (writeStreamInstSize + 3)))) {
		return false;
	}
	oop = interpreterProxy.fetchPointerofObject(0, rcvr);
	if (!(interpreterProxy.isBytes(oop))) {
		return interpreterProxy.primitiveFail();
	}
	zipCollection = oop.bytes;
	zipCollectionSize = BYTESIZEOF(oop);
	zipPosition = interpreterProxy.fetchIntegerofObject(1, rcvr);

	/* zipWriteLimit := interpreterProxy fetchInteger: 3 ofObject: rcvr. */

	zipReadLimit = interpreterProxy.fetchIntegerofObject(2, rcvr);
	zipBitBuf = interpreterProxy.fetchIntegerofObject(writeStreamInstSize + 1, rcvr);
	zipBitPos = interpreterProxy.fetchIntegerofObject(writeStreamInstSize + 2, rcvr);
	return !(interpreterProxy.failed());
}


/*	Require:
		zipCollection, zipCollectionSize, zipPosition,
		zipBitBuf, zipBitPos.
	 */

function nextZipBitsput(nBits, value) {
	if (!((value >= 0) && ((SHL(1, nBits)) > value))) {
		return interpreterProxy.primitiveFail();
	}
	zipBitBuf = zipBitBuf | (SHL(value, zipBitPos));
	zipBitPos += nBits;
	while ((zipBitPos >= 8) && (zipPosition < zipCollectionSize)) {
		zipCollection[zipPosition] = (zipBitBuf & 255);
		++zipPosition;
		zipBitBuf = zipBitBuf >>> 8;
		zipBitPos -= 8;
	}
}


/*	Primitive. Deflate the current contents of the receiver. */

function primitiveDeflateBlock() {
	var chainLength;
	var goodMatch;
	var lastIndex;
	var rcvr;
	var result;

	if ((interpreterProxy.methodArgumentCount()) !== 3) {
		return interpreterProxy.primitiveFail();
	}
	goodMatch = interpreterProxy.stackIntegerValue(0);
	chainLength = interpreterProxy.stackIntegerValue(1);
	lastIndex = interpreterProxy.stackIntegerValue(2);
	rcvr = interpreterProxy.stackObjectValue(3);
	if (interpreterProxy.failed()) {
		return null;
	}
	;
	if (!(loadDeflateStreamFrom(rcvr))) {
		return interpreterProxy.primitiveFail();
	}
	result = deflateBlockchainLengthgoodMatch(lastIndex, chainLength, goodMatch);
	if (!(interpreterProxy.failed())) {

		/* Store back modified values */

		interpreterProxy.storeIntegerofObjectwithValue(writeStreamInstSize + 2, rcvr, zipHashValue);
		interpreterProxy.storeIntegerofObjectwithValue(writeStreamInstSize + 3, rcvr, zipBlockPos);
		interpreterProxy.storeIntegerofObjectwithValue(writeStreamInstSize + 9, rcvr, zipLiteralCount);
		interpreterProxy.storeIntegerofObjectwithValue(writeStreamInstSize + 10, rcvr, zipMatchCount);
	}
	if (!(interpreterProxy.failed())) {
		interpreterProxy.pop(4);
		interpreterProxy.pushBool(result);
	}
}


/*	Primitive. Update the hash tables after data has been moved by delta. */

function primitiveDeflateUpdateHashTable() {
	var delta;
	var entry;
	var i;
	var table;
	var tablePtr;
	var tableSize;

	if ((interpreterProxy.methodArgumentCount()) !== 2) {
		return interpreterProxy.primitiveFail();
	}
	delta = interpreterProxy.stackIntegerValue(0);
	table = interpreterProxy.stackObjectValue(1);
	if (interpreterProxy.failed()) {
		return null;
	}
	if (!(interpreterProxy.isWords(table))) {
		return interpreterProxy.primitiveFail();
	}
	tableSize = SIZEOF(table);
	tablePtr = table.wordsAsInt32Array();
	for (i = 0; i <= (tableSize - 1); i++) {
		entry = tablePtr[i];
		if (entry >= delta) {
			tablePtr[i] = (entry - delta);
		} else {
			tablePtr[i] = 0;
		}
	}
	interpreterProxy.pop(2);
}


/*	Primitive. Inflate a single block. */

function primitiveInflateDecompressBlock() {
	var oop;
	var rcvr;

	if ((interpreterProxy.methodArgumentCount()) !== 2) {
		return interpreterProxy.primitiveFail();
	}
	oop = interpreterProxy.stackValue(0);
	if (!(interpreterProxy.isWords(oop))) {
		return interpreterProxy.primitiveFail();
	}
	zipDistTable = oop.words;

	/* literal table */

	zipDistTableSize = SIZEOF(oop);
	oop = interpreterProxy.stackValue(1);
	if (!(interpreterProxy.isWords(oop))) {
		return interpreterProxy.primitiveFail();
	}
	zipLitTable = oop.words;

	/* Receiver (InflateStream) */

	zipLitTableSize = SIZEOF(oop);
	rcvr = interpreterProxy.stackValue(2);
	if (!(interpreterProxy.isPointers(rcvr))) {
		return interpreterProxy.primitiveFail();
	}
	if (readStreamInstSize === 0) {
		if (!(determineSizeOfReadStream(rcvr))) {
			return interpreterProxy.primitiveFail();
		}
		if ((SIZEOF(rcvr)) < (readStreamInstSize + 8)) {
			readStreamInstSize = 0;
			return interpreterProxy.primitiveFail();
		}
	}
	if ((SIZEOF(rcvr)) < (readStreamInstSize + 8)) {
		return interpreterProxy.primitiveFail();
	}
	zipReadLimit = interpreterProxy.fetchIntegerofObject(2, rcvr);
	zipState = interpreterProxy.fetchIntegerofObject(readStreamInstSize + 0, rcvr);
	zipBitBuf = interpreterProxy.fetchIntegerofObject(readStreamInstSize + 1, rcvr);
	zipBitPos = interpreterProxy.fetchIntegerofObject(readStreamInstSize + 2, rcvr);
	zipSourcePos = interpreterProxy.fetchIntegerofObject(readStreamInstSize + 4, rcvr);
	zipSourceLimit = interpreterProxy.fetchIntegerofObject(readStreamInstSize + 5, rcvr);
	if (interpreterProxy.failed()) {
		return null;
	}
	--zipReadLimit;
	--zipSourcePos;

	/* collection */

	--zipSourceLimit;
	oop = interpreterProxy.fetchPointerofObject(0, rcvr);
	if (!(interpreterProxy.isBytes(oop))) {
		return interpreterProxy.primitiveFail();
	}
	zipCollection = oop.bytes;

	/* source */

	zipCollectionSize = BYTESIZEOF(oop);
	oop = interpreterProxy.fetchPointerofObject(readStreamInstSize + 3, rcvr);
	if (!(interpreterProxy.isBytes(oop))) {
		return interpreterProxy.primitiveFail();
	}

	/* do the primitive */

	zipSource = oop.bytes;
	zipDecompressBlock();
	if (!(interpreterProxy.failed())) {

		/* store modified values back */

		interpreterProxy.storeIntegerofObjectwithValue(2, rcvr, zipReadLimit + 1);
		interpreterProxy.storeIntegerofObjectwithValue(readStreamInstSize + 0, rcvr, zipState);
		interpreterProxy.storeIntegerofObjectwithValue(readStreamInstSize + 1, rcvr, zipBitBuf);
		interpreterProxy.storeIntegerofObjectwithValue(readStreamInstSize + 2, rcvr, zipBitPos);
		interpreterProxy.storeIntegerofObjectwithValue(readStreamInstSize + 4, rcvr, zipSourcePos + 1);
		interpreterProxy.pop(2);
	}
}


/*	Primitive. Update a 32bit CRC value. */

function primitiveUpdateAdler32() {
	var adler32;
	var b;
	var bytePtr;
	var collection;
	var i;
	var length;
	var s1;
	var s2;
	var startIndex;
	var stopIndex;

	if ((interpreterProxy.methodArgumentCount()) !== 4) {
		return interpreterProxy.primitiveFail();
	}
	collection = interpreterProxy.stackObjectValue(0);
	stopIndex = interpreterProxy.stackIntegerValue(1);
	startIndex = interpreterProxy.stackIntegerValue(2);
	adler32 = interpreterProxy.positive32BitValueOf(interpreterProxy.stackValue(3));
	if (interpreterProxy.failed()) {
		return 0;
	}
	if (!((interpreterProxy.isBytes(collection)) && ((stopIndex >= startIndex) && (startIndex > 0)))) {
		return interpreterProxy.primitiveFail();
	}
	length = BYTESIZEOF(collection);
	if (!(stopIndex <= length)) {
		return interpreterProxy.primitiveFail();
	}
	bytePtr = collection.bytes;
	--startIndex;
	--stopIndex;
	s1 = adler32 & 65535;
	s2 = (adler32 >>> 16) & 65535;
	for (i = startIndex; i <= stopIndex; i++) {
		b = bytePtr[i];
		s1 = MOD((s1 + b), 65521);
		s2 = MOD((s2 + s1), 65521);
	}
	adler32 = (s2 << 16) + s1;
	interpreterProxy.popthenPush(5, interpreterProxy.positive32BitIntegerFor(adler32));
}


/*	Primitive. Update a 32bit CRC value. */

function primitiveUpdateGZipCrc32() {
	var bytePtr;
	var collection;
	var crc;
	var i;
	var length;
	var startIndex;
	var stopIndex;

	if ((interpreterProxy.methodArgumentCount()) !== 4) {
		return interpreterProxy.primitiveFail();
	}
	collection = interpreterProxy.stackObjectValue(0);
	stopIndex = interpreterProxy.stackIntegerValue(1);
	startIndex = interpreterProxy.stackIntegerValue(2);
	crc = interpreterProxy.positive32BitValueOf(interpreterProxy.stackValue(3));
	if (interpreterProxy.failed()) {
		return 0;
	}
	if (!((interpreterProxy.isBytes(collection)) && ((stopIndex >= startIndex) && (startIndex > 0)))) {
		return interpreterProxy.primitiveFail();
	}
	length = BYTESIZEOF(collection);
	if (!(stopIndex <= length)) {
		return interpreterProxy.primitiveFail();
	}
	bytePtr = collection.bytes;
	;
	--startIndex;
	--stopIndex;
	for (i = startIndex; i <= stopIndex; i++) {
		crc = (zipCrcTable[(crc ^ (bytePtr[i])) & 255]) ^ (crc >>> 8);
	}
	interpreterProxy.popthenPush(5, interpreterProxy.positive32BitIntegerFor(crc));
}

function primitiveZipSendBlock() {
	var distStream;
	var distTree;
	var litStream;
	var litTree;
	var rcvr;
	var result;

	if ((interpreterProxy.methodArgumentCount()) !== 4) {
		return interpreterProxy.primitiveFail();
	}
	distTree = interpreterProxy.stackObjectValue(0);
	litTree = interpreterProxy.stackObjectValue(1);
	distStream = interpreterProxy.stackObjectValue(2);
	litStream = interpreterProxy.stackObjectValue(3);
	rcvr = interpreterProxy.stackObjectValue(4);
	if (interpreterProxy.failed()) {
		return null;
	}
	if (!(loadZipEncoderFrom(rcvr))) {
		return interpreterProxy.primitiveFail();
	}
	if (!((interpreterProxy.isPointers(distTree)) && ((SIZEOF(distTree)) >= 2))) {
		return interpreterProxy.primitiveFail();
	}
	if (!((interpreterProxy.isPointers(litTree)) && ((SIZEOF(litTree)) >= 2))) {
		return interpreterProxy.primitiveFail();
	}
	if (!((interpreterProxy.isPointers(litStream)) && ((SIZEOF(litStream)) >= 3))) {
		return interpreterProxy.primitiveFail();
	}
	if (!((interpreterProxy.isPointers(distStream)) && ((SIZEOF(distStream)) >= 3))) {
		return interpreterProxy.primitiveFail();
	}
	;
	result = sendBlockwithwithwith(litStream, distStream, litTree, distTree);
	if (!(interpreterProxy.failed())) {
		interpreterProxy.storeIntegerofObjectwithValue(1, rcvr, zipPosition);
		interpreterProxy.storeIntegerofObjectwithValue(readStreamInstSize + 1, rcvr, zipBitBuf);
		interpreterProxy.storeIntegerofObjectwithValue(readStreamInstSize + 2, rcvr, zipBitPos);
	}
	if (!(interpreterProxy.failed())) {
		interpreterProxy.pop(5);
		interpreterProxy.pushInteger(result);
	}
}


/*	Require: 
		zipCollection, zipCollectionSize, zipPosition,
		zipBitBuf, zipBitPos.
	 */

function sendBlockwithwithwith(literalStream, distanceStream, litTree, distTree) {
	var code;
	var dist;
	var distArray;
	var distBitLengths;
	var distBlCount;
	var distCodes;
	var extra;
	var lit;
	var litArray;
	var litBlCount;
	var litLimit;
	var litPos;
	var llBitLengths;
	var llCodes;
	var oop;
	var sum;

	oop = interpreterProxy.fetchPointerofObject(0, literalStream);
	litPos = interpreterProxy.fetchIntegerofObject(1, literalStream);
	litLimit = interpreterProxy.fetchIntegerofObject(2, literalStream);
	if (!((litPos <= litLimit) && ((interpreterProxy.isBytes(oop)) && (litLimit <= (BYTESIZEOF(oop)))))) {
		return interpreterProxy.primitiveFail();
	}
	litArray = oop.bytes;
	oop = interpreterProxy.fetchPointerofObject(0, distanceStream);
	if (!((interpreterProxy.isWords(oop)) && ((litLimit <= (SIZEOF(oop))) && (((interpreterProxy.fetchIntegerofObject(1, distanceStream)) === litPos) && ((interpreterProxy.fetchIntegerofObject(2, distanceStream)) === litLimit))))) {
		return interpreterProxy.primitiveFail();
	}
	distArray = oop.words;
	oop = interpreterProxy.fetchPointerofObject(0, litTree);
	if (!(interpreterProxy.isWords(oop))) {
		return interpreterProxy.primitiveFail();
	}
	litBlCount = SIZEOF(oop);
	llBitLengths = oop.words;
	oop = interpreterProxy.fetchPointerofObject(1, litTree);
	if (!((interpreterProxy.isWords(oop)) && (litBlCount === (SIZEOF(oop))))) {
		return interpreterProxy.primitiveFail();
	}
	llCodes = oop.words;
	oop = interpreterProxy.fetchPointerofObject(0, distTree);
	if (!(interpreterProxy.isWords(oop))) {
		return interpreterProxy.primitiveFail();
	}
	distBlCount = SIZEOF(oop);
	distBitLengths = oop.words;
	oop = interpreterProxy.fetchPointerofObject(1, distTree);
	if (!((interpreterProxy.isWords(oop)) && (distBlCount === (SIZEOF(oop))))) {
		return interpreterProxy.primitiveFail();
	}
	distCodes = oop.words;
	nextZipBitsput(0, 0);
	sum = 0;
	while ((litPos < litLimit) && ((zipPosition + 4) < zipCollectionSize)) {
		lit = litArray[litPos];
		dist = distArray[litPos];
		++litPos;
		if (dist === 0) {

			/* literal */

			++sum;
			if (!(lit < litBlCount)) {
				return interpreterProxy.primitiveFail();
			}
			nextZipBitsput(llBitLengths[lit], llCodes[lit]);
		} else {

			/* match */

			sum = (sum + lit) + DeflateMinMatch;
			if (!(lit < 256)) {
				return interpreterProxy.primitiveFail();
			}
			code = zipMatchLengthCodes[lit];
			if (!(code < litBlCount)) {
				return interpreterProxy.primitiveFail();
			}
			nextZipBitsput(llBitLengths[code], llCodes[code]);
			extra = zipExtraLengthBits[code - 257];
			if (extra !== 0) {
				lit -= zipBaseLength[code - 257];
				nextZipBitsput(extra, lit);
			}
			--dist;
			if (!(dist < 32768)) {
				return interpreterProxy.primitiveFail();
			}
			if (dist < 256) {
				code = zipDistanceCodes[dist];
			} else {
				code = zipDistanceCodes[256 + (dist >>> 7)];
			}
			if (!(code < distBlCount)) {
				return interpreterProxy.primitiveFail();
			}
			nextZipBitsput(distBitLengths[code], distCodes[code]);
			extra = zipExtraDistanceBits[code];
			if (extra !== 0) {
				dist -= zipBaseDistance[code];
				nextZipBitsput(extra, dist);
			}
		}
	}
	if (interpreterProxy.failed()) {
		return null;
	}
	interpreterProxy.storeIntegerofObjectwithValue(1, literalStream, litPos);
	interpreterProxy.storeIntegerofObjectwithValue(1, distanceStream, litPos);
	return sum;
}


/*	Note: This is coded so that is can be run from Squeak. */

function setInterpreter(anInterpreter) {
	var ok;

	interpreterProxy = anInterpreter;
	ok = interpreterProxy.majorVersion() == VM_PROXY_MAJOR;
	if (ok === false) {
		return false;
	}
	ok = interpreterProxy.minorVersion() >= VM_PROXY_MINOR;
	return ok;
}


/*	Check if we should flush the current block.
	Flushing can be useful if the input characteristics change. */

function shouldFlush() {
	var nLits;

	if (zipLiteralCount === zipLiteralSize) {
		return true;
	}
	if ((zipLiteralCount & 4095) !== 0) {
		return false;
	}
	if ((zipMatchCount * 10) <= zipLiteralCount) {

		/* This is basically random data. 
		There is no need to flush early since the overhead
		for encoding the trees will add to the overall size */

		return false;
	}
	nLits = zipLiteralCount - zipMatchCount;
	if (nLits <= zipMatchCount) {
		return false;
	}
	return (nLits * 4) <= zipMatchCount;
}


/*	Update the running hash value based on the next input byte.
	Return the new updated hash value. */

function updateHash(nextValue) {
	return ((zipHashValue << 5) ^ nextValue) & DeflateHashMask;
}


/*	Update the hash value at position here (one based) */

function updateHashAt(here) {
	return updateHash(zipCollection[here]);
}


/*	Decode the next value in the receiver using the given huffman table. */

function zipDecodeValueFromsize(table, tableSize) {
	var bits;
	var bitsNeeded;
	var index;
	var tableIndex;
	var value;


	/* Initial bits needed */

	bitsNeeded = (table[0]) >>> 24;
	if (bitsNeeded > MaxBits) {
		interpreterProxy.primitiveFail();
		return 0;
	}

	/* First real table */

	tableIndex = 2;
	while (true) {

		/* Get bits */

		bits = zipNextBits(bitsNeeded);
		index = (tableIndex + bits) - 1;
		if (index >= tableSize) {
			interpreterProxy.primitiveFail();
			return 0;
		}

		/* Lookup entry in table */

		value = table[index];
		if ((value & 1056964608) === 0) {
			return value;
		}

		/* Table offset in low 16 bit */

		tableIndex = value & 65535;

		/* Additional bits in high 8 bit */

		bitsNeeded = (value >>> 24) & 255;
		if (bitsNeeded > MaxBits) {
			interpreterProxy.primitiveFail();
			return 0;
		}
	}
	return 0;
}

function zipDecompressBlock() {
	var distance;
	var dstPos;
	var extra;
	var i;
	var length;
	var max;
	var oldBitPos;
	var oldBits;
	var oldPos;
	var srcPos;
	var value;

	max = zipCollectionSize - 1;
	while ((zipReadLimit < max) && (zipSourcePos <= zipSourceLimit)) {

		/* Back up stuff if we're running out of space */

		oldBits = zipBitBuf;
		oldBitPos = zipBitPos;
		oldPos = zipSourcePos;
		value = zipDecodeValueFromsize(zipLitTable, zipLitTableSize);
		if (value < 256) {

			/* A literal */

			zipCollection[(++zipReadLimit)] = value;
		} else {

			/* length/distance or end of block */

			if (value === 256) {

				/* End of block */

				zipState = zipState & StateNoMoreData;
				return 0;
			}
			extra = (value >>> 16) - 1;
			length = value & 65535;
			if (extra > 0) {
				length += zipNextBits(extra);
			}
			value = zipDecodeValueFromsize(zipDistTable, zipDistTableSize);
			extra = value >>> 16;
			distance = value & 65535;
			if (extra > 0) {
				distance += zipNextBits(extra);
			}
			if ((zipReadLimit + length) >= max) {
				zipBitBuf = oldBits;
				zipBitPos = oldBitPos;
				zipSourcePos = oldPos;
				return 0;
			}
			dstPos = zipReadLimit;
			srcPos = zipReadLimit - distance;
			for (i = 1; i <= length; i++) {
				zipCollection[dstPos + i] = (zipCollection[srcPos + i]);
			}
			zipReadLimit += length;
		}
	}
}

function zipNextBits(n) {
	var bits;
	var byte;

	while (zipBitPos < n) {
		byte = zipSource[(++zipSourcePos)];
		zipBitBuf += SHL(byte, zipBitPos);
		zipBitPos += 8;
	}
	bits = zipBitBuf & ((SHL(1, n)) - 1);
	zipBitBuf = SHR(zipBitBuf, n);
	zipBitPos -= n;
	return bits;
}


Squeak.registerExternalModule("ZipPlugin", {
	primitiveZipSendBlock: primitiveZipSendBlock,
	primitiveUpdateAdler32: primitiveUpdateAdler32,
	primitiveUpdateGZipCrc32: primitiveUpdateGZipCrc32,
	primitiveDeflateUpdateHashTable: primitiveDeflateUpdateHashTable,
	setInterpreter: setInterpreter,
	getModuleName: getModuleName,
	primitiveDeflateBlock: primitiveDeflateBlock,
	primitiveInflateDecompressBlock: primitiveInflateDecompressBlock,
});

}); // end of module
