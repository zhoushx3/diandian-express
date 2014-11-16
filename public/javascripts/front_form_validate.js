(function() {
	var correct = true;
	var form = $(".formSubmit");
	form.submit(function(e) {
		correct = true;
		$('.formWarning').hide();
		hasNull(e);
		validate(e);
		$('.formWarning').css('color', 'red').css('font-size', '12px');
	});
	// function
	function hasNull(e) {
		for (var x = 0; x < 15; ++x)
			if (isNull($(e.target).find('input[type="text"]').eq(x).val())) {
				correct = false;
				$(e.target).find('input[type="text"]').eq(x).after('<span class="formWarning"> * </span>');
			}
	}

	function validate(e) {
		var $userName = $(e.target).find('#username'); // 注册用户名
		var $email = $(e.target).find('#email');                // 注册  邮箱
		var $password = $(e.target).find('#signup-password');   // 注册  密码
		var $repeat_password = $(e.target).find('#signup-password-repeat');  // 重复  密码
		var $name = $(e.target).find('#name');   // 姓名
		var $nation = $(e.target).find('#nation');  // 民族
		var $birth_year = $(e.target).find('#birth-year'); // 出生年
		var $birth_month = $(e.target).find('#birth-month'); // 出生月
		var $ID_card = $(e.target).find('#ID-cardNo');  // 身份证号
		var $age = $(e.target).find('#age');  // 年龄
		var $cellphone = $(e.target).find('#cellphone'); // 手机
		var $phone = $(e.target).find('#phone'); // 电话号码
		var $postcode = $(e.target).find('#postcode');  // 邮政编码
		var $QQ = $(e.target).find('#QQ'); // QQ
		if ($userName.length !== 0 && (isNull($userName.val()) || !isChinaOrNumbOrLett($userName.val()))) {
			correct = false;
			$userName.after('<span class="formWarning"> 只能由汉字、字母、数字组成 </span>');
		}

		if ($email.length !== 0  && (isNull($email.val()) || !isEmail($email.val()))) {
			correct = false;
			$email.after('<span class="formWarning"> 必须是合法邮箱 </span>');
		}
		
		if ($password.length !== 0  && (isNull($password.val()) || !isLengthMathc($password.val(), 6, 12))) {
			correct = false;
			$password.after('<span class="formWarning"> 密码长度 6 - 12 位 </span>');
		}

		if ($repeat_password.length !== 0  && isNull($repeat_password .val())) {
			correct = false;
			$repeat_password.after('<span class="formWarning"> 两次密码输入不同 </span>');
		}

		if ($name.length !== 0  && (isNull($name.val()) || !isChina($name.val()))) {
			correct = false;
			$name.after('<span class="formWarning"> 只能由汉字组成 </span>');
		}

		if ($nation.length !== 0 && (isNull($nation.val()) || !nation($nation.val()))) {
			correct = false;
			$nation.after('<span class="formWarning"> 中文, 中华56民族 </span>');
		}

		if($birth_year.length !== 0  && !isNumber($birth_year.val())) {
			correct = false;
			$birth_year.after('<span class="formWarning"> 不合理 </span>');
		}

		if($birth_month.length !== 0  && !isNumber($birth_month.val())) {
			correct = false;
			$birth_month.after('<span class="formWarning"> 不合理 </span>');
		}

		if($ID_card.length !== 0  && !IdCardRegCheck($ID_card.val())) {
			correct = false;
			$ID_card.after('<span class="formWarning"> 不合理 </span>');
		}

		if($age.length !== 0  && !isNumber($age.val())) {
			correct = false;
			$age.after('<span class="formWarning"> 必须是数字 </span>');
		}

		if($cellphone.length !== 0  && !checkMobile($cellphone.val())) {
			correct = false;
			$cellphone.after('<span class="formWarning"> 不合理手机号码 </span>');
		}

		if($phone.length !== 0  && !checkPhone($phone.val())) {
			correct = false;
			$phone.after('<span class="formWarning"> 不合理电话号码 </span>');
		}

		if($postcode.length !== 0  && !isZip($postcode.val())) {
			correct = false;
			$postcode.after('<span class="formWarning"> 不是正确的邮政编码 </span>');
		}

		if($QQ.length !== 0  && !isQQ($QQ.val())) {
			correct = false;
			$QQ.after('<span class="formWarning"> 不正确的QQ号码 </span>');
		}
		if (!correct) e.preventDefault();
	}
/*
用途：检查输入字符串是否为空或者全部都是空格
如果全是空返回true,否则返回false
*/
	function isNull( str ) {
		if ( str === "" ) return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	}
/*
用途：检查输入对象的值是否符合E-Mail格式
如果通过验证返回true,否则返回false
*/
	function isEmail( str ){ 
		var myReg = /^[-_A-Za-z0-9]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
		if(myReg.test(str)) return true;
		return false;
	}
/*
用途：检查输入字符串是否只由汉字、字母、数字组成
如果通过验证返回true,否则返回false
*/
	function isChinaOrNumbOrLett( s ){//判断是否是汉字组成
		var regu = "^[0-9A-Za-z\u4e00-\u9fa5]+$";  
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		}else{
			return false;
		}
	}
/*
用途：检查输入字符串是否只由汉字、字母、数字组成
如果通过验证返回true,否则返回false
*/
	function isChina( s ){//判断是否是汉字组成
		var regu = "^[\u4e00-\u9fa5]+$";  
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		}else{
			return false;
		}
	}
