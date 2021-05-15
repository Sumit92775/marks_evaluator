const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path')

const app = express();
const port = 8009;
const fss = require('fs');

//Catches requests made to localhost:3000/search
const pdfScript = require('./public/pdfScript');


app.get('/search', (request, response) => {

    //Holds value of the query param 'searchquery'.
    const searchQuery = request.query.searchquery;
    // console.log(searchQuery);
    console.log("Entered : 1");
    //Do something when the searchQuery is not null.
    // if (searchQuery != null) {

        console.log("Entered : 2")

        pdfScript().then(results => {
                //Returns a 200 Status OK with Results JSON back to the client.
                response.status(200);
                response.json(results);
            });
    // } else {
    //     response.end();
    // }
});

// app.use(express.static(path.join(__dirname,"public")));
// console.log("")
app.get('/result', (request, response) => {

    if(fss.existsSync('answers.txt') && fss.existsSync('questions.txt') == true){

                let Qarray = fss.readFileSync('questions.txt');
                let Aarray = fss.readFileSync('answers.txt');
                let correct = 0;
                for(let i = 0 ; i < Qarray.length ; i++){
                    if(Qarray[i] === Aarray[i]){
                        correct++;
                    }
                }
                let wrong = Qarray.length - correct;
                console.log("Wrong : "+wrong);
                console.log("Correct : "+correct);
                fss.writeFileSync("wrong.txt",wrong.toString());
                fss.writeFileSync("correct.txt",correct.toString());
                
                if(fss.existsSync('correct.txt') != true){
                    response.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet">
                        <title>Document</title>
                    </head>
                    <style>
                    
                       
    body{
        /* box-sizing: border-box; */
        position: relative;
        background-image : url("https://i.ibb.co/2S1r0vf/web.png");
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .res{
        height: 100px;
        width: 100px;
        background-color: aqua;
    }

    .container{
        height: 350px;
        width: max-content;
        position: absolute;
        top: 100px;
        left: 400px;
        background-color: #ebebeb;
        border-radius: 20px;
    }
.fas{
    font-size: 60px;
    color: rgb(7, 218, 7);
}

.fa-times-circle{
    color: red;
}

.icons{
    height: 100px;
    width: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background-color: grey; */
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    margin: 3px;
    border-radius: 20px;
}

.score{
    height: 150px;
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 3px;
    /* background-color: hotpink; */


}

.h1{
    font-family: 'Open Sans Condensed', sans-serif;
}
.score.right{
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-right: 1px solid;
    
   /* background-color: indigo; */
}

.score.left{
    height: 100px;
    display: flex;
    /* border-left: 1px solid; */
    justify-content: space-evenly;
    align-items: center;
   /* background-color: indigo; */
}

.result{
    /* background-color: khaki; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 3px;
    border-top: solid 1px;
    
}

.title{
    height: 60px;
    width: 50%;
    position: sticky;
    display: flex;
    margin-left: 750px;
    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;
    background-color: blueviolet;
    border-right: 0px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    font-size: 20px;
}
</style>

                    <body>
                    
                    <div class="title">
                            <h1>Result</h1>
                        </div>

                        <div class="container">
                    
                            <div class="icons">
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-times-circle"></i>
                            </div>
                            <div class="score">
                                <div class="score right">
                                    <h1>Correct : ${"Error"}</h1>
                                </div>
                                <div class="score left">
                                    <h1>Wrong : ${"Error"}</h1>
                                </div>
                            </div>
                    
                            <div class="result">
                                <h1>Result : Pass</h1>
                            </div>
                    
                           
                    
                        </div>
                    
                    </body>
                    
                    <script src="./result.js"> </script>
                        
                    
                    </html>`);
                }else{
                    response.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet">
                        <title>Document</title>
                    </head>
                    <style>

                    body{
                        /* box-sizing: border-box; */
                        position: relative;
                        background-image : url("https://i.ibb.co/2S1r0vf/web.png");
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
                    }
                    .res{
                        height: 100px;
                        width: 100px;
                        background-color: aqua;
                    }
                
                    .container{
                        height: 350px;
                        width: max-content;
                        position: absolute;
                        top: 100px;
                        left: 400px;
                        background-color: #ebebeb;
                        border-radius: 20px;
                    }
                .fas{
                    font-size: 60px;
                    color: rgb(7, 218, 7);
                }
                
                .fa-times-circle{
                    color: red;
                }
                
                .icons{
                    height: 100px;
                    width: 500px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    /* background-color: grey; */
                    align-content: center;
                    flex-wrap: nowrap;
                    flex-direction: row;
                    margin: 3px;
                    border-radius: 20px;
                }
                
                .score{
                    height: 150px;
                    width: 500px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-direction: row;
                    margin: 3px;
                    /* background-color: hotpink; */
                
                
                }
                
                .h1{
                    font-family: 'Open Sans Condensed', sans-serif;
                }
                .score.right{
                    height: 100px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    border-right: 1px solid;
                    
                   /* background-color: indigo; */
                }
                
                .score.left{
                    height: 100px;
                    display: flex;
                    /* border-left: 1px solid; */
                    justify-content: space-evenly;
                    align-items: center;
                   /* background-color: indigo; */
                }
                
                .result{
                    /* background-color: khaki; */
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    margin: 3px;
                    border-top: solid 1px;
                    
                }
                
                .title{
                    height: 60px;
                    width: 50%;
                    position: sticky;
                    display: flex;
                    margin-left: 750px;
                    margin-top: 20px;
                    justify-content: space-evenly;
                    align-items: center;
                    background-color: blueviolet;
                    border-right: 0px;
                    border-top-left-radius: 35px;
                    border-bottom-left-radius: 35px;
                    font-size: 20px;
                }
                </style>
                    <body>

                    <div class="title">
                    <h1>Result</h1>
                </div>
                    
                        <div class="container">
                    
                            <div class="icons">
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-times-circle"></i>
                            </div>
                            <div class="score">
                                <div class="score right">
                                    <h1>Correct : ${correct}</h1>
                                </div>
                                <div class="score left">
                                    <h1>Wrong : ${wrong}</h1>
                                </div>
                            </div>
                    
                            <div class="result">
                                <h1>Result : Pass</h1>
                            </div>
                    
                           
                    
                        </div>
                    
                    </body>
                    
                    <script src="./result.js"> </script>
                        
                    
                    </html>`);
                }
               
              
            }else{

                response.send(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" />
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&display=swap" rel="stylesheet">
                        <title>Document</title>
                    </head>
                    <style>

    body{
        /* box-sizing: border-box; */
        position: relative;
        background-image : url("https://i.ibb.co/2S1r0vf/web.png");
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
    .res{
        height: 100px;
        width: 100px;
        background-color: aqua;
    }

    .container{
        height: 350px;
        width: max-content;
        position: absolute;
        top: 100px;
        left: 400px;
        background-color: #ebebeb;
        border-radius: 20px;
    }
.fas{
    font-size: 60px;
    color: rgb(7, 218, 7);
}

.fa-times-circle{
    color: red;
}

.icons{
    height: 100px;
    width: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background-color: grey; */
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    margin: 3px;
    border-radius: 20px;
}

.score{
    height: 150px;
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin: 3px;
    /* background-color: hotpink; */


}

.h1{
    font-family: 'Open Sans Condensed', sans-serif;
}
.score.right{
    height: 100px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-right: 1px solid;
    
   /* background-color: indigo; */
}

.score.left{
    height: 100px;
    display: flex;
    /* border-left: 1px solid; */
    justify-content: space-evenly;
    align-items: center;
   /* background-color: indigo; */
}

.result{
    /* background-color: khaki; */
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 3px;
    border-top: solid 1px;
    
}

.title{
    height: 60px;
    width: 50%;
    position: sticky;
    display: flex;
    margin-left: 750px;
    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;
    background-color: blueviolet;
    border-right: 0px;
    border-top-left-radius: 35px;
    border-bottom-left-radius: 35px;
    font-size: 20px;
}
</style>
                    <body>
                    
                        <div class="title">
                            <h1>Result</h1>
                        </div>

                        <div class="container">
                    
                            <div class="icons">
                                <i class="fas fa-check-circle"></i>
                                <i class="fas fa-times-circle"></i>
                            </div>
                            <div class="score">
                                <div class="score right">
                                    <h1>Correct : ${"Error"}</h1>
                                </div>
                                <div class="score left">
                                    <h1>Wrong : ${"Error"}</h1>
                                </div>
                            </div>
                    
                            <div class="result">
                                <h1>Result : ${"Error"}</h1>
                            </div>
                    
                           
                    
                        </div>
                    
                    </body>
                    
                    <script src="./result.js"> </script>
                        
                    
                    </html>`);
            }
            

            console.log("Hello Worlddddd !!!!!");
         
            // response.sendFile(path.join(__dirname,"result.html"),"Hello");
            // response.send({WrongAns : 10 , CorrectAns : 20});
});



// app.get('/result/result.js', (request, response) => {

    
//    response.sendDate()

//             console.log("Hello World2 !!!!!");
          
// });




// app.get('/search/upload', (req, res) => res.sendFile(path.join(__dirname,"home.html")));


//Catches requests made to localhost:3000/
// app.get('/', (req, res) => res.sendFile(path.join(__dirname,"/Back-end/home.html")));


//Initialises the express server on the port 30000


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
let value = "bajkdbkasbj";
module.exports = {value};