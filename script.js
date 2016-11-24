var Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;
var c;
var ctx;
var state = {};
var properties = {
    minBallSpeed: 2,
	width: 210,
	height: 160,
	ballRad: 5,
	paddleSpeed: 5,
	paddleHeight: 30,
	paddleWidth: 10,
	maxTime: 1000,
	speedIncreaseFac: 1,
	maxBallSpeed: 3
};
var currentPlayer = 1;
var aiScore = 0;
var humanScore = 0;
var neuralNetwork;
var humanDir = 0;

jQuery(document).ready(function () {
    var json = '{"neurons":[{"bias":0.00000000000000,"layer":"input","squash":"HLIM"},{"bias":0.00000000000000,"layer":"input","squash":"HLIM"},{"bias":0.00000000000000,"layer":"input","squash":"HLIM"},{"bias":0.00000000000000,"layer":"input","squash":"HLIM"},{"bias":0.00000000000000,"layer":"input","squash":"HLIM"},{"bias":0.00000000000000,"layer":"input","squash":"HLIM"},{"bias":89.32392810763156,"layer":"0","squash":"HLIM"},{"bias":-3.39876852753873,"layer":"0","squash":"HLIM"},{"bias":-49.01656825297027,"layer":"0","squash":"HLIM"},{"bias":-0.82115360453114,"layer":"0","squash":"HLIM"},{"bias":-0.49426009022181,"layer":"0","squash":"HLIM"},{"bias":-0.44062906624952,"layer":"0","squash":"HLIM"},{"bias":0.25086552696106,"layer":"0","squash":"HLIM"},{"bias":-0.17062863904231,"layer":"0","squash":"HLIM"},{"bias":-16.03458970368008,"layer":"0","squash":"HLIM"},{"bias":-0.14168848474502,"layer":"0","squash":"HLIM"},{"bias":-10.89494273263442,"layer":"output","squash":"HLIM"},{"bias":1.83022599817942,"layer":"output","squash":"HLIM"}],"connections":[{"from":0,"to":6,"weight":-1.83434114671776},{"from":0,"to":7,"weight":-0.13736721765393},{"from":0,"to":8,"weight":0.06042591849122},{"from":0,"to":9,"weight":1.01677673862315},{"from":0,"to":10,"weight":0.68393007293868},{"from":0,"to":11,"weight":129.70632121693933},{"from":0,"to":12,"weight":0.09686530727802},{"from":0,"to":13,"weight":-0.01702442201332},{"from":0,"to":14,"weight":-21.55475849749588},{"from":0,"to":15,"weight":7.41632359104463},{"from":1,"to":6,"weight":0.21079735177363},{"from":1,"to":7,"weight":71.58424238440050},{"from":1,"to":8,"weight":22.82071863116554},{"from":1,"to":9,"weight":103.42337762761591},{"from":1,"to":10,"weight":0.75239614067290},{"from":1,"to":11,"weight":-0.07650368896797},{"from":1,"to":12,"weight":-10.89873605354676},{"from":1,"to":13,"weight":-74.10466480825673},{"from":1,"to":14,"weight":2.02739946423802},{"from":1,"to":15,"weight":18.60428550224085},{"from":2,"to":6,"weight":-5.32056029985146},{"from":2,"to":7,"weight":-11.99543758406999},{"from":2,"to":8,"weight":-0.15266369964954},{"from":2,"to":9,"weight":-0.08479635127212},{"from":2,"to":10,"weight":0.41674623528173},{"from":2,"to":11,"weight":-96.11083192939817},{"from":2,"to":12,"weight":-0.13272643015713},{"from":2,"to":13,"weight":-5.70606250869023},{"from":2,"to":14,"weight":0.16850351621326},{"from":2,"to":15,"weight":-0.47896184647210},{"from":3,"to":6,"weight":34.05029069707081},{"from":3,"to":7,"weight":-21.96496779655246},{"from":3,"to":8,"weight":80.59599873144663},{"from":3,"to":9,"weight":0.40400333468348},{"from":3,"to":10,"weight":-0.08897134532764},{"from":3,"to":11,"weight":-0.01698462880237},{"from":3,"to":12,"weight":48.01148685891886},{"from":3,"to":13,"weight":-40.31496941702332},{"from":3,"to":14,"weight":0.83406088108209},{"from":3,"to":15,"weight":1.10238371465802},{"from":4,"to":6,"weight":2.45657094530238},{"from":4,"to":7,"weight":-16.75013452639183},{"from":4,"to":8,"weight":6.73811005643270},{"from":4,"to":9,"weight":-96.94220951323095},{"from":4,"to":10,"weight":-26.42442675234518},{"from":4,"to":11,"weight":0.76181941050212},{"from":4,"to":12,"weight":44.21751122644254},{"from":4,"to":13,"weight":4.50631742555085},{"from":4,"to":14,"weight":1.33493105177307},{"from":4,"to":15,"weight":-1.96252870548738},{"from":5,"to":6,"weight":-0.24649250413148},{"from":5,"to":7,"weight":3.63816325724744},{"from":5,"to":8,"weight":-0.25952670881378},{"from":5,"to":9,"weight":-0.24716363196822},{"from":5,"to":10,"weight":-10.42526285216544},{"from":5,"to":11,"weight":6.73025667330522},{"from":5,"to":12,"weight":-0.06069575886317},{"from":5,"to":13,"weight":0.39203532224167},{"from":5,"to":14,"weight":0.01270032902012},{"from":5,"to":15,"weight":-0.31624402542294},{"from":6,"to":16,"weight":20.44715872949202},{"from":6,"to":17,"weight":173.46787350830792},{"from":7,"to":16,"weight":2.34238015632987},{"from":7,"to":17,"weight":-0.13748000676156},{"from":8,"to":16,"weight":0.21191953805190},{"from":8,"to":17,"weight":-0.09681302135620},{"from":9,"to":16,"weight":174.28949122939252},{"from":9,"to":17,"weight":-14.46193483661344},{"from":10,"to":16,"weight":-4.25609983545818},{"from":10,"to":17,"weight":11.88901060860286},{"from":11,"to":16,"weight":-25.00932611876172},{"from":11,"to":17,"weight":0.13318333762406},{"from":12,"to":16,"weight":-0.12537284976948},{"from":12,"to":17,"weight":42.97709628630680},{"from":13,"to":16,"weight":0.07432607353801},{"from":13,"to":17,"weight":-0.20093877355703},{"from":14,"to":16,"weight":-45.04130910722954},{"from":14,"to":17,"weight":0.18258087350938},{"from":15,"to":16,"weight":-16.60169096515994},{"from":15,"to":17,"weight":12.82732242768298}]}';
    neuralNetwork = Network.fromJSON(JSON.parse(json));
    neuralNetwork.optimized = false;
  //  neuralNetwork = new Architect.Perceptron(6, 3, 2);
	var input = [];
	input[0] = 1;
	input[1] = 1;
	input[2] = 1;
	input[3] = 1;
	input[4] = 1;
	input[5] = 1;
    var output = neuralNetwork.activate(input);
    console.log(output);
    $('#canvas').attr('width', properties.width + properties.paddleWidth * 2);
    $('#canvas').attr('height', properties.height);
    c = document.getElementById("canvas");
    ctx = c.getContext("2d");
    document.onkeydown = keydown;
    document.onkeyup = keyup;

    startNewGame();
    setInterval(doStep, 20);
    refreshScoreDisplay();
});

