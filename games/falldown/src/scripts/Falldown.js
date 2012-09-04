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

  currentGame.Falldown = Falldown;

}(window.Atari.currentGame));
