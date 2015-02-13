<?php
/**
 * Created by PhpStorm.
 * User: luan
 * Date: 7/14/14
 * Time: 3:18 PM
 */


$directory = "./image/";
$dest = $directory.$_FILES["file"]["name"];
move_uploaded_file($_FILES["file"]["tmp_name"],$dest);
echo "upload ".$_FILES["file"]["name"]." ok";