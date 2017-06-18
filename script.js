var commentRepliedId = [],
	commentRepliedAuthorDisplayName=[],commentRepliedAuthorProfileImageUrl=[],
	commentRepliedAuthorChannelId=[],commentRepliedTextDisplay=[],
	commentRepliedLikeCount=[],
	commentRepliedPublishedAt=[],commentRepliedUpdatedAt=[];

function buttonClickedSearchCommentRepliesByVideoId(){
	var keyword = document.getElementById('searchBar').value;
	document.getElementById('display').innerHTML = 'Video Keyword/Title/Id: <input id="searchBar"><br>\
		Max Results to be Displayed: <input id="maxResults" value="25"><br>\
		<button onClick="buttonClickedSearchCommentsByVideoId()">submit</button>';
	searchVideosCode(keyword);
	var i = 0,j = 0;
	//for(i=0;i<videoId.length;i++){
		commentsOnAVideoCode(videoId[i]);
		videosCountCode(videoId[i]);
		displayVideosCount(i);
		for(j=0;j<commentedId.length;j++){
				if(commentedTotalReplyCount[j]>0){
					document.getElementById(videoTitle[i]).outerHTML = '<h1 id="'+videoTitle[i]+'">'+videoTitle[i]+'</h1>';
					commentRepliesOnAVideoCode(commentedId[j]);
					commentRepliesOnAVideoDisplay(videoId[i],commentedId[j],j);
				}
		}
		
	//}
};

function commentRepliesOnAVideoCode(YouTubeCommentId,max=10){
	var API_KEY = API();
	
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/comments',
		data:{
			key:API_KEY,
			parentId:YouTubeCommentId,
			part:'snippet',
			maxResults:max
		},
		async:false,
		success:function(data){
			temp = data.items;
			
			for(var i=0;i<temp.length;i++){
				
				commentRepliedId[i] = temp[i].id;
				
				commentRepliedAuthorDisplayName[i] = temp[i].snippet.authorDisplayName;
				commentRepliedAuthorProfileImageUrl[i] = temp[i].snippet.authorProfileImageUrl;
				commentRepliedAuthorChannelId[i] = temp[i].snippet.authorChannelId.value;
				commentRepliedTextDisplay[i] = temp[i].snippet.textDisplay;
				
				commentRepliedLikeCount[i] = temp[i].snippet.likeCount;
				commentRepliedPublishedAt[i] = temp[i].snippet.publishedAt;
				commentRepliedUpdatedAt[i] = temp[i].snippet.updatedAt;
			}
		}
	});
};

function commentRepliesOnAVideoDisplay(YouTubeVideoId,YouTubeCommentedId,i=0){
	$('#video'+YouTubeVideoId).append('\
			<div id="comment'+commentedId[i]+'" style="border:5px solid red">\
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
			<br><br></div>\
	');
	for(i=0;i<temp.length;i++){
		$('#comment'+YouTubeCommentedId).append('\
			<div id="reply'+commentRepliedId[i]+'">\
				<img src="'+commentRepliedAuthorProfileImageUrl[i]+'">\
				<a href="https://youtube.com/channel/'+commentRepliedAuthorChannelId[i]+'" target="_blank">\
					<h1 id="'+commentRepliedAuthorChannelId+commentRepliedId[i]+'">"'+commentRepliedAuthorDisplayName[i]+'"</h1>\
				</a>\
				<h2 id="'+commentedId[i]+'">\
					Reply:'+commentRepliedTextDisplay[i]+'<br>\
					Likes for Reply:'+commentRepliedLikeCount[i]+'<br>\
					Commented At:'+commentRepliedPublishedAt[i]+'<br>\
					Last Edited:'+commentRepliedUpdatedAt[i]+'<br></h2>\
			</div>\
		');
	}
};

