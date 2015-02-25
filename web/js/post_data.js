function post_data(){
	//var T_EC_Apply = {}
	
	//应聘者姓名
	//T_EC_Apply["EmpName"] = $("#EmpName").val();
	
    
var T_EC_EmpDetail = {};//人员明细表----------------------------------------------
	
	
	T_EC_EmpDetail["EnglishName"] = $("#EnglishName").val();         //英文名
	T_EC_EmpDetail["Gender"] = $("#Gender").val();                   //性别
	T_EC_EmpDetail["Nation"] = $("#Nation").val();                   //民族
	T_EC_EmpDetail["Religion"] = $("#Religion").val();               //宗教
	T_EC_EmpDetail["Birthday"] = $("#Birthday").val();               //生日
	
	T_EC_EmpDetail["HukouLocation"] = $("#HukouLocation").val();     //户口
	T_EC_EmpDetail["IdCardNo"] = $("#IdCardNo").val();               //身份证号
	T_EC_EmpDetail["PassportNo"] = $("#PassportNo").val();           //护照号码
	
	T_EC_EmpDetail["Provience"] = $("#Provience").val();             //出生省份
	T_EC_EmpDetail["MarriageDate"] = $("#MarriageDate").val();       //结婚日期
	T_EC_EmpDetail["ChildNo"] = $("#ChildNo").val();      			 //子女数量	
	T_EC_EmpDetail["Email"] = $("#Email").val();      				 //Email 
	T_EC_EmpDetail["ZipCode"] = $("#ZipCode").val();      			 //邮政编码 
	
	T_EC_EmpDetail["FirstWorkDate"] = $("#FirstWorkDate").val();     //参加工作时间
	T_EC_EmpDetail["Phone"] = $("#Phone").val();                     //移动电话
	T_EC_EmpDetail["LCountryCode"] = $("#LCountryCode").val();       //居住国家
	T_EC_EmpDetail["LProvince"] = $("#LProvince").val();             //居住省份
	T_EC_EmpDetail["LCityArea"] = $("#LCityArea").val();             //居住城市
	T_EC_EmpDetail["LDetailAddress"] = $("#LDetailAddress").val();   //详细居住地址
	T_EC_EmpDetail["EduEndDate"] = $("#EduEndDate").val();           //毕业日期
	T_EC_EmpDetail["GCNo"] = $("#GCNo").val();                       //毕业证书编号
	T_EC_EmpDetail["GCOrg"] = $("#GCOrg").val();                     //毕业证书发证机关
	T_EC_EmpDetail["FirstDegree"] = $("#FirstDegree").val();         //第一学位
	T_EC_EmpDetail["DCNo"] = $("#DCNo").val();                       //学位证书编号
	T_EC_EmpDetail["DCOrg"] = $("#DCOrg").val();                     //学位证书发证机关
	T_EC_EmpDetail["FirstMajor"] = $("#FirstMajor").val();           //第一专业
	T_EC_EmpDetail["SecondMajor"] = $("#SecondMajor").val();         //第二专业
	T_EC_EmpDetail["SecondDegree"] = $("#SecondDegree").val();       //第二学位
	T_EC_EmpDetail["HighDegree"] = $("#HighDegree").val();           //最高学历
	
	
	T_EC_EmpDetail["FFName"] = $("#FFName").val();                     //家一名字
	T_EC_EmpDetail["FFBirthday"] = $("#FFBirthday").val();           //
	T_EC_EmpDetail["FFJob"] = $("#FFJob").val();           //
	T_EC_EmpDetail["FFDetailAddress"] = $("#FFDetailAddress").val();         //
	T_EC_EmpDetail["FFPhone"] = $("#FFPhone").val();       //
	T_EC_EmpDetail["FFCityArea"] = $("#FFCityArea").val();       //
	T_EC_EmpDetail["FFHaierBU"] = $("#FFHaierBU").val();           //

	
	
    
var T_EC_EntryEmpInfo = {};//导入信息补充表---------------------------------------------
	
	
	T_EC_EntryEmpInfo["UsedName"] = $("#UsedName").val();            //曾用名
	T_EC_EntryEmpInfo["HealthStatus"] = $("#HealthStatus").val();    //健康状况
	T_EC_EntryEmpInfo["Award"] = $("#Award").val();                  //奖励
	T_EC_EntryEmpInfo["Punishment"] = $("#Punishment").val();        //处分
	T_EC_EntryEmpInfo["SpeSkill"] = $("#SpeSkill").val();        	//特长
	

var T_EC_EntryEmpInfoExtra = {};//个人信息拓展表---------------------------------------------	
	T_EC_EntryEmpInfoExtra["ProfessionQualification"] = $("#ProfessionQualification").val();            //专业技术职务任职资格
	T_EC_EntryEmpInfoExtra["ProfessionAwardDate"] = $("#ProfessionAwardDate").val();          		  //专业技术职务任职资格
	
	
	var data = {}
//	data["T_EC_Apply"] = T_EC_Apply; 主表只限于查询
	data["T_EC_EmpDetail"] = T_EC_EmpDetail;
	data["T_EC_EntryEmpInfo"] = T_EC_EntryEmpInfo;
	data["T_EC_EntryEmpInfoExtra"] = T_EC_EntryEmpInfoExtra;
	var msg = {}
	msg["cmd"] = "insert_data";
	msg["data"] = data;
	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
		alert("数据已保存成功！");
	});
}

