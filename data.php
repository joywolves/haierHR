<?php

/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */

require_once './common/DB.php';
require_once './common/config.php';
require_once("Mail.php");

$json_data = file_get_contents("php://input");

$data = json_decode($json_data,true);

function output($arr = array()) {    return eval('return ' . iconv('GB2312', 'UTF-8', var_export($arr, true)) . ';');}
function input($arr = array()) {    return eval('return ' . iconv('UTF-8', 'GB2312',  var_export($arr, true)) . ';');}

function is_assoc ($arr) {
    return (is_array($arr) && count(array_filter(array_keys($arr),'is_string')) == count($arr));
}

function check_login($code)
{
	$db = DB::getInstance();
	//导入人员明细
	$T_EC_Resume = array();
	$T_EC_Resume["IDCardNo"] = $code;

	$ret = $db->find(DB_NAME,"T_EC_Resume",array("*"),$T_EC_Resume);
	if(!is_array($ret) || !sizeof($ret) ){
		return false;
	}
	$one = end($ret);
	$ResumeID = $one["ResumeID"];
	$T_EC_Apply = array();
	$T_EC_Apply["ResumeID"] = $ResumeID;
	$ret = $db->find(DB_NAME,"T_EC_Apply",array("*"),$T_EC_Apply);
	if(!is_array($ret) || !sizeof($ret) ){
		return false;
	}
	$one = end($ret);
	// record Primary_key in cookie
	setcookie("ApplyID",$one["ApplyID"]);
	return $one;
}
function pull_data()
{
	global  $TABLE_KEY;
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
	$db = DB::getInstance();
	$datas = array();
	foreach ($TABLE_KEY as $table => $key) {
		if($table == "T_EC_EntryPhoto"){
			continue;
		}
		$cond = array(
			$key => $_COOKIE["ApplyID"],
		);
		$ret = $db->find(DB_NAME,$table,array("*"),$cond);
		if(is_array($ret) && sizeof($ret) >= 1){
			$one = end($ret);
			$datas[$table] = $one;
		}
	}
	return $datas;
}
function pull_image()
{
	global  $TABLE_KEY;
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
	$db = DB::getInstance();
	$table = "T_EC_EntryPhoto";
	$key = $TABLE_KEY[$table];
	$cond = array(
		$key => $_COOKIE["ApplyID"],
	);
	$ret = $db->find(DB_NAME,$table,array("*"),$cond);
	if(is_array($ret) && sizeof($ret) >= 1){
		$one = end($ret);
		return $one;
	}
	return null;
}
//not test yet
function insert_image($data){
	global  $TABLE_KEY;
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
	$db = DB::getInstance();
    $filename = $_FILES["file"]["name"];
    $tmp_filename = $_FILES["file"]["tmp_name"];
    $datastring = implode('', file ($tmp_filename));
    $data = unpack("H*hex", $datastring);
    $EmpPhoto = "0x".$data['hex'];

    $table = "T_EC_EntryPhoto";
    $fields = $data[$table];
    $fields["ImgContent"] = $EmpPhoto;
	$key = $TABLE_KEY[$table];
	$cond = array(
		$key => $_COOKIE["ApplyID"],
	);
	$fields[$key] = $_COOKIE["ApplyID"];
    $ret = $db->update(DB_NAME,$table,$fields,$cond,true);

    return $ret;
}

function insert_data($data){
	global  $TABLE_KEY;
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
	$db = DB::getInstance();

	// shoud like this
	foreach ($data as $table => $fields) {
		$key = $TABLE_KEY[$table];
		$cond = array(
			$key => $_COOKIE["ApplyID"],
		);
		$fields[$key] = $_COOKIE["ApplyID"];
		$ret = $db->update(DB_NAME,$table,input($fields),$cond,true);
	}
	return true;
}

error_log( ">>> : ".var_export($data, true)."\n", 3, "/var/tmp/my-errors.log");

$ret = null;
switch ($data["cmd"]) {
	case 'check_login':
		$ret = check_login($data["data"]);
		break;
	case 'pull_data':
		$ret = pull_data();
		break;
	case 'pull_image':
		$ret = pull_image();
		break;
	case 'insert_image':
		$ret = insert_image($data["data"]);
		break;
	case 'insert_data':
		$ret = insert_data($data["data"]);
		break;
    case 'send_mail':
		$mailer = Mail::factory('smtp',array('host' => MAIL_HOST, 'port' => MAIL_PORT, 'username' => MAIL_USER, 'password' => MAIL_PASSWORD,'auth' => true));
		$ret = $mailer->send($data["to"],array('From' => MAIL_FROM, 'To' => $data["to"], 'Subject' => MAIL_SUBJECT, 'Content-Type' => 'text/html; charset="UTF-8"'),str_replace('{name}', $data["name"], MAIL_TEMPLATE));
		if(PEAR::isError($ret)){
			die($ret->getMessage() . "\n");
		}
		echo json_encode(($ret)); 
		return;
	default:
		echo "Error command:".$data["cmd"];
		return;
	
}

echo json_encode(output($ret));
error_log( "<<< : ".var_export($ret, true)."\n\n", 3, "/var/tmp/my-errors.log");
