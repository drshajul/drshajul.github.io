let id = 1;
const labelR = [5, 7, 12, 18, 25, 28, 32, 35, 38, 40, 44, 48, 54, 62, 68, 84, 90, 96, 105]; //array of labels (total 19)
let labelON = false;

refSlider = document.getElementById('sagital');
targetPic = document.querySelector('#seriesImg');
targetImg = document.querySelector('#seriesImg > img');
targetImgWebp = document.querySelector('#seriesImg > source[type="image/webp"]');
targetImgJPG = document.querySelector('#seriesImg > source[type="image/jpeg"]');


labelPic = document.querySelector('#seriesLab');
labelImg = document.querySelector('#seriesLab > img');
labelImgWebp = document.querySelector('#seriesLab > source[type="image/webp"]');
labelImgPNG = document.querySelector('#seriesLab > source[type="image/png"]');


line = document.getElementById("vline");

sagPic = document.querySelector('#refImg');
sagImg = document.querySelector('#refImg > img');
sagImgWebP = document.querySelector('#refImg > source[type="image/webp"]');
sagImgJPG = document.querySelector('#refImg > source[type="image/jpeg"]');
sagPic.addEventListener("wheel",changeSagitalOnWheel);

document.getElementById('seriesDiv').addEventListener("wheel",changeImageOnWheel);

document.getElementById('morebutton').addEventListener("click",changeImageClick);
document.getElementById('lessbutton').addEventListener("click",changeImageClick);

document.getElementById('sagplus').addEventListener("click",changeSagitalOnClick);
document.getElementById('sagminus').addEventListener("click",changeSagitalOnClick);

function showLabel(obj) {
  if (labelON) {
    labelPic.style = "display: none;"
    labelON = false;
  }
  else {
    labelPic.style = "display: block;"
    labelON = true;
  }
}

function changeImageById(val) {
    targetImg.src = targetImgJPG.srcset = "assets/ct_temporal_axial/img" + val + ".jpg";
    targetImgWebp.srcset = `assets/ct_temporal_axial/img${val}.webp`;


    labelImg.src = labelImgPNG.srcset = `assets/ct_temporal_axial/labels/${getLabelID(val)}.png`;
    labelImgWebp.srcset = `assets/ct_temporal_axial/labels/${getLabelID(val)}.webp`;
    line.style.left = (-(20/val)+ (val*3.6)).toString() + "px"; // offset from left (in css) + (width of image - offset)/number of    
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
  sag_id = event.srcElement.src.match(/.*img(\d+)\.jpg/)[1];
  if (event.deltaY > 0 && sag_id < 10)
    sag_id++;
  else if (event.deltaY < 0 && sag_id > 1)
    sag_id--;
    changeSagital(sag_id)
}

function changeSagitalOnClick(elem,event) {
  sag_id = sagImg.src.match(/.*img(\d+)\.jpg/)[1];
  if (elem.srcElement.id === "sagplus" && sag_id < 10)
    sag_id++;
  else if (elem.srcElement.id === "sagminus" && sag_id > 1)
    sag_id--;
  else
    return
  changeSagital(sag_id)
}

function changeSagital(sag_id) {
  sagImg.src = sagImgJPG.srcset = "assets/ct_temporal_axial/ref/img" + sag_id + ".jpg"
  sagImgWebP.srcset = "assets/ct_temporal_axial/ref/img" + sag_id + ".webp"
}

function getLabelID(id) {
  for (let i = 0; i < labelR.length; i++) {
    if (id <= labelR[i]) {
      return i+1;
    }
  }
}