var keydown = function(e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        humanDir = -1;
    }
    else if (e.keyCode == '40') {
        humanDir = 1;
    }
}

var keyup = function(e) {
    e = e || window.event;

    if (e.keyCode == '38' && humanDir === -1) {
        humanDir = 0;
    }
    else if (e.keyCode == '40' && humanDir === 1) {
        humanDir = 0;
    }
}

var doStep = function() {
    if (whoHasWon() !== 0) {
        if (whoHasWon() == -1)
            humanScore++;
        else
            aiScore++;
        refreshScoreDisplay();
        startNewGame()
    }

    currentPlayer = 1;
    executeAI();
    currentPlayer = -1;
    executeHuman();

    advanceBall(1);

    redraw();
}

var advanceBall = function(fac)
{
	var nextBallPosX = state.ballPosX + state.ballVelX * fac;
	var nextBallPosY = state.ballPosY + state.ballVelY * fac;

	var colTimeX = 0, colTimeY = 0;

	if (nextBallPosY <= 0)
		colTimeY = state.ballPosY / -state.ballVelY;

	if (nextBallPosY + properties.ballRad >= properties.height)
		colTimeY = (properties.height - (state.ballPosY + properties.ballRad)) / state.ballVelY;

	if (nextBallPosX <= 0)
		colTimeX = state.ballPosX / -state.ballVelX;

	if (nextBallPosX + properties.ballRad >= properties.width)
		colTimeX = (properties.width - (state.ballPosX + properties.ballRad)) / state.ballVelX;


	if (colTimeX > 0 && (colTimeY == 0 || colTimeX <= colTimeY))
	{
		advanceBallWithoutCollision(colTimeX);
		if ((state.ballVelX > 0 && state.ballPosY + properties.ballRad >= state.paddle1Pos && state.ballPosY <= state.paddle1Pos + properties.paddleHeight) ||
			(state.ballVelX < 0 && state.ballPosY + properties.ballRad >= state.paddle2Pos && state.ballPosY <= state.paddle2Pos + properties.paddleHeight))
		{
			if (state.ballVelX > 0)
				state.ballCollidedWithPaddle = true;
			state.ballVelX *= -1;
			advanceBall(fac - colTimeX);
			if (Math.abs(state.ballVelX * properties.speedIncreaseFac) < properties.maxBallSpeed && Math.abs(state.ballVelY * properties.speedIncreaseFac) < properties.maxBallSpeed){
				state.ballVelX *= properties.speedIncreaseFac;
				state.ballVelY *= properties.speedIncreaseFac;
			}
		}
		else
		{
			advanceBallWithoutCollision(fac - colTimeX);
		}
	}
	else if (colTimeY > 0)
	{
		advanceBallWithoutCollision(colTimeY);
		state.ballVelY *= -1;
		advanceBall(fac - colTimeY);
	}
	else
		advanceBallWithoutCollision(fac);
}

