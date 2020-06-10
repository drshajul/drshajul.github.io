// Content wrapper element
let contentElement = document.getElementById("content");
let myFragment = document.createDocumentFragment();
let csvContent = "data:text/csv;charset=utf-8,Full Name\r\n";
var link = document.createElement("a");

function onlyUnique(value, index, self) { 
    return value.trim() != '' && value.indexOf(" MBBS") === -1 && value.indexOf("Full Name") === -1 && value.indexOf("admin@") === -1 && self.indexOf(value) === index;
}

// Button callback
async function onButtonClicked(){
    let files = await selectFile("text/csv", true);
    d = new Date(files[0].lastModified);

    let dateString = d.getDate() + '_' + (d.getMonth()+1) + '_' + d.getFullYear();
    
    let myArr = [];
    let uniqueArr = [];
    Papa.parse(files[0], {
        complete: function(results) {
            // console.log(results.data);
            results.data.forEach(element => myArr.push(element[0]));
            uniqueArr = myArr.filter(onlyUnique);
            var myUL = document.createElement('ul');
            // myFragment.appendChild(document.createElement('ul'));
            uniqueArr = uniqueArr.map(string => string.trim());
            uniqueArr.sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            });
            uniqueArr.forEach( function (element) {
                // var row = element.join(",");  // this is if element is an array
                csvContent += element + "\r\n";
                var li = document.createElement('li');
                li.textContent = element.trim();
                myUL.appendChild(li);
            });
            // console.log(uniqueArr);
            let myHead = document.createElement("h4");
            myHead.textContent = 'Total Students: ' + uniqueArr.length;
            contentElement.appendChild(myHead); 
            contentElement.appendChild(myUL);
            var encodedUri = encodeURI(csvContent);
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Attendance_" + dateString + ".csv");
            document.body.appendChild(link); // Required for FF
            document.getElementById('DownloadButton').style.display = "block";
        }
    });
   
}

// ---- function definition ----
function selectFile (contentType, multiple){
    return new Promise(resolve => {
        let input = document.createElement('input');
        input.type = 'file';
        input.multiple = multiple;
        input.accept = contentType;

        input.onchange = _ => {
            let files = Array.from(input.files);
            if (multiple)
                resolve(files);
            else
                resolve(files[0]);
        };

        input.click();
    });
}

function onDownloadClicked() {
    link.click();
}