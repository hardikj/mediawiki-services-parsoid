"use strict";

var DU = require('./mediawiki.DOMUtils.js').DOMUtils;

function generateRefs(refsExt, options, node) {
	var child = node.firstChild;
	while (child !== null) {
		var nextChild = child.nextSibling;
		if (DU.isElt(child)) {
			var typeOf = child.getAttribute('typeof');
			if ((/(?:^|\s)mw:Extension\/ref\/Marker(?=$|\s)/).test(typeOf)) {
				refsExt.extractRefFromNode(child, options);
			} else if ((/(?:^|\s)mw:Extension\/references(?=$|\s)/).test(typeOf)) {
				refsExt.insertReferencesIntoDOM(child);
			} else if (child.childNodes.length > 0) {
				generateRefs(refsExt, options, child);
			}
		}

		child = nextChild;
	}
}

if (typeof module === "object") {
	module.exports.generateRefs = generateRefs;
}
