<?php
    class Db{
        public function connect(){
            $conn = new mysqli("localhost","root","","olexam_db");
            return $conn;
        }
    }
?>