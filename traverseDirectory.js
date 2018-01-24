var stats = {};

var gitDirectoryScrapper = (directoryUrl, linguistData) => {
	directoryPromise = new Promise( (resolve, reject) => {
		$.ajax({
			url: directoryUrl,
			success: result => {
				console.log(result);
				resolve(result);
			},
			error: (jqXHR, textStatus, errorThrown) => {
				reject(errorThrown);
			},
		});
	});
	directoryPromise.then(
		data => {
			data.forEach( fileObject => {
				if(fileObject.type == "dir")
					gitDirectoryScrapper(fileObject.url, linguistData);
				else {
					var possibleLanguages = filterLanguages(linguistData, fileObject.path);
					if(possibleLanguages.length == 0)
						return;
					var contentPromise = getLinesOfCodePromise(fileObject.url);
					contentPromise.then(
						content => {
							var language = detectLanguage(possibleLanguages, content.content);
							console.log(language);
							if(language != "") {
								if(!(typeof stats[language] === 'undefined')) {
									console.log(fileObject.path);
									stats[language] += content.length;
								}
								else
									stats[language] = content.length;
							}
							console.log(stats);
						},
						error => {
							console.log(error);
						}
					);
				}
			});
		},
		error => {
			console.log(error);
		}
	);
};