function check_login () {
	var T_EC_EmpDetail = {}
	T_EC_EmpDetail["IDCardNo"] = $("#IDCardNo").val();

	var data = {}
	data["T_EC_EmpDetail"] = T_EC_EmpDetail;

	var msg = {}
	msg["cmd"] = "check_login";
	msg["data"] = data;

	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
		 //alert("Data: " + data + "\nStatus: " + status);
		if(data == "false" ||data == "null" ){
			alert("身份证号无效!");
		}else{
			window.location.href="./index.html";
		}
	});
}

function show_data(data){
var table;
	console.log(data)
	//---------------------------------------------------------------------------

	//---------------------------------------------------------------------------
	if(table = data["T_EC_EmpDetail"]){
		$("#EmpName").val(table["EmpName"]);		//应聘者姓名
		$("#name_head").text(table["EmpName"]);		//应聘者姓名
		$("#EnglishName").val(table["EnglishName"]);		//英文名
		$("#Gender").val(table["Gender"]);					//性别
		$("#Nation").val(table["Nation"]);					//民族
		$("#Religion").val(table["Religion"]);				//宗教
		$("#Birthday").val(table["Birthday"]);	
		$("#HukouLocation").val(table["HukouLocation"]);	//户口
		$("#IdCardNo").val(table["IdCardNo"]);	            //身份证号
		$("#PassportNo").val(table["PassportNo"]);	        //护照号码
		$("#Provience").val(table["Provience"]);	        //出生省份
		
		$("#MarriageDate").val(table["MarriageDate"]);	
		$("#ChildNo").val(table["ChildNo"]);	        
		$("#Email").val(table["Email"]);	        	
		$("#ZipCode").val(table["ZipCode"]);	        
		

		$("#FirstWorkDate").val(table["FirstWorkDate"]);	//参加工作时间
		$("#Phone").val(table["Phone"]);	                //移动电话
		$("#LCountryCode").val(table["LCountryCode"]);	    //居住国家
		$("#LProvince").val(table["LProvince"]);	        //居住省份
		$("#LCityArea").val(table["LCityArea"]);	        //居住城市
		$("#LDetailAddress").val(table["LDetailAddress"]);	//详细居住地址
		$("#EduEndDate").val(table["EduEndDate"]);	        //毕业日期
		$("#GCNo").val(table["GCNo"]);	                    //毕业证书编号
		$("#GCOrg").val(table["GCOrg"]);	                //毕业证书发证机关
		$("#FirstDegree").val(table["FirstDegree"]);	    //第一学位
		$("#DCNo").val(table["DCNo"]);	                    //学位证书编号
		$("#DCOrg").val(table["DCOrg"]);	                //学位证书发证机关
		$("#FirstMajor").val(table["FirstMajor"]);	        //第一专业
		$("#SecondMajor").val(table["SecondMajor"]);	    //第二专业
		$("#SecondDegree").val(table["SecondDegree"]);	    //第二学位
		$("#HighDegree").val(table["HighDegree"]);	        //最高学历
		
		$("#FFName").val(table["FFName"]);	                    //
		$("#FFBirthday").val(table["FFBirthday"]);	                //
		$("#FFJob").val(table["FFJob"]);	        //
		$("#FFDetailAddress").val(table["FFDetailAddress"]);	    //
		$("#FFPhone").val(table["FFPhone"]);	    //
		$("#FFCityArea").val(table["FFCityArea"]);	        //
		$("#FFHaierBU").val(table["FFHaierBU"]);	        //
	}
	//---------------------------------------------------------------------------
	if(table = data["T_EC_EntryEmpInfo"]){
		$("#UsedName").val(table["UsedName"]);			        //曾用名
		$("#HealthStatus").val(table["HealthStatus"]);			//健康状况
		$("#Award").val(table["Award"]);			            //奖励
		$("#Punishment").val(table["Punishment"]);			    //处分
		$("#SpeSkill").val(table["SpeSkill"]);			  		  //特长
		}
	//------------------------------------------------------------------------------
	if(table = data["T_EC_EntryEmpInfoExtra"]){	

		$("#ProfessionQualification").val(table["ProfessionQualification"]);			  //专业技术职务任职资格
		$("#ProfessionAwardDate").val(table["ProfessionAwardDate"]);			  		  //专业技术职务任职资格
	}

		
	//...set html val by sql data
}

