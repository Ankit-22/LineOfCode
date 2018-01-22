var getLinesOfCodePromise = (gitUrl)=>{
		return new Promise(function (resolve, reject) {
		$.ajax(
			{
				url: gitUrl,
				success: (result)=>{
					var decoded_string = atob(result.content);
					resolve(decoded_string.split("\n").length - 1);
				},
				error: (jqXHR, textStatus, errorThrown)=>{
					reject(textStatus);
				}
			}
		);
	});
};

var getLinesOfCode = getLinesOfCodePromise("https://api.github.com/repos/Ankit-22/AutoConnect/git/blobs/e6b32bc7884bb98a5024981d37fec787514b56c8");
getLinesOfCode.then((data)=>{
		console.log(data);
	}, (error)=>{
		console.log(error);
});
