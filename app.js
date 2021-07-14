const fs = require('fs');
const folderName = './'+process.argv[2] //이미지 파일들이 있는 폴더명을 명령어 3번째 인자로 받음

fs.readdir(folderName, (err, files)=>{
    for(const i of files){
        console.log(i)
        organizeFiles(i)
    }
})

function organizeFiles(fileName){//파일 정리 함수
    const fileNameSplited = fileName.split(".")
    const fileType = fileNameSplited[1] // 파일의 확장자 명
    if(fileType == 'mp4' || fileType == 'mov'){
        const folderType = 'video';
        moveFiles(folderType,fileName)
    }
    if(fileType == 'png' || fileType == 'aae'){
        const folderType = 'captured';
        moveFiles(folderType,fileName)
    }
    if(fileType == 'jpg'){
        const fileNameLetters = fileName.split("");
        if(fileNameLetters[4] != 'E'){
            moveFiles('duplicated',fileName)
        }
    }
    else {
        return;
    }
}

function moveFiles(type,fileName){
    if(!fs.existsSync('./'+ folderName +'/'+ type)){
        fs.mkdir('./'+ folderName +'/'+ type, { recursive: true }, (err) => {
            console.error(err)
        })
    }
    fs.copyFile('./test/'+fileName, './'+ folderName + '/'+ type +'/' + fileName, (err)=>{
        console.error(err)
    })
    fs.unlink('./test/'+fileName,(err)=>{
        console.error(err)
    })
    
}