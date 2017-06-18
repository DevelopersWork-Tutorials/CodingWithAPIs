var channelActivitiesUpload=[],channelActivitiesVideoView=[],channelActivitiesSubscription=[],
	reference=[];

function buttonClickedSearchChannelActivities(){
	var keyword = document.getElementById('searchBar').value;
	var max = document.getElementById('maxResults').value;
	document.getElementById('display').innerHTML='Channel Keyword/Title/Id: <input id="searchBar"><br>\
			Max Results to be Displayed: <input id="maxResults" value="5"><br>\
			<button onClick="buttonClickedSearchChannelActivities()">submit</button>';
	searchChannelsCode(keyword);
	var YTCI = [];
	var i=0;
	channelActivitiesCode(channelId[i],max);
	YTCI = channelId;
	$('#display').append('<div id="'+channelId[i]+'"align="center"><img src="'+channelThumbnail[i]+'"/>\
			<a href="https://youtube.com/channel/'+channelId[i]+'" target="_blank"><H3>'+channelTitle[i]+'</H3></a>\
	</div>');
	for(j=0;j<reference.length;j++){
		channelActivitiesDisplay(YTCI[i],reference[j],j);
	}
};

function channelActivitiesCode(YouTubeChannelId,max=5){
	var API_KEY = API();
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/activities',
		data:{
			key:API_KEY,
			part:'contentDetails',
			maxResults:max,
			channelId:YouTubeChannelId
		},
		async:false,
		success:function(data){
			temp = data.items;
			for(var i=0;i<temp.length;i++){
				temp[i]=temp[i].contentDetails;
				if(temp[i].upload){
					channelActivitiesUpload[i] = temp[i].upload.videoId;
					reference[i]='upload';
				}else if(temp[i].bulletin){
					channelActivitiesVideoView[i] = temp[i].bulletin.resourceId.videoId;
					reference[i]='videoView';
				}else if(temp[i].subscription){
					channelActivitiesSubscription[i] = temp[i].subscription.resourceId.channelId;
					reference[i]='subscription';
				}
			}
		}
	});	
};

function channelActivitiesDisplay(YouTubeChannelId,i='.',j=0,){
	if(i=='upload'){
		$('#'+YouTubeChannelId).append('<div id="'+channelActivitiesUpload[j]+'"><h2>VIDEO UPLOAD:</h2>\
		<iframe src="https://youtube.com/embed/'+channelActivitiesUpload[j]+'"></iframe>\
		</div><br>');
	}else if(i=='videoView'){
		$('#'+YouTubeChannelId).append('<div id="'+channelActivitiesVideoView[j]+'"><h2>VIDEO VIEW:</h2>\
		<iframe src="https://youtube.com/embed/'+channelActivitiesVideoView[j]+'"></iframe>\
		</div><br>');
	}else if(i=='subscription'){
		searchChannelsCode(channelActivitiesSubscription[j]);
		$('#'+YouTubeChannelId).append('<div id="'+channelActivitiesSubscription[j]+'"><h2>SUBSCRIPTION:</h2>\
		<div id="'+channelId[0]+'"align="center"><img src="'+channelThumbnail[0]+'"/>\
			<a href="https://youtube.com/channel/'+channelId[0]+'" target="_blank"><H3>'+channelTitle[0]+'</H3></a>\
		</div>\
		</div><br>');
	}
	else $('#'+YouTubeChannelId).append('.<br>');	

}

