var linguistObject, linguistInverseObject;

var convertLinguistJsonArrayToObject = jsonArray => {
	var linguistJsonObject = {};
	jsonArray.forEach( jsonObject => {
		linguistJsonObject[jsonObject.language] = jsonObject.extensions;
	});
	return linguistJsonObject;
};

var convertLinguistDataToJson = linguistData => {
	var linguistLines = linguistData.split('\n');
	var jsonData = [];
	var flag = false;
	var flag2 = false;
	linguistLines.forEach( linguistLine => {
		if(flag && !linguistLine.startsWith("  ")) flag = false;
		else if(flag) {
			if(linguistLine.startsWith("  extensions:")) flag2 = true;
			else if(flag2 && !linguistLine.startsWith("  -")) flag2 = false;
			else if(flag2) jsonData[jsonData.length - 1].extensions.push(linguistLine.slice(5, -1));
		}
		if(!(linguistLine.startsWith("#") || linguistLine.startsWith(" ") || linguistLine.startsWith("-") || linguistLine.length == 0)) {
			jsonData.push({language: linguistLine.slice(0, -1), extensions: []});
			flag = true;
		}
	});
	return convertLinguistJsonArrayToObject(jsonData);
};

var convertObjectToInverse = linguistObject => {
	linguistInverseObject = {};

	for(var language in linguistObject)
		linguistObject[language].forEach( extensions => {
			linguistInverseObject[extensions] = [];
		});

	for(var language in linguistObject)
		linguistObject[language].forEach( extensions => {
			linguistInverseObject[extensions].push(language);
		});

	return linguistInverseObject;
};

var linguistPromise = new Promise( (resolve, reject) => {
		$.ajax({
		url: 'https://api.github.com/repos/github/linguist/git/blobs/50854668d4f8c53e710d49c669be3d311849eef0',
		success: result => {
		  var decoded_string = atob(result.content);
		  resolve(decoded_string);
		},
		error: (jqXHR, textStatus, errorThrown) => {
		  reject(textStatus);
		},
	});
});

linguistPromise.then(
	data => {
		linguistObject = convertLinguistDataToJson(data);
		linguistInverseObject = convertObjectToInverse(linguistObject);
		console.log(linguistInverseObject);
	},
	error => {
		console.log(error);
	}
);
