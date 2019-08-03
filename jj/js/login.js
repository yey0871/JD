$(()=>{
	$(":button").click(function(){
		$.ajax({
			type:"post",
			url:"http://www.codeboy.com/pro/JD/js/data/users/signin.php",
			data:$("form").serialize(),
			success:function(result){
				if(result.ok==0)
					alert("用户名或密码不正确!");
				else{
					alert("登录成功!");
					if(location.search!==""){
						var back=location.search.slice(6)
						location.href=back;
					}else{
						location.href="http://www.codeboy.com/pro/JD/js/index.html";
					}
						
				}
			}
		})
	})
})
		
/*选项卡*/
window.onload = function(){
            var arr = document.getElementsByTagName('p');
            for(var i = 0;i<arr.length;i++){
                arr[i].onclick = function(){
                    if (this.id == '1' )
                    {
                        document.getElementById("box1").style.display = 'block' ;
                        document.getElementById("box2").style.display = 'none' ;
												document.getElementById("1").style.color = 'red' ;
												document.getElementById("2").style.color = '#666666' ;
                    }
                    else 
                    {
                        document.getElementById("box1").style.display = 'none' ;
                        document.getElementById("box2").style.display = 'block' ;
												document.getElementById("2").style.color = 'red' ;
												document.getElementById("1").style.color = '#666666' ;
                    }
										//this是当前激活的按钮，在这里可以写对应的操作
                    if(this.className == 'btn1'){
                        this.className = 'btn2';
                        var name = this.id;
                        var btn = document.getElementsByClassName('btn2');
                        for(var j=0;j<btn.length;j++){
                            if(btn[j].id!=name){
                                btn[j].className = 'btn1';
                            }
                        }
                    }
                }
            }
        }