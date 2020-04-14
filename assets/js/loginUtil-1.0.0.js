function Login(account,password,yzm){
    this.account = account;
    this.password = password;
    // this.idf = idf;
    this.yzm = yzm;
    this.msgMap = {
       account:"请输入帐号",
       password:"请输入密码",
       acctWrong:"账户输入错误",
       pwWrong:"密码输入错误",
       yzmEmpty:"请输入验证码",
       yzmWrong:"验证码输入错误"
    };
}

Login.prototype = {
    checkAcct : function(){
        if(!this.account.length){
            this.showErr("#msg1",this.msgMap.account);
            return false;
        }
        return true;
    },
    checkPwd : function(){
        if(!this.password.length){
            this.showErr("#msg2",this.msgMap.password);
            return false;
        }
        return true;
    },
    // checkLgIdf : function(){
    //     if(this.idf.length <= 0){
    //         this.showErr(this.msgMap.idfEmpty);
    //         return false;
    //     }
    //     return true;
    // },
    checkLgYzm : function(){
        if(!this.yzm.length){
            this.showErr("#msg3",this.msgMap.yzmEmpty);
            return false;
        }
        return true;
    },
    showErr : function(errMsg){
        alert(errMsg);
    }
};
function showAlert() {
    $("#alert-pop").addClass("slideInDown");
    setTimeout(function(){
        $("#alert-pop").css("visibility","visible").removeClass("slideInDown").addClass("slideInUp");
    },10000)
}
$(function(){
    showAlert()
    var accountName = $.cookie( 'LASTLOGINACCOUNT' );
    var isErrorLogin = false;
    if($("#keepAcctChk")[0].checked){
    	if(accountName!="" && accountName!=null){
            $("#lgActIpt").val(accountName);
        }
    }else{
    	$("#lgActIpt").val('');
    }
    // 登陆提交
    $("#doLoginBtn").click(function(){
        var result = true;
        $_account = $.trim($("#lgActIpt").val()).length ? $.trim($("#lgActIpt").val()) : "";
        $_password = $.trim($("#lgPwdIpt").val());
        // $_idf = $.trim($("#lgIdfIpt").val());
        $_yzm = $.trim($("#mobileyzm").val()).length ? $.trim($("#lgActIpt").val()) : "";
        
        var loginObj = new Login($_account,$_password,$_yzm);
        
        loginObj.showErr = function(id, errMsg){
            $(id).text(errMsg).closest(".form-group").addClass("has-error");
        };
        result = loginObj.checkAcct();
        result = loginObj.checkPwd();
        result = loginObj.checkLgYzm();
        // if(!loginObj.checkAcct()){
        //     return false;
        // }
        // if(!loginObj.checkPwd()){
        //     return false;
        // }
        
        // if($('#errorCount').val()>=3) {
        // 	if(!loginObj.checkLgIdf()){
        //         return false;
        //     }
        // }
        
        // if(!loginObj.checkLgYzm()){
        //     return false;
        // }
        if (result) {
            var host=window.location.hostname;
            if($("#keepAcctChk")[0].checked){
                var acc = $_account;
                $.cookie( 'LASTLOGINACCOUNT', acc, {expires:365,path:"/"});
            }else{
                $.cookie( 'LASTLOGINACCOUNT', "", {path:"/",expires:0});
            }
            
            $("#lgPwdIpt").val(encodepwd($_password));
            
            $("#loginForm")[0].submit();
        }

    });
    
    $("#lgActIpt").focus(function(){
        $(this).closest(".form-group").removeClass("has-error")
    }).keypress(function(){
        // $("#lgActIpt").css("color","#333");
    }).blur(function(){
        // if($.trim($("#lgActIpt").val()) == "请输入帐号"){
        //     $("#lgActIpt").css("color","#BEBEBE");
        // }else if($.trim($("#lgActIpt").val()) == ""){
        //     $("#lgActIpt").val("请输入帐号").css("color","#BEBEBE");
        // }
    });
    
    $("#mobileyzm").focus(function(){
        $(this).closest(".form-group").removeClass("has-error")
    }).keypress(function(){
        // $("#mobileyzm").css("color","#333");
    }).blur(function(){
        // if($.trim($("#mobileyzm").val()) == "请输入短信验证码"){
        //     $("#mobileyzm").css("color","#BEBEBE");
        // }else if($.trim($("#mobileyzm").val()) == ""){
        //     $("#mobileyzm").val("请输入短信验证码").css("color","#BEBEBE");
        // }
    });
    
    // $("#lgPwdIpt_txt").focus(function(){
    //     $("#lgPwdIpt_txt").hide();
    //     $("#lgPwdIpt").show();
    //     $("#lgPwdIpt")[0].focus();
    // });
    $("#lgPwdIpt").focus(function(){
        $(this).closest(".form-group").removeClass("has-error")
    }).blur(function(){
        // if($.trim($("#lgPwdIpt").val()) == ""){
        //     $("#lgPwdIpt").hide();
        //     $("#lgPwdIpt_txt").show().val("请输入密码").css("color","#BEBEBE");
        // }
    });
    // $("#lgIdfIpt").val('');
    
    var timerc=60;
    function minus(){
    	if(timerc==60) {
    		$("#yzmSend").unbind("click");
    		$("#yzmSend").attr('disabled','disabled');
    	}
    	
    	timerc--;
    	$("#yzmSend").html(Number(parseInt(timerc%60/10)).toString()+(timerc%10)+"秒后重新获取");
    	if(timerc<=0){
    		clearTimeout(setT);
    		$("#yzmSend").click(function() {
    			$(this).attr('disabled','disabled');
    			minus();
    		});
    		$("#yzmSend").html("点击获取验证码");
    		$("#yzmSend").removeAttr('disabled');
    		timerc=60;
    		return;
    	}
    	setT = setTimeout(minus, 1000);
    };
    
    // if(!ssoTest) {
	// 	$('#yzmLine').show();
	// }
	
	var errorCount = $('#errorCount').val();
	console.log(errorCount)
	// if(errorCount>=3) {
	// 	$('#identifyLine').show();
	// 	$('#lgIdfCode')[0].src = ctx + '/validateCodeServlet?width=135&height=30&a=' + Math.random();
	// }
	
	// $("#lgIdfCode").click(function(){
	// 	var captchaUrl = ctx + '/validateCodeServlet?width=135&height=30&a=' + Math.random();
 	// 	this.src = captchaUrl;
    // });
	// 回车 提交
	$("#lgIdfIpt").keydown(function(e){
		var curKey = e.which;
		if(curKey == 13){
			$("#doLoginBtn").click();
			return false;
		}
	});
	
	$("#yzmSend").click(function () {
		// $("#errLabel").text('');
		var account = $.trim($("#lgActIpt").val());
		var password = $.trim($("#lgPwdIpt").val());
		
		if(account==='') {
            $("#msg1").text("请输入帐号").closest(".form-group").addClass("has-error");
			return;
		}
		
		if(password==='') {
            $("#msg2").text("请输入密码").closest(".form-group").addClass("has-error");
			return;
		}
		
		// var captcha = $.trim($("#lgIdfIpt").val());
		
		// var errorCount = $('#errorCount').val();
		// errorCount = parseInt(errorCount);
		// if(errorCount>=3) {
		// 	if(captcha=='') {
		// 		$('#errLabel').text('请输入图形验证码');
		// 		return;
		// 	}
		// }
		$.ajax({
			url: "/sendYzm",
			type: "POST",
			cache: false,
			dataType: "json",
			data : {
				"account" : account,
				"password": encodepwd(password),
				"captcha": captcha
			},
			beforeSend: function() {
				$("#loading-mask").show().find(".el-loading-text").text("正在请求中，请稍候...");
			},
			complete: function() {
				$("#loading-mask").hide();
			},
			success: function(result){
				if(result.success) {
					minus();
					// alert(result.msg);
				} else {
					// errorCount++;
					// $('#errorCount').val(errorCount);
					
					// if(errorCount>=3) {
					// 	$('#identifyLine').show();
					// 	$('#lgIdfCode')[0].src = ctx + '/validateCodeServlet?width=135&height=30&a=' + Math.random();
					// }
					
					// alert(result.msg);
				}
			},
			error: function(){
				alert("短信验证码发送失败,请稍后再试!")
			}
		});
	});
});