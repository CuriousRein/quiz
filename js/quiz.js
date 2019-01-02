var questionaires = []
var user_answers = []
var user_answer = {}
var number = 0;
var question_count = 0;
var countdown_num = 61
var question_length
var quiz_id = localStorage.getItem("quiz_id")
var u_id = localStorage.getItem("u_id")
function get_topic(){
    $.ajax({
        url:'question.php',
        method:'post',
        data:{get_topic:'',quiz_id:quiz_id},
        dataType:'json',
        success:function(data){
            $("#topic").html(data.Topic)
            $("#title").html(data.QuizTitle)
        }
    })
}
function start_quiz(){
    if(localStorage.getItem("quiz_id")==null){
        window.location.href='http://localhost/activity/';
    }
    $(".questionaire").hide()
    $("#start").on("click",function(){
        $("#start").hide()
        get_questionaire(quiz_id)
        interval = setInterval(countdown,1000)
    })
}
function get_questionaire(quiz_id){
    $.ajax({
        url:"question.php",
        method:"post",
        data:{questionaire:'',"id":quiz_id},
        dataType:"text",
        success:function(data){
            if(data==''){
                alert("no questionaires has been given yet")
                window.location.href='http://localhost/activity'
            }
            var datas = JSON.parse(data);
            question_count = datas.length;
            question_length = datas.length;
            for(i in datas){
                questionaires.push(datas[i])           
            }
            check_question_type()
        }
    })
}
function check_question_type(){
    if(questionaires[0].Answer=='true' || questionaires[0].Aynswer=='false'){
        display_data_tor()
    }
    else{
        display_data()
    }
}
function display_data_tor(){
    number+=1;
    $(".submit-btn").attr("disabled",true)
    if(questionaires.length<=1){
        $(".skip").hide()
    }
    $("#count").html(`QUESTIONS LEFT: <b style='color:red'>${question_count}</b>`)
    $("#question").html(`${number}. ${questionaires[0].question}<br>`)
    choices = `<br><input class='btn btn-md btn-default' type='button' id='true' value='A'> TRUE<br>
    <br><input class='btn btn-md btn-default' type='button' id='false' value='B'> FALSE`
    $(".label").html(choices)
    $(".questionaire").show()
    $(".skip").attr("disabled",false)
}
function display_data(){
    number+=1;
    $(".submit-btn").attr("disabled",true)
    if(questionaires.length<=1){
        $(".skip").hide()
    }
    $("#count").html(`QUESTIONS LEFT: <b style='color:red'>${question_count}</b>`)
    $("#question").html(`${number}. ${questionaires[0].Question}`)
    get_choices()
    $(".questionaire").show()
}
function get_choices(){
    $.ajax({
        url:'question.php',
        method:'post',
        data:{
            choices:"choices",
            question_id : questionaires[0].Question_id
        },
        dataType:"json",
        success:function(data){ 
            display_choices(data)
        }
    })
}
function display_choices(data){
    choices = '';
    letters = ["A","B","C","D"];
    for(i in data){
        choices += `<br><input class='lead btn btn-md btn-default' type='button' id='${data[i].Choices}' name='answer' value='${letters[i]}'> ${data[i].Choices}<br>`
    }
    $(".label").html(choices)
    $(".skip").attr("disabled",false)
}
function submit(){
    question_count-=1;
    user_answers.push({"question_id":user_answer.question_id,"answer":user_answer.answer});
    questionaires.shift()
    if(questionaires.length<=0){
        finalize()
    }
    else{
        check_question_type()
    }
}
function skip(){
    number-=1;
    last = questionaires.shift()
    questionaires.push(last)
    check_question_type()
}
function finalize(){
    $.ajax({
        url:'question.php',
        method:'post',
        data:{"finalize":'',"user_answers":user_answers,"quiz_id":quiz_id,u_id:u_id},
        dataType:'json',
        success:function(data){
            user_answers=[]
            user_answer={}
            questionaires = [];
            number = 0;
            question_count = 0;
            clearInterval(interval)
            promo(data)
        }
    })
}
function promo(data){
    average = data['ave']
    score = data['score']
    color = '';
    com = 0;
    if(average >= 90){
        com = 'Excellent Work'
        color = 'gold'
    }
    else if(average >= 75){
        com = 'Good Work'
        color = 'orange'
    }
    else{
        com = 'Study Hard !!!'
        color = '#b30000'
    }
    
    output = `<div class='promo lead'><h1>${average}%</h1><hr><p>${score}/${question_length}<br>${com}<br></p>
    <a href="http://localhost/activity" class="btn btn-success space btn-lg" role="button">Home Page</a> `;
    $("body").css("background-color","#4d4d4d")
    $(".result-container").html(output)
    $(".promo").css('color',color)
}
function countdown(){
    if(countdown_num <= 0){
        console.log('penalty')
        penalty()
    }
    else if(countdown_num <= 10){
        countdown_num-=1;
        $(".skip").attr("disabled",true)
        $("#countdown").html(`Time Left: <b style='color:red'>${countdown_num}</b>
        <div class="alert alert-info lead">
  <strong id='warn'>answer the question or it will be automatically counted as <i class='text-uppercase'>incorrect</i></strong>
        </div>`); 
    }
    else{
        countdown_num-=1;
        $("#countdown").html(`Time Left: <b style='color:green'>${countdown_num}</b>`);  
    }
}
function penalty(){
    user_answer.question_id = "";
    user_answer.answer = "";
    countdown_num = 61
    submit()
}
get_topic()
start_quiz()
$(document).on("click",".label input",function(e){
    user_answer.question_id = questionaires[0].Question_id;
    user_answer.answer = $(e.target).attr("id")
    $(".label input").removeClass('btn-primary')
    $(e.target).addClass('btn-primary')
    $(".submit-btn").attr("disabled",false)
})
$(".buttons button").on("click",function(e){
    button = $(e.target).html()
    countdown_num = 61;
    switch(button){
        case "SUBMIT":
            submit();
        break;
        case "SKIP THIS PART":
            skip();
        break;
    }
})
