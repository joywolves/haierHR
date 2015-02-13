<?php

/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */

require_once './common/DB.php';
require_once './common/config.php';


$json_data = file_get_contents("php://input");
$data = json_decode($json_data);


function check_repeat($data)
{
	$db = DB::getInstance();
	//导入人员明细
	$T_EC_EmpDetail = $data["T_EC_EmpDetail"];
	$cond = array(
		"IdCardNo" => $T_EC_EmpDetail["IdCardNo"],
	);
	$ret = $db->find(DB_NAME,"T_EC_EmpDetail",$cond);
	if(is_array($ret) && sizeof($ret) >= 1){
		return true;
	}
	return false;
}

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
	//TODO 数据库事务回滚
	foreach ($data as $table => $fields) {
		$ret = $db->insert(DB_NAME,$table,$fields);
	}
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
		insert_image($data["data"]);
		break;
	case 'insert_data':
		insert_data($data["data"]);
		break;

	default:
		# code...
		break;
}

