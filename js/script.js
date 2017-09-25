'use strict';

var searchForm = document.querySelector('#search-form');
var searchString = searchForm.querySelector('#search-string');
var btn = searchForm.querySelector('#search-btn');
var resetContainer = searchForm.querySelector('.reset-container');
var resetIcon = searchForm.querySelector('.reset-icon');


//data value of autocomplete
$("#search-string").autocomplete({
  source: function( request, response ) {

        var url = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);
        var searchString = request.term;

          if (searchString.match(url)) {
            //check url type
            var url = new URL(searchString);

            response ([{value: url.href, label: url.href, type: "Phrase Overview"},
                      {value: url.hostname, label: url.hostname, type: "Domain Overview"},
                      {value: url.href.replace(/https?:\/\//i, ""), label: url.href.replace(/https?:\/\//i, ""), type: "URL Overview"}
                    ]);
          } else {
            response(["No match"]);
          }
      },
      //create links of data
      select: function( event, ui ) {
            window.location.href = ui.item.value;
        },
      }).data("ui-autocomplete")._renderItem = function (ul, item) {
                 return $("<li>").append("<a href='http://www.google.com'>"+item.label+"</a>" + "" + "<p>in</p>" + "<span>" +item.type+ "</span>").appendTo(ul);
               };

searchString.oninput = function() {
  if (!searchString.value) {
    btn.style.backgroundColor = '#e6997d';
  } else {
    btn.style.backgroundColor = '#d45622';
  }
};
//available / disable to click button
function check() {
    if ($('#search-string').val() != '') {
        $('#search-btn').removeAttr('disabled');
      }  else {
        $('#search-btn').attr('disabled','disable');
      }
};


resetIcon.onclick = function () {
  searchString.value = '';
};


// POST-method
$('form').submit(function () {
    var formID = $(this).attr('id');
    var formNm = $('#' + formID);
    $.ajax({
      type: 'GET',
      url: 'https://www.superanalytics.com',
      success: function (data) {
            alert( "Data Saved: ");
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
          alert("some error");
      }
    });
    return false;
});
