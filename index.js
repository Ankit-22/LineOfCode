var linesOfCodePromise = getLinesOfCodePromise(
	'https://api.github.com/repos/Ankit-22/AutoConnect/git/blobs/e6b32bc7884bb98a5024981d37fec787514b56c8'
);

linesOfCodePromise.then(
	data => {
		console.log(data);
		return data;
	},
	error => {
		console.log(error);
		return -1;
	}
);

// gitDirectoryScrapper("https://api.github.com/repos/Ankit-22/AutoConnect/contents/");
