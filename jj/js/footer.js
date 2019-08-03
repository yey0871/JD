(function(){
	$("#footer").load("http://www.codeboy.com/pro/JD/js/footer.html",function(){
		var link=document.createElement("link");
		link.rel="stylesheet";
		link.href="css/footer.css"/*tpa=http://www.codeboy.com/pro/JD/js/css/footer.css*/;
		document.head.appendChild(link);
	})
})();