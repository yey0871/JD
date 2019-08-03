$(()=>{
	function loadCart(){
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/users/islogin.php",
			dataType:"json",
			success:function(data){
				if(data.ok==0)
					location.href="http://www.codeboy.com/pro/JD/js/login.html?back="+location.href;
				else{
					$.ajax({
						type:"get",
						url:"http://www.codeboy.com/pro/JD/js/data/cart/getCart.php",
						dataType:"json",
						success:function(items){
							var html="";
							var $chkAll=$(".check-top>img,#footerCheckAll");
							if(items.length!==0){
								$chkAll.attr("src","img/head/product_true.png"/*tpa=http://www.codeboy.com/pro/JD/js/img/head/product_true.png*/);
							}else{
								$chkAll.attr("src","img/head/product_normal.png"/*tpa=http://www.codeboy.com/pro/JD/js/img/head/product_normal.png*/);
							}
							var sum=0,total=0;
							for(var item of items){
								var {is_checked,sm,title,spec,price,count,lid,iid}=item;
								if(is_checked==0)
									$chkAll.attr(
										"src","img/head/product_normal.png"/*tpa=http://www.codeboy.com/pro/JD/js/img/head/product_normal.png*/);
								if(is_checked==1){
									sum+=parseInt(count);
									total+=price*count;
								}
								
								html+=`<div class="imfor">
									<div class="check" data-iid="${iid}">
										<img src="img/head/product_${is_checked==0?'normal':'true'}.png" alt="">
									</div>
									<div class="product">
										<a href="http://www.codeboy.com/pro/JD/js/product_details.html?lid=${lid}">
											<img src="${sm}" alt="${title}" title="${title}">
										</a>
										<span class="desc">
											<a href="http://www.codeboy.com/pro/JD/js/product_details.html?lid=${lid}">${title}</a>
										</span>
										<p class="col"><span>规格：</span>
											<span class="color-desc">${spec}</span>
										</p>
									</div>
									<div class="price"><p class="price-desc">京东专享价</p>
										<p><b>¥</b>${parseFloat(price).toFixed(2)}</p>
									</div>
									<div class="num" data-iid="${iid}">
										<span class="reduce">&nbsp;-&nbsp;</span>
										<input type="text" value="${count}">
										<span class="add">&nbsp;+&nbsp;</span>
									</div>
									<div class="total-price">
										<span>¥</span>
										<span>${(price*count).toFixed(2)}</span>
									</div>
									<div class="del">
										<a href="#" data-iid="${iid}">删除</a>
									</div>
								</div>`
							}
							$("#content-box-body").html(html);
							$(".total,.totalOne").html(sum);
							$(".foot-price,.totalPrices")
								.html("¥"+total.toFixed(2))
						}
					})
				}
			}
		})
	}
	loadCart();
	$("#content-box-body")
		.on("click",".check>img,.add,.reduce,.del>a",function(e){
		e.preventDefault();
		var $tar=$(this);
		if($tar.is(".add,.reduce")){
			var iid=$tar.parent().attr("data-iid");
			var count=parseInt($tar.siblings("input").val());
			if($tar.is(".add"))
				count++;
			else
				count--;
			$.ajax({
				type:"get",
				url:"http://www.codeboy.com/pro/JD/js/data/cart/updateCart.php",
				data:{iid,count},
				success:function(ok){
					if(ok>0){
						loadCart();
					}else{
						alert('网络故障，请检查！');
					}	
				}
			})
		}else if($tar.is(".del>a")){
			var title=$tar.parent()
				            .siblings(".product")
										.find(".desc>a").html();
			if(confirm("是否继续删除 '"+title+"' 吗?")){
				var iid=$tar.attr("data-iid");
				$.ajax({
					type:"get",
					url:"http://www.codeboy.com/pro/JD/js/data/cart/deleteCart.php",
					data:{iid},
					success:function(ok){
						if(ok>0){
							loadCart();
						}else{
							alert('网络故障，请检查！');
						}	
					}
				})
			}
		}else{
			var iid=$tar.parent().attr("data-iid");
			var checked=
				$tar.attr("src").endsWith("normal.png"/*tpa=http://www.codeboy.com/pro/JD/js/normal.png*/)?1:0;
			$.ajax({
				type:"get",
				url:"http://www.codeboy.com/pro/JD/js/data/cart/checkOne.php",
				data:{iid,checked},
				success:function(ok){
					if(ok>0){
						loadCart();
					}else{
						alert('网络故障，请检查！');
					}	
				}
			})
		}
	});
	//全选按钮
	$(".check-top>img,#footerCheckAll").click(function(){
		var $img=$(this)
		var checked=
			$img.attr("src").endsWith("normal.png"/*tpa=http://www.codeboy.com/pro/JD/js/normal.png*/)?1:0;
		$.ajax({
			type:"get",
			url:"http://www.codeboy.com/pro/JD/js/data/cart/checkAll.php",
			data:{checked},
			success:function(){
				//console.log(1);
				loadCart();
			}
		})
	})
	//删除选中
		$('#del-all').click(function(){
			$.ajax({
				type:"get",
				url:"http://www.codeboy.com/pro/JD/js/data/cart/getCheck.php",
				dataType:"json",
				success:function(data){
					console.log(data);
					if(data.code>0){
						if(confirm("是否删除选中的商品？")){
							for(var p of data.data){
								var{iid}=p;
								console.log(1);
								$.ajax({
									type:"get",
									url:"http://www.codeboy.com/pro/JD/js/data/cart/deleteCart.php",
									data:{iid},
									success:function(){
										loadCart();
									}
								});
							}
						}
					}
				}
			})
		})
});
