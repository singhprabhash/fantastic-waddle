
function showBarDiv() {
    document.getElementById('bardiv').style.display = "block";
    document.getElementById('qrdiv').style.display = "none";
    document.getElementById("bcode").style.borderColor = "#f0f4ef";
    document.getElementById("qr").style.borderColor = "#2b3d55";
}

function showQrDiv() {
    document.getElementById('bardiv').style.display = "none";
    document.getElementById('qrdiv').style.display = "block";
    document.getElementById("qr").style.borderColor = "#f0f4ef";
    document.getElementById("bcode").style.borderColor = "#2b3d55";
}

//clear input field
function clearField(){
    document.getElementById("barcodetext").value = "";
    document.getElementById("qrtext").value = "";
}

var flag = 0;
let qrcode;
//QR generate button function
function generateQRCode() {
    var qrinput = document.getElementById("qrtext").value;

    if (qrinput == null || qrinput == "") {
        alert("Please Enter text...");
    }
    else {
        if (flag == 0) {
            qrcode = new QRCode(document.getElementById("qrcode"), {
                text: document.getElementById("qrtext").value,
                width: 174,
                height: 174,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            flag++;
            document.getElementById('defaultText').style.display = "none";
            document.getElementById('qrdownloadDiv').style.display = "block";
        }
        else {
            qrcode.makeCode(document.getElementById("qrtext").value);
            document.getElementById('qrdownloadDiv').style.display = "block";
        }
    }
}

function generateQRURL() {
    let dataUrl = document.querySelector('#qrcode').querySelector('img').src;
    downloadURI(dataUrl, 'qrcode.png');
}

function downloadURI(url, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = url;
    document.body.appendChild(link);
    link.click();
}

//QR download button function
function downloadqrCode() {
    setTimeout(generateQRURL(), 1000);
}

//BarCode generate button function
function generateBarCode() {
    var barinput = document.getElementById("barcodetext").value;
    if (barinput == null || barinput == "") {
        alert("Please Enter Text...");
    }
    else {
        document.getElementById('defaultBarText').style.display = "none";
        JsBarcode("#barcode", barinput, {
            lineColor: "black",
            width: 3,
            height: 50,
            displayValue: false
        });
        document.getElementById('bardownloadDiv').style.display = "block";
    }
}

function svgImageToBlob() {
    const svgElem = document.querySelector('svg')
    const serializer = new XMLSerializer();
    let svgData = serializer.serializeToString(svgElem);
    svgData = '<?xml version="1.0" standalone="no"?>\r\n' + svgData;
    const svgBlob = new Blob([svgData], {
        type: 'image/svg+xml;charset=utf-8',
    });
    let DOMURL = window.URL || window.webkitURL || window;
    const url = DOMURL.createObjectURL(svgBlob);

    BlobToCanvas(svgElem, url, DOMURL);
}

function BlobToCanvas(svgElem, url, DOMURL) {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const domRect = svgElem.getBBox();
        canvas.width = domRect.width;
        canvas.height = domRect.height;
        ctx.drawImage(img, 0, 0, domRect.width, domRect.height);
        DOMURL.revokeObjectURL(url);

        const imgURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

        downloadURI(imgURI, 'barcode.png');
    };

    img.onerror = (e) => {
        console.error('Image not loaded', e);
    };
    img.src = url;
}
//download the bar image
function downloadBarImg() {
    svgImageToBlob();
}

