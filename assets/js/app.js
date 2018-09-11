$(document).ready(function () {

    //Questions will have a question String, an array of answers,
    //and the correct answer will be represented as the correct index of the answers array
    var q1 = {
        question: "Who let the Dogs out?",
        answers: ["Jay-Z", "The Baha men", "Smash Mouth", "Shrek"],
        correct: 1
    }

    var q2 = {
        question: "Who farted?",
        answers: ["Picasso", "Goku", "Freeza", "Shrek"],
        correct: 1
    }

    // #######################
    // General DOM Functions
    // #######################

    //converts Question type objects into the proper html with the appropriate class and Id 
    //appends to target div
    function q2html(q, cl="question", id="", target="qBody") {

        
    }

    //Displays answer and media for a question to target div (assumes div is cleared)
    function a2html(q, cl="answer", id="", target="qBody") {


    }

    //Main game controller 
    var game = {
        test = [q1,q2],
        running = false,
        current = 0,
        numCorrect = 0,
        numWrong = 0,

        //runs through test array, alternates between questions and answers
        run: function () {
            //counts through array at timer loop
            var qtimer = setInterval(game.ask(), 8000);

        },

        //asks question at interval, updates current question, increases count
        ask: function () {
            if(this.count >= this.test.length) {
                this.end()
            }

        },
        
        //ends test displays stats
        end: function () {

        },

        //resets the game state and starts the test over
        reset: function () {
            $(qBody).empty();
            this.current = 0;
            this.run();
        }


    }

    // #######################
    // On Click Functions
    // #######################
    
})