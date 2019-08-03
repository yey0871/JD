//js/header.js
$(()=>{
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/header.css"/*tpa=http://www.codeboy.com/pro/JD/js/css/header.css*/;
	document.head.appendChild(link);
	$("#header").load("http://www.codeboy.com/pro/JD/js/header.html",function(html){
		var btnSearch=
			document.querySelector("[data-trigger=search]");
		var txtSearch=document.getElementById("txtSearch");
		btnSearch.onclick=function(){
			var kw=txtSearch.value;
			if(kw.trim()!==""){
				var url="products.html?kw="+kw;
				//open(url,"_self");
				location.href=url;
				//location.assign(url);
			}
		};
		txtSearch.onkeyup=function(e){
			if(e.keyCode==13)
				btnSearch.onclick();
		}
		if(location.search.indexOf("kw")!=-1)
			txtSearch.value=
				decodeURI(location.search.split("=")[1]);

		//登录退出功能
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/users/islogin.php",
			dataType:"json",
			success:function(data){
				var {ok,user}=data;			
				if(ok>0){			
					var welcome = document.getElementById("welcome");
				  welcome.innerHTML = `欢迎回来 ${user.uname} <a href="">退出</a>`;
					$("a:contains('退出')").click(function(e){
						e.preventDefault();
						$.ajax({
							type:"get",
							url:"http://www.codeboy.com/pro/JD/js/data/users/signout.php",
							success:function(){
								location.reload(true);
							}
						})
					})
			  }				
			}
		});
	});
});
