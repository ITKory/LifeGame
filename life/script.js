const canva = document.getElementById("canva");
const button = document.getElementById("btn");
const holst = canva.getContext("2d");

let n =30;
let w =900;
let gameStarted =false;
let area =[];
let tomorrow=[];

button.onclick= function()
{
    gameStarted=!gameStarted;  
}

setInterval(function()
{
    if (gameStarted==true)
    {
        let count=0;
        for (let i=0; i<n;i++)
        for (let j=0; j<n;j++)
        {
            count=0;
            if(i>0)
            {
                count+=area[i-1][j];
                if (j>0) count+=area[i-1][j-1];
                if (j<n-1) count+=area[i-1][j+1];
            }

            if(i<n-1)
            {
                count+=area[i+1][j];
                if (j>0) count+=area[i+1][j-1];
                if (j<n-1) count+=area[i+1][j+1];
            }
            if (j>0) count+=area[i][j-1];
            if (j<n-1) count+=area[i][j+1];

            if (area[i][j]==0 && count==3)
                tomorrow[i][j]=1;
            if ( area[i][j]==1&&(count==2 || count ==3))
                tomorrow[i][j]=1;
            if (area[i][j]==1 &&(count!=2 && count !=3)) 
                tomorrow[i][j]=0;  
        }
                nextDay();
                fillArea();
    }
}, 200);

function nextDay()
{
    for (let i=0; i<n;i++)
    for (let j=0; j<n;j++)
    area[i][j]=tomorrow[i][j];
}

for (let i=0; i<n;i++)
{
    area[i]=[];
    tomorrow[i]=[];
    for(let j=0; j<n;j++)
    {
        area[i][j]=0;
        tomorrow[i][j]=0;
    }
}
console.log(area);
canva.onmousedown= function(e)
{
    let x = e.offsetX;
    let y = e.offsetY;
    x= Math.floor(x/(w/n));
    y= Math.floor(y/(w/n));

    if (area[y][x]==0)
    area[y][x]=1;
    else
    area[y][x]=0;
    fillArea();
}

function fillArea()
{
    holst.fillStyle="green";
    for (let i=0; i<n;i++)
    for (let j=0; j<n;j++)
    {
        if (area[j][i]==1)
        {
            holst.fillStyle="green";
        holst.fillRect(i*(w/n)+1,j*(w/n)+1,w/n-1,w/n-1);
        }
        else
        {
            holst.fillStyle="black";
        holst.fillRect(i*(w/n)+1,j*(w/n)+1,w/n-1,w/n-1);
        }
    }
}

function setGrid ()
{
    holst.strokeStyle="gray";
    for (let i=0; i<n;i++)
    {
        holst.beginPath();
        holst.moveTo(0,i*(w/n));
        holst.lineTo(w,i*(w/n));
        holst.closePath();
        holst.stroke();

        holst.beginPath();
        holst.moveTo(i*(w/n),0);
        holst.lineTo(i*(w/n),w);
        holst.closePath();
        holst.stroke();
    }
}

setGrid();