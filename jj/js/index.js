/* 动态加载页面内容 */
//楼层 sp  不同楼层的相同布局的动态加载
$(()=>{
	$.ajax({
		type:"get",
		url:"http://www.codeboy.com/pro/JD/js/data/index/get_sp_Products.php",
		dataType:"json",
		success:function(products){
			//console.log(products);
			var html="";
			var n=0;
			products.forEach((p,i)=>{
				var {title,details,price,href,pic}=p;
						html+=`<div class="sp">
							<img src="${pic}" class="pic">
							<p class="name">${title}</p>
							<span class="price">¥${parseFloat(price).toFixed(2)}</span>
						</div>`;
				if((i+1)%4==0){
					document.querySelector(`.item${n}`).innerHTML=html;
					html="";
					n++;
				};	
			})	
		}
	})
});
//7楼 f7
$(()=>{
	$.ajax({
		type:"get",
		url:"http://www.codeboy.com/pro/JD/js/data/index/get_f7_Products.php",
		dataType:"json",
		success:function(products){
			//console.log(products);
			var html="";
			products.forEach((p,i)=>{
				var {title,details,price,href,pic}=p;
				if(i<115){
					html+=`<div class=" case">
						<img src="${pic}" class="pic">
						<p class="name">${title}</p>
						<p class="details">${details}</p>
						<a href="${href}" class="price">¥${parseFloat(price).toFixed(2)}</a>
					</div>`;
				}
			});
			document.querySelector("#f7>div.box")
				.innerHTML=html;
		}
	});
});
//商品分类菜单
	$('.menu_list').each(function(){
		$(this).children("h3").mouseenter(function(){
			$(this).next().show();
		})
		$(this).mouseleave(function(){
			$(this).children(".list").hide();
		})
	});
//轮播图功能
$(()=>{
	var $ulImgs=$("[data-load=bannerImgs]");
	var LIWIDTH=590,moved=0,
		  timer=null,wait=3000,interval=500;
	var $ulInds=$("[data-load=bannerInds]");
	$.ajax({
		type:"get",
		url:"http://www.codeboy.com/pro/JD/js/data/index/getCarousel.php",
		dataType:"json",
		success:function(products){
			var html="";
			for(var p of products){
				var {href,img,title}=p;
				html+=`<li>
					<a href="${href}" title="${title}">
						<img src="${img}">
					</a>
				</li> `;
			}
			var {href,img,title}=products[0];
			html+=`<li>
				<a href="${href}" title="${title}">
					<img src="${img}">
				</a>
			</li> `;
			$ulImgs.html(html)
				.css("width",LIWIDTH*(products.length+1));
			$ulInds.html("<li></li>".repeat(products.length))
				.children(":first").addClass("hover");
			$ulInds.on("click","li",function(){
				var $li=$(this);
				var i=$li.index();
				moved=i;
				$ulImgs.stop(true).animate({
					left:-LIWIDTH*moved
				},interval,function(){
					$li.addClass("hover")
						.siblings().removeClass("hover");
				});
			});
			function autoMove(){
				timer=setInterval(function(){
					move();
				},wait);
			}
			function move(){
				moved++;
				$ulImgs.animate({
					left:-moved*LIWIDTH
				},interval,function(){
					if(moved==products.length){
						$ulImgs.css("left",0);
						moved=0;
					}
					$ulInds.children("li:eq("+moved+")")
						.addClass("hover")
						.siblings().removeClass("hover")
				});
			}
			autoMove();
			$("#banner").hover(
				function(){
					clearInterval(timer);
					timer=null;
				},
				function(){
					autoMove();
				}
			);
			$("[data-move=right]").click(function(){
				if(!$ulImgs.is(":animated"))
					move();
			});
			$("[data-move=left]").click(function(){
				if(!$ulImgs.is(":animated")){
					if(moved==0){
						moved=products.length;
						$ulImgs.css("left",-LIWIDTH*moved);
					}
					moved--;
					$ulImgs.animate({
						left:-moved*LIWIDTH
					},interval,function(){
						$ulInds.children("li:eq("+moved+")")
							.addClass("hover")
							.siblings().removeClass("hover")
					});
				}
			})
		}
	})
});
/*楼层滚动功能*/
	var $ulLift=$(".lift_list"),
	    $floors=$(".floor");
	$(window).scroll(function(){
		var scrollTop=document.body.scrollTop
			          ||document.documentElement.scrollTop;
		var offsetTop=$("#f1").offset().top;
		if(offsetTop>scrollTop+innerHeight/2)
			$ulLift.parent().hide();
		else{
			$ulLift.parent().show();
			$floors.each(function(i){
				var $f=$(this);
				var offsetTop=$f.offset().top;
				if(offsetTop<scrollTop+innerHeight/2){
					$ulLift.children("li:eq("+i+")")
						.addClass("lift_item_on")
						.siblings().removeClass("lift_item_on");
				}
			})
		}
	});
	$ulLift.on("click","li",function(){
		var $li=$(this);
		var i=$li.index();
		var $f=$($floors[i]);
		var top=$f.offset().top;
		$("html,body").stop(true).animate({
			scrollTop:top
		},500);
	})
//搜素查找功能 [data-trigger=search]  txtSearch
$(()=>{
		var btnSearch=document.querySelector("[data-trigger=search]");
		var txtSearch=document.getElementById("txtSearch");
		btnSearch.onclick=function(){
			var kw=txtSearch.value;
			if(kw.trim()!==""){
				var url="products.html?kw="+kw;
				//open(url,"_blank");
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
		
})