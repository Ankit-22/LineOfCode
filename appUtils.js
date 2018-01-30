var getUrlParameter = sParam => {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

var printStats = stats => {
	$(".content").empty();
	$(".content").append("<table class = 'myTable'><tr><th> Language </th><th> Lines </th></tr></table>");
	for(var language in stats) {
		$(".myTable").append("<tr class = "+language+"></tr>");
		$("."+language).append("<td>"+language+"</td>");
		$("."+language).append("<td>"+stats[language]+"</td>");
	}
}
