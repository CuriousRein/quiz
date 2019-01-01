<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>activity</title>
    <link rel="stylesheet" href="assets/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/mystyle.css">
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
</head>
<body>
    <div class='result-container'>
        <div class="container">
            <center><h2 class='well well-lg text-primary'>
            <b id='topic'></b><hr>
            <span class='text-info lead' id='title'></span></h2>
                
            </center>
            <h5 style='float:left' id='countdown'></h5>
            <h5 style='float:right' id='count'></h5>
            <br>
        </div>
        <center><button id='start' class="btn btn-lg btn-success">START QUIZ</button></center>
        <div class="questionaire">
            <h3 id='question' class='lead'></h3>
            <form>
                <div class="label">
                </div>
            </form>
            <center><br><br><br>
                <div class="buttons">
                <button class='submit-btn btn btn-md btn-primary'>SUBMIT</button>
                <button class='skip btn btn-md btn-warning'>SKIP THIS PART</button>
                </div>
            </center>
        </div>
    </div>
    <script src="assets/js/quiz.js"></script>
</body>
</html>