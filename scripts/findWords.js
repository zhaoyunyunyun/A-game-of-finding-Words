/**
 * Created by Administrator on 2017/6/19.
 */
window.onload=initPage;

/*字母频度表 frequencyTable*/
var frequencyTable =new Array('a','a','a','a','a','a','a','a', 'b','c','c','c','d','d','d',
 'e','e','e','e','e','e', 'e','e','e','e','e','e','f','f','g','g','h','h','h','h','h','h',
 'i', 'i', 'i', 'i', 'i', 'i', 'i','j','k','l','l','l','l','m','m', 'n', 'n', 'n', 'n', 'n',
 'n','o','o','o','o','o','o','o','o','p','p','q','q','q','q','q','q','r','r','r','r','r','r',
 's','s','s','s','s','s','s','s','t','t','t','u','u','v','v','w','x','y','y','z');


function initPage() {
   //调用rangdomizeTiles()函数建立智力题表格
    randomizeTiles();
    var submitDiv=document.getElementById("submit");
    var a=submitDiv.firstChild;
    while(a.nodeName=="#text"){
        a=a.nextSibling;
    }
    a.onclick=function () {
        alert("Please click tiles to add letters and create a word");
    };

}

/*建立智力题表格*/
function randomizeTiles() {
    var tiles=document.getElementById('letterbox').getElementsByTagName('a');
    for(var i=0;i<tiles.length;i++){
        /*索引值*/
        var index=Math.floor(Math.random()*100);
        var letter=frequencyTable[index];
        tiles[i].className=tiles[i].className+" l"+letter;
        /*点击字母将其添加到右侧内容栏*/
        tiles[i].onclick=addLetter;
    }
}

/*添加字母*/
function addLetter(){
    /*由类名来获得所点击的字母*/
    var tileClasses=this.className.split(' ');
    var letterClass=tileClasses[2];
    var tileLetter=letterClass.substr(1,1);

    /*将字母添加到内容框*/
    var currentWordDiv=document.getElementById("currentWord");
    if(currentWordDiv.childNodes.length===0){
        var p=document.createElement("p");
        currentWordDiv.appendChild(p);
        var letterText=document.createTextNode(tileLetter);
        p.appendChild(letterText);
        var submitDiv=document.getElementById("submit");
        var a=submitDiv.firstChild;
        while (a.nodeName=='#text'){
            a=a.nextSibling;
        }
        a.onclick=submitWord;
    }else{
        var letterText=currentWordDiv.firstChild.firstChild;
        letterText.nodeValue+=tileLetter;
    }
    /*提交完一次单词之后不可再点击该单词*/
    this.className+=" disabled";
    this.onclick='';

}

/*提交单词*/
function submitWord() {
    var request=createRequest();
    if(request==null){
        alert("Unable to create request object");
        return;
    }
    var currentWordDiv=document.getElementById("currentWord");
    var userWord=currentWordDiv.firstChild.firstChild.nodeValue;
    var url="http://10.8.0.16/zhaoyun/findWords/lookup-word.php?word="+userWord;
   /* 同步打开方式，不需要回调函数*/
    request.open("GET",url,false);
    request.send(null);

    /*若提交的单词不合法，服务器返回-1,若所提交单词成功，则创建文本节点*/
    if(request.responseText==-1){
        alert("You have submit a invalid word.");
    }else{
        var wordListDiv=document.getElementById("wordList");
        var p=document.createElement("p");
        var newWord=document.createTextNode(userWord);
        p.appendChild(newWord);
        wordListDiv.appendChild(p);


    }
  /*  计算得分*/
    var scoreDiv=document.getElementById("score");
   /*文本节点*/
    var scoreNode=scoreDiv.firstChild;
    var scoreText=scoreNode.nodeValue;
    var pieces=scoreText.split(' ');
    var currentScore=parseInt(pieces[1]);
    currentScore += parseInt(request.responseText);
    scoreNode.nodeValue="Score: " + currentScore;

    /*从当前词框删除单词*/
    var currentWordP=currentWordDiv.firstChild;
    currentWordDiv.removeChild(currentWordP);
    enableAllTiles();
    var submitDiv=document.getElementById("submit");
    var a=submitDiv.firstChild;
    while(a.nodeName=="#text"){
        a=a.nextSibling;
    }
    a.onclick=function(){
        alert("Please click tiles and create a word.");
    };

}

function enableAllTiles(){
    tiles=document.getElementById("letterbox").getElementsByTagName("a");
    for(var i=0;i<tiles.length;i++){
        var tileClasses=tiles[i].className.split(" ");
        if(tileClasses.length===4){
            var newClass=tileClasses[0]+' '+tileClasses[1]+' '+tileClasses[2];
            tiles[i].className=newClass;
            tiles[i].onclick=addLetter;
        }
    }
}