var passwords = new Array("Cl@!ms!2");

var url = GetStringByRegex(decodeURIComponent(document.URL), "redirect_uri=.+?&");
url = url.replace("redirect_uri=", "");
url = url.replace("&", "");

var tenant = GetStringByRegex(url, "//.+?[.]");
tenant = tenant.replace("//", "");
tenant = tenant.replace(".", "");
tenant = tenant.replace("-admin", "");

var env = GetStringByRegex(url, "[.].+?[.]");
env = env.replace(".", "").replace(".", "");

var email = "admin@" + tenant;
if (env.toLowerCase() == "sharepoint") {
    email += ".onmicrosoft.com";
} else {
    email += ".ccsctp.net";
}

var emailBox = document.getElementsByName("loginfmt");
emailBox[0].value = email;
emailBox[0].dispatchEvent(new KeyboardEvent('input'));

var emailButton = document.getElementById("idSIButton9");
emailButton.click();

var length  = passwords.length;
var index = 0;
var checkOnPwdPage = function () {
    if (document.getElementById("idA_PWD_ForgotPassword")) {
        var signIn = function () {
            if (document.getElementById("passwordError")) {
                index++;
                if (index == length) {
                    return;
                }
                SignIn(passwords[index]);
                setTimeout(signIn, 1000);
            } else if (document.getElementById("KmsiCheckboxField")) {
                ClickNotKeep();
            } else {
                SignIn(passwords[index]);
                setTimeout(signIn, 1000);
            }
        }
        signIn();
    }
    else {
        setTimeout(checkOnPwdPage, 500);
    }
}
checkOnPwdPage();

function ClickNotKeep() {
    var keepSignIn = document.getElementById("idBtn_Back")
    keepSignIn.click();
    success = true;
    clearInterval(finishPassword);
}

function SignIn(pwd) {
    var pwdBox = document.getElementsByName("passwd");
    pwdBox[0].value = pwd;
    pwdBox[0].dispatchEvent(new KeyboardEvent('input'));
    var pwdButton = document.getElementById("idSIButton9");
    pwdButton.click();
}

function GetStringByRegex(str, regexStr) {
    var regex = new RegExp(regexStr);
    var result = regex.exec(str);
    if (result == undefined) {
        return "";
    }
    return result[0];
}
