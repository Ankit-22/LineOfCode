var getLinesOfCode = gitUrl => {
	var linesOfCodePromise = new Promise( (resolve, reject) => {
		$.ajax({
			url: gitUrl,
			success: result => {
				var decoded_string = atob(result.content);
				resolve(decoded_string.split('\n').length - 1);
			},
			error: (jqXHR, textStatus, errorThrown) => {
				reject(textStatus);
			},
		});
	});

	linesOfCodePromise.then(
		data => {
			return data;
		},
		error => {
			console.log(error);
			return -1;
		}
	);
};
