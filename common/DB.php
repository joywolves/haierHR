<?php
/**
 * auth 	: luan
 * email 	: luan@luanhailiang.cn
 * date 	: 2015/02/13
 */

class DB{
	private $_conn;  
	private static $_instance = null;

	private function __construct($host, $username, $password){
		$this->_conn = mssql_connect($host, $username, $password); 
	}
	
	private function __clone() {}
	
    public static function getInstance()  {
        if(is_null(self::$_instance)){
            self::$_instance = new DB(DB_HOST,DB_USER,DB_PASS);
        }    
        return self::$_instance;    
    } 
    
    public function selectDB($db){
		$ret = mssql_select_db($db,$this->_conn);
		return $ret;
	}
    public function query($db,$sql){
		$ret = $this->selectDB($db);
		if(!$ret){
			return $ret;
		}
		$query = mssql_query($sql);
		return $query;
	}
	public function fetch($query){
		$data = array();
		while ($row = mssql_fetch_array($query)){
       		array_push($data, $row);
		}
		// mssql_free_result($query);
		return $data;
	}
    public function find($db,$table,$feilds,$cond){
    	$Fields = implode(",",$feilds);;
		$Conds  = array();
		foreach ($cond as $key => $value){
			$one = $key." = ".$value;
			array_push($Conds, $one);
		}
		$Condition = implode(" and ", $Conds);
		$sql = "select ".$Fields." from ".$table." where ".$Condition;
    	$query = $this->query($db,$sql);
    	$data  = $this->fetch($query);
    	return $data;
	}

	public function insert($db,$table,$data){
		$Fields = "";
		$Values = "";
		foreach ($data as $key => $value){
			$Fields = $Fields.$key.",";
			$Values = $Values.$value.",";
		}
		$sql = "insert into ".$table." (".$Fields.") values (".$Values.")";
		$query = $this->query($db,$sql);
		return mssql_rows_affected();
	}

	public function update($db,$data){

	}

	public function remove($db,$data){

	}
}
