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
define('MAIL_USER', '');
// smtp密码
define('MAIL_PASSWORD', '');
// 邮件显示的From
define('MAIL_FROM', 'sender@example.com');
// 邮件标题
define('MAIL_SUBJECT', 'this is an email');
// 邮件内容
define('MAIL_TEMPLATE', '<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>
	体检通知单
</title>
    <script></script><script id="hp_same_"></script><script id="hp_done_"></script></head><body><object classid="clsid:8856F961-340A-11D0-A96B-00C04FD705A2" height="0" id="WebBrowser" width="0">
    </object>
	<style>
	table td{ height: 35px;}
        #print,.print-main
        {
            width: 650px;
            margin: 0 auto;
        }
        a.button_Back
        {
            display: block;
            width: 100px;
            background: #35d0a6;
            height: 35px;
            line-height: 35px;
            color: #fff;
            text-align: center;
        }
        a.button_Print
        {
            display: block;
            width: 100px;
            background: #00ccff;
            height: 35px;
            line-height: 35px;
            color: #fff;
            text-align: center;
            float:right
        }
        
        .hide {display:none;}
	
	</style>

    <script type="text/javascript">
        function printView(id) {
            var sprnhtml = document.getElementById(id).outerHTML;
            var selfhtml = window.document.body.innerHTML; //获取当前页的html
            window.document.body.innerHTML = sprnhtml;
            var navigatorName = "Microsoft Internet Explorer";
            var isIE = false;
            if (navigator.appName == navigatorName) {
                isIE = true;
                document.all.WebBrowser.ExecWB(7, 1);
            } else {
                window.print();
            } 
            window.document.body.innerHTML=selfhtml;
        }
    </script>


    <div id="print">
        <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tbody><tr>
                <td style="text-align: center; font-size: 26px; height:70px;line-height:110px">
                    体检通知单
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:60px">
                    兹介绍<u>&nbsp;&nbsp;<span id="lblPName">{name}</span>&nbsp;&nbsp;</u>同志前往你处体检，请予以安排。
                    <br>
                </td>
            </tr>
            <tr>
                <td align="right" style=" height:50px">
                    海尔集团HR共享服务中心入职模块
                    <br>
                </td>
            </tr>
            <tr>
                <td align="right">
                    <span id="lblDate">2015年02月24日</span>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    注意事项：
                    <br>
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    1、体检时间：<span id="lblCheckDate"></span>，联系电话：83720867。
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    2、体检地点：青岛市市北区人民医院，医务科（四楼）；地址：青岛市抚顺路25号。
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    可乘坐的公交车：1、367、229、362 302、126、309、36路公交车到抚顺路站下车。
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    3、体检要求：空腹（不吃饭、不喝水，查体前一天不喝酒，要求休息好）。
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    4、携带身份证及体检通知单。
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    5、体检付费方式：个人自付费用。
                    <br>
                </td>
            </tr>
            <tr>
                <td style=" height:50px">
                    6、请到达医院后前往住院二部负一楼查体中心，联系医生领取体检表。
                    <br>
                </td>
            </tr>
        </tbody></table>
    </div>
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

