<?php
    include_once 'conn.php';
    class Questionaire extends Db{
        public function get_questionaire($id){
            $rows=array();
            $questions = $this->connect()->query("SELECT * FROM question_tbl where Quiz_id = '$id'");
            while($row = $questions->fetch_assoc()){
                $rows[] = $row;
            }
            shuffle($rows);
            return $rows;
        }
        public function count_questionaire($id){
            $count = count($this->get_questionaire($id));
            return $count;
        }
        public function get_average($answers,$qid){
            $size = $this->count_questionaire($qid);
            $score = $this->check_quiz($answers,$qid);
            $ave = ($score/$size)*40+60;
            $ave = round($ave);
            $data = array();
            $data['score'] = $score;
            $data['ave'] = $ave;
            return json_encode($data);
        }
        public function insert_quiz_record(){

        }
        public function get_choices($question_id){
            $rows = [];
            $choices = $this->get_each_choices($question_id);
            shuffle($choices);
            return json_encode($choices);
        }
        public function get_each_choices($data){
            $sel = $this->connect()->query("SELECT * FROM choices_tbl where Question_id = '$data'");
            while($row = $sel->fetch_assoc()){
                $rows[] = $row;
            }
            shuffle($rows);
            return $rows;
        }
        public function check_quiz($answers,$qid){
            $correct_answers = $this->get_questionaire($qid);
            json_encode($answers);
            json_encode($correct_answers);
            $score = 0;
            for($i=0;$i<count($correct_answers);$i++){
                for($a=0;$a<count($answers);$a++){
                    if($correct_answers[$i]['Question_id']==$answers[$a]['question_id']){
                        if($correct_answers[$i]['Answer']==$answers[$a]['answer']){
                            $score++;
                        }
                    }
                }
            }
            return $score;
        }
        public function get_topic($id){
            $topic = $this->connect()->query("SELECT topic_tbl.Topic,quiz_tbl.QuizTitle from topic_tbl inner join
                quiz_tbl on topic_tbl.Topic_id = quiz_tbl.Topic_id  where quiz_tbl.Quiz_id = '$id'");
                if($row=$topic->fetch_assoc()){
                    return json_encode($row);
                }
        }
    }
    $question = new Questionaire;
    if(isset($_POST['questionaire'])){
        if($question->get_questionaire($_POST['id'])){
            echo json_encode($question->get_questionaire($_POST['id']));
        }
        else{
            echo '';
        }
    }
    if(isset($_POST['choices'])){
        echo $question->get_choices($_POST['question_id']);
    }
    if(isset($_POST['finalize'])){
        echo $question->get_average($_POST['user_answers'],$_POST['quiz_id']);
    }
    if(isset($_POST['get_topic'])){
        echo $question->get_topic($_POST['quiz_id']);
    }
?>