/*
判断长度是否符合要求
符合则返回true
*/
	function isLengthMathc(s, l1, l2) {
		if (!s) return false;
		if (s.length <  l1 || s.length > l2)
			return false;
		return true;
	}

/*
用途：检查输入手机号码是否正确
如果通过验证返回true,否则返回false
*/
	function checkMobile( s ){  
		if (!s) return false;
		var regu =/^[1][3,5][0-9]{9}$/;
		var re = new RegExp(regu);
		if (re.test(s)) {
			return true;
		} else {
			return false;
		}
	}
/*
用途：判断是否属于56民族,
如果是则返回true
*/
	var nations = ['汉族', '壮族', '满族', '回族', '苗族', '维吾尔族', '土家族' ,'彝族' ,'蒙古族','藏族', '布依族', '侗族', '瑶族', '朝鲜族', '白族', '哈尼族', '哈萨克族', '黎族', '傣族', '畲族', '傈僳族', '仡佬族', '东乡族', '高山族', '拉祜族', '水族', '佤族', '纳西族', '羌族', '土族', '仫佬族', '锡伯族', '柯尔克孜族', '达斡尔族', '景颇族', '毛南族', '撒拉族', '布朗族', '塔吉克族', '阿昌族', '普米族', '鄂温克族', '怒族', '京族', '基诺族', '德昂族', '保安族', '俄罗斯族', '裕固族', '乌兹别克族', '门巴族', '鄂伦春族', '独龙族', '塔塔尔族', '赫哲族', '珞巴族'];
	function nation(s) {
		if (!s) return false;
		for (var i = 0; i < 56; ++i)
			if (s.split('族')[0]+'族' === nations[i])
				break;
		if (i !== 56)
			return true;
		return false;
	}
/*
用途：检查输入字符串是否符合正整数格式
如果通过验证返回true,否则返回false
*/
	function isNumber( s ){  
		var regu = "^[0-9]+$";
		var re = new RegExp(regu);
		if (s.search(re) != -1) {
			return true;
		} else {
			return false;
		}
	} 
/*
用途：检查身份证号
如果通过验证返回true,否则返回false
*/
	function IdCardRegCheck(s)
	{
		if (!s) return false;
		var reg = /^([0-9]{15}|[0-9]{18})$/;
		var flag = reg.test(s);
		return flag;
	}
/*
用途：检查输入的电话号码格式是否正确
如果通过验证返回true,否则返回false
*/
	function checkPhone( strPhone ) {
		if (!strPhone) return false;
		var phoneRegWithArea = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
		var phoneRegNoArea = /^[1-9]{1}[0-9]{5,8}$/;
		if( strPhone.length > 9 ) {
			if( phoneRegWithArea.test(strPhone) ){
				return true;
			} else {
				return false;
			}
		} else {
			if( phoneRegNoArea.test( strPhone ) ){
				return true;
			} else {
				return false;
			} 
		}
	}
/*
用途：验证邮政编码的有效性
如果通过验证返回true,否则返回false
*/
	function isZip( s ){  
		if (!s) return false;
	    var pattern =  /^[1-9]\d{5}$/;  
	    if(!(pattern.test(s))){  
	        return false;  
	    }  
	    else return true;  
	} 
/*
用途：验证QQ的有效性
如果通过验证返回true,否则返回false
*/
	function isQQ( s )
	{
		if (!s) return false;
		var reg = /^[1-9]\d{4,9}$/; 
		return reg.test(s);
	}
})();