var advanceBallWithoutCollision = function(fac)
{
	state.ballPosX += state.ballVelX * fac;
	state.ballPosY += state.ballVelY * fac;
}

var movePaddle = function(dir)
{
	if (currentPlayer == 1)
	{
		if (dir == 1)
			state.paddle1Pos += properties.paddleSpeed;
		else if(dir == -1)
			state.paddle1Pos -= properties.paddleSpeed;
		state.paddle1Pos = Math.max(0.0, Math.min(properties.height - properties.paddleHeight, state.paddle1Pos));
	}
	else
	{
		if (dir == 1)
			state.paddle2Pos += properties.paddleSpeed;
		else if (dir == -1)
			state.paddle2Pos -= properties.paddleSpeed;
		state.paddle2Pos = Math.max(0.0, Math.min(properties.height - properties.paddleHeight, state.paddle2Pos));
	}
}

var whoHasWon = function()
{
	if (state.ballPosX + properties.ballRad >= properties.width)
		return -1;
	else if (state.ballPosX <= 0)
		return 1;
	else
		return 0;
}

var startNewGame = function()
{
	state.ballPosX = properties.width / 2;
	state.ballPosY = properties.height / 2;
	
	state.ballVelX =  Math.random()  * (properties.maxBallSpeed - properties.minBallSpeed) / 8.0 + properties.minBallSpeed;
	if ( Math.random() > 0.5)
		state.ballVelX *= -1;
	state.ballVelY =  Math.random() * (properties.maxBallSpeed - properties.minBallSpeed) / 8.0 + properties.minBallSpeed;
	if ( Math.random() > 0.5)
		state.ballVelY *= -1;

	//state.ballVelX = 3;
	//state.ballVelY = 3;

	state.paddle1Pos = properties.height / 2;
	state.paddle2Pos = properties.height / 2;
}

var executeAI = function () {
    var input = [];
	input[0] = currentPlayer * state.ballPosX / properties.width;
	input[1] = state.ballPosY / properties.height;
	input[2] = currentPlayer * state.ballVelX / properties.maxBallSpeed;
	input[3] = state.ballVelY / properties.maxBallSpeed;
	if (currentPlayer == 1)
	{
		input[4] = state.paddle1Pos / (properties.height - properties.paddleHeight);
		input[5] = state.paddle2Pos / (properties.height - properties.paddleHeight);
	}
	else
	{
		input[5] = state.paddle1Pos / (properties.height - properties.paddleHeight);
		input[4] = state.paddle2Pos / (properties.height - properties.paddleHeight);
	}

    var output = neuralNetwork.activate(input);

    if (output[0] > 0.5)
		movePaddle(1);
	else if (output[1] > 0.5)
		movePaddle(-1);
}


var executeHuman = function () {
    if (humanDir !== 0)
		movePaddle(humanDir);
}


var refreshScoreDisplay = function() {
    $("#score").html("You " + humanScore + " - " + aiScore + " AI");
}


var redraw = function () {
    ctx.clearRect(0, 0, properties.width + 2 * properties.paddleWidth, properties.height);
    drawPaddles();
    drawBall();
}

var drawPaddles = function () {
    ctx.fillRect(0, state.paddle2Pos, properties.paddleWidth, properties.paddleHeight);
    ctx.fillRect(properties.width + properties.paddleWidth, state.paddle1Pos, properties.paddleWidth, properties.paddleHeight);
}

var drawBall = function () {    
    ctx.beginPath();
    ctx.arc(state.ballPosX + properties.paddleWidth + properties.ballRad / 2, state.ballPosY + properties.ballRad / 2, properties.ballRad / 2, 0, 2 * Math.PI, false);
    ctx.fill();
}

