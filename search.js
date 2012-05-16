function search() {
  var url = document.getElementById("search").value.split(" ").join("+");
  var xhr = new XMLHttpRequest();
  xhr.open("GET",
           "https://www.google.com/bookmarks/find?hl=en&q=" + url + "&output=xml",
           true);
  xhr.onreadystatechange = function () {
    var result, titles = [], linkers = [], li, link, i;
    var title_re = /<title>(.*?)<\/title>/g;
    var url_re = /<url>(.*?)<\/url>/g;
    var match;
    if (xhr.readyState === 4) {
      //titles = xhr.responseText.match(/<title>.*?<\/title>/g);
      //linkers = xhr.responseText.match(/<url>.*?<\/url>/g);
      //result = document.getElementById("result");
      //while (result.hasChildNodes()) {
      //  result.removeChild(result.lastChild);
      //}
      //for (i = 0; i < titles.length; ++i) {
      //  li = document.createElement("li");
      //  link = document.createElement("a");
      //  link.href = linkers[i].replace("<url>", "").replace("</url>", "");
      //  link.innerText = titles[i].replace("<title>", "").replace("</title>", "");
      //  li.appendChild(link);
      //  result.appendChild(li);
      //}
      while (match = title_re.exec(xhr.responseText)) {
        titles.push(match[1]);
      }
      while (match = url_re.exec(xhr.responseText)) {
        linkers.push(match[1]);
      }
      result = document.getElementById("result");
      while (result.hasChildNodes()) {
        result.removeChild(result.lastChild);
      }
      for (i = 0; i < titles.length; ++i) {
        li = document.createElement("li");
        link = document.createElement("a");
        link.href = linkers[i];
        link.innerText = titles[i];
        li.appendChild(link);
        result.appendChild(li);
      }

    }
  };
  xhr.send();
}

window.onload = function () {
  document.getElementById("searchButton").addEventListener('click', search, false);
  document.getElementById("search").addEventListener('keydown', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      search();
    }
  }, false);
}
