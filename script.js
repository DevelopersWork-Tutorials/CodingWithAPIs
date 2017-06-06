 var subscriberCount = [],viewCount=[],commentCount=[],videoCount = [];
 
$(document).ready(function(){
	this.keyword = 'Developers@Work';
	searchCode(this.keyword);
	var i=0;
	//for(i=0;i<temp.length;i++){
		countCode(channelId[i] , i);
		displaychannelscount(i);
	//}
});

function getNewChannel(){
	document.getElementById('display').innerHTML = '';
	this.keyword = prompt('Enter Channel Id/Title/username','Developers@Work');
	searchCode(this.keyword);
	var i=0;
	//for(i=0;i<temp.length;i++){
		countCode(channelId[i] , i);
		displaychannelscount(i);
	//}
}


function countCode(channelId , i=0){
	var API_KEY = API();
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/channels',
		data:{
			key : API_KEY,
			id : channelId,
			part : 'statistics'
		},
		async :false,
		success : function(data){
			var temp = data.items[0];
			subscriberCount[i] = temp.statistics.subscriberCount;
			viewCount[i] = temp.statistics.viewCount;
			commentCount[i] = temp.statistics.commentCount;
			videoCount[i] = temp.statistics.videoCount;
		}
	});
}

function displaychannelscount(i){
	$('#display').append('\
		<div id="channel'+channelId[i]+'">\
			<img src="'+channelThumbnail[i]+'">\
			<h1 id="'+channelTitle[i]+'" onClick="getNewChannel()">'+channelTitle[i]+'</h1>\
			<h2 id="'+channelId[i]+'">Subscribers : '+subscriberCount[i]+'</h2>\
			<h2 id="'+channelId[i]+'">Channel Views: '+viewCount[i]+'</h2>\
			<h2 id="'+channelId[i]+'">Videos : '+videoCount[i]+'</h2>\
			<h2 id="'+channelId[i]+'">Comments : '+commentCount[i]+'</h2>\
		</div>\
	');
}