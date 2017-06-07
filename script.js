var videoId = [],videoTitle = [],videoThumbnail = [],temp =[];

function embedVideosAfterSearch(){
	//document.getElementById('display').innerHTML = '';
	var count=1;
	for(var i=0;i<temp.length;i++){
		$('#display').append('\
		<iframe src="https://www.youtube.com/embed/'+videoId[i]+'"><iframe>\
		');
	}
}


function searchVideosCode(keyword){
	this.keyword = keyword || 'Developers@Work';
	var Api = API();
	$.ajax({
		url:'https://www.googleapis.com/youtube/v3/search',
		data:{
			q:this.keyword,
			key:Api,
			type:'video',
			videoEmbeddable:'true',
			part:'snippet'
		},
		async:false,
		success:function(data){
			temp = data.items;
			for(var i=0;i<temp.length;i++){
				videoId[i] = temp[i].id.videoId;
				videoTitle[i] = temp[i].snippet.title;
				videoThumbnail[i] = temp[i].snippet.thumbnails.default.url;
			}
		}
	});
}

function buttonClicked(){
	var keyword = document.getElementById('searchBar').value;
	searchVideosCode(keyword);
	embedVideosAfterSearch();
}








