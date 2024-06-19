var pushing = []
function displayfile(file) {
    console.log(file)
    $("#result").append(
        "<a href='" + SERVER + "storage/stream?id=" +
            file.id + "'>" + file.filename + "</a><br>"
    )
}

function init() {
    startsessionapi(function(sessionid) {
        getfiles(function(files) {
            console.log("Files");
            for(var file of files) {
                displayfile(file)
            }
        })
    })

  $("#upload").on("change", function (e) {
    e.preventDefault();
    // XXX TODO make working with mu
    var file = e.target.files[0];
    GLOBAL_FILE = file;
    $("#upload_vid_form").submit();
  })


  $("#submit").click(function (e) {
    e.preventDefault();
    var data = new FormData();
    data.append("file", GLOBAL_FILE, GLOBAL_FILE.name);
    data.append("source", window.location.host);

    var xhr = new XMLHttpRequest();

    // make working with mutiple
    console.log({
      title: "0%",
      text: "Video uploading please wait.",
      icon: "info",
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false,
    });

    xhr.upload.addEventListener("progress", updateProgress, false);
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this)
        if (this.status == 200) {
            var uploadid = JSON.parse(this.response)['id']
            $("#result").append(SERVER + "storage/stream?id=" + uploadid)
          console.log({
            title: "Good job!",
            text: "Video submitted successfully!",
            icon: "success",
          });
        } else {
          console.log({
            title: "Error Try Again",
            text: "Sorry, there is an error please try again later.",
            icon: "error",
            buttons: [true, "Retry"],
          }).then((retry) => {
            if (retry) {
              $("#upload").submit();
            }
          });
        }
      }
    });
    xhr.open("POST", SERVER + "storage/fileupload/");
    xhr.setRequestHeader("Authorization", localStorage.getItem("token"));
    xhr.send(data);
  });

}

function updateProgress(e) {
  if (e.lengthComputable) {
    console.log(e.loaded);
    console.log(e.loaded + " / " + e.total);
    var progress = e.loaded + " / " + e.total;
    $("#oprotg").html(
        "<div>Video uploading please wait: " + progress + "</div>")
  }
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function parseid()  {
    var id = getUrlVars()['id'];


    $("#video").html(
        '<video controls autoplay>' +
            "<source src='" + SERVER + 'storage/stream?id=' + id + "'" +
            ' type="video/mp4">' +
        '</video>')

}


window.addEventListener('DOMContentLoaded', init, false);
