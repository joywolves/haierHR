/**
 * 日期格式化函数
 */
var familyData = [];

Date.prototype.Format = function(format){ 
	var o = { 
		"M+" : this.getMonth()+1, //month 
		"d+" : this.getDate(), //day 
		"h+" : this.getHours(), //hour 
		"m+" : this.getMinutes(), //minute 
		"s+" : this.getSeconds(), //second 
		"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
		"S" : this.getMilliseconds() //millisecond 
	} 

	if(/(y+)/.test(format)) { 
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 
	
	for(var k in o) { 
		if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
		} 
	} 
	return format; 
} 


function isemail(txtemail)
{    
	var regx=/^\w+([-+.]\w+)*@\w+([-.]\\w+)*\.\w+([-.]\w+)*$/;
	return regx.test(txtemail);
}
function istel(txttel)
{    
	var regx=/^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/;
	return regx.test(txttel);
}
//点击递交按钮是需要全面校验并给出缺陷提示，点击局部保存按钮时只处理对应区域的内容保存处理
function check_post_data(){
	if(get_select("Gender")=="选择性别"){
		  alert("请选择性别！");
		  return false;
		}
		if(get_select("Nation")==""){
		  alert("请选择民族");
		  return false;
		}
	if($("#Birthday").val()==""){
	  alert("生日不能为空！");
	  return false;
	}
	if($("#HealthStatus").val()==""){
	  alert("健康状况不能为空！");
	  return false;
	}
	if(get_select("IsAlone")==""){
	  alert("请选择是否为独生子女");
	  return false;
	}
	if(get_select("Religion")==""){
	  alert("请选择宗教！");
	  return false;
	}
	if(get_select("Provience")==""){
	  alert("请选择出生省份！");
	  return false;
	}
	if($("#HukouLocation").val()==""){
	  alert("户口地址不能为空！");
	  return false;
	}
    if($("#FirstWorkDate").val()==""){
	  alert("首次工作不能为空！");
	  return false;
	}
    
    if($("#Email").val()==""){
	  alert("电子邮箱不能为空！");
	  return false;
	}
	else{
	  if(!isemail($("#Email").val())){
	     alert("电子邮箱的格式不正确！");
		 return false;
	  }
	}
    if($("#Phone").val()==""){
	  alert("移动电话不能为空！");
	  return false;
	}
	else{
	  if(!istel($("#Phone").val())){
	     alert("移动电话的格式不正确！");
		 return false;
	  }
	}
	
	
   //附加个人信息
   	if(get_select("LCountryCode")==""){
	  alert("居住国家不能为空！");
	  return false;
	}
	if(get_select("LProvince")==""){
	  alert("居住省份不能为空！");
	  return false;
	}
   	if(get_select("LCityArea")==""){
	  alert("居住城市不能为空！");
	  return false;
	}
   
   if($("#LDetailAddress").val()==""){
	  alert("居住地址不能为空！");
	  return false;
	}
	if($("#ZipCode").val()==""){
	  alert("邮政编码不能为空！");
	  return false;
	}
	// if(get_select("IsArmy")==""){
	  // alert("请选择是否服过军役");
	  // return false;
	// }
	if($("#PartyShipName").val()==""){
	  alert("请选择政治面貌！");
	  return false;
	}
	
	
	//入党派时间没有ID
	//if($("#").val()==""){
	  //alert("入党派时间不能为空！");
	  //return false;
	//}
	if($("#ProfessionQualification").val()==""){
	  alert("专业技术职务任职资格不能为空！");
	  return false;
	}
	if($("#ProfessionAwardDate").val()==""){
	  alert("授予时间不能为空！");
	  return false;
	}
	if($("#SpeSkill").val()==""){
	  alert("爱好特长不能为空！");
	  return false;
	}
	if($("#Award").val()==""){
	  alert("何时何处何原因受过奖励不能为空！");
	  return false;
	}
	if($("#Punishment").val()==""){
	  alert("何时何处何原因受过处分不能为空！");
	  return false;
	}
	

}
//获取select的值
function get_select(id){
	var select_obj = $("#"+id);
	var select_parent = select_obj.parent("li").children(".select_box");
	//var select_option = select_parent.children(".select_option");
	var select_show = select_parent.children(".select_showbox");
	var obj_child = select_obj.children() ;
	var val_text = select_show.text();
	var count = obj_child.length;	
	for (var i = 0; i<count; i++) {
		//alert(select_obj.get(0).options[i].value);
		if(select_obj.get(0).options[i].text == val_text ){
			return select_obj.get(0).options[i].value;
		}
	}
	return ;
}
//设置select的值中的特殊处理
function set_select_special(id,val) {
	//婚姻状况处理
	if(id == "MarriedType"){
		if(val == 0){	//单身处理,隐藏结婚日期和子女数量
			$("#MarriageDate").parent("li").addClass("hide");
			$("#ChildNo").parent("li").addClass("hide");
		}else if(val == 2 || val ==3){	//离异 丧偶处理,隐藏子女数量
			$("#MarriageDate").parent("li").addClass("hide");
			$("#ChildNo").parent("li").removeClass("hide");
		}else{
			$("#MarriageDate").parent("li").removeClass("hide");
			$("#ChildNo").parent("li").removeClass("hide");
		}
	}
	if(id == "Party"){
		if(val == 13){	//入党时间处理
			$("#JoinPartyDate").parent("li").addClass("hide");
			
		}else{
			$("#JoinPartyDate").parent("li").removeClass("hide");
			
		}
	}
	if(id == "SchoolForms"){
		if(val == 01|| val ==02|| val ==03){	//学历专业处理
			$("#Specialty").parent("li").addClass("hide");
			
		}else{
			$("#Specialty").parent("li").removeClass("hide");
			
		}
	}
	if(id == "SchoolForms"){
		if(val == 01){	//档案处理
			$("#Specialty").parent("li").addClass("hide");
			
		}else{
			$("#Specialty").parent("li").removeClass("hide");
			
		}
	}
}
//设置sect的值
function set_select (id,val) {
	if(!val || val == ""){
		return;
	}
	var select_obj = $("#"+id);
	var select_parent = select_obj.parent("li").children(".select_box");
	var select_option = select_parent.children(".select_option");
	var select_show = select_parent.children(".select_showbox");
	var obj_child = select_obj.children() ;
	var val_text = select_show.text;
	//设置select_showbox的值
	var count = obj_child.length;	
	for (var i = 0; i<count; i++) {
		//alert(select_obj.get(0).options[i].value);
		if(select_obj.get(0).options[i].value == val.toString() ){
			select_show.text(select_obj.get(0).options[i].text);
			//alert(select_show.text());
			//缺少select_option的设置	
			break;
		}
	}
}



