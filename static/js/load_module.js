
var loadModule = (function ($, module) {
    var defaults = {
        game: 'game',
        buttonRestart: 'game_rps-restart',
        buttonStart: 'game_rps-start',
        result: 'game-result',
        buttonSelect: 'btn-select',
        botSelected: 'bot-select',
        humanSelected: 'human-select',
        winCount: 'sb-win',
        looseCount: 'sb-loose',
        drawCount: 'sb-draw',
        inputWarning: 'game_input-warning',
        inputTimeWarning: 'game_time-warning',
        warningMessage: 'Warning: Still 10 seconds left',
        winMessage: '<strong>Congrats you won</strong>',
        looseMessage: '<strong>Oops</strong> you losed try again!',
        drawMessage: '<strong>Match is drawn</strong>'
    };

    var $game = $('.' + defaults.game),
        $inputMinute = $(module.defaults.inputMinute, $game),
        $inputSecond = $(module.defaults.inputSecond, $game),
        $displaySecond = $(module.defaults.displaySecond, $game),
        $inputWarning = $('.' + defaults.inputWarning, $game),
        $inputTimeWarning = $('.' + defaults.inputTimeWarning, $game),
        $buttonStart = $('.' + defaults.buttonStart, $game),
        $buttonRestart = $('.' + defaults.buttonRestart, $game),
        $buttonSelect = $('.' + defaults.buttonSelect, $game),
        $winCount = $('.' + defaults.winCount, $game),
        $drawCount = $('.' + defaults.drawCount, $game),
        $looseCount = $('.' + defaults.looseCount, $game),
        $humanSelect = $('.' + defaults.humanSelected, $game),
        $botSelect = $('.' + defaults.botSelected, $game),
        $result =  $('.' + defaults.result, $game);

    $inputMinute.on('keypress', module.numericKeyPressEvent);

    $inputSecond.on('keypress', module.numericKeyPressEvent);

    $buttonStart.on('click', function(){
        var min =  $inputMinute.val(),
            sec = $inputSecond.val(),
            time = min+sec;

        if(time > 0) {
            if(min.length < 3 && sec.length < 3) {
                $inputTimeWarning.addClass('warningHide');
                $inputWarning.addClass('warningHide');
                $humanSelect.text(' ');
                $botSelect.text('');
                $('.btn-select').prop( "disabled", false );
                $result.hide();
                module.resetInterval();
                $winCount.text(0);
                $looseCount.text(0);
                $drawCount.text(0);
                module.start(timerChange);
            } else {
                $inputTimeWarning.removeClass('warningHide');
                $inputWarning.addClass('warningHide');
                return false;
            }

        } else {
            $inputTimeWarning.addClass('warningHide');
            $inputWarning.removeClass('warningHide');
            return false;
        }
    });

    $buttonRestart.on('click', function () {
        var min =  $inputMinute.val(),
            sec = $inputSecond.val(),
            time = min+sec;

        if(time > 0) {
            $inputWarning.addClass('warningHide');
            $humanSelect.text(' ');
            $botSelect.text('');
            $('.btn-select').prop( "disabled", false );
            $result.hide();
            module.resetInterval();
            $winCount.text(0);
            $looseCount.text(0);
            $drawCount.text(0);
            module.start(timerChange);
        } else {
            $inputWarning.removeClass('warningHide');
            return false;
        }
    });

    $buttonSelect.on('click', function () {
        var userSelected = $(this).text().toLowerCase();
        $humanSelect.text('you selected '+userSelected);
        var botSelected = module.botPickchoice();
        $botSelect.text('BOT selected '+botSelected);
        var result = module.compare(userSelected, botSelected);

        if (result === "tie") {
            var drawEle = $('.' + defaults.drawCount);
            var d = parseInt(drawEle.text());
            if (isNaN(d)) {
                d = 0;
            }
            d++;
            drawEle.text(d);
        }
        else if (userSelected === result) {
            var winEle = $('.' + defaults.winCount);
            var w = parseInt(winEle.text());
            if (isNaN(w)) {
                w = 0;
            }
            w++;
            winEle.text(w);
        }
        else {
            var looseEle = $('.' + defaults.looseCount);
            var l = parseInt(looseEle.text());
            if (isNaN(l)) {
                l = 0;
            }
            l++;
            looseEle.text(l);
        }

    })

    var showWin = function () {
        var winCount = parseInt($('.' + defaults.winCount).text()),
            looseCount = parseInt($('.' + defaults.looseCount).text()),
            drawCount = parseInt($('.' + defaults.drawCount).text()),
            count = winCount+looseCount+drawCount;

        if (winCount > looseCount) {
            $result.html(defaults.winMessage).removeClass('hide');
        }
        else if (looseCount > winCount) {
            $result.html(defaults.looseMessage).removeClass('hide');
        }
        else if (winCount == looseCount && drawCount > 0) {
            $result.html(defaults.drawMessage).removeClass('hide');
        } else if(count === 0) {
            $result.html("Haven't played the game").removeClass('hide');
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
            $('.btn-select').prop( "disabled", true );
            showWin();
            $result.show();
        }
    }
})(jQuery, rockModule);