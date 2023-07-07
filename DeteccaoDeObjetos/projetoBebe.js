var som;
var carregou = false;
//função que precarrega arquivos de mídia
function preload(){
    //carregar som
    som = loadSound("alert.mp3");
}
function setup(){
    canvas = createCanvas(640, 480);
    canvas.center();
    background("lightgreen");
    
    video = createCapture(VIDEO);
    video.hide();
    video.size(640, 480);
}
function start(){
    //inicia o robôzinho
    seguranca = ml5.objectDetector('cocossd', modelLoaded);
}
function modelLoaded(){
    console.log("segurança está vigiando o bebê");
    carregou = true;
    document.getElementById("status").innerHTML = "Status: detectando objeto";

}

function draw(){
    image(video, 0, 0, 640, 480);
    if(carregou == true){
        seguranca.detect(video, gotResult);
        for(var i in objetos){
            document.getElementById("status").innerHTML = "Status: objeto detectado";
            fill ("red");
            precisao = floor(objetos[i].confidence*100);
            text(objetos[i].label + ' ' + precisao + "%", objetos[i].x, objetos[i].y);

            noFill();
            stroke("red");
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height );
            //checa se o resultado é pessoa
            if(objetos[i].label == 'person'){
                som.stop();
                document.getElementById("objeto").innerHTML = "Bebê Encontrado";
            }else{
                if(!som.isPlaying()){
                    som.play();
                    document.getElementById("objeto").innerHTML = "Bebê Não Encontrado";
                }
            }
        }
    }
    
}
var objetos =[];
function gotResult(erro, result){
    if(erro){
        console.log(erro);
    }
        else{
            objetos = result;

        }

   
}