//递交信息处理
function post_data_all(){
	//校验所有数据
	if(!check_post_data()){
		return;
	}
	//递交数据
	post_data();
}

//局部递交
function saveItem1(){
	//无需校验直接保存数据，暂时只提供整体保存方案
	post_data();
	//同步处理信息状态，是都已完善
}
//局部递交
function saveItem2(){
	//无需校验直接保存数据，暂时只提供整体保存方案
	post_data();
	//同步处理信息状态，是都已完善
}
//局部递交
function saveItem3(){
	//无需校验直接保存数据，暂时只提供整体保存方案
	post_data();
	//同步处理信息状态，是都已完善
}
//局部递交
function saveItem4(){
	//无需校验直接保存数据，暂时只提供整体保存方案
	post_data();
	//同步处理信息状态，是都已完善
}
//局部递交
function saveItem5(){
	//无需校验直接保存数据，暂时只提供整体保存方案
	post_data();
	//同步处理信息状态，是都已完善
}


function post_data(){

	//var T_EC_Apply = {}
	
	//应聘者姓名
	//T_EC_Apply["EmpName"] = $("#EmpName").val();
	
    
	var T_EC_EmpDetail = {};//人员明细表----------------------------------------------
	
	
	T_EC_EmpDetail["EnglishName"] = $("#EnglishName").val();         //英文名
	T_EC_EmpDetail["Gender"] = $("#Gender").val();                    //性别
	T_EC_EmpDetail["Nation"] = get_select("Nation"); 
	//民族
	T_EC_EmpDetail["CitizenShip"] = get_select("CitizenShip");         //国籍
	T_EC_EmpDetail["Religion"] = get_select("Religion");               //宗教
	T_EC_EmpDetail["Birthday"] = $("#Birthday").val();               //生日
	T_EC_EmpDetail["IsAlone"] = get_select("IsAlone");               //独生子女
	T_EC_EmpDetail["HukouLocation"] = $("#HukouLocation").val();     //户口
	T_EC_EmpDetail["IdCardNo"] = $("#IdCardNo").val();               //身份证号
	T_EC_EmpDetail["PassportNo"] = $("#PassportNo").val();           //护照号码	
	T_EC_EmpDetail["MarriedType"] = get_select("MarriedType");          //婚姻状况
	T_EC_EmpDetail["Provience"] = get_select("Provience");             //出生省份
	T_EC_EmpDetail["MarriageDate"] = $("#MarriageDate").val();       //结婚日期
	T_EC_EmpDetail["ChildNo"] = $("#ChildNo").val();      			 //子女数量	
	T_EC_EmpDetail["Email"] = $("#Email").val();      				 //Email 
	// T_EC_EmpDetail["ZipCode"] = $("#ZipCode").val();      			 //邮政编码 
	
	T_EC_EmpDetail["FirstWorkDate"] = $("#FirstWorkDate").val();     //参加工作时间
	T_EC_EmpDetail["Phone"] = $("#Phone").val();                     //移动电话
	T_EC_EmpDetail["LCountryCode"] = get_select("LCountryCode");        //居住国家
	T_EC_EmpDetail["LProvince"] = get_select("LProvince");             //居住省份
	T_EC_EmpDetail["LCityArea"] = get_select("LCityArea");             //居住城市
	T_EC_EmpDetail["IsArmy"] = get_select("IsArmy");             //服军役
	T_EC_EmpDetail["LDetailAddress"] = $("#LDetailAddress").val();   //详细居住地址
	T_EC_EmpDetail["Party"] = get_select("Party");             //政治面貌
	T_EC_EmpDetail["JoinPartyDate"] = $("#JoinPartyDate").val();                 //加入党派时间
	T_EC_EmpDetail["EducationType"] = get_select("EducationType");             //学历
	T_EC_EmpDetail["EduEndDate"] = $("#EduEndDate").val();           //毕业日期
	T_EC_EmpDetail["GCNo"] = $("#GCNo").val();                       //毕业证书编号
	T_EC_EmpDetail["GCOrg"] = $("#GCOrg").val();                     //毕业证书发证机关
	T_EC_EmpDetail["FirstDegree"] = $("#FirstDegree").val();         //第一学位
	T_EC_EmpDetail["DCNo"] = $("#DCNo").val();                       //学位证书编号
	T_EC_EmpDetail["DCOrg"] = $("#DCOrg").val();                     //学位证书发证机关
	T_EC_EmpDetail["FirstMajor"] = $("#FirstMajor").val();           //第一专业
	T_EC_EmpDetail["SecondMajor"] = $("#SecondMajor").val();         //第二专业
	T_EC_EmpDetail["SecondDegree"] = $("#SecondDegree").val();       //第二学位
	T_EC_EmpDetail["HighDegree"] = get_select("HighDegree");            //最高学历
	
	
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
	
	
var T_EC_Resume = {};//外部简历---------------------------------------------	
//	T_EC_Resume["PartyShipName"] = get_select("PartyShipName");            //政治面貌
	T_EC_Resume["ZipCode"] = $("#ZipCode").val();      			 //邮政编码 
	
	
	
	saveFP();
	var data = {}
//	data["T_EC_Apply"] = T_EC_Apply; 主表只限于查询
	data["T_EC_EmpDetail"] = T_EC_EmpDetail;
	data["T_EC_EntryEmpInfo"] = T_EC_EntryEmpInfo;
	data["T_EC_EntryEmpInfoExtra"] = T_EC_EntryEmpInfoExtra;
	data["T_EC_Resume"] = T_EC_Resume;
	if("undefined" != typeof returnFamilyData){
		data["T_EC_EntrySocialRelation"] = returnFamilyData;
	}
	if("undefined" != typeof returnEducationData){
		data["T_EC_ResumeEducation"] = returnEducationData;
	}
	if("undefined" != typeof returnExperienceData){
		data["T_EC_ResumeExperience"] = returnExperienceData;
	}
	var msg = {}
	msg["cmd"] = "insert_data";
	msg["data"] = data;
	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
		alert("数据已保存成功！");
	});
}

