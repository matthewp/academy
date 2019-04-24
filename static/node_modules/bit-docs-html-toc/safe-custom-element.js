
function safeCustomElement(tag, constructor, prototype){
	prototype = prototype || constructor.prototype;
	var Element = function(){
		var result;
		if(typeof Reflect !== "undefined") {
			result = Reflect.construct(HTMLElement, [], new.target);
		} else {
			result = HTMLElement.apply(this, arguments);
		}
		constructor.apply(result, arguments);
		return result;
	};
	if(typeof HTMLElement !== undefined) {
		Element.prototype = Object.create(HTMLElement.prototype);
	}
	Object.getOwnPropertyNames(prototype).forEach(function(property){
		Object.defineProperty(Element.prototype, property,
			Object.getOwnPropertyDescriptor(prototype, property));
	});
	if(typeof customElements !== "undefined") {
		customElements.define(tag, Element);
	}

	return Element;
}

safeCustomElement.supported = (typeof Reflect !== "undefined") && 
	(typeof HTMLElement !== undefined) &&
	(typeof customElements !== "undefined");


module.exports = safeCustomElement;
