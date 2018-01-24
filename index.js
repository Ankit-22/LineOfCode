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
		gitDirectoryScrapper('https://api.github.com/repos/Ankit-22/Algorithms_Datastructures/contents', data);
	},
	error => {
		console.log(error);
	}
);