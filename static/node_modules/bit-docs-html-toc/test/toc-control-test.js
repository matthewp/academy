var $ = require("jquery");
var assert = require("chai/chai").assert;
var TableOfContents = require("../toc-control");
var safeCustomElement = require("../safe-custom-element");

require("steal-mocha");

describe("TableOfContents", function() {
	if(!safeCustomElement.supported) {
		return;
	}
	var $el, $testArea;

	beforeEach(function() {
		$testArea = $("#test-area");

	});

	afterEach(function() {
		$testArea.empty();
	});

	it("makes a flat list from headings", function() {
		var headings = [
			"<h2>Usage</h2>",
			"<h2>Install</h2>",
			"<h2>Configure</h2>",
			"<h2>Configure</h2>"
		];

		$testArea.html("<article id='article'>"+headings.join("")+"</article>"+
		"<bit-toc child-tag='ul' headings-container-selector='#article' depth='1'>");

		/*new TableOfContents($el.get(0), {
			tagName: "ul",
			depth: 1,
			headingsContainerSelector: "#test-area"
		});*/
		$('bit-toc li').removeAttr("class"); // remove for nice html
		assert.equal(document.querySelector('bit-toc ul').innerHTML, [
			'<li><a href="#usage">Usage</a></li>',
			'<li><a href="#install">Install</a></li>',
			'<li><a href="#configure">Configure</a></li>',
			'<li><a href="#configure-1">Configure</a></li>'
		].join(""));
	});

	it("makes nested lists from headings hierarchy", function() {
		var headings = [
			"<h2>Bower</h2>",
			"<h3>Install</h3>",
			"<h2>NPM</h2>",
			"<h3>Install</h3>",
			"<h4>Configure</h4>",
			"<h2>Writing Modules</h2>",
		];


		$testArea.html("<article id='article'>"+headings.join("")+"</article>"+
		"<bit-toc child-tag='ul' headings-container-selector='#article' depth='3'>");

		var $el = $('bit-toc>ul');

		assert.equal($el.find(">li:eq(0) ul").length, 1, "bower has a nested list");
		assert.equal($el.find(">li:eq(1) ul").length, 2, "npm two nested lists");
		assert.equal($el.find(">li:eq(2) ul").length, 0, "writing modules has no nested lists");
	});

	it("nests lists based on DEPTH value", function() {
		var headings = [
			"<h2>Bower</h2>",
			"<h3>Install</h3>",
			"<h2>NPM</h2>",
			"<h3>Install</h3>",
			"<h4>Configure</h4>",
			"<h2>Writing Modules</h2>"
		];

		$testArea.html("<article id='article'>"+headings.join("")+"</article>"+
		"<bit-toc child-tag='ul' headings-container-selector='#article' depth='1'>");

		var $el = $('bit-toc>ul');

		$('bit-toc li').removeAttr("class"); // remove for nice html

		assert.equal($el.html(), [
			'<li><a href="#bower">Bower</a></li>',
			'<li><a href="#npm">NPM</a></li>',
			'<li><a href="#writing-modules">Writing Modules</a></li>'
		].join(""));
	});

	it("highlights what has been completed", function(){
		var headings = [
			"<h2>Bower</h2>",
			"<p>Install</p>",
			"<h2>NPM</h2>",
			"<p>Install</p>",
			"<h2>Configure</h2>",
			"<p>xyz</p>",
			"<h2>Writing Modules</h2>",
			"<p>writing modules</p>",
			"<h2>Extra</h2>",
			"<p>final</p>"
		];

		$testArea.html("<article id='article'>"+headings.join("")+"</article>"+
			"<bit-toc headings-container-selector='#article'></bit-toc>");

			$("article").css({
				position: "fixed",
				top: 0,
				height: 200,
				left: 200,
				width: 600,
				backgroundColor: "gray",
				overflowY: "auto"
			});

			$("article p").css({
				height: "500px",
				border: "solid 1px red"
			});

			$("bit-toc")[0].highlight();

			function getCompletedAndActive(){
				var result = {completed: [], active: []}
				$("bit-toc li").each(function(i, node){
					if(node.classList.contains("completed")) {
						result.completed.push(node.textContent)
					}
					if(node.classList.contains("active")) {
						result.active.push(node.textContent)
					}
				});
				return result;
			}

			assert.deepEqual(getCompletedAndActive(), {
				active: ["Bower"],
				completed: []
			}, "initialized correctly");

			$("#article").scrollTop(600);
			$("bit-toc")[0].highlight(); // so we don't have to wait for the throttling

			assert.deepEqual(getCompletedAndActive(), {
				active: ["NPM"],
				completed: ["Bower"]
			}, "initialized correctly");

	});

	it("can scroll the container", function(){
		var headings = [
			"<h2>Bower</h2>",
			"<p>Install</p>",
			"<h2>NPM</h2>",
			"<p>Install</p>",
			"<h2>Configure</h2>",
			"<p>xyz</p>",
			"<h2>Writing Modules</h2>",
			"<p>writing modules</p>",
			"<h2>Extra</h2>",
			"<p>final</p>"
		];

		$testArea.html("<article id='article'>"+headings.join("")+"</article>"+
			"<bit-toc headings-container-selector='#article' scroll-selector></bit-toc>");

			$("article").css({
				position: "fixed",
				top: 0,
				height: 200,
				left: 200,
				width: 600,
				backgroundColor: "gray",
				overflowY: "auto"
			});

			$("article p").css({
				height: "500px",
				border: "solid 1px red"
			});

			$("bit-toc").css({
				display: "block",
				height: "50px",
				overflow: "auto"
			})[0].highlight();

			function getCompletedAndActive(){
				var result = {completed: [], active: []}
				$("bit-toc li").each(function(i, node){
					if(node.classList.contains("completed")) {
						result.completed.push(node.textContent)
					}
					if(node.classList.contains("active")) {
						result.active.push(node.textContent)
					}
				});
				return result;
			}

			assert.deepEqual(getCompletedAndActive(), {
				active: ["Bower"],
				completed: []
			}, "initialized correctly");

			$("#article").scrollTop(1200);
			$("bit-toc")[0].highlight(); // so we don't have to wait for the throttling


			assert.ok( $("bit-toc")[0].scrollTop > 0, "scrollTop has moved");

	});

});
