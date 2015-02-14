<?php

/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */

require_once './common/Util.php';



$msg = array();

$msg["cmd"] = $_GET["cmd"]; 


$data = array();

//需求报名表
$data["T_EC_Apply"] = array();
//导入人员明细
$data["T_EC_EmpDetail"] = array();
//入职员工个人信息，导入人员信息的补充，打印需要
$data["T_EC_EntryEmpInfo"] = array();
//入职员工个人信息-扩展信息，其它信息
$data["T_EC_EntryEmpInfoExtra"] = array();
//入职员工入职信息
$data["T_EC_EntryInfo"] = array();
//*_*'' 图片数据库 好麻烦
$data["T_EC_EntryPhoto"] = array();
//员工社会关系
$data["T_EC_EntrySocialRelation"] = array();
//(入职员工体检时间和入职时间)
$data["T_EC_PhysicalExamTime"] = array();
//外部简历
$data["T_EC_Resume"] = array();
//教育经历 - 简历子表
$data["T_EC_ResumeEducation"] = array();
//工作经历-简历子表
$data["T_EC_ResumeExperience"] = array();

$msg["data"] = array(
		"T_EC_EmpDetail" => array(
				"IDCardNo" => "370686",
			),
		"T_EC_EntryEmpInfoExtra" => array(
				"IDCardNo" => "370686",
			)

	);


$ret = Util::http_post("http://127.0.0.1/haierHR-DB/data.php",json_encode($msg));

echo $ret;