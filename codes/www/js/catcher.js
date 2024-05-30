function log_error_to_slack(msg) {
  $.ajax({
    url:
      "https://hooks.slack.com/services/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",
    data: JSON.stringify({
      text: msg,
    }),
    type: "post",
    success: function (results) {
      //callback(JSON.parse(results))
    },
  });
}

window.onerror = function (msg, url, lineNo, columnNo, error) {
  var string = msg.toLowerCase();
  var substring = "script error";
  if (string.indexOf(substring) > -1) {
    alert("Script Error: See Browser Console for Detail");
  } else {
    var message = [
      "Message: " + msg,
      "URL: " + url,
      "Line: " + lineNo,
      "Column: " + columnNo,
      "Error object: " + JSON.stringify(error),
    ].join(" - ");

    log_error_to_slack(message);
  }
  return false;
};

