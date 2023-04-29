(function ($) {
  "use strict";

  $(document).ready(function () {
    let pid = getQueryVariable("pid");
    loadEventContent(pid);
  });
})(jQuery);

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
          return decodeURIComponent(pair[1]);
      }
  }
}

function setEventContent(pid, data) {
  let ele = data.events[pid];
  $("#content_title").html(ele.title);
  $("#content_text").html(ele.content);
  $("#content_date").html(ele.date);
  if (ele.hasOwnProperty('image') && ele.image != "") {
    $("#content_image").attr("src", ele.image);
  }
  else {
    $("#content_image").hide();
  }
}

function loadEventContent(pid) {
  const timestamp = Date.now();
  $.getJSON("events.json?v=" + timestamp, function(json) {
    setEventContent(pid, json);
  });
}

