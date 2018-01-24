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
		possibleLanguages.push("Shell Script");
	for(var i = 0; i < possibleExtensions.length; i++)
		if(linguistObject[possibleExtensions[i]])
			possibleLanguages = linguistObject[possibleExtensions[i]];
	return possibleLanguages;
};

var detectLanguage = (possibleLanguages, content) => {
	if(possibleLanguages[0] == "Shell Script") {
		if(content.startsWith("#!/bin/bash") || content.startsWith("#!/bin/sh") || content.startsWith("#!/bin/zsh"))
			return "Shell"
		return "";
	} else if(possibleLanguages[1] == "PHP")
		return possibleLanguages[1];
	else if(possibleLanguages.length != 1)
		return "";
	return possibleLanguages[0]; // Change required. Possibly ML.
};
