<?php
/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */


define('DB_HOST', '115.28.63.129');
define('DB_USER', 'sa');
define('DB_PASS', 'Dechao1012');
define('DB_NAME', 'testdb');

// send mail(SMTP) configurations
//smtp 服务器
define('MAIL_HOST', 'smtp.163.com');
// smtp服务器端口
define('MAIL_PORT', '25');
// smtp用户名
define('MAIL_USER', 'yxrs_xy@163.com');
// smtp密码
define('MAIL_PASSWORD', 'xy_1012');
// 邮件显示的From
define('MAIL_FROM', 'yxrs_xy@163.com');
// 邮件标题
define('MAIL_SUBJECT', 'this is an email');
// 邮件内容
define('MAIL_TEMPLATE', '
<h1>体检通知单</h1>
<p>{name},快去体检</p>
');


//
$TABLE_KEY = array(
	"T_EC_Apply" => "ApplyID",
	"T_EC_EmpDetail" => "ApplyID",
	"T_EC_EntryEmpInfo" => "ApplyID",
	"T_EC_EntryEmpInfoExtra" => "ApplyID",
	"T_EC_EntryInfo" => "ApplyID",
	"T_EC_EntryPhoto" => "ApplyID",
	"T_EC_EntrySocialRelation" =>"ApplyID",
	"T_EC_PhysicalExamTime" => "ApplyID",
	"T_EC_Resume" => "ResumeID",
	"T_EC_ResumeEducation" => "ResumeID",
	"T_EC_ResumeExperience" => "ResumeID",
);

$TABLE_ONE = array(
	"T_EC_Apply" => true,
	"T_EC_EmpDetail" => true,
	"T_EC_EntryEmpInfo" => true,
	"T_EC_EntryEmpInfoExtra" => true,
	"T_EC_EntryInfo" => true,
	"T_EC_EntryPhoto" => true,
	"T_EC_EntrySocialRelation" =>false,
	"T_EC_PhysicalExamTime" => true,
	"T_EC_Resume" => true,
	"T_EC_ResumeEducation" => false,
	"T_EC_ResumeExperience" => false,
);