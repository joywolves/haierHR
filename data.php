<?php

/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */

require_once './common/DB.php';
require_once './common/config.php';
require_once("Mail.php");
require_once("Mail/mime.php");
require_once 'PhpWord/Autoloader.php';
\PhpOffice\PhpWord\Autoloader::register();

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
	setcookie("ResumeID",$one["ResumeId"]);
	setcookie("IDCardNo",$code);
	
	return $one;
}
function pull_data()
{
	global  $TABLE_KEY;
	global  $TABLE_ONE;
	error_log( "<<< : ".var_export($_COOKIE, true)."\n\n", 3, "/var/tmp/my-errors.log");
	if(!isset($_COOKIE["ApplyID"]) || !isset($_COOKIE["ResumeID"])){
		return false;
	}
	$db = DB::getInstance();
	$datas = array();
	foreach ($TABLE_KEY as $table => $key) {
		if($table == "T_EC_EntryPhoto"){
			continue;
		}
		$cond = array(
			$key => $_COOKIE[$key],
		);
		$ret = $db->find(DB_NAME,$table,array("*"),$cond);
		if(is_array($ret) && sizeof($ret) >= 1){
			if($TABLE_ONE[$table]){
				$one = end($ret);
				$datas[$table] = $one;
			}else{
				$datas[$table] = $ret;
			}
		}
	}
	return $datas;
}


function insert_data($data){
	global  $TABLE_KEY;
	global  $TABLE_ONE;
	global  $TABLE_IDCardNo;
	if(!isset($_COOKIE["ApplyID"]) || !isset($_COOKIE["ResumeID"])){
		return false;
	}
	$db = DB::getInstance();

	// shoud like this
	foreach ($data as $table => $datas) {
		$key = $TABLE_KEY[$table];
		$cond = array(
			$key => $_COOKIE[$key],
		);

		// if(is_assoc($datas)){		
		if($TABLE_ONE[$table]){
			$fields = $datas;
			if($TABLE_IDCardNo[$table]){
				$fields["IDCardNo"] = $_COOKIE["IDCardNo"];
			}
			$ret = $db->update(DB_NAME,$table,input($fields),$cond,true);
		}else{
			$db->remove(DB_NAME,$table,$cond);
			foreach($datas as $fields){
				if($TABLE_IDCardNo[$table]){
					$fields["IDCardNo"] = $_COOKIE["IDCardNo"];
				}
				$ret = $db->insert(DB_NAME,$table,input($fields),$cond);
			}
		}

	}
	return true;
}

function send_mail($data) {
	$tmp_file = "/tmp/notification" . time() . ".docx";
	$mailer = Mail::factory('smtp',array('host' => MAIL_HOST, 'port' => MAIL_PORT, 'username' => MAIL_USER, 'password' => MAIL_PASSWORD,'auth' => true));
	$phpWord = new \PhpOffice\PhpWord\PhpWord();
	$section = $phpWord->addSection();
	\PhpOffice\PhpWord\Shared\Html::addHtml($section, str_replace('{name}', $data["name"], MAIL_TEMPLATE));
	$objWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'Word2007');
	$objWriter->save($tmp_file);
	$headers = array('From' => MAIL_FROM, 'To' => $data["to"], 'Subject' => MAIL_SUBJECT);
	$mime = new Mail_mime(array('eol' => $crlf));
	//$mime->setTXTBody("体检通知书");
	$mime->addAttachment($tmp_file, 'application/octet-streafilem');
	$body = $mime->get();
	$headers = $mime->headers($headers);
	$ret = $mailer->send($data["to"], $headers ,$body);
	unlink($tmp_file);
	if(PEAR::isError($ret)){
		die($ret->getMessage() . "\n");
	}
}

function Province(){
	$db = DB::getInstance();
	$sql = "select ProName,ProID from T_Intra_Province";
	$query = $db->query(DB_NAME,$sql);
	$data  = $db->fetch($query);
	return $data;
}
function City($code){
	$db = DB::getInstance();
	$sql = "select CityName,CityID from T_Intra_City where ProID= $code";
	$query = $db->query(DB_NAME,$sql);
	$data  = $db->fetch($query);
	return $data;
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

	case 'insert_data':
		$ret = insert_data($data["data"]);
		break;
    case 'send_mail':
		$ret = send_mail($data);
		echo json_encode(($ret)); 
		return;

	case "Province":
		$ret = Province();
		break;
	case "City":
		// $ret = City($data["data"]);
		$ret = array(
				array(
					"city" => "yantai",
					"code" => "111",
				),
			);
		break;
	default:
		echo "Error command:".$data["cmd"];
		return;
	
}

echo json_encode(output($ret));
error_log( "<<< : ".var_export(output($ret), true)."\n\n", 3, "/var/tmp/my-errors.log");
