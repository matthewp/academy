require("./toc-control");

// this is legacy
var TocControl = function(el){
	el.style.display = "none";

	var toc = document.createElement("bit-toc");
	toc.className = "on-this-page";
	if(el.append) {
		el.append(toc);
	} else {
		el.appendChild(toc);
	}
};



module.exports =  TocControl;
