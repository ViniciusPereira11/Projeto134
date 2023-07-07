var img;
function preload(){
    //carrega a imagem
    img = loadImage("bl.jpg");
}
function setup(){
    canvas = createCanvas(640, 480);
    canvas.position(windowWidth/2 - 320 ,200);
    background("white");
    robozinho = ml5.objectDetector("cocossd", modelReady);
}
function modelReady(){
    console.log("Robozinho está pronto");
    robozinho.detect(canvas, gotResult);

}
var objetos = [];
var detected = false;
function gotResult(erro, result){
    if(erro){
        console.log(erro);
    }else{
        //Guarda na memória :)
        objetos = result;
        detected = true;
    }
}
function draw(){
    image(img, 0, 0, 640, 480);

    if(detected){
        //repete comandos
        for(var i in objetos){
              //definir o tamanho do texto
            textSize(20);
            //definir o contorno do texto
            stroke("white");
            strokeWeight(3);
            //definir a cor da figura
            fill("black");
            text(objetos[i].label , objetos[i].x, objetos[i].y );
            noFill();
            stroke("lightblue");
            //Desafio 2: desenhar retângulos onde estão as pessoas
            rect(objetos[i].x, objetos[i].y, objetos[i].width, objetos[i].height );  
        }
        
    }


    
}