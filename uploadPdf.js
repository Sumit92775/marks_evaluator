let QuploadBtn = document.getElementById('Qupload_btn');
let AuploadBtn = document.getElementById('Aupload_btn');

QuploadBtn.addEventListener("change",function(e){
    console.log("Done!!!!");

    for(let i = 0 ; i < e.target.files.length ; i++){
        let uploadedFile = e.target.files[i];
        let storageRef = firebase.storage().ref("files/"+uploadedFile.name);

        let task = storageRef.put(uploadedFile);
        task.on('state_changed',function progress(snapshot){
            let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            if(percentage == 100){
                alert("Document fetched Click on Upload Question");
            }
            console.log("uploaded is "+percentage + " %done ");
        })

    }
    
})


AuploadBtn.addEventListener("change",function(e){
    console.log("Done!!!!");

    for(let i = 0 ; i < e.target.files.length ; i++){
        let uploadedFile = e.target.files[i];
        let storageRef = firebase.storage().ref("files/"+uploadedFile.name);
        let task = storageRef.put(uploadedFile);
        task.on('state_changed',function progress(snapshot){
            let percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            if(percentage == 100){
                alert("Document fetched Click on Upload Answer");
            }
            console.log("uploaded is "+percentage + " %done ");
        })

    }

})
