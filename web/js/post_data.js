function post_data(){
	var T_EC_EntryEmpInfo = {}
	T_EC_EntryEmpInfo["EmpName"] = $("#EmpName").val();

	var T_EC_EntryInfo = {}
	T_EC_EntryInfo["EmpName"] = $("#EmpName").val();

	var data = {}
	data["T_EC_EntryEmpInfo"] = T_EC_EntryEmpInfo;
	data["T_EC_EntryInfo"] = T_EC_EntryInfo;

	var msg = {}
	msg["cmd"] = "insert_data";
	msg["data"] = data;

	$.post("data.php",msg,
	function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
	});
}

function login_check () {
	var T_EC_EmpDetail = {}
	T_EC_EmpDetail["IDCardNo"] = $("#IDCardNo").val();

	var data = {}
	data["T_EC_EmpDetail"] = T_EC_EmpDetail;

	var msg = {}
	msg["cmd"] = "check_login";
	msg["data"] = data;

	$.post("data.php",msg,
	function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
	});
}

function show_data(data){
	var table;
	if(table = data["T_EC_EntryEmpInfo"]){
		$("#EmpName").val(table["EmpName"]);
	}
	//...set html val by sql data
}

function pull_data () {
	var msg = {}
	msg["cmd"] = "pull_data";

	$.post("data.php",msg,
	function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
		show_data(data);
	});
}

function pull_image() {
	var msg = {}
	msg["cmd"] = "pull_image";

	$.post("data.php",msg,
	function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
	});
}


function post_image(){

}