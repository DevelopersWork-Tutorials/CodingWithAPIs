 var channelSubscriberCount = [], channelViewCount = [], channelCommentCount = [], channelVideoCount = [];

function getNewChannel(){
	document.getElementById('display').innerHTML = '';
	this.keyword = prompt('Enter Channel Id/Title/username','Developers@Work');
	searchCode(this.keyword);
	var i=0;
	//for(i=0;i<temp.length;i++){
		channelsCountCode(channelId[i] , i);
		displayChannelsCount(i);
	//}
}


function channelsCountCode(channelId , i=0){
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
			channelSubscriberCount[i] = temp.statistics.subscriberCount;
			channelViewCount[i] = temp.statistics.viewCount;
			channelCommentCount[i] = temp.statistics.commentCount;
			channelVideoCount[i] = temp.statistics.videoCount;
		}
	});
}

function displayChannelsCount(i = 0){
	$('#display').append('\
		<div id="channel'+channelId[i]+'">\
			<img src="'+channelThumbnail[i]+'">\
			<h1 id="'+channelTitle[i]+'" onClick="getNewChannel()">'+channelTitle[i]+'</h1>\
			<h2 id="'+channelId[i]+'subscribers">Subscribers : '+channelSubscriberCount[i]+'</h2>\
			<h2 id="'+channelId[i]+'views">Channel Views: '+channelViewCount[i]+'</h2>\
			<h2 id="'+channelId[i]+'videos">Videos : '+channelVideoCount[i]+'</h2>\
			<h2 id="'+channelId[i]+'comments">Comments : '+channelCommentCount[i]+'</h2>\
		</div>\
	');
}
