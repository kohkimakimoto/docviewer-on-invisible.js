$(function () {

  // Load files
  if (window.File && window.FileReader && window.FileList && window.Blob) {

  } else {
    alert('The File APIs are not fully supported in this browser.');
  }

//  document.getElementById('files').addEventListener('change', handleFileSelect, false);

  $("#LinkPageList").live("click", function(){

  });

  $("#linkHome").live("click", function(){

  });

  // Process page
  var page = getQueryString("page");
  if (page == "pagelist") {
    // pagelist
    $("#content").append("<h1>Page List</h1>");

    for(var i = 0; i < docs.length; i++) {
      var doc = docs[i];
      $("#content").append('<div><a href="?page=doc&doc=' + doc.link + '">' + doc.name + '</a></div>');
    }
  } else if (page == "doc"){
    // doc
    var doc = getQueryString("doc");
    $.get(doc, null, function(data){
      alert(data);
    });

    //$("#content").append('<iframe id="docdata" src="' + doc + '" onload="onLoadDocdata();">');
  }
});

function onLoadDocdata()
{
  var data = document.getElementById("docdata").contentWindow.document;

}

function getQueryString(key)
{
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return "";
   else
    return qs[1];
}


