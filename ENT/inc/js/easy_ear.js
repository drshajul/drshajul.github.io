let id = 1;

let targetPic = document.getElementById('series-img');
let targetImg = document.querySelector('#series-img > img');
let targetImgWebp = document.querySelector('#series-img > source[type="image/webp"]');
let targetImgJPG = document.querySelector('#series-img  > source[type="image/jpeg"]');

targetPic.addEventListener("wheel",changeImageOnWheel);

let nextbutton = document.getElementById('nextbutton')
nextbutton.addEventListener("click",changeImageClick);

let prevbutton = document.getElementById('prevbutton')
prevbutton.addEventListener("click",changeImageClick);

let legendDiv = document.getElementById('legends');

// legends is an array of 10 arrays
const legends = [[
  "Temporal line",
  "Mastoid cortex",
  "External auditory canal skin",
  "Emissary veins"
  ],[
  "Koerner's septum",
  "Mastoid air cells"
  ],[
  "Mastoid antrum",
  "Horizontal canal"
  ],[
  "Sigmoid sinus",
  "Digastric ridge and post. belly of digastric",
  "Facial nerve (skeletonized mastoid segment)",
  "Chorda tympani",
  "Facial recess",
  "Round window",
  "Pyramidal eminence",
  "Incus buttress",
  "Incus body",
  "Horizontal canal",
  "Posterior canal",
  "Superior canal"
  ],[
  "Sigmoid sinus",
  "Tegmen tympani",
  "Endolymphatic sac",
  "Epitympanum"
  ],[
  "Jugular bulb",
  "Facial nerve (mastoid segment)",
  "Subarcuate artery",
  "Posterior canal (ampullated end)",
  "Superior canal (ampullated end)",
  "Horizontal canal (ampullated end)",
  "Facial nerve (tympanic segment)",
  "Incus",
  "Malleus"
  ],[
  "Facial nerve (tympanic segment)",
  "Facial nerve (mastoid segment)",
  "Chorda tympani",
  "Eustachian tube",
  "Jacobson's nerve (CN IX)",
  "Promontory of cochlea",
  "Vestibule",
  "Sinodural angle"
  ],[
  "Facial nerve (mastoid segment)",
  "Facial nerve (tympanic segment)",
  "Geniculate ganglion",
  "Facial nerve (labyrinthine segment)",
  "Greater superficial petrosal nerve",
  "Cochleariform process",
  "Tendon of tensor tympani",
  "Superior vestibular nerve",
  "Inferior vestibular nerve"
  ],[
  "Internal carotid artery",
  "Round window",
  "Oval window",
  "Jacobson's nerve and cochlear promontory "
  ],[
  "Cochlea scala vestibuli",
  "Tensor tympani muscle (cut)",
  "Cochlear nerve to modiolus",
  "Facial nerve (meatal segment)",
  "Facial nerve (labyrinthine segment)",
  "GSPN",
  "Facial nerve (tympanic segment)",
  "Facial nerve (mastoid segment)",
  "Vestibular nerve"
  ]];

function changeImageClick(elem,event) {
  if (elem.srcElement.id === "nextbutton" && id < 10) {
    id++;
  }
  if (elem.srcElement.id === "prevbutton" && id > 1) {
    id--;
  }
  targetImg.src =  targetImgJPG.srcset = "assets/easy_ear/img" + id + ".jpg";
  targetImgWebp.srcset = "assets/easy_ear/img" + id + ".webp";
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


