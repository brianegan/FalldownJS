(function(currentGame) {
  var ticks = 0;

  /**
   * Falldown Class
   *
   */
  function Falldown() {
    var self = this;

    // Left and 
    self.leftArrowPressed = false,
    self.rightArrowPressed = false;

    // Brick Rows
    self.remainingBrickRows = [];
    self.activeBrickRows = [];

    // Constants
    self.LEFT_ARROW = 37,
    self.RIGHT_ARROW = 39; 
    self.VELOCITY = 3;
    self.TERMINAL_VELOCITY = 7;
    self.CANVAS_WIDTH = 400;
    self.CANVAS_HEIGHT = 400;

    return this;
  }

  // Shortcut to prototype
  var fn = Falldown.prototype;

  /**
   * Public Methods
   *
   */
  fn.startGame = function Falldown_startGame() {
    console.log("started!");
  };

  fn.initialize =  function Falldown_initialize(assets, stage, gameInfo) {
    var self = this;

    // Save the parameters for later
    self.stage = stage;
    self.assets = assets;
    self.gameInfo = gameInfo;

    // Apply the background
    GameLibs.GameUI.changeBackground(assets.background);

    // Add the ball
    self._addBall();

    // Generate the Brick Rows
    self._generateBrickRows();

    // Bind keys for movement
    self._bindArrowKeys();
  };

  fn.tick = function Falldown_tick(tickFactor) {
    var self = this;

    // Move & Clean up Active Bricks
    self._moveActiveBricks();
    self._garbageCollectActiveBrikes();

    // Move the Ball & Determine if it's a loss
    self._moveBall();

    if (self.ball.y < 0) {
      console.log("game over");
    }

    // Add Bricks to the Canvas
    if (ticks % 40 === 0) {
      self._addBrickRow();
    }

    // Increment the Velocity & Number of ticks
    if (self.VELOCITY < self.TERMINAL_VELOCITY) {
      self.VELOCITY = Math.pow(1.002, ticks) + 2;
    }

    ticks += 1;
  };

  fn.pause = function Falldown_pause(paused) {
    if (paused) {
      console.log("pause");
    } else {
      console.log('resume');
    }
  };

  fn.getScore =  function Falldown_getScore() {
    console.log("getScore");
  };

  fn.continueGame = function Falldown_continueGame() {
    console.log("continue game");
  };

  fn.restart = function Falldown_restart() {
    console.log("restart");
  };

  fn.destroy = function Falldown_destroy() {
    console.log("destroy");
  };

  fn.onLevelComplete = function Falldown_onLevelComplete() {
    console.log("onLevelComplete");
  };

  fn.onGameComplete = function Falldown_onGameComplete() {
    console.log("onGameComplete");
  };

  fn.onGameOver = function Falldown_onGameOver() {
    console.log("onGameOver");
  };

  fn.onGameError = function Falldown_onGameError() {
    console.log('onGameError');
  };

  /**
   * Private Methods
   */ 
  fn._generateBrickRows = function Falldown_generateBrickRows() {
    var self = this,
        row,
        empty;

    for (var i = 0; i < 50; i+=1) {

      // Add a new
      self.remainingBrickRows.push({
        y: self.CANVAS_HEIGHT,
        bricks: []
      });

      // Random Empty Column to sneak through!
      empty = Math.floor(Math.random() * 8);

      for (var j = 0; j < 8; j+=1) {
        if (j !== empty) {
          self.remainingBrickRows[i].bricks.push(new createjs.Bitmap(self.assets.brick));
          self.remainingBrickRows[i].bricks[j].x = j * 50;
          self.remainingBrickRows[i].bricks[j].y = self.CANVAS_HEIGHT;
        } else {
          self.remainingBrickRows[i].bricks.push(null);
        }
      }
    }
  };

  fn._addBrickRow = function Falldown_addBrickRow() {
    console.log("Add brick Row");
    var self = this,
        row = self.remainingBrickRows.shift(),
        brick;

    for (var i = 0, len = row.bricks.length; i < len; i+=1) {
      brick = row.bricks[i];

      if (brick) {
        // If it's not the blank column
        // Add the brick to the stage
        self.stage.addChild(brick);
      }
    }

    self.activeBrickRows.push(row);
  };

  /**
   * Move the active bricks
   *
   */
  fn._moveActiveBricks = function Falldown_moveActiveBricks() {
    var self = this,
        row,
        brick;

    for (var i = 0, len = self.activeBrickRows.length; i < len; i+=1) {
      row = self.activeBrickRows[i];

      for (var k = 0, gth = row.bricks.length; k < gth; k+=1) {
        brick = row.bricks[k];
        if (brick) { 
          row.y = brick.y = brick.y - self.VELOCITY;
        }
      }
    }
  };

  /**
   * Add the Ball to the Stage
   *
   */
  fn._addBall = function Falldown_addBall() {
    var self = this;

    self.ball = new createjs.Bitmap(self.assets.ball);
    self.stage.addChild(self.ball);
  };

  /**
   * Move the Ball
   *
   */
  fn._moveBall = function Falldown_moveBall() {
    var self = this,
        colliding = self._ballColliding();

    //  Up and Down Movement
    if (!colliding && self.ball.y + 32 < self.CANVAS_HEIGHT) {
      self.ball.y += 16;
    } else if (colliding) {
      self.ball.y -= self.VELOCITY;
    }

    // Left and Right Movement
    if (self.leftArrowPressed && self.ball.x >= 16) {
      self.ball.x -= 16;
    } 
    
    if (self.rightArrowPressed && self.ball.x + 48 <= self.CANVAS_WIDTH) {
      self.ball.x += 16;
    }
  };

  /**
   * Bind movement Keys
   *
   */
  fn._bindArrowKeys = function Falldown_bindArrowKeys() {
    var self = this;

    $('body')
      .on('keydown', function(e) {
        switch (e.which) {
          case self.LEFT_ARROW:
            self.leftArrowPressed = true;
            break;
          case self.RIGHT_ARROW:
            self.rightArrowPressed = true;
            break;
        }
      })
      .on('keyup', function(e) {
        switch (e.which) {
          case self.LEFT_ARROW:
            self.leftArrowPressed = false;
            break;
          case self.RIGHT_ARROW:
            self.rightArrowPressed = false;
            break;
        }
      });
  };

  /**
   * Detect Collision between the ball and the bricks
   *
   */
  fn._ballColliding = function Falldown_ballColliding() {
    var self = this,
        rows,
        brick,
        x1 = self.ball.x,
        x2 = x1 + 32,
        y1 = self.ball.y,
        y2 = y1 + 32,
        l = 0,
        r = 0,
        t = 0,
        b = 0;

    for (var i = 0, len = self.activeBrickRows.length; i < len; i+=1) {
      row = self.activeBrickRows[i];

      for (var k = 0, gth = row.bricks.length; k < gth; k+=1) {
        brick = row.bricks[k];

        if (brick) {
          l = brick.x;
          r = brick.x + 50;
          t = brick.y;
          b = brick.y + 20;
          
          if ((
            (y1 >= t && y1 <= b) ||	// Top edge touching
            (y2 >= t && y2 <= b) // Bottom edge touching
          ) && (
            (x1 >= l && x1 <= r) ||	// Left edge touching
            (x2 >= l && x2 <= r) // Right edge touching
          )) {
            return true;
          }
        }
      }
    }

    return false;
  };

  /**
   * Cleanup Active Bricks
   *
   */
  fn._garbageCollectActiveBrikes = function Falldown_garbageCollectActiveBricks() {
    var self = this;

    if (self.activeBrickRows[0] && self.activeBrickRows[0].y + 20 < 0) {
      self.activeBrickRows.shift();
    }
  };

  /**
   * Set Falldown as the current game
   *
   */
  currentGame.Falldown = Falldown;

}(window.Atari.currentGame));
