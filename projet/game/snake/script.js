window.onload =
  function () // dit a la page de de lancer la function on load au chargement de la page function() signifie la function suivante que je vais decrire
  {
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 100;
    var snakee;
    var applee;
    var widthInBlocks = canvasWidth / blockSize;
    var heightInBlocks = canvasHeight / blockSize;
    var score;

    init();

    // les secondes sont exprimé en milliseconde 1000=1s
    function init() {
      var canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.border = "30px solid gray";
      canvas.style.margin = "50px auto";
      canvas.style.backgroundColor = "#ddd";
      canvas.style.display = "block";
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      snakee = new Snake(
        [
          [6, 4],
          [5, 4],
          [4, 4],
          [3, 4],
          [2, 4],
        ],
        "right"
      );
      applee = new Apple([10, 10]);
      score = 0;
      refreshCanvas();
    }
    //document.body.appendChild pour ratacher cette variable au document html ou ? dans le body, grace a la fct appchild. On crée un variable contexte que lon appelle ctx. fillstyle la couleur que l'on veux utiliser pour dessiner dans ce ctx.fillrect pour dessiner le rectangle (x,y, 100px pour x, 50px pour y)

    function refreshCanvas() {
      snakee.advance();
      if (snakee.checkCollision()) {
        gameOver();
      } else {
        if (snakee.isEatingApple(applee)) {
          score++;
          snakee.ateApple = true;
          do {
            applee.setNewPosition();
          } while (applee.isOnSnake(snakee));
        }
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawScore();
        snakee.draw();
        applee.draw();
        setTimeout(refreshCanvas, delay);
      }
    }

    function gameOver() {
      ctx.save();
      ctx.font = "bold 70px sans-serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      var centreX = canvasWidth / 2;
      var centreY = canvasHeight / 2;

      ctx.strokeText("Game Over", centreX, centreY - 180);
      ctx.fillText("Game Over", centreX, centreY - 180);
      ctx.font = "bold 30px sans-serif";
      ctx.strokeText(
        "Appuyer sur la touche espace pour rejouer",
        centreX,
        centreY - 120
      );
      ctx.fillText(
        "Appuyer sur la touche espace pour rejouer",
        centreX,
        centreY - 120
      );

      ctx.restore();
    }

    function restart() {
      snakee = new Snake(
        [
          [6, 4],
          [5, 4],
          [4, 4],
          [3, 4],
          [2, 4],
        ],
        "right"
      );
      applee = new Apple([10, 10]);
      score = 0;
      refreshCanvas();
    }
    //on rafraichi la position du rect par rapport au coord que nous lui donnons, mais il faut aussi effacer l'ancienne position du rect, clearRect efface tous le canvas de la position 0x a 0y

    function drawScore() {
      ctx.save();
      ctx.font = "bold 200px sans-serif";
      ctx.fillStyle = "gray";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      var centreX = canvasWidth / 2;
      var centreY = canvasHeight / 2;
      ctx.fillText(score.toString(), centreX, centreY);
      ctx.restore();
    }
    function drawBlock(ctx, position) {
      var x = position[0] * blockSize;
      var y = position[1] * blockSize;
      ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction) {
      this.body = body;
      this.direction = direction;
      this.ateApple = false;
      this.draw = function () {
        ctx.save();
        ctx.fillStyle = "#ff0000";
        for (var i = 0; i < this.body.length; i++) {
          drawBlock(ctx, this.body[i]);
        }
        ctx.restore();
      };
      this.advance = function () {
        var nextPosition = this.body[0].slice();
        switch (this.direction) {
          case "left":
            nextPosition[0] -= 1;
            break;
          case "right":
            nextPosition[0] += 1;
            break;
          case "down":
            nextPosition[1] += 1;
            break;
          case "up":
            nextPosition[1] -= 1;
            break;
          default:
            throw "invalid direction";
        }
        // L'instruction switch évalue une expression et, selon le résultat obtenu et le cas associé, exécute les instructions correspondantes. pour "left" la position suivante du [0] qui est equivalent au x sera de +1
        this.body.unshift(nextPosition);
        if (!this.ateApple) this.body.pop();
        else this.ateApple = false;
      };
      this.setDirection = function (newDirection) {
        var allowedDirection;
        switch (this.direction) {
          case "left":
          case "right":
            allowedDirection = ["up", "down"];
            break;
          case "down":
          case "up":
            allowedDirection = ["left", "right"];
            break;
          default:
            throw "invalid direction";
        }
        if (allowedDirection.indexOf(newDirection) > -1) {
          this.direction = newDirection;
        }
      };
      this.checkCollision = function () {
        var wallCollision = false;
        var snakeCollision = false;
        var head = this.body[0];
        var rest = this.body.slice(1);
        var snakeX = head[0];
        var snakeY = head[1];
        var minX = 0;
        var minY = 0;
        var maxX = widthInBlocks - 1;
        var maxY = heightInBlocks - 1;
        var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
        var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;

        if (isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls) {
          wallCollision = true;
        }
        for (var i = 0; i < rest.length; i++) {
          if (snakeX === rest[i][0] && snakeY === rest[i][1]) {
            snakeCollision = true;
          }
        }
        return wallCollision || snakeCollision;
      };
      this.isEatingApple = function (appleToEat) {
        var head = this.body[0];
        if (
          head[0] === appleToEat.position[0] &&
          head[1] === appleToEat.position[1]
        )
          return true;
        else return false;
      };
      //ici le [0] est la position x, donc le serpent bouge de x+1, si le serpent bouge sur l'axe y on le remplacera par [1]
    }

    function Apple(position) {
      this.position = position;
      this.draw = function () {
        ctx.save();
        ctx.fillStyle = "#33cc33";
        ctx.beginPath();
        var radius = blockSize / 2;
        var x = this.position[0] * blockSize + radius;
        var y = this.position[1] * blockSize + radius;
        ctx.arc(x, y, radius, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.restore();
      };
      this.setNewPosition = function () {
        var newX = Math.round(Math.random() * (widthInBlocks - 1));
        var newY = Math.round(Math.random() * (heightInBlocks - 1));
        this.position = [newX, newY];
      };

      this.isOnSnake = function (snakeToCheck) {
        var isOnSnake = false;

        for (var i = 0; i < snakeToCheck.body.length; i++) {
          if (
            this.position[0] === snakeToCheck.body[i][0] &&
            this.position[1] === snakeToCheck.body[i][1]
          ) {
            isOnSnake = true;
          }
        }
        return isOnSnake;
      };
    }
    document.onkeydown = function handleKeyDown(
      e
    ) // documentonload décrit une situation quand la page s'affiche alors que onkeydown reéagit a la commande de utilisateur. e = evenement, on decrit ce qu'il se passe pour chaque event
    {
      var key = e.keyCode;
      var newDirection;
      switch (key) {
        case 37:
          newDirection = "left";
          break;
        case 38:
          newDirection = "up";
          break;
        case 39:
          newDirection = "right";
          break;
        case 40:
          newDirection = "down";
          break;
        case 32:
          restart();
          return;
          break;
        default:
          return;
      }
      snakee.setDirection(newDirection);
    };
  };
