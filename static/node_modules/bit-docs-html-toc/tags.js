/**
 * @parent bit-docs-html-toc/tags
 * @module {bit-docs-process-tags/types/tag} bit-docs-html-toc/tags/outline @outline
 * 
 * @description Controls the outline behavior.
 * 
 * @signature `@outline DEPTH TAG`
 * 
 * Controls the outline's depth and type.
 * 
 * @param {Number} [DEPTH=1] The number of headers below and including h2. For
 * example, `2` will include `h2` and `h3` elements.
 * 
 * @param {String} [TAG="ul"] Make the list an ordered list. 
 * 
 * @body
 * 
 */
exports.outline = {
	add: function (line, curData, scope, docMap) {
		var m = line.match(/@outline\s+(\d+)(?:\s+(ol|ul))?/);
		if(m) {
			if(!this.outline) {
				this.outline = {};
			}
			if(m[1]) {
				this.outline.depth = +m[1];
			}
			if(m[2]) {
				this.outline.tag = m[2];
			}
		}
	}
};
