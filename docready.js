
$(document).ready(function(){
	var keyword = 'Building Android Device Tree Developers@Work';
	searchVideosCode(keyword);
	var i=0;
	//for(i=0;i<videoId.length;i++){
		videosCountCode(videoId[i]);
		displayVideosCount(i);
		commentsOnAVideoCode(videoId[i]);
		document.getElementById(videoTitle[i]).outerHTML = '<h1 id="'+videoTitle[i]+'">'+videoTitle[i]+'</h1>';
		commentsOnAVideoDisplay(videoId[i]);
	//}
});
