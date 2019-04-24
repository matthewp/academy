module.exports = function makeTree(elements) {
	var treeData = makeTreeData(elements || []);
	var rootNode = { level: 0, children: [] };

	var tree = rootNode.children;
	var lastNode;

	treeData.forEach(function(node) {
		node.children = [];

		if (!lastNode) {
			tree.push(node);
		}
		else if (node.level === lastNode.level) {
			findParentNode(lastNode, rootNode).children.push(node);
		}
		else if (node.level > lastNode.level) {
			lastNode.children.push(node);
		}
		else {
			findAncestorOfLevel(node.level, lastNode, rootNode).children.push(node);
		}

		lastNode = node;
	});

	return tree;
};

function findParentNode(needle, haystack) {
	var parent;

	if (haystack.children.indexOf(needle) !== -1) {
		return haystack;
	}

	for (var i = 0; i < haystack.children.length; i += 1) {
		parent = findParentNode(needle, haystack.children[i]);
 		if (parent) { break; }
	}

	return parent;
}

function findAncestorOfLevel(level, needle, haystack) {
	var parent = findParentNode(needle, haystack);

	return (parent.level < level) ?
		parent :
		findAncestorOfLevel(level, parent, haystack);
}

function makeHeadingId(text) {
	return (text || "")
		.replace(/\s/g, "-")      // replace spaces with dashes
		.replace(/[^\w\-]/g, "")  // remove punctuation
		.toLowerCase();
}

function makeTreeData(elements) {
	var ids = {};
	var map = [].map;

	return map.call(elements, function(element) {
		var text = element.textContent;
		var id = element.id || makeHeadingId(text);
		element.id = id;
		var level = getElementLevel(element);

		// generate unique id for elements with same text
		var count = ids[id] || 0;
		var uniq = count > 0 ? id + "-" + count : id;
		ids[id] = count + 1;

		return { id: uniq, text: text, level: level };
	});
}

function getElementLevel(element) {
	var defaultLevel = 2;
	var tagName = element.tagName.toLowerCase();
	var headingTagNames = ["h1", "h2", "h3", "h4", "h5", "h6"];

	if (headingTagNames.indexOf(tagName) !== -1) {
		return parseInt(tagName.slice(1), 10);
	}

	// default value if not a heading tag
	return defaultLevel;
}
