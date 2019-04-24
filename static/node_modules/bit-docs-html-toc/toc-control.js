var viewTarget = require("can-view-target");
var makeTree = require("./make-tree");
var lazy = require("can-define-lazy-value");
var safeCustomElement = require("./safe-custom-element");
var attributeConnect = require("./attribute-connect");

function debounce(func, wait) {
	var timeout;

	return function executedFunction() {
		var context = this;
		var args = arguments;

		var later = function() {
			timeout = null;
			func.apply(context, args);
		};

		clearTimeout(timeout);

		timeout = setTimeout(later, wait);

		if (!timeout) {
			func.apply(context, args);
		}
	};
}

// data { childTag: childTag, node: node }
var renderNodeTarget = viewTarget([{
	tag: "li",
	children: [
		{
			tag: "a",
			attrs: {
				href: function(data){
					return this.setAttribute("href","#"+data.node.id);
				}
			},
			children: [function(data){ this.nodeValue = data.node.text; }]
		},
		function(data){
			var container = document.createElement(data.childTag);
			data.node.children.forEach(function(node){
				container.appendChild(renderNodeTarget.hydrate({node: node, childTag: data.childTag}));
			});
			if(data.node.children.length) {
				this.parentNode.replaceChild(container, this);
			}

		}
	]
}]);

// data - { nodes: titles, childTag: this.childTag }
var template = function(data){
	var container = document.createElement(data.childTag);
	data.nodes.forEach(function(node){
		container.appendChild(renderNodeTarget.hydrate({node: node, childTag: data.childTag}));
	});
	return container;
};

var connectAttribute = attributeConnect();

var BitToc = function(){
	console.log("initialized");
	connectAttribute.initialize(this);
	this.teardowns = [];

};
var prototype = {
	connectedCallback: function() {

		var titles = this.titleTree;

		// If there are no titles, bail
		if (!titles.length) {
			this.parentNode.removeChild(this);
			return;
		}

		// Append our template
		this.appendChild(template({
			nodes: titles,
			childTag: this.outlineTagName
		}));

		this.setupHighlighting();
	},
	get docObject() {
		return window.docObject || {};
	},
	get outlineTagName(){
		if(this.childTag) {
			return this.childTag;
		} else {
			var docObject = this.docObject;
			var outline = docObject.outline || {};
			return (outline.tag === "ol") ? "ol" : "ul";
		}
	},
	get outlineDepth(){
		if(this.depth) {
			return parseInt(this.depth);
		} else {
			var docObject = this.docObject;
			var depth = docObject.outline && docObject.outline.depth;

			return (typeof depth === "number" ? Math.min(depth, 6) : 1);
		}
	},
	get outlineScrollElement(){
		if(this.scrollSelector === "true" || this.scrollSelector === "") {
			return this;
		} else if(this.scrollSelector) {
			return document.querySelector(this.scrollSelector);
		}
		else {
			return;
		}
	},
	get containerSelector(){
		return this.headingsContainerSelector || "article";
	},
	makeSelector: function(tagName) {
		var container = this.containerSelector;
		return container + " " + tagName;
	},
	getHeadings: function() {
		var headings = [];

		for(var i = 0; i < this.outlineDepth; i++) {
			headings.push("h" + (i + 2));
		}

		return headings;
	},
	setupHighlighting: function(){
		this.article = document.querySelector(this.containerSelector);
		if(this.article) {
			var highlight =  debounce(this.highlight.bind(this),1);
			this.article.addEventListener("scroll",highlight);
			this.teardowns.push(function(){
				this.article.removeEventListener("scroll", highlight);
			}.bind(this));
			this.highlight();
		}
	},
	// completed only once the one after it is in the page and 1/2 way visible.
	//
	highlight: function(){
		var articleRect = this.article.getBoundingClientRect();

		var buttons = this.buttons;


		var positions = this.titles.map(function(header, i){
			return {
				header: header,
				rect: header.getBoundingClientRect(),
				button: buttons[i]
			};
		});
		// this simulates a header at the end of the page
		positions.push({
			rect: {
				top: articleRect.top + this.article.scrollHeight - this.article.scrollTop
			}
		});
		// loop through the actual headers and their positions
		positions.slice(0, positions.length - 1).forEach(function(position, index){

			position.button.classList.remove("completed","active");

			var curRect = position.rect;
			var curDistance = curRect.top - articleRect.top;

			var nextRect = positions[index+1].rect;
			var nextDistance = nextRect.top - articleRect.top;

			// =====[CUR=NEXT]===
			if( nextDistance >= 0 && nextDistance <= articleRect.height && curDistance >= 0 && curDistance <= articleRect.height ) {
				position.button.classList.add("active");
			}
			// =======CUR=====[=NEXT=|===]======
			// =======CUR=======NEXT=====[===|===]===
			else if( nextDistance < (articleRect.height / 2) ) {
				position.button.classList.add("completed");
			}
			// ======[=CUR=|=NEXT=]======
			// ======[=CUR=|===]=NEXT====
			// ====CUR=[===|=NEXT]=======
			// ====CUR=[===|===]=NEXT====
			else if( nextDistance >= (articleRect.height / 2) && curDistance < (articleRect.height / 2) ) {
				position.button.classList.add("active");
			}
		});
		var elementToScroll = this.outlineScrollElement;

		if(elementToScroll) {
			// find out where the midpoint is
			var distance = (this.article.scrollTop + this.article.offsetHeight / 2) / this.article.scrollHeight;
			elementToScroll.scrollTop = (elementToScroll.scrollHeight * distance) - (elementToScroll.offsetHeight / 2);
		}
	},
	disconnectedCallback: function(){
		this.teardowns.forEach(function(teardown){
			teardown();
		});
	},
	attributeChangedCallback: connectAttribute.attributeChangedCallback
};

lazy(prototype,"titles", function(){
	var selector = this.getHeadings()
		.map(this.makeSelector.bind(this))
		.join(",");

	// we should save this ...
	return selector ? Array.from( document.querySelectorAll(selector) ) : [];
});
lazy(prototype,"titleTree", function(){
	return makeTree(this.titles);
});
lazy(prototype,"buttons", function(){
	return this.querySelectorAll("li");
});



BitToc = safeCustomElement("bit-toc",BitToc, prototype);


module.exports = BitToc;
