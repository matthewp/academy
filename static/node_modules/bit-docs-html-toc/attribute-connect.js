var canString = require("can-string");

module.exports = function(convertToProperty){
	convertToProperty = convertToProperty || canString.camelize;

	return {
		attributeChangedCallback: function(name, oldValue, newValue){
			this[convertToProperty(name)] = newValue;
		},
		initialize: function(node){
			[].slice.call(node.attributes, 0).forEach(function(attrNode){
				node[convertToProperty(attrNode.name)] = attrNode.value;
			});
		}
	};
};
