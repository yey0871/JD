(function(){
	$("#footer").load("http://www.codeboy.com/pro/JD/js/foot.html",function(){
		var link=document.createElement("link");
		link.rel="stylesheet";
		link.href="css/foot.css"/*tpa=http://www.codeboy.com/pro/JD/js/css/foot.css*/;
		document.head.appendChild(link);
	})
})();