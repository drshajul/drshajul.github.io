var extn = (canUseWebP()) ? ".webp" : ".jpg";

let id = "001";
refSlider = document.getElementById('sagital');
targetImg = document.getElementById('series-img');
targetImg.addEventListener("wheel",changeImageOnWheel);
sagImg = document.getElementById('refImg');
sagImg.addEventListener("wheel",changeSagitalOnWheel);
line = document.querySelector("#vline");

document.getElementById('morebutton').addEventListener("click",changeImageClick);
document.getElementById('lessbutton').addEventListener("click",changeImageClick);

document.getElementById('sagplus').addEventListener("click",changeSagitalOnClick);
document.getElementById('sagminus').addEventListener("click",changeSagitalOnClick);

// refSlider.addEventListener('input',changeImage);

// function changeImage(event) {
//     id = event.target.value.toString().padStart(3,"0");
//     targetImg.src = "assets/ct_pns_coronal/img" + id + extn;
// }

function showLabel(obj) {
  if (obj.src.indexOf("lab" + extn) > 0) // already showing labels
    obj.src = obj.src.replace("lab" + extn,extn);
  else
    obj.src = "assets/ct_pns_coronal/img" + obj.src.match(/\d{3}/)[0] + "lab" + extn;
}

function changeImageById(val) {
    id = val.toString().padStart(3,"0");
    targetImg.src = "assets/ct_pns_coronal/img" + id + extn;
    line.style.left = (10 + (val*3.58)).toString() + "px"; // offset from left (in css) + (width of image - offset)/number of
    
} 

function changeImageClick(elem,event) {
  if (elem.srcElement.id === "morebutton") 
      refSlider.value ++;
  else
      refSlider.value --;
  refSlider.dispatchEvent(new Event('input'));
}

function changeImageOnWheel(event) {
  event.preventDefault();
  if (event.deltaY > 0)
    refSlider.value ++;
  else
    refSlider.value --;
  refSlider.dispatchEvent(new Event('input'));
}

function changeSagitalOnWheel(event) {
  event.preventDefault();
  sag_id = event.srcElement.src.match(/.*([0-9][0-9]).*/)[1];
  if (event.deltaY > 0 && sag_id < 24) {
    sag_id++;
    sagImg.src = "assets/ct_pns_sagital/ref/img" + sag_id.toString().padStart(2,"0") + extn
  }
  if (event.deltaY < 0 && sag_id > 1) {
    sag_id--;
    sagImg.src = "assets/ct_pns_sagital/ref/img" + sag_id.toString().padStart(2,"0") + extn
  }
}

function changeSagitalOnClick(elem,event) {
  sag_id = sagImg.src.match(/.*([0-9][0-9]).*/)[1];
  if (elem.srcElement.id === "sagplus" && sag_id < 24) {
    sag_id++;
    sagImg.src = "assets/ct_pns_sagital/ref/img" + sag_id.toString().padStart(2,"0") + extn
  }
  if (elem.srcElement.id === "sagminus" && sag_id > 1) {
    sag_id--;
    sagImg.src = "assets/ct_pns_sagital/ref/img" + sag_id.toString().padStart(2,"0") + extn
  }
}

function canUseWebP() {
  var elem = document.createElement('canvas');
  if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
  }
  // very old browser like IE 8, canvas not supported
  return false;
}