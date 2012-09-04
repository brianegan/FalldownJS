(function(currentGame) {

  var Falldown = function Falldown() {},
      proto = Falldown.prototype;

  proto.startGame = function Falldown_startGame() {
    console.log("started!");
  };

  proto.initialize =  function Falldown_initialize() {
    console.log("init!");
  };

  proto.tick = function Falldown_tick() {
    console.log("tick");
  };

  proto.pause = function Falldown_pause(paused) {
    if (paused) {
      console.log("pause");
    } else {
      console.log('resume');
    }
  };

  proto.getScore =  function Falldown_getScore() {
    console.log("getScore");
  };

  proto.continueGame = function Falldown_continueGame() {
    console.log("continue game");
  };

  proto.restart = function Falldown_restart() {
    console.log("restart");
  };

  proto.destroy = function Falldown_destroy() {
    console.log("destroy");
  };

  proto.onLevelComplete = function Falldown_onLevelComplete() {
    console.log("onLevelComplete");
  };

  proto.onGameComplete = function Falldown_onGameComplete() {
    console.log("onGameComplete");
  };

  proto.onGameOver = function Falldown_onGameOver() {
    console.log("onGameOver");
  };

  proto.onGameError = function Falldown_onGameError() {
    console.log('onGameError');
  };

  currentGame.Falldown = Falldown;

}(window.Atari.currentGame));
