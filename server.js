var io = require('socket.io'),
	connect = require('connect'),
	app = connect().use(connect.static('public')).listen(8000),
	room = io.listen(app);

var ID = 0,
	emotionListLength,
	winningVote;


room.sockets.on('connection', function(socket){

	socket.emit('entrance', {
		message:'Welome to Twitch Plays Hamlet. Choose an emotion for our actors.',
		id: ID,
	});
	ID++;

	socket.on('emotions', function(data){
		emotionListLength = data.l;
		console.log("There are this many emotions: " + emotionListLength);

		(function(){
			socket.emit('newEmotion', {emotionOne: Math.floor(Math.random() * emotionListLength),
			emotionTwo: Math.floor(Math.random() * emotionListLength)})
		})();

		setInterval(function(){
			socket.emit('newEmotion', {emotionOne: Math.floor(Math.random() * emotionListLength),
			emotionTwo: Math.floor(Math.random() * emotionListLength)})
		}, 10000)
	})

	socket.on('vote', function(data){
		console.log(data.vote);
		winningVote = data.vote;
	})

	setInterval(function(){
		console.log("WINNER: " + winningVote);
		socket.emit('winner', {winner: winningVote});
	},3000)
})