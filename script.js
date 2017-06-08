var temp = [],
	commentedId = [],commentedTotalReplyCount=[],
	commentedAuthorDisplayName=[],commentedAuthorProfileImageUrl=[],commentdAuthorChannelId=[],
	commentedTextDisplay=[],commentedLikeCount=[],commentedPublishedAt=[],commentedUpdatedAt=[];

function commentsOnAVideoCode(YouTubeVideoId,max='10'){
	var API_KEY = API();
	
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/commentThreads',
		data:{
			key:API_KEY,
			part:'snippet',
			order:'time',
			maxResults:max,
			videoId:YouTubeVideoId
		},
		async:false,
		success:function(data){
			temp = data.items;
			
			for(var i=0;i<temp.length;i++){
				commentedId[i] = temp[i].id;
				commentedTotalReplyCount[i] = temp[i].snippet.totalReplyCount;
				
				commentedAuthorDisplayName[i] = temp[i].snippet.topLevelComment.snippet.authorDisplayName; 
				commentedAuthorProfileImageUrl[i] = temp[i].snippet.topLevelComment.snippet.authorProfileImageUrl;
				commentdAuthorChannelId[i] = temp[i].snippet.topLevelComment.snippet.authorChannelId.value;
				
				commentedTextDisplay[i] = temp[i].snippet.topLevelComment.snippet.textDisplay;
				commentedLikeCount[i] = temp[i].snippet.topLevelComment.snippet.likeCount;
				commentedPublishedAt[i] = temp[i].snippet.topLevelComment.snippet.publishedAt;
				commentedUpdatedAt[i] = temp[i].snippet.topLevelComment.snippet.updatedAt;
			}
		}
	});
};

function commentsOnAVideoDisplay(YouTubeVideoId){
	for(var i=0;i<temp.length;i++){
		$('#video'+YouTubeVideoId).append('\
			<div id="comment'+commentedId[i]+'">\
				<img src="'+commentedAuthorProfileImageUrl[i]+'">\
				<a href="https://youtube.com/channel/'+commentdAuthorChannelId[i]+'" target="_blank">\
					<h1 id="'+commentdAuthorChannelId+commentedId[i]+'">"'+commentedAuthorDisplayName[i]+'"</h1>\
				</a>\
				<h2 id="'+commentedId[i]+'">\
					Comment:'+commentedTextDisplay[i]+'<br>\
					Replies:'+commentedTotalReplyCount[i]+'<br>\
					Likes for Comment:'+commentedLikeCount[i]+'<br>\
					Commented At:'+commentedPublishedAt[i]+'<br>\
					Last Edited:'+commentedUpdatedAt[i]+'<br></h2>\
			</div>\
		');
	}
};

function buttonClickedSearchCommentsByVideoId(){
	this.keyword = document.getElementById('searchBar').value;
	document.getElementById('display').innerHTML = 'Video Keyword/Title/Id: <input id="searchBar"><br>\
		Max Results to be Displayed: <input id="maxResults" value="25"><br>\
		<button onClick="buttonClickedSearchCommentsByVideoId()">submit</button>';
	
	searchVideosCode(keyword);
	var i=0;
	//for(i=0;i<videoId.length;i++){
		videosCountCode(videoId[i]);
		displayVideosCount(i);
		commentsOnAVideoCode(videoId[i]);
		document.getElementById(videoTitle[i]).outerHTML = '<h1 id="'+videoTitle[i]+'">'+videoTitle[i]+'</h1>';
		commentsOnAVideoDisplay(videoId[i]);
	//}
	
};

