/*
KewlTube - YouTube API Implementation
*/

// Create a function to get the data. Pass two parameters, one for the searchTerm
// and one for the callback.
function getData(searchTerm, callback) {
  // Create variable to hold the apiUrl, an object for the query parameters and requirements.
  var apiUrl = 'https://www.googleapis.com/youtube/v3/search';
  var query = {
    q: searchTerm,
    part: 'snippet',
    key: 'AIzaSyBMm-e7xij-SURbVFOzlT8sKPWPhxxoUSU',
    maxResults: 25
  };
  // Call the jQuery $.getJSON to make the ajax call.
  $.getJSON(apiUrl, query, successCall);
}

// Create a function to pass into the $.getJSON function to show the results.
function successCall(data) {
  return data.items.map(function(item, index) {
    // From the returned call, get variables for image thumbnail, page Id, and append them into the page.
    // This will append images into the #photos and show the image thumbnail with a link to the page
    // of the video.
    var itemThumbnailMediumUrl = item.snippet.thumbnails.medium.url;
    var itemPageId = item.id.videoId;
    var createPageUrl = 'https://www.youtube.com/watch?v=' + itemPageId;
    return $('#photos').append(
      '<a href="#" data-featherlight="#mylightbox"><img src="' + itemThumbnailMediumUrl + '"/></a>' +
      '<a href="' + createPageUrl + '" target="_blank">' + '<img src="' +  itemThumbnailMediumUrl + '"/></a>'
    );
  });
}

// Watch for submit.
$('.js-form').submit(function(event) {
  event.preventDefault();
  // Get the value of the input on submit.
  searchTerm = $('.js-input').val();
  // Run the getData function with the search term and the successCall.
  getData(searchTerm, successCall)
});
