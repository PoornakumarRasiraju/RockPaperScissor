var rockModule = (function ($) {

    var timeInterval;
    var choices = ["rock", "paper", "scissors"];
    var map = {};
    var defaults = {
        displayMinute: '.game_rps-timer-min',
        displaySecond: '.game_rps-timer-sec',
        inputMinute: '.game_rps-min-input',
        inputSecond: '.game_rps-sec-input'
    };
    choices.forEach(function (choice, i) {
        map[choice] = {};
        for (var j = 0, half = (choices.length - 1) / 2; j < choices.length; j++) {
            var opposition = (i + j) % choices.length;
            if (!j)
                map[choice][choice] = "tie";
            else if (j <= half)
                map[choice][choices[opposition]] = choices[opposition];
            else
                map[choice][choices[opposition]] = choice;
        }
    });

    var compare = function (choice1, choice2) {
        return (map[choice1] || {})[choice2] || "Invalid choice";
    };

    var botPickchoice = function () {
        return choices[Math.floor(Math.random() * choices.length)];
    };

    var numericKeyPressEvent = function (event) {
        // Backspace, tab, enter, end, home, left, right
        var controlKeys = [8, 9, 13, 35, 36, 37, 39];
        var isControlKey = controlKeys.join(",").match(new RegExp(event.which));
        if (!event.which ||
            (49 <= event.which && event.which <= 57) ||
            (48 == event.which && $(this).val() > 0) ||
            isControlKey) {
            return;
        } else {
            event.preventDefault();
        }
    }

    var startTimer = function (duration, displayMinute, displaySecond, timerChangeCallback) {
        var timer = duration, displayMinute, displaySecond;
        timeInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            displayMinute.textContent = minutes;
            displaySecond.textContent = seconds;

            timerChangeCallback && timerChangeCallback.call(null, timer, minutes, seconds);
            if (--timer < 0) {
                timerChangeCallback && timerChangeCallback.call(null, timer, minutes, seconds);
                timer = 0;
                if (timer == 0) {
                    resetInterval();
                }
            }
        }, 1000);
    }

    var resetInterval = function () {
        if (timeInterval) {
            clearInterval(timeInterval);
        }
    }

    var start = function (timerChangeCallback) {
        resetInterval();
        var fragmentTime;

        var minutes = $(defaults.inputMinute).val();
        var seconds = $(defaults.inputSecond).val();

        minutes = parseInt(minutes);
        seconds = parseInt(seconds);

        if (isNaN(minutes)) {
            minutes = 00;
        }
        if (isNaN(seconds)) {
            seconds = 00;
        }

        if (minutes == 60) {
            minutes = 59;
        }
        if (seconds == 60) {
            seconds = 59;
        }

        fragmentTime = (60 * minutes) + (seconds);
        displayMinute = document.querySelector(defaults.displayMinute);
        displaySecond = document.querySelector(defaults.displaySecond);

        startTimer(fragmentTime, displayMinute, displaySecond, timerChangeCallback);
    }

    return {
        defaults: defaults,
        start: start,
        compare: compare,
        botPickchoice: botPickchoice,
        resetInterval: resetInterval,
        numericKeyPressEvent: numericKeyPressEvent
    };

})(jQuery);