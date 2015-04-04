$(document).ready(function (){
	var myID,
		emotionList;
	var request = new XMLHttpRequest(),
	socket = io.connect('http://localhost:8000');

	request.onload = function(){
		var emotionText = this.responseText;
		console.log(emotionText);
		emotionList = emotionText.split('\n');
		socket.emit('emotions', {l: emotionList.length});
	}

request.open('GET', '../assets/emotions.txt', true);
request.send();

	
	socket.on('entrance', function (data){
		myID = data.id;
		message = data.message;
		console.log(message, 'Your id is ' + myID + '.');
	})

	socket.on('newEmotion', function(data){
		$('#choice-one').html(emotionList[data.emotionOne]);
		$('#choice-two').html(emotionList[data.emotionTwo]);
	})

	$('.choice').click(function(){
		socket.emit('vote', {vote: $(this).html()})
	})

})