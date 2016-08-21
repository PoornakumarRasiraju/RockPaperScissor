/**
 * Created by Poornakumar on 8/21/16.
 */

'use strict';

(function($) {
    $(function() {
        var $game = $('.game'),
            $humanRock = $('.game_rps-rock', $game),
            $humanPaper = $('.game_rps-paper', $game),
            $humanScissors = $('.game_rps-scissor', $game);

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