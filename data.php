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


function check_repeat($data)
{
	$db = DB::getInstance();
	//导入人员明细
	$T_EC_Apply = $data["T_EC_Apply"];

	$ret = $db->find(DB_NAME,"T_EC_Apply",array("*"),$T_EC_Apply);
	if(is_array($ret) && sizeof($ret) >= 1){
		$one = end($ret);
		// record Primary_key in cookie
		// setcookie("Primary_key",$one["Primary_key"]);
		return $one;
	}
	return null;
}

//not test yet
function insert_image($data){
	
    $filename = $_FILES["file"]["name"];
    $tmp_filename = $_FILES["file"]["tmp_name"];
    $datastring = implode('', file ($tmp_filename));
    $data = unpack("H*hex", $datastring);
    $EmpPhoto = "0x".$data['hex'];

    $fields = $data["T_EC_EntryPhoto"];
    $fields["ImgContent"] = $EmpPhoto;

    $ret = $db->insert(DB_NAME,"T_EC_EntryPhoto",$fields);

    return $ret;
}

function insert_data($data){
	$db = DB::getInstance();

	foreach ($data as $table => $fields) {
		$ret = $db->insert(DB_NAME,$table,$fields);
	}
	// shoud like this
	// foreach ($data as $table => $fields) {
	// 	$cond = array(
	// 		"Primary_key" => $fields["Primary key"],
	// 	//	"Primary_key" => $_COOKIE["Primary key"],
	// 	);
	// 	$ret = $db->update(DB_NAME,$table,$fields,$cond,true);
	// }
	return true;
}

switch ($data["cmd"]) {
	case 'check_repeat':
		$ret = check_repeat($data["data"]);
		if($ret){
			echo "repeat";
		}else{
			echo "no-repeat";
		}
		break;
	case 'insert_image':
		$ret = insert_image($data["data"]);
		echo $ret;
		break;
	case 'insert_data':
		$ret = insert_data($data["data"]);
		echo $ret;
		break;

	default:
		# code...
		break;
}

