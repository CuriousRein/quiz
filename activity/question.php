<?php
    include_once 'conn.php';
    class Questionaire extends Db{
        public function get_questionaire(){
            $questions = $this->connect()->query("SELECT * FROM questionaire");
            while($row = $questions->fetch_assoc()){
                $rows[] = $row;
            }
            shuffle($rows);
            return $rows;
        }
        public function count_questionaire(){
            $count = count($this->get_questionaire());
            return $count;
        }
        public function get_average($answers){
            $size = $this->count_questionaire();
            $score = $this->check_quiz($answers);
            $ave = ($score/$size)*40+60;
            $ave = round($ave);
            $data = array();
            $data['score'] = $score;
            $data['ave'] = $ave;
            return json_encode($data);
        }
        public function insert_quiz_record(){

        }
        public function get_choices($question_id,$types){
            $rows = [];
            $right = $this->get_right_answer($question_id);
            $wrong = $this->get_wrong_answer($types);
            for($i=0;$i<3;$i++){
                $rows[] = $wrong[$i];
            }
            array_push($rows,$right);
            shuffle($rows);
            return json_encode($rows);
        }
        public function get_right_answer($question_id){
            $sel = $this->connect()->query("SELECT * FROM answer where question_id = '$question_id'");
            $row = $sel->fetch_assoc();
            return $row;
        }
        public function get_wrong_answer($data){
            $type = $data;
            $sel = $this->connect()->query("SELECT * FROM answer where question_id=0 and types='$type'");
            while($row = $sel->fetch_assoc()){
                $rows[] = $row;
            }
            shuffle($rows);
            return $rows;
        }
        public function check_quiz($answers){
            $correct_answers = $this->get_questionaire();
            json_encode($answers);
            json_encode($correct_answers);
            asort($answers);
            asort($correct_answers);
            $score = 0;
            for($i=0;$i<count($correct_answers);$i++){
                for($a=0;$a<count($answers);$a++){
                    if($correct_answers[$i]['question_id']==$answers[$a]['question_id']){
                        if($correct_answers[$i]['answer']==$answers[$a]['answer']){
                            $score++;
                        }
                    }
                }
            }
            return $score;
        }
    }
    $question = new Questionaire;
    if(isset($_POST['questionaire'])){
        echo json_encode($question->get_questionaire());
    }
    if(isset($_POST['choices'])){
        echo $question->get_choices($_POST['question_id'],$_POST['type']);
    }
    if(isset($_POST['finalize'])){
        echo $question->get_average($_POST['user_answers']);
    }
?>