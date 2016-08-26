var rpsModule = (function ($, module) {
    var defaults = {
        game: '.game',
        buttonRestart: '.game_rps-restart',
        buttonStart: '.game_rps-start',
        result: '.game-result',
        buttonSelect: '.btn-select',
        botSelected: '.bot-select',
        humanSelected: '.human-select',
        winCount: '.sb-win',
        looseCount: '.sb-loose',
        drawCount: '.sb-draw',
        scoreboard: '.game_sb-message',
        trophyImg: '.trophy_image',
        sadImg: '.sad_image',
        inputWarning: '.game_input-warning',
        inputTimeWarning: '.game_time-warning',
        warningMessage: 'Warning: Still 10 seconds left',
        winMessage: '<strong>Congrats you WON!</strong>',
        looseMessage: '<strong>Oops you Loss, try again!</strong>',
        drawMessage: '<strong>Match is draw</strong>',
        notPlayedMessage: 'Haven\'t played the game'
    };

    var $game = $(defaults.game),
        $inputMinute = $(module.defaults.inputMinute, $game),
        $inputSecond = $(module.defaults.inputSecond, $game),
        $displaySecond = $(module.defaults.displaySecond, $game),
        $inputWarning = $(defaults.inputWarning, $game),
        $inputTimeWarning = $(defaults.inputTimeWarning, $game),
        $buttonStart = $(defaults.buttonStart, $game),
        $buttonRestart = $(defaults.buttonRestart, $game),
        $buttonSelect = $(defaults.buttonSelect, $game),
        $winCount = $(defaults.winCount, $game),
        $drawCount = $(defaults.drawCount, $game),
        $looseCount = $(defaults.looseCount, $game),
        $scoreBoard = $(defaults.scoreboard, $game),
        $humanSelect = $(defaults.humanSelected, $game),
        $botSelect = $(defaults.botSelected, $game),
        $sadImg = $(defaults.sadImg, $game),
        $trophyImg = $(defaults.trophyImg, $game),
        $result =  $(defaults.result, $game);

    $inputMinute.on('keypress', module.numericKeyPressEvent);

    $inputSecond.on('keypress', module.numericKeyPressEvent);

    $buttonStart.add($buttonRestart).on('click', function(){
        var min =  $inputMinute.val(),
            sec = $inputSecond.val(),
            time = min.length+sec.length;

        if(time > 0 && min.length < 4 && sec.length < 4) {
            $inputTimeWarning.addClass('warningHide');
            $inputWarning.addClass('warningHide');
            $trophyImg.hide();
            $sadImg.hide();
            $humanSelect.text('');
            $botSelect.text('');
            $scoreBoard.text(' ');
            $buttonSelect.prop("disabled", false );
            $result.hide();
            module.resetInterval();
            $winCount.text('0');
            $looseCount.text('0');
            $drawCount.text('0');
            module.start(timerChange);
        } else if(time === 0) {
            $inputTimeWarning.addClass('warningHide');
            $inputWarning.removeClass('warningHide');
        } else {
            $inputTimeWarning.removeClass('warningHide');
            $inputWarning.addClass('warningHide');
        }
    });

    $buttonSelect.on('click', function () {
        var userSelected = $(this).text().toLowerCase(),
            botSelected = module.botPickchoice(),
            result = module.compare(userSelected, botSelected);

        $humanSelect.text('You selected '+userSelected);
        $botSelect.text('Bot selected '+botSelected);

        if (result === "tie") {
            var drawEle = $(defaults.drawCount);
            var d = parseInt(drawEle.text());
            if (isNaN(d)) {
                d = 0;
            }
            d++;
            drawEle.text(d);
            $scoreBoard.text('It is a tie');
        }
        else if (userSelected === result) {
            var winEle = $(defaults.winCount);
            var w = parseInt(winEle.text());
            if (isNaN(w)) {
                w = 0;
            }
            w++;
            winEle.text(w);
            $scoreBoard.text(' you Win! '+userSelected+' beats '+botSelected);
        }
        else {
            var looseEle = $(defaults.looseCount);
            var l = parseInt(looseEle.text());
            if (isNaN(l)) {
                l = 0;
            }
            l++;
            looseEle.text(l);
            $scoreBoard.text(' you Loose! '+botSelected+' beats '+userSelected);
        }

    })

    var showWin = function () {
        var winCount = parseInt($(defaults.winCount).text()),
            looseCount = parseInt($(defaults.looseCount).text()),
            drawCount = parseInt($(defaults.drawCount).text()),
            count = winCount+looseCount+drawCount;

        if (winCount > looseCount) {
            $trophyImg.show();
            $result.html(defaults.winMessage).removeClass('hide');
        }
        else if (looseCount > winCount) {
            $sadImg.show();
            $result.html(defaults.looseMessage).removeClass('hide');
        }
        else if (winCount === looseCount && count > 0) {
            $result.html(defaults.drawMessage).removeClass('hide');
        } else if(count === 0) {
            $result.html(defaults.notPlayedMessage).removeClass('hide');
        }
    }

    function timerChange(timer, minutes, seconds) {
        if(timer === 10){
            alert(defaults.warningMessage);
        }

        if (timer < 11 && timer > 0) {
            $displaySecond.addClass('timerWarning');
        } else {
            $displaySecond.removeClass('timerWarning');
        }

        if(timer === 0){
            $buttonSelect.prop("disabled", true );
            showWin();
            $result.show();
        }
    }
})(jQuery, timerModule);