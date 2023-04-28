let currentLastIndex = 0;
let currentData = null;

(function ($) {
  "use strict";

  $('#moreContentButton').click(function() {
    setEventContent(currentLastIndex + 1)
  });

  $(document).ready(function () {
    loadEventContent();    
  });
})(jQuery);

function setEventContent(fromIndex) {
  let allCount = 0;
  currentData.events.some(function(ele, index, array) {
    
    if (fromIndex > index) {
      return false;
    }

    let strContent = '<li> \
                        <a href="events_view.html?pid=' + index + '" class="feed-item">';

    if (ele.hasOwnProperty('image') && ele.image != "") {
        strContent += '<img src="' + ele.image + '" alt="Image">';
    }
    else {
        strContent += '<img src="assets/images/events-default.png" alt="Image">';
    }
                          
                          
    strContent +=           '<div class="feed-item-content"> \
                            <h3>' + ele.title + '</h3> \
                            <span>' + ele.date + '</span> \
                          </div> \
                        </a> \
                      </li>';

    $("#event_list").append(strContent);

    allCount++;
    currentLastIndex = index;
    if (allCount >= 5) {
      return true;
    }
  });



  if (currentLastIndex < (currentData.events.length - 1)) {
    $("#event_more_button_area").show();
  }
  else {
    $("#event_more_button_area").hide();
  }
}

function loadEventContent() {
  const timestamp = Date.now();
  $.getJSON("/events.json?v=" + timestamp, function(json) {
    currentData = json;
    setEventContent(currentLastIndex);
  });
}

