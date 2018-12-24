<?php
    class Db{
        public function connect(){
            $conn = new mysqli("localhost","root","","activity");
            return $conn;
        }
    }
?>