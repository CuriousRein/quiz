(function(){
    var cooker = {
        subject : [],
        topic : [],
        quizes : [],
        get_Subjects:function(){
            $.ajax({
                url:'subject.php',
                method:'post',
                data:{get_subject:123},
                dataType:'json',
                success:function(data){
                    cooker.subject = data
                    waiter.setSubjects();
                }
            })
        },
        get_Topic:function(id){
            $.ajax({
                url:'subject.php',
                method:'post',
                data:{get_topic:123,id:id},
                dataType:'text',
                success:function(data){
                    if(data==0){
                        alert("No Topics yet");
                        return false;
                    }
                    data = JSON.parse(data);
                    cooker.topic = data;
                    waiter.fetchTopics()
                }
            })
        },
        get_Quizes:function(id){
            $.ajax({
                url:'subject.php',
                method:'post',
                data:{get_quizes:123,id:id},
                dataType:'json',
                success:function(data){
                    cooker.quizes = data;
                    waiter.fetchQuizes();
                }
            })
        },
        checkPassword:function(id,answer){
            $.ajax({
                url:'subject.php',
                method:'post',
                data:{check_password:123,id:id,answer:answer},
                dataType:'text',
                success:function(data){
                    alert(data)
                    if(data=='Good Luck!!!'){
                        localStorage.setItem('quiz_id',id);
                        window.location.href="http://localhost/activity/quiz.php"
                    }
                }
            })
        }
    }
    
    var waiter = {
        init:function(){
            cooker.get_Subjects()
            customer.bindEvent()
        },
        setSubjects:function(){
            data = cooker.subject
            customer.render_Sub(data)
            $(".back").hide()
        },
        setTopic:function(e){
            id = $(e.target).attr("id")
            cooker.get_Topic(id)
        },
        fetchTopics:function(){
            data = cooker.topic;
            customer.render_Top(data);
            $(".back").show()
        },
        setQuizes:function(e){
            id = $(e.target).attr("id")
            cooker.get_Quizes(id)
        },
        fetchQuizes:function(){
            data = cooker.quizes
            customer.render_Quizes(data)
        },
        takeQuiz:function(e){
            answer = prompt("Enter Password")
            if(answer != null){
                id = $(e.target).attr("id");
                cooker.checkPassword(id,answer);
            }
        }
    }

    
    var customer = {
        render_Sub:function(data){
            content = '';
            for(i in data){
                content += `<div class="col-md-6 col-sm-6 col-xs-12 subject">
                <div class="subject-content">
                  <h1 class='lead'><b>${data[i].SubjectCode}</b></h1>
                  <h2 class='lead'>${data[i].SubjectDescription}</h2><hr>
                  <button type="button" id='${data[i].Subject_id}' class="subs btn btn-primary">ENTER</button>
                </div>    
              </div>`;
            }
            $("#dis").html("SUBJECTS")
            $(".content").html(content)
        },
        render_Top:function(data){
            content = '';
            for(i in data){
                content += `<div class="col-md-6 col-sm-6 col-xs-12 subject">
                <div class="subject-content">
                  <h1 class='lead'><b>${data[i].Topic}</b></h1><hr>
                  <button type="button" id='${data[i].Topic_id}' class="tops btn btn-primary">View Quizes</button>
                </div>    
              </div>`;
            }
            $("#dis").html("TOPICS")
            $(".content").html(content)
        },
        render_Quizes:function(data){
            if(data == ''){
                alert("No Quiz Added for this topic")
                return false;
            }
            content = ''
            for(i in data){
                if(data[i].Percentage==0){
                    content+=`<tr>
                        <th>${data[i].QuizTitle}</th>
                        <th>${data[i].NumofItems}</th>
                        <th>0</th>
                        <th>0</th>
                        <th>${data[i].Datee}</th>
                        <th><a href='#' class='btn btn-success take' id='${data[i].Quiz_id}'>take Quiz</th>
                    </tr>`
                }
                else{
                    color ='';
                    if(data[i].Percentage<0){
                        color = "danger";
                    }
                    else{
                        color = 'success';
                    }
                    content+=`<tr class='${color}'>
                        <th>${data[i].QuizTitle}</th>
                        <th>${data[i].NumofItems}</th>
                        <th>${data[i].score}</th>
                        <th>${data[i].Percentage}</th>
                        <th>${data[i].Datee}</th>
                    </tr>`
                }
            }
            $("#dis").html("QUIZES")
            $(".content").html(`<table class='table'>
                <thead>
                    <th>Quiz Title</th>
                    <th>Number of Items</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                </thead>
                <tbody>${content}</tbody>
            </table>`)
        },
        bindEvent:function(){
            $(document).on("click",".subs",waiter.setTopic.bind(this));
            $(document).on("click",".back",waiter.setSubjects.bind(this));
            $(document).on("click",".tops",waiter.setQuizes.bind(this));
            $(document).on("click",".take",waiter.takeQuiz.bind(this));
        }
    }
    waiter.init()
}())