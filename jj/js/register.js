$(()=>{
	$("#uname").blur(function(){
		var uname=$("#uname").val();
		var reg=/^[a-zA-Z0-9_-]{4,10}$/ig;
		var res1=reg.test(uname);
		if(uname==""){
			$("#s-uname").html("");
		}else if(res1==true){	
			$.ajax({
				type:"get",
				url:"http://www.codeboy.com/pro/JD/js/data/users/checkUname.php",
				data:{uname},
				success:function(){
					
				}
			});
		}else{
			$("#s-uname").html("4-10位数字或字母");
		}
	});
		
	$("#upwd").blur(function(){
			//获取密码框的值，判断值不能为空
			var upwd=$("#upwd").val();
			if(upwd==""){
				 $("#s-upwd").html("密码不能为空");
			}else{
				 $("#s-upwd").html("");
			}
		});
		//验证两次密码是否一致
	$("#cpwd").blur(function(){
			var upwd=$("#upwd").val();
			var cpwd=$("#cpwd").val();
			if(cpwd==""){
				$("#s-cpwd").html("密码不能为空");
			}else if(upwd==cpwd){
				$("#s-cpwd").html("");
			}else{
				$("#s-cpwd").html("两次密码不一致");
			}
		});
	//邮箱验证
	$("#email").blur(function(){
			var email=$("#email").val();
			var reg= /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			var res=reg.test(email);
			if(email==""){
					$("#s-email").html("");
			}else if(res==true){
					$("#s-email").html("");
			}else{
					$("#s-email").html("邮箱格式不对");	
			}
		});
	//手机号验证
	$("#phone").blur(function(){
			var phone=$("#phone").val();
			var reg= /[0-9]{11}/;
			var res=reg.test(phone);
			if(phone==""){
					$("#s-phone").html("");
			}else if(res==true){
					$("#s-phone").html("");
			}else{
					$("#s-phone").html("格式不对");	
			}
		});
	//注册按钮验证
	$("#submit").click(function(e){
		e.preventDefault();
		var uname=$("#uname").val().trim();
		var upwd=$("#upwd").val().trim();
		var cpwd=$("#cpwd").val().trim();
		var email=$("#email").val().trim();
		var phone=$("#phone").val().trim();console.log(phone);
		if(uname!=""&&upwd!=""&&cpwd!=""&&email!=""&&phone!=""){
			$.ajax({
				type:"post",
				url:"http://www.codeboy.com/pro/JD/js/data/users/register.php",
				dataType:"json",
				data:{uname,upwd,email,phone},
				success:function(data){
					if(data.code==1)
						alert(data.msg);
						location.href="http://www.codeboy.com/pro/JD/js/login.html";
				},
				error:function(){
					alert("网络故障");
				}
			})
		}else{
			alert("请将信息补充完整！");
		}
	})
});