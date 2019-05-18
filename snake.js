var advanceGame = function() {
  var newSnake = moveSnake(snake);

  if (ate(newSnake, snake)) {
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! You ate yourself!");
  }

  if (ate(newSnake, [apple])) {
    newSnake = growSnake(newSnake);
    apple = CHUNK.randomLocation();
  }

  if (ate(newSnake, CHUNK.gameBoundaries())) {
    CHUNK.endGame();
    CHUNK.flashMessage("Whoops! you hit a wall!");
  }

  snake = newSnake;
  draw(snake, [apple]);
}


var ate = function(snake, otherThing) {
	var head = snake[0];
	return CHUNK.detectCollisionBetween([head], otherThing);
}

var changeDirection = function(direction) {
	snake[0].direction = direction;
}

// var drawSnake = function(snakeToDraw) {
// 	var drawableSnake = {color: "green", pixels: snakeToDraw };
// 	var drawableObjects = [drawableSnake];
// 	CHUNK.draw(drawableObjects);
// }
// draws the snake **

var draw = function(snake, apple) {
	var drawableSnake = { color: "green", pixels: snake };
	var drawableApple = { color: "red", pixels: apple };
	var drawableObjects = [drawableSnake, drawableApple];
	CHUNK.draw(drawableObjects);
}

// var growSnake = function(snake) {
// 	var indexOfLastSegment = snake.length - 1;
// 	var lastSegment = snake[indexOfLastSegment];
// 	snake.push({ top: lastSegment.top, left: lastSegment.left});
// 	return snake;
// }

var growSnake = function(snake) {
  var tipOfTailIndex = snake.length - 1;
  var tipOfTail = snake[tipOfTailIndex];
  snake.push({ top: tipOfTail.top, left: tipOfTail.left });
  return snake;
}

// var moveSegment = function(segment) {
// 	if (segment.direction === "down") {
// 		return { top: segment.top + 1, left: segment.left }
// 	} else if (segment.direction === "up") {
// 		return { top: segment.top - 1, left: segment.left }
// 	} else if (segment.direction === "right") {
// 		return { top: segment.top, left: segment.left + 1 }
// 	} else if (segment.direction === "left") {
// 		return { top: segment.top, left: segment.left - 1 }
// 	}
// 	return segment; 
// }
//does the same thing as code below; below is more efficient **

var moveSegment = function(segment) {
	switch(segment.direction){
		case "down":
			return {top: segment.top + 1, left: segment.left}
		case "up":
			return {top: segment.top - 1, left: segment.left}
		case "right":
			return {top: segment.top, left: segment.left + 1}
		case "left":
			return {top: segment.top, left: segment.left - 1}
		default:
			return segment;
	}
}

// var moveSnake = function(snake) {
// 	var newSnake = [];
// 	snake.forEach(function(oldSegment) {
// 		var newSegment = moveSegment(oldSegment);
// 		newSegment.direction = oldSegment.direction;
// 		newSnake.push(newSegment);
// });
// 	return newSnake;

// }
// same code as below; below is more efficient **

var moveSnake = function(snake) {
  return snake.map(function(oldSegment, segmentIndex) {
    var newSegment = moveSegment(oldSegment);
    newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
    return newSegment;
  });
}

var segmentFurtherForwardThan = function(index, snake) {
	if (snake[index - 1] === undefined) {
		return snake[index];
}	else {
	return snake[index - 1];
}
}

var apple = CHUNK.randomLocation();
var snake = [{ top: 1, left: 0, direction: "down"}, { top: 0, left: 0, direction: "down" }];
CHUNK.executeNTimesPerSecond(advanceGame, 3);
CHUNK.onArrowKey(changeDirection);