function pull_data () {
	var msg = {}
	msg["cmd"] = "pull_data";

	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
	//	 alert("Data: " + data + "\nStatus: " + status);
		show_data(JSON.parse(data));
	});
}

function pull_image() {
	var msg = {}
	msg["cmd"] = "pull_image";

	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
		alert("数据已保存成功！");
	});
}
		// 邮件发送
function send_email() {
	var msg = {}
	msg["cmd"] = "send_mail";
	//解析参数处理
	var arrayObj = new Array();
	arrayObj=$("#send_input").val().split("@");
/*	if(arrayObj.length!=2){
		alert("格式错误！");
		return;
	}
	$.post("../data.php",JSON.stringify(msg),
	function(arrayObj[0],"smtp."+arrayObj[1]){
		alert("邮件已发送成功！");
	});*/
}

function post_image(){

	//判断是否有选择上传文件
	// var imgPath = $("#uploadFile").val();
	// if (imgPath == "") {
	//     alert("请选择上传图片！");
	//     return;
	// }
	// //判断上传文件的后缀名
	// var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
	// if (strExtension != 'jpg' && strExtension != 'gif'
	// && strExtension != 'png' && strExtension != 'bmp') {
	//     alert("请选择图片文件");
	//     return;
	// }
	// $.ajax({
	//     type: "POST",
	//     url: "handler/UploadImageHandler.ashx",
	//     data: { imgPath: $("#uploadFile").val() },
	//     cache: false,
	//     success: function(data) {
	//         alert("上传成功");
	//         // $("#imgDiv").empty();
	//         // $("#imgDiv").html(data);
	//         // $("#imgDiv").show();
	//     },
	//     error: function(XMLHttpRequest, textStatus, errorThrown) {
	//         alert("上传失败，请检查网络后重试");
	//     }
	// });


}


