var fileInput = document.querySelector("#id_photo"),
button = document.querySelector(".input-file-trigger"),
the_return = document.querySelector(".file-return");
fileInput.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');
function handleImage(e) {
var reader = new FileReader();
reader.onload = function (event) {
    var img = new Image();
    // var imgWidth =
    img.onload = function () {
        canvas.width = 200;
        canvas.height = 200;
        ctx.drawImage(img, 0, 0, 200, 200);
    };
    img.src = event.target.result;
};
reader.readAsDataURL(e.target.files[0]);
}