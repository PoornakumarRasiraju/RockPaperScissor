/**
 * Created by Poornakumar on 8/21/16.
 */

'use strict';

(function($) {
    $(function() {
        var $game = $('.game'),
            $inputMinutes = $('.game_rps-min-input', $game),
            $inputSeconds = $('.game_rps-sec-input', $game),
            $gameStart = $('.game_rps-start', $game),
            $gameRestart = $('.game_rps-restart', $game),
            $hwin = $('.game_rps-h-sb-win', $game),
            $hlose = $('.game_rps-h-sb-lose', $game),
            $hdraw = $('.game_rps-h-sb-draw', $game),
            $bwin = $('.game_rps-b-sb-win', $game),
            $blose = $('.game_rps-b-sb-lose', $game),
            $bdraw = $('.game_rps-b-sb-draw', $game),
            $humanRock = $('.game_rps-h-rock', $game),
            $humanPaper = $('.game_rps-h-paper', $game),
            $humanScissors = $('.game_rps-h-scissor', $game);

        $gameStart.on('click', function(e) {
            console.log("Clicked Rock");
        });

        $gameRestart.on('click', function(e) {
            /*var minutesVal = $inputMinutes.val(),
                secondsVal = $inputSeconds.val();*/
            $hwin.val('0');
            $hlose.val('0');
            $hdraw.val('0');
            $bwin.val('0');
            $blose.val('0');
            $bdraw.val('0');
        });

        $humanRock.on('click', function(e) {
            console.log("Clicked Rock");
        });

        $humanPaper.on('click', function(e) {
            console.log("Clicked Paper");
        });

        $humanScissors.on('click', function(e) {
            console.log("Clicked Scissors");
        });

    });
}(jQuery));