var makeTree = require("../make-tree");
var assert = require("chai/chai").assert;

require("steal-mocha");

describe("makeTree", function() {
	it("makes flat trees based on heading tag names", function() {
		var elements = [
			{ tagName: "h2", textContent: "Usage" },
			{ tagName: "h2", textContent: "Install" },
			{ tagName: "h2", textContent: "Configure" },
			{ tagName: "h2", textContent: "Configure" }
		];

		assert.deepEqual(makeTree(elements), [
			{ id: "usage", level: 2, text: "Usage", children: [] },
			{ id: "install", level: 2, text: "Install", children: [] },
			{ id: "configure", level: 2, text: "Configure", children: [] },
			{ id: "configure-1", level: 2, text: "Configure", children: [] }
		]);
	});

	it("nests trees based on headings hierarchy", function() {
		var elements = [
			{ tagName: "h2", textContent: "Bower" },
			{ tagName: "h3", textContent: "Install" },
			{ tagName: "h2", textContent: "NPM" },
			{ tagName: "h3", textContent: "Install" },
			{ tagName: "h4", textContent: "Specifying components folder" },
			{ tagName: "h2", textContent: "Writing Modules" }
		];

		assert.deepEqual(makeTree(elements), [
			{ id: "bower",
				level: 2,
				text: "Bower",
				children: [
					{ id: "install", level: 3, text: "Install", children: [] }
				]
			},
			{ id: "npm",
				level: 2,
				text: "NPM",
				children: [
					{ id: "install-1", level: 3, text: "Install",
						children: [
							{ id: "specifying-components-folder",
								level: 4,
								text: "Specifying components folder",
								children: []
							}
						]
					}
				]
			},
			{ id: "writing-modules", level: 2, text: "Writing Modules", children: [] }
		]);
	});
});
