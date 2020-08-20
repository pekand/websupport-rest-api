<?php

namespace Core\Db;

class Sqlite {
    public $db = null;

    public function open($path) {
        $this->db = new \SQLite3($path);

        if(!$this->db){
          throw new Exception('db is not open');
        }

        $this->db->enableExceptions(true);
    }

    public function exec($query, $data = array()) {
        $statement = $this->db->prepare($query);

        if (empty($statement)) {
            return null;
        }

        if(!empty($data)) {
            foreach ($data as $key => $value) {
                $statement->bindValue(':'.$key, $value);
            }
        }

        $result = $statement->execute();

        if(!$result){
          throw new Exception($this->db->lastErrorMsg());
        }

        return $result;
    }

    public function get($query, $data = array()) {
        $result =  $this->exec($query, $data);

        if (empty($result)) {
            return null;
        }

        $data = array();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $data[] = $row;
        }

        return $data;
    }

    public function exists($table) {
        $query ="SELECT name FROM sqlite_master WHERE name='{$table}';";

        $result = $this->get($query);

        return !empty($result);
    }

    public function create($table) {
        $query ="CREATE TABLE IF NOT EXISTS `$table` ( id integer PRIMARY KEY AUTOINCREMENT NOT NULL, uid CHAR(255) NOT NULL UNIQUE);";

        $this->exec($query);
    }

    public function addColumn($table, $name, $type, $mod = "") {
        $this->exec("ALTER TABLE `{$table}` ADD COLUMN {$name} {$type} {$mod};");
    }

    public function rename($table, $newName) {
        $this->exec("ALTER TABLE `{$table}` RENAME TO '{$newName}';");
    }

    public function uid()
    {
        return hash('sha256', time().mt_rand());
    }

    public function insert($table, $data = array()) {

        $data['uid'] = $this->uid();

        $columnNames = implode(",", array_keys($data));
        $columnValues = implode(",", array_map(function($value) { return ':'.$value; }, array_keys($data)));

        $query ="INSERT INTO `$table` ( {$columnNames} ) VALUES ( {$columnValues} );";

        $this->exec($query, $data);

        return $data['uid'];
    }

    public function update($table, $uid, $data = array()) {

        $columnValues = implode(",", array_map(function($value) { return $value.' = :'.$value; }, array_keys($data)));

        $query ="UPDATE `$table` SET {$columnValues} WHERE uid=:uid;";

        $data['uid'] = $uid;

        $this->exec($query, $data);
    }

    public function delete($table, $uid) {
        $query = "DELETE FROM `$table` WHERE uid=:uid;";

        $this->exec($query, array('uid' => $uid));
    }

    public function drop($table) {
        $this->exec("DROP TABLE IF EXISTS `$table`;");
    }
    
    public function tableColumns($table) {
        
        $result = [];
        
        $columns = $this->get("PRAGMA table_info(`$table`)");

        foreach ($columns as $value) {
            $result[$value['name']]  = $value['name'];
        }
        
        return $result;
    }

    public function schema() {
        $tables = $this->get("SELECT name FROM sqlite_master WHERE type='table';");

        $data = [];
        foreach ($tables as $table) {
            
            if ('sqlite_sequence'  == $table['name']) {
                continue;
            }
            
            $item = $this->get("PRAGMA table_info(".$table['name'].");");
            $data[$table['name']] = $item;
        }
        
        return $data;
    }
    
    public function definitions() {
        return $this->get("SELECT * FROM `sqlite_master` WHERE type='table';");
    }

    public function dump($table) {
        return $this->get("SELECT * FROM `{$table}`;");
    }

    public function tables() {
        $tables = $this->get("SELECT name FROM sqlite_master WHERE type='table';");

        $tableNames = [];
        foreach ($tables as $table) {
            if($table['name'] == 'sqlite_sequence') {
                continue;
            }
            
            $tableNames[] = $table['name'];            
        }
        
        return $tableNames;
    }
    
    public function list() {
        $tableNames = $this->tables();

        $data = [];
        foreach ($tableNames as $table) {
            $content = $this->get("SELECT * FROM ".$table);
            $data[$table] = $content;
        }
        return $data;
    }
}
