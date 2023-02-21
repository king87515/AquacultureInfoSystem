var code;
function createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById('com_captcha').innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lengthOtp = 4 + Math.floor(Math.random() * 2);;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "com_captcha";
    canv.width = 150;
    canv.height = 25;
    var ctx = canv.getContext("2d");
    ctx.font = "20px Georgia";
    var gradient = ctx.createLinearGradient(0, 0, canv.width, 0);
    gradient.addColorStop("0", "green");
    gradient.addColorStop("0.3", "orange");
    gradient.addColorStop("0.75", "red");
    gradient.addColorStop("1", "pink");
    ctx.strokeStyle = gradient;
    ctx.strokeText(captcha.join(""), 10, 20);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("com_captcha").appendChild(canv); // adds the canvas to the body element
}

function validateCaptcha() {
    if (document.getElementById("comp_vcode").value == code) {
        console.log(true);
        return true;
    } else {
        document.getElementById("comp_vcode").value = "";
        createCaptcha();
        console.log(false);
        return false;
    }
}
