var videoViewCount = [],videoCommentCount = [],
videoLikeCount = [],videoDislikeCount = [],videoFavoriteCount = [];

function getNewVideo(){
	document.getElementById('display').innerHTML = '';
	this.keyword = prompt('Enter Video Id/Title/keyword','Developers@Work');
	searchVideosCode(this.keyword);
	videosCountCode(videoId[0]);
	displayVideosCount();
}

function videosCountCode(YouTubeVideoId , i=0){
	var API_KEY = API();
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/videos',
		data:{
			key:API_KEY,
			part:'statistics',
			id:YouTubeVideoId
		},
		async:false,
		success:function(data){
			var temp = data.items[0];
			videoViewCount[i] = temp.statistics.viewCount; 
			videoCommentCount[i] = temp.statistics.commentCount;
			videoLikeCount[i] = temp.statistics.likeCount;
			videoDislikeCount[i] = temp.statistics.dislikeCount;
			videoFavoriteCount[i] = temp.statistics.favoriteCount;
		}
	});
}

function displayVideosCount(i=0){
	$('#display').append('\
		<div id="video'+videoId[i]+'">\
			<img src="'+videoThumbnail[i]+'">\
			<h1 id="'+videoTitle[i]+'" onClick="getNewVideo()">'+videoTitle[i]+'</h1>\
			<h2 id="'+videoId[i]+'views">Video Views : '+videoViewCount[i]+'</h2>\
			<h2 id="'+videoId[i]+'likes">Likes: '+videoLikeCount[i]+'</h2>\
			<h2 id="'+videoId[i]+'comments">Comments : '+videoCommentCount[i]+'</h2>\
			<h2 id="'+videoId[i]+'dislikes">Dislikes : '+videoDislikeCount[i]+'</h2>\
		</div>\
	');
}