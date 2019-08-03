//js/products.js
$(()=>{
	var list=document.getElementById("show-list");
	list.onclick=function(e){
		var span=e.target;
		if(span.className=="add"||span.className=="reduce"){
			//找到旁边的input
			var input=span.parentNode.children[1]
			//获取input的值n
			var n=parseInt(input.value);console.log(n);
			//如果span是add
			if(span.className=="add")
				n++//n++
			else if(n>1)//否则如果n>1
				n--//n--
			input.value=n;//将n放回input的内容中
		}
	}
	$("#show-list").on("click",".addCart",function(){
		var $a=$(this);
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok=="1"){
					var lid=$a.data("lid");
					var count=$a.prev().prev().val();
					$.ajax({
						type:"get",
						url:"http://www.codeboy.com/pro/JD/js/data/cart/addCart.php",
						data:{lid,count},
						success:function(){
							$a.prev().prev().val(1);
							loadCart();
						}
					});
				}else{
					alert("请先登录!");
					location.href=
						"http://www.codeboy.com/pro/JD/js/login.html?back="+location.href;
				}
			}
		})
	})
			
	function loadCart(){
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==1){
					$.ajax({
						type:"get",
						url:"http://www.codeboy.com/pro/JD/js/data/cart/getCart.php",
						dataType:"json",
						success:function(items){
							var html="";
							var total=0;
							for(var item of items){
								var {title,count,price,iid}=item;
								html+=`<div class="item">
									<span title="${title}">${title}</span>
									<div data-iid="${iid}">
										<span class="reduce">-</span>
										<input type="text" value="${count}">
										<span class="add">+</span>
									</div>
									<p>
										<span>¥${(price*count).toFixed(2)}</span>	
									</p>
								</div>`;
								total+=price*count
							}
							$(".cart_content").html(html);
							$("#total").html(total.toFixed(2));
						}
					})
				}
			}
		})
	}
	loadCart();

	$(".cart_content").on("click",".add,.reduce",function(){
		var $span=$(this);
		var iid=$span.parent().attr("data-iid");
		var count=parseInt($span.siblings("input").val());
		if($span.is(".add"))
			count++;
		else
			count--;
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/cart/updateCart.php",
			data:{iid,count},
			success:function(){
				loadCart();
			}
		})
	})

	var pages=document.getElementById("pages");
	pages.onclick=function(e){
		var a=e.target;
		if(a.nodeName==="A"){
			if(a.className.indexOf("disabled")==-1
					&&a.className.indexOf("current")==-1){
				switch(a.className){
					case "previous":
						var curr=pages.querySelector("a.current");
						var pno=curr.innerHTML-1-1;
						loadPage(pno);
						break;
					case "next":
						var curr=pages.querySelector("a.current");
						var pno=curr.innerHTML;
						loadPage(pno);
						break;
					default:
						loadPage(a.innerHTML-1);
				}
			}
		}
	}

	function loadPage(pno=0){
		var kw=location.search.split("=")[1];
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/products/getProductsByKw.php",
			data:{kw, pno},
			dataType:"json",
			success:function(output){
				var {products, pageCount}=output;
				var html="";
				for(var p of products){
					var {lid,md,title,price}=p;
					html+=`<li>
						<a href="http://www.codeboy.com/pro/JD/js/product_details.html?lid=${lid}" title="${title}">
							<img src="${md}" alt="${title}">
						</a>
						<p><span class="price">¥${parseFloat(price).toFixed(2)}</span>
							<a href="http://www.codeboy.com/pro/JD/js/product_details.html?lid=${lid}">${title}</a>
						</p>
						<div>
							<span class="reduce">-</span>
							<input type="text" value="1">
							<span class="add">+</span>
							<a href="javascript:;" data-lid="${lid}" class="addCart">加入购物车</a>
						</div>
					</li>`;
				}
				list.innerHTML=html;

				var html=`<a href="javascript:;" class="previous">上一页</a>`;
				for(var i=0;i<pageCount;i++){
					if(i!=pno)
						html+=`<a href="javascript:;">${i+1}</a>`;
					else
						html+=`<a href="javascript:;" class="current">${i+1}</a>`;
				}
				html+=`<a href="javascript:;" class="next">下一页</a>`
				
				pages.innerHTML=html;
				if(pno==0)
					pages.firstElementChild.className+=" disabled";
				if(pno==pageCount-1)
					pages.lastElementChild.className+=" disabled";
			}
		});
	}
	loadPage();
})