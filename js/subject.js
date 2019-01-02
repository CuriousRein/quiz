(function(){
    var cooker = {
        subject : [],
        topic : [],
        quizes : [],
        i:0,
        facts:["The average age of someone who learns online is 34 years old.","82% of online learners are under graduates",
            "81% of online learners are employed","Over 40% of Fortune 500 companies are now using some form of educational technology.",
            "Companies that are using elearning tools and techniques have the potential to improve productivity of the employees by 50%.",
            "Every $1 spent on training results in up to $30 worth of productivity gains.","A survey of HR Managers found that 12% listed “not enough training” as the top reason employees give for leaving an organization.",
            "Companies using elearning and on-the-job training generate 26% more revenue per employee.",
            "In 2011, it was estimated that 35.6 billion dollars was spent on self-paced elearning worldwide.",
            "72% of companies state that elearning helps them to keep up-to-date in their industry.",
            "Companies that have a strong learning culture have been shown to do better in their market compared to those who do not.",
            "Companies are 34% more able to respond to customer needs when they have a robust learning program.",
            "Companies are 46% more likely to be the leader in their industry with a robust learning program.",
            "Companies are 17% more likely to become the market share leader if they have a robust elearning program."],
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
                data:{get_quizes:123,id:id,u_id:localStorage.getItem("u_id")},
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
        showFacts:function(){
        cooker.i++;
        if(cooker.i<cooker.facts.length){
            customer.render_Facts(cooker.facts[cooker.i])
        }
        else{
            cooker.i = 0;
        }
        },
        init:function(){
            customer.render_Facts(cooker.facts[0])
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
        render_Facts:function(data){
            $("#dis").html(data)
        },
        render_Sub:function(data){
            content = '';
            for(i in data){
                disable = '';
                val = 'Topic'
                if(data[i].data[0].Topic_id==0){
                    disable='disabled'
                    val = 'No Topic'
                }
                content += `<div class="col-md-4 col-sm-4 col-xs-6 subject">
                <div class="subject-content">
                  <h1 class='lead'><b>${data[i].SubjectCode}</b></h1>
                  <h2 class='lead'><small style='color:white'><b>${data[i].SubjectDescription}</b></small></h2><hr>
                  <button type="button" id='${data[i].Subject_id}' class="subs btn btn-sm btn-warning" ${disable}>${val}</button>
                </div>    
              </div>`;
            }
            $(".content").html(content)
        },
        render_Top:function(data){
            content = '';
            for(i in data){
                content += `<div class="col-md-4 col-sm-4 col-xs-6  subject">
                <div class="subject-content">
                  <h1 class='lead'><b>${data[i].Topic}</b></h1><hr>
                  <button type="button" id='${data[i].Topic_id}' class="tops btn btn-xs btn-warning">View Quizes</button>
                </div>    
              </div>`;
            }
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
                    content+=`<tr class='info'>
                        <th>${data[i].QuizTitle}</th>
                        <th>${data[i].NumofItems}</th>
                        <th>0</th>
                        <th>0</th>
                        <th>${data[i].Datee}</th>
                        <th><a href='#' class='btn btn-xs btn-success take' id='${data[i].Quiz_id}'>take Quiz</th>
                    </tr>`
                }
                else{
                    color ='';
                    result=''
                    if(data[i].Percentage<=74){
                        color = "danger";
                        result = "<b class='text-danger'>FAILED</b>"
                    }
                    else{
                        color = 'success';
                        result = "<b class='text-success'>PASSED</b>";
                    }
                    content+=`<tr class='${color}'>
                        <th>${data[i].QuizTitle}</th>
                        <th>${data[i].NumofItems}</th>
                        <th>${data[i].score}</th>
                        <th>${data[i].Percentage}</th>
                        <th>${data[i].Datee}</th>
                        <th>${result}</th>
                    </tr>`
                }
            }
            $(".content").html(`<div class='table-responsive'><table class='table table-condensed'>
                <thead>
                    <th>Quiz Title</th>
                    <th>Number of Items</th>
                    <th>Score</th>
                    <th>Percentage</th>
                    <th>Date</th>
                    <th>Result</th>
                </thead>
                <tbody>${content}</tbody>
            </table></div>`)
        },
        bindEvent:function(){
            $(document).on("click",".subs",waiter.setTopic.bind(this));
            $(document).on("click",".back",waiter.setSubjects.bind(this));
            $(document).on("click",".tops",waiter.setQuizes.bind(this));
            $(document).on("click",".take",waiter.takeQuiz.bind(this));
        }
    }
    setInterval(function(){
        waiter.showFacts()
    },10000)
    waiter.init()
}())
localStorage.setItem("u_id",1);