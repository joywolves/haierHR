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
	var data = {}
	var msg = {}
	msg["cmd"] = "check_repeat";
	msg["data"] = data;
	$.post("data.php",msg,
	function(data,status){
		alert("Data: " + data + "\nStatus: " + status);
	});
}

function pull_data (argument) {
	// body...
}