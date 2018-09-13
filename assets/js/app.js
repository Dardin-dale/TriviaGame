$(document).ready(function () {

    //Questions will have a question String, an array of answers,
    //and the correct answer will be represented as the correct index of the answers array
    //time indicated the amount of time needed to answer the question in seconds
    //time should be padded with 4 seconds of time to display answer.
    var q1 = {
        question: "How many particles are there in a mole?",
        answers: ["6.626 x 10^34", "6.02 x 10^23", "6.67 x 10^11", "about 5"],
        correct: 1,
        time: 4 + 7
    }

    var q2 = {
        question: "What's the gravitational force constant?",
        answers: ["6.626 x 10^-34 N·kg^–2·m^2", "6.02 x 10^-23 N·kg^–2·m^2", "6.68 x 10^-11 m^3·kg^-1·s^-2", "9 m/s^2"],
        correct: 2,
        time: 4 + 7
    }

    var q3 = {
        question: "Optical Isomers resulting from Chirality (miror images of each other) are also known as?",
        answers: ["Stereo Isomers", "Diasteriomers", "Enantiomers", "Isosceles"],
        correct: 2,
        time: 4 + 6
    }

    var q4 = {
        question: "What is the maximum number of electrons in a d shell orbital?",
        answers: ["10", "6", "2", "14"],
        correct: 0,
        time: 4 + 6
    }

    var q4 = {
        question: "Light emmited from a direct singlet excited state (as opposed to an intersystem crossing) is called?",
        answers: ["Potato", "Phosphorescence", "Laser", "Fluorescence"],
        correct: 3,
        time: 4 + 6
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
            var ansbtn = $('<button type="button" class="btn btn-info option" data-index='+ i +'>').text(q.answers[i]);
            $('#answers').append(ansbtn);
        }
    }

    //Displays answer and media for a question to target div (assumes div is cleared)
    //TODO: display divs 
    function a2html(q, cl="answer", target="qbody") {
        var answer = $('<div>');
        answer.addClass(cl);
        answer.html('<h3 id=guess></h3>' +
            '<h3>The Correct Answer was: ' + q.answers[q.correct] + '</h3>'
        );

        $('#'+target).append(answer);
    }

    //Main game controller 
    var game = {
        test: [q1, q2, q3, q4],
        numCorrect: 0,
        numWrong: 0,
        noAnswer: 0,
        guess: -1,
        count: 0,
        answered: false,

        //runs through test array, alternates between questions and answers
        run: function () {
            var q = this.test[this.count];
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
                    $('#qbody').empty();
                    q2html(q, undefined, "qbody");
                    draw = false;
                }

            //  if time runs out or question is answered
            // display question answer for 4 seconds
                if (qtime <= 4 || answered) {
                    // console.log(qtime);
                    if (answered) {
                        game.answered = false;
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
                    if(qtime == 4){
                        if (game.guess == q.correct) {
                            game.numCorrect++;
                            // display correct heading
                            $('#timer').text('You Guessed Right!')
                        } else if (game.guess == -1){
                            // user got stumped
                            $('#timer').text('Hmm you forgot to answer..')
                            game.noAnswer++;
                            
                        } else {
                            // wrong answer
                            $('#timer').text('You Guessed Wrong!')
                            game.numWrong++;
                        }
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
            $('#qbody').empty();
            $('#qbody').html('<h2>Congratulations! Well Done!</h2>' +
                '<h3>Your Results:<h3>' +
                '<h3>Correct: ' + this.numCorrect + '</h3>'+
                '<h3>Incorrect: ' + this.numWrong + '</h3>' +
                '<h3>Unanswered: ' + this.noAnswer + '</h3>' +
                '<button class="btn btn-primary" id="reset">Play Again?</button>'
        );

        },

        //resets the game state and starts the test over
        reset: function () {
            $(qbody).empty();
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

    //click on one of the answer buttons
    $(document).on('click', '.option', function () {
        game.guess = $(this).attr('data-index');
        game.answered = true;
        // console.log(game.guess);s
    });

    //Starts the quiz over again
    $(document).on('click', '#reset', function () {
        game.reset();
    });
    
})