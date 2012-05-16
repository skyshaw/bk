function search() {
  var url = document.getElementById("search").value.split(" ").join("+");
  var xhr = new XMLHttpRequest();
  xhr.open("GET",
           "https://www.google.com/bookmarks/find?hl=en&q=" + url + "&output=xml",
           true);
  xhr.onreadystatechange = function () {
    var result, titles, linkers, li, link, i;
    if (xhr.readyState === 4) {
      // innerText does not let the attacker inject HTML elements.
      titles = xhr.responseText.match(/<title>.*?<\/title>/g);
      linkers = xhr.responseText.match(/<url>.*?<\/url>/g);
      result = document.getElementById("result");
      while (result.hasChildNodes()) {
        result.removeChild(result.lastChild);
      }
      for (i = 0; i < titles.length; ++i) {
        li = document.createElement("li");
        link = document.createElement("a");
        link.href = linkers[i].replace("<url>", "").replace("</url>", "");
        link.innerText = titles[i].replace("<title>", "").replace("</title>", "");
        li.appendChild(link);
        result.appendChild(li);
      }
    }
  };
  xhr.send();
}

window.onload = function () {
  document.getElementById("searchButton").addEventListener('click', search, false);
}
