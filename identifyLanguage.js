var filterExtensions = filename => {
	var possibleExtensions = [];
	var prevIndex = -1;
	while(true) {
		var index = filename.indexOf('.', prevIndex + 1);
		if(index != -1) {
			possibleExtensions.push(filename.slice(index));
			prevIndex = index;
		} else break;
	}
	return possibleExtensions;
};

var filterLanguages = (linguistObject, filename) => {
	var possibleExtensions = filterExtensions(filename);
	var possibleLanguages = [];
	if(possibleExtensions.length == 0)
		possibleLanguages.push("Shell");
	for(var i = 0; i < possibleExtensions.length; i++)
		if(linguistObject[possibleExtensions[i]])
			possibleLanguages = linguistObject[possibleExtensions[i]];
	return possibleLanguages;
};
