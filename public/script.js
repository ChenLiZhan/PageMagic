// Standard code to enable pagedown-ace
var converter = new Markdown.Converter();

Markdown.Extra.init(converter, {
                  extensions: "all"
                });

var editor = new Markdown.Editor(converter);

var text = document.getElementById('wmd-input').innerHTML;
var ace1 = ace.edit("wmd-input");
ace1.setValue(text, -1);
editor.run(ace1);

// Synchronize scrolling of editor with preview
var session = ace1.getSession();
var preview = document.getElementById("wmd-preview");
session.on("changeScrollTop", function() {
    preview.scrollTop = session.getScrollTop();
});

// compare if the content is changed
var save_icon = document.getElementById("save-status");
session.on('change', function(e) {
    var xmlhttp;

    if ( window.XMLHttpRequest ) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var ace1 = ace.edit("wmd-input");
    var text = ace1.getValue();
    xmlhttp.onreadystatechange = function() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "wmd-preview"]);
        if ( xmlhttp.readyState == 4 && xmlhttp.status == 200 ) {
            if ( xmlhttp.responseText == "change") {
                save_icon.src = "images/not_save.png";
            } else if ( xmlhttp.responseText == "not change" ) {
                save_icon.src = "images/is_save.png";
            } else {
                console.log("Ajax error");
            }
        }
    }
    xmlhttp.open("POST","/api/v1/compare" ,true);
    xmlhttp.send(text);
});

// Autosave to web service
window.setInterval(function() {
    var xmlhttp;
    if ( window.XMLHttpRequest ) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var ace1 = ace.edit("wmd-input");
    var text = ace1.getValue();
    xmlhttp.open("POST","/api/v1/save" ,true);
    xmlhttp.send(text);
    save_icon.src = "images/is_save.png"
}, 30000);