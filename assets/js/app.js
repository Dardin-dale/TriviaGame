$(document).ready(function () {

    //Questions will have a question String, an array of answers,
    //and the correct answer will be represented as the correct index of the answers array
    //time indicated the amount of time needed to answer the question in seconds
    //time should be padded with 4 seconds of time to display answer.
    var q1 = {
        question: "Who let the Dogs out?",
        answers: ["Jay-Z", "The Baha men", "Smash Mouth", "Shrek"],
        correct: 1,
        time: 4 + 6
    }

    var q2 = {
        question: "Who farted?",
        answers: ["Picasso", "Goku", "Freeza", "Shrek"],
        correct: 1,
        time: 4 + 5
    }

    // #######################
    // General DOM Functions
    // html converters have class adding capability if different question types are added to the quiz later on.
    // #######################

    //converts Question type objects into the proper html with the appropriate class and Id 
    //appends to target div by id
    function q2html(q, cl="question", target="qbody") {
        var question = $('<div>');
        question.addClass(cl);
        question.html('<h3>' + q.question + '</h3>' +
                      '<div id=answers></div>'
        );
        $('#'+ target).append(question);
        // add answer buttons
        for (var i = 0; i<q.answers.length; i++){
            var ansbtn = $('<button type="button" class="btn btn-info">').text(q.answers[i]);
            $('#answers').append(ansbtn);
        }
    }

    //Displays answer and media for a question to target div (assumes div is cleared)
    //TODO: display divs 
    function a2html(q, cl="answer", target="qbody") {
        var answer = $('<div>');
        answer.addClass(cl);
        answer.html();
    }

    //Main game controller 
    var game = {
        test: [q1,q2],
        running: false,
        numCorrect: 0,
        numWrong: 0,
        noAnswer: 0,
        guess: -1,
        count: 0,

        //runs through test array, alternates between questions and answers
        run: function () {
            var q = this.test[this.count];
            console.log(q);
            var qtime = q.time;
            var answered = false;
            var draw = true;
            var adraw = true;

            var qtimer = setInterval(function () {
                qtime--;
                if (qtime > 4) {
                   $('#timer').text('Time Remaining: ' + (qtime - 4)); 
                }
                
                //only draw question once
                if(draw) {
                    // draw question object
                    q2html(q, undefined, "qbody");
                    draw = false;
                }

                //check if user has answered the question
                if (game.guess != -1){
                    answered = true;
                }
            //  if time runs out or question is answered
            // display question answer for 4 seconds
                if (qtime <= 4 || answered) {
                    if (answered) {
                        qtime = 4;
                    }
                    $('#timer').empty();

                    //display answer here
                    if (adraw) {
                        adraw = false;
                        $('#qbody').empty();
                        a2html(q, undefined, "qbody");
                    }

                    //check if user guessed correctly
                    if (game.guess == q.correct) {
                        game.numCorrect++;
                        // display correct heading
                    } else if (game.guess == -1){
                        // user got stumped
                        game.noAnswer++;
                        
                    } else {
                        // wrong answer
                        game.numWrong++;
                    }

                    
                    


                    //ends test or asks next question
                    if (game.count == game.test.length - 1 && qtime == 0) {
                        clearInterval(qtimer);
                        //end empties qbody
                        game.end();
                    } else if (qtime == 0) {
                        game.count++;
                        game.guess = -1;

                        clearInterval(qtimer);
                        game.run();
                    }
                    
                } 
            }, 1000);

        },
        
        //ends test displays stats
        //should clear qbody first
        end: function () {

        },

        //resets the game state and starts the test over
        reset: function () {
            $(qBody).empty();
            this.numCorrect = 0;
            this.numWrong = 0;
            this.noAnswer = 0;
            this.guess = -1;
            this.count = 0;
            this.run();
        }


    }

    game.run();

    // #######################
    // On Click Functions
    // #######################
    
})