<?php
    include 'conn.php';
    class Subject extends Db{
        function get_subjects(){
            $arr=array();
            $subject = $this->connect()->query("SELECT * FROM subject_tbl");
            while($row = $subject->fetch_assoc()){
                $ar = $this->get_topics($row['Subject_id']);
                $merge = array_merge(array("data"=>$ar),$row);
                array_push($arr,$merge);
            }
            return json_encode($arr);
        }
        function check_password($id,$answer){
            $select = $this->connect()->query("SELECT Topic_id,Quiz_id FROM quiz_tbl where Quiz_id = '$id'
                and Pword = '$answer'");
                if($row=$select->fetch_assoc()){
                    return 'Good Luck!!!';
                }
                else{
                    return 'invalid password';
                }
        }
        function get_topics($id){
            $rows = array();
            $teacher_id = $this->get_teachersub_id($id);
            $topic = $this->connect()->query("SELECT Topic,Topic_id from topic_tbl where Topic_id = '$teacher_id'");
            while ($row = $topic->fetch_assoc()) {
                $rows[] = $row;
            }
            if($rows){
                return $rows;
            }
            else{
                return array(array("Topic_id"=>0));
            }
        }
        function get_teachersub_id($id){
            $tid = $this->connect()->query("SELECT TeacherSub_id from teachersubj_tbl where 
            Subject_id = '$id'");
            $row = $tid->fetch_assoc();
            return $row['TeacherSub_id'];
        }
        function get_quizes($id,$u_id){
            $rows = array();
            $result = $this->connect()->query("SELECT * FROM quiz_tbl where Topic_id ='$id'");
            while($row = $result->fetch_assoc()){
                $results = $this->get_quiz_results($row['Quiz_id'],$u_id);
                $merge = array_merge($row,$results);
                array_push($rows,$merge);
            }
            return json_encode($rows);
        }
        function get_quiz_results($id,$u_id){
            $result = array();
            $select = $this->connect()->query("SELECT Percentage,score FROM result_tbl where Quiz_id='$id'
            and Idnum = '$u_id'");
            if($row=$select->fetch_assoc()){
                $result = array("Percentage"=>$row['Percentage'],"score"=>$row['score']);
            }
            else{
                $result = array("Percentage"=>0);
            }
            return $result;
        }
    }
    $sub = new Subject;
    if(isset($_POST['get_subject'])){
        echo $sub->get_subjects();
    }
    if(isset($_POST['get_topic'])){
        if($sub->get_topics($_POST['id'])){
            echo json_encode($sub->get_topics($_POST['id']));
        }
        else{
            echo 0;
        }
    }
    if(isset($_POST['get_quizes'])){
        echo $sub->get_quizes($_POST['id'],$_POST['u_id']);
    }
    if(isset($_POST['check_password'])){
        echo $sub->check_password($_POST['id'],$_POST['answer']);
    }
?>