
<?php

require_once './common/DB.php';
require_once './common/config.php';

function copy_image(){
	$directory = "image/";
	$dest = $directory.$_COOKIE["ApplyID"].".jpg";
	move_uploaded_file($_FILES["file"]["tmp_name"],$dest);
}
function find_image(){
	$directory = "image/";
	$dest = $directory.$_COOKIE["ApplyID"].".jpg";
	if(file_exists($dest)){
		return "../".$dest;
	}else{
		return "img/headshow.png";
	}
}
function pull_image()
{
	global  $TABLE_KEY;
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}
	$db = DB::getInstance();
	$table = "T_EC_EntryPhoto";
	$key = "ApplyID";
	$cond = array(
		$key => $_COOKIE["ApplyID"],
	);
	$ret = $db->find(DB_NAME,$table,array("*"),$cond);
	if(is_array($ret) && sizeof($ret) >= 1){
		$one = end($ret);
		return $one["ImgContent"];
	}
	return null;
}
//not test yet
function insert_image(){
	global  $TABLE_KEY;
	if(!isset($_COOKIE["ApplyID"])){
		return false;
	}

	$db = DB::getInstance();
    $filename = $_FILES["file"]["name"];
    $tmp_filename = $_FILES["file"]["tmp_name"];
     $datastring = implode('', file ($tmp_filename));
    //$datastring = file_get_contents($tmp_filename);
    $data = unpack("H*hex", $datastring);
    $EmpPhoto = "0x".$data['hex'];

    $table = "T_EC_EntryPhoto";
    $fields = array();
    $fields["ImgContent"] = $EmpPhoto;
	$key = "ApplyID";
	$cond = array(
		$key => $_COOKIE["ApplyID"],
	);
	$fields[$key] = $_COOKIE["ApplyID"];
    $ret = $db->update(DB_NAME,$table,$fields,$cond,true);

    copy_image();
    return $ret;
}

error_log( ">>> : ".var_export($_FILES, true)."\n", 3, "/var/tmp/my-errors.log");

if(isset($_FILES["file"])){
	insert_image();
}else{
	$ret = find_image();
	echo $ret;
}