let fsss = require('fs');

if(fsss.existsSync('wrong.txt') && fsss.existsSync('correct.txt') == true){
    let data = "Hello World";
    console.log("I Am Here !!!!");
   document.querySelector(".res").innerHTML = data.toString();
}

console.log("I Am Here !!!!");
