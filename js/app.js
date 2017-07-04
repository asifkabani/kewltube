/*
KewlTube - YouTube API Implementation

Low Level:
- Variable to hold the API key.
- Variable to hold the input of the search field.
- Variable to put the result of the user input, input into the API call string.
- Variable to hold the location of where the results will display on the page.
- Variable to hold the YouTube search URL to make the API call.
- Variable to attach the API key to the result call.
- Variable to hold the rendered HTML template for the search results.
- Variable to get the data from the API, with two parameters, searchTerm and callback.
- Variable to render the HTML from the API into the page.
- Variable for the submit button.
- Variable to get the thumbnail image for a video search from the API.
- Variable to hold the value of the page where the thumbnail is located (video page).
- Variable to get the channel from each video result.
- Variable to hold value of show more results (previous and next from the JSON).
- Variable to hold the value for the image url to show on to the page.

- Push the API key last on search
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
    var itemTitle = item.snippet.title;
    var createPageUrl = 'https://www.youtube.com/watch?v=' + itemPageId;
    return $('#photos').append(
      '<a href="' + createPageUrl + '" target="_blank">' + '<div class="overlay">' + '<p>' + itemTitle + '</p>' + '<img src="' +  itemThumbnailMediumUrl + '"/></div></a>'
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
  $("#photos").empty().append("");
});

// var kewlTube = function () {
//   var apiObj = {
//     key: 'AIzaSyBMm-e7xij-SURbVFOzlT8sKPWPhxxoUSU',
//     q: SEARCHTERM,
//     url: 'https://www.googleapis.com/youtube/v3',
//     ,
//
//   var getData = function(searchTerm, callback) {
//     var query = {
//       q: searchTerm + " in:name"
//     }
//
// var apiObj = {
//   q:SEARCHTERM,
//   key:API_KEY
// }
//
//   subtract = function(a, b) {
//     return a - b;
//   };
//
//   return {
//     add: add,
//     searchUrl: searchUrl,
//     subtract: subtract
//   };
// }();