function check_login () {
	// var T_EC_EmpDetail = {}
	// T_EC_EmpDetail["IDCardNo"] = $("#IDCardNo").val();

	// var data = {}
	// data["T_EC_EmpDetail"] = T_EC_EmpDetail;

	var msg = {}
	msg["cmd"] = "check_login";
	msg["data"] = $("#IDCardNo").val();

	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
		 // alert("Data: " + data + "\nStatus: " + status);
		if(data == "false" ||data == "null" ){
			alert("身份证号无效!");
		}else{
			window.location.href="./index.html";
		}
	});
}

function get_date(date){
	if(!date || date.length<20){
		return;
	}
	return (new Date(date.substr(0,20))).Format("yyyy-MM-dd");
}
function show_data(data){
var table;
	console.log(data)
	//---------------------------------------------------------------------------
	alert("data:  "+data);
	//---------------------------------------------------------------------------
	if(table = data["T_EC_EmpDetail"]){
		//set_select("Gender",table["Gender"]);

		if(table["EmpName"]!=""&&table["Birthday"]!=""&&table["HealthStatus"]!=""&&table["HukouLocation"]!=""&&table["IdCardNo"]!=""&&table["FirstWorkDate"]!=""&&table["Email"]!=""&&table["Phone"]!=""){
			document.getElementById('wsid1').style.color='green';
		   document.getElementById("wsid1").innerHTML = "已完善";
		}
		else{
		   document.getElementById("wsid1").innerHTML = "未完善";
		}
		
		
		
		$("#EmpName").val(table["EmpName"]);		//应聘者姓名
		$("#health_name").text(table["EmpName"]);
		$("#rz_name").text(table["EmpName"]);
		$("#name_head").text(table["EmpName"]);		//应聘者姓名
		$("#EnglishName").val(table["EnglishName"]);		//英文名
		$("#Gender").val(table["Gender"]);				//性别
		set_select("Nation",table["Nation"]);				//民族
		set_select("CitizenShip",table["CitizenShip"]);		//国籍
		set_select("IsAlone",table["IsAlone"]);       //独生子女
		set_select("Religion",table["Religion"]);		//宗教
		$("#Birthday").val(get_date(table["Birthday"]));	
		$("#HukouLocation").val(table["HukouLocation"]);	//户口
		$("#IdCardNo").val(table["IdCardNo"]);	            //身份证号
		$("#PassportNo").val(table["PassportNo"]);	        //护照号码
		set_select("MarriedType",table["MarriedType"]);	        //婚姻状况
		set_select("Provience",table["Provience"]);	        //出生省份
		
		
		$("#MarriageDate").val(get_date(table["MarriageDate"]));	
		$("#ChildNo").val(table["ChildNo"]);	        
		$("#Email").val(table["Email"]);	        	      
		
		$("#FirstWorkDate").val(get_date(table["FirstWorkDate"]));	//参加工作时间
		$("#Phone").val(table["Phone"]);	                //移动电话
		
		
		
		//------------------------------附加个人信息--------------------------------------------------
				
		//附加个人信息
        if(table["LDetailAddress"]!=""&&
				table["ZipCode"]!=""&&
				table["ProfessionQualification"]!=""&&
				table["ProfessionAwardDate"]!=""&&
				table["SpeSkill"]!=""&&
				table["Award"]!=""&&
				table["Punishment"]!=""){
		   document.getElementById('wsid2').style.color='green';
		   document.getElementById("wsid2").innerHTML = "已完善";
		}
		else{
		   document.getElementById("wsid2").innerHTML = "未完善";
		}
		
		set_select("LCountryCode",table["LCountryCode"]);    //居住国家
		set_select("LProvince",table["LProvince"]);	        //居住省份
		set_select("LCityArea",table["LCityArea"]);	        //居住城市
		set_select("IsArmy",table["IsArmy"]);	        		//服军役
		$("#EduEndDate").val(get_date(table["EduEndDate"]));	
		$("#LDetailAddress").val(table["LDetailAddress"]);	//详细居住地址
		set_select("Party",table["Party"]);			  //政治面貌
		$("#JoinPartyDate").val(get_date(table["JoinPartyDate"]));	        //加入党派时间		
		set_select("EducationType",table["EducationType"]);	        		//学历

		$("#GCNo").val(table["GCNo"]);	                    //毕业证书编号
		$("#GCOrg").val(table["GCOrg"]);	                //毕业证书发证机关
		$("#FirstDegree").val(table["FirstDegree"]);	    //第一学位
		$("#DCNo").val(table["DCNo"]);	                    //学位证书编号
		$("#DCOrg").val(table["DCOrg"]);	                //学位证书发证机关
		$("#FirstMajor").val(table["FirstMajor"]);	        //第一专业
		$("#SecondMajor").val(table["SecondMajor"]);	    //第二专业
		$("#SecondDegree").val(table["SecondDegree"]);	    //第二学位
		set_select("HighDegree",table["HighDegree"]);	        //最高学历

		
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
	//------------------------------------------------------------------------------
	if(table = data["T_EC_Resume"]){	

		set_select("PartyShipName",table["PartyShipName"]);			  //政治面貌
		$("#ZipCode").val(table["ZipCode"]);				//邮政编码
	}

	if(data["T_EC_EntrySocialRelation"]){
		familyData = data["T_EC_EntrySocialRelation"];
		alert("familyData--?"+JSON.stringify(familyData));
	}
	reView();
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
function Province () {
	var msg = {}
	msg["cmd"] = "Province";

	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
	//	 alert("Data: " + data + "\nStatus: " + status);
	});
}
function City (code) {
	var msg = {}
	msg["cmd"] = "City";
	msg["data"] = code;

	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
	//	 alert("Data: " + data + "\nStatus: " + status);
	});
}
function pull_image() {
	var msg = {}
	msg["cmd"] = "pull_image";

	$.post("../image.php",JSON.stringify(msg),
	function(data,status){
		//	 alert("Data: " + data + "\nStatus: " + status);
		$("#imghead").attr('src',data); 
	});
}
		// 邮件发送
function send_email() {
	// var msg = {}
	// msg["cmd"] = "send_mail";
	// //解析参数处理
	// var arrayObj = new Array();
	// arrayObj=$("#send_input").val().split("@");
/*	if(arrayObj.length!=2){
		alert("格式错误！");
		return;
	}
	$.post("../data.php",JSON.stringify(msg),
	function(arrayObj[0],"smtp."+arrayObj[1]){
		alert("邮件已发送成功！");
	});*/
	var msg = {}
	msg["cmd"] = "send_mail";
	msg["to"] = $("#send_input").val();
	msg["name"] = $("#EmpName").val();
	$.post("../data.php",JSON.stringify(msg),
	function(data,status){
	//	 alert("Data: " + data + "\nStatus: " + status);
		alert("邮件已发送成功！");
	});
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

