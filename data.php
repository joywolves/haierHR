<?php

/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */

require_once './common/DB.php';
require_once './common/config.php';


$json_data = file_get_contents("php://input");
$data = json_decode($json_data,true);


function check_login($data)
{
	$db = DB::getInstance();
	//导入人员明细
	$T_EC_Apply = $data["T_EC_Apply"];

	$ret = $db->find(DB_NAME,"T_EC_Apply",array("*"),$T_EC_Apply);
	if(is_array($ret) && sizeof($ret) >= 1){
		$one = end($ret);
		// record Primary_key in cookie
		setcookie("ApplyID",$one["ApplyID"]);
		return $one;
	}
	return false;
}
function pull_data()
{
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
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
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
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
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
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
    $ret = $db->update(DB_NAME,$table,$fields,$cond,true);

    return $ret;
}

function insert_data($data){
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
		$ret = $db->update(DB_NAME,$table,$fields,$cond,true);
	}
	return true;
}

switch ($data["cmd"]) {
	case 'check_login':
		$ret = check_login($data["data"]);
		echo json_encode($ret);
		break;
	case 'pull_data':
		$ret = pull_data();
		echo json_encode($ret);
		break;
	case 'pull_image':
		$ret = pull_image();
		echo json_encode($ret);
		break;
	case 'insert_image':
		$ret = insert_image($data["data"]);
		echo json_encode($ret);
		break;
	case 'insert_data':
		$ret = insert_data($data["data"]);
		echo json_encode($ret);
		break;

	default:
		echo "Error command:".$data["cmd"];
		break;
}

