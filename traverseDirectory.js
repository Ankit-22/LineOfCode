var gitDirectoryScrapper = directoryUrl => {
	directoryPromise = new Promise( (resolve, reject) => {
		$.ajax({
			url: directoryUrl,
			success: result => {
				resolve(result);
			},
			error: (jqXHR, textStatus, errorThrown) => {
				reject(textStatus);
			},
		});
	});

	directoryPromise.then(
		data => {
			data.forEach( fileObject => {
				if(fileObject.type == "dir")
					gitDirectoryScrapper(fileObject.url);
				else console.log(fileObject.path);
			});
		},
		error => {
			console.log(error);
		}
	);
};
