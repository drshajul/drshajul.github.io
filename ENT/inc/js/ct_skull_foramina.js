let id = 1;

let targetImg = document.getElementById('series-img');
targetImg.addEventListener("wheel",changeImageOnWheel);

let nextbutton = document.getElementById('nextbutton')
nextbutton.addEventListener("click",changeImageClick);

let prevbutton = document.getElementById('prevbutton')
prevbutton.addEventListener("click",changeImageClick);

let legendDiv = document.getElementById('legends');

// legends is an array of 10 arrays
const legends = [[
  "Orbital cavity",
  "Superior orbital fissure",
  "Anterior clinoid process",
  "Mastoid air cells",
  "Internal occipital protuberance "
  ],[
  "Orbital cavity",
  "Superior orbital fissure",
  "Sphenoid sinus",
  "Optic canal",
  "Dorsum sellae",
  "Internal occipital protuberance "
  ],[
  "Superior orbital fissure",
  "Petrooccipital fissure",
  "Internal auditory canal"
  ],[
  "Internal auditory canal",
  "Sphenoid sinus",
  "External auditory canal"
  ],[
  "Sigmoid sinus",
  "Jugular bulb",
  "Foramen rotondum",
  "Carotid canal (pars horizontal)"
  ],[
  "Jugular bulb",
  "Carotid canal (pars horizontal)",
  "Sphenoid sinus",
  "Foramen ovale",
  "Foramen spinosum",
  "Jugular foramen"
  ],[
  "Jugular bulb",
  "Carotid canal (vertical portion)",
  "Foramen spinosum",
  "Foramen ovale",
  "Sphenoid sinus",
  "Clivus",
  "Vidian canal",
  "Mandibular condyle"
  ],[
  "Mastoid process",
  "Mandibular condyle",
  "Hypoglossal canal"
  ]];

function changeImageClick(elem,event) {
  if (elem.srcElement.id === "nextbutton" && id < 8) {
    id++;
  }
  if (elem.srcElement.id === "prevbutton" && id > 1) {
    id--;
  }
  targetImg.src = "assets/ct_skull_foramina/img" + id + ".jpg";
  var legend = legends[id-1];
  var strlegend = "<ol>";
  for (let i = 0; i < legend.length; i++) {
    strlegend += "<li>" + legend[i] + "</li>";
  }
  strlegend += "</ol>";
  legendDiv.innerHTML = strlegend;
}

function changeImageOnWheel(event) {
  event.preventDefault();
  if (event.deltaY > 0)
    nextbutton.dispatchEvent(new Event('click'));
  else
    prevbutton.dispatchEvent(new Event('click'));
}


