var tags = require("./tags");

/**
 * @parent plugins
 * @module {function} bit-docs-html-toc
 * @group bit-docs-html-toc/tags tags
 * @group bit-docs-html-toc/static static
 *
 * @description Injects a table of contents for the page into an HTML element.
 *
 * @body
 *
 * This plugin registers onto these hooks:
 *   - `tags`
 *   - `html`
 *
 * Registering the `tags` hook adds the [bit-docs-html-toc/tags/outline] tag.
 * 
 * Registering the `html` hook adds a static JavaScript file used to hydrate
 * the table of contents [bit-docs-html-toc/toc.js].
 */
module.exports = function(bitDocs) {
	var pkg = require("./package.json");

	var dependencies = {};
	dependencies[pkg.name] = pkg.version;

	bitDocs.register("html", {
		dependencies: dependencies
	});

	bitDocs.register("tags", tags);
};
