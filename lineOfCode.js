var getLinesOfCodePromise = gitUrl => {
	return new Promise( (resolve, reject) => {
		$.ajax({
			url: gitUrl,
			success: result => {
				var decoded_string = atob(result.content);
				resolve({content: decoded_string, length: decoded_string.split('\n').length});
			},
			error: (jqXHR, textStatus, errorThrown) => {
				reject(errorThrown);
			},
		});
	});
};
