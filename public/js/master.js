$(document).ready(function(){
	var socket = io.connect('http://localhost:8000');
	socket.on('winner', function (data){
		$('#winner').html(data.winner);
	})
})