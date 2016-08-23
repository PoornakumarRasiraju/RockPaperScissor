
var loadModule = (function (module) {
    var defaults = {
        buttonRestart: 'game_rps-restart',
        buttonStart: 'game_rps-start',
        result: 'game-result',
        buttonSelect: 'btn-select',
        botSelected: 'bot-select',
        humanSelected: 'human-select',
        winCount: 'sb-win',
        looseCount: 'sb-loose',
        drawCount: 'sb-draw',
        warningMessage: 'Just warning',
        winMessage: '<strong>Congtrats you won</strong>',
        looseMessage: '<strong>Oops</strong> you losed try again!',
        drawMessage: '<strong>Match is drawn</strong>'
    };

    $('#' + module.defaults.inputMinuteId).on('keypress', module.numericKeyPressEvent);

    $('#' + module.defaults.inputSecondId).on('keypress', module.numericKeyPressEvent);

    $('.' + defaults.buttonStart).on('click', function(){
        $('.' + defaults.humanSelected).text(' ');
        $('.' + defaults.botSelected).text('');
        $('.btn-select').prop( "disabled", false );
        $('.game-result').hide();
        module.resetInterval();
        $('.' + defaults.winCount).text(0);
        $('.' + defaults.looseCount).text(0);
        $('.' + defaults.drawCount).text(0);
        module.start(timerChange);
    });

    $('.' + defaults.buttonRestart).on('click', function () {
        $('.' + defaults.humanSelected).text(' ');
        $('.' + defaults.botSelected).text('');
        $('.btn-select').prop( "disabled", false );
        $('.game-result').hide();
        module.resetInterval();
        $('.' + defaults.winCount).text(0);
        $('.' + defaults.looseCount).text(0);
        $('.' + defaults.drawCount).text(0);
        module.start(timerChange);
    });

    $('.' + defaults.buttonSelect).on('click', function () {
        var userSelected = $(this).text().toLowerCase();
        $('.' + defaults.humanSelected).text('you selected '+userSelected);
        var botSelected = module.botPickchoice();
        $('.' + defaults.botSelected).text('BOT selected '+botSelected);
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
        var winCount = parseInt($('.' + defaults.winCount).text());
        var looseCount = parseInt($('.' + defaults.looseCount).text());
        var drawCount = parseInt($('.' + defaults.drawCount).text());

        if (winCount > looseCount) {
            $('.' + defaults.result).html(defaults.winMessage).removeClass('hide');
        }
        else if (looseCount > winCount) {
            $('.' + defaults.result).html(defaults.looseMessage).removeClass('hide');
        }
        else if (winCount == looseCount && drawCount > 0) {
            $('.' + defaults.result).html(defaults.drawMessage).removeClass('hide');
        }
    }

    function timerChange(timer, minutes, seconds) {
        console.log("Mins: " + minutes + " Sec: " + seconds);
        if(timer === 10){
            alert(defaults.warningMessage);
        }
        if(timer < 0){
            $('.game-result').show();
            $('.btn-select').prop( "disabled", true );
            showWin();
        }
    }
})(rockModule);