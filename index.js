var userName = getUrlParameter("user");
var repoName = getUrlParameter("repo");

linguistPromise.then(
	data => {
		var linguistObject = convertLinguistDataToJson(data);
		var linguistInverseObject = convertObjectToInverse(linguistObject);
		console.log(linguistInverseObject);
		return linguistInverseObject;
	},
	error => {
		console.log(error);
	}
).then(
	data => {
		gitDirectoryScrapper('https://api.github.com/repos/'+userName+'/'+repoName+'/contents', data);
	},
	error => {
		console.log(error);
	}
);
