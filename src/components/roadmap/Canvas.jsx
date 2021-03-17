import React, {useRef, useEffect} from 'react'
import {baseUrl} from "../shared/baseUrl"

const array_items = [{id: "fjfjdggxjzmccwjcacbjwjs", detail: "Data Types, Something really helpful.", position: 40, items: ["602e924f3c8d8400041f21cf", "601133bef2c5780004eebbf5", "5f6eea3e6e83a0000482bcfe"]}, {id: "kbjddbnbsdbbwwej", detail: "Loops and Functions.", position: 100, items: ["602e924f3c8d8400041f21cf", "601133bef2c5780004eebbf5", "5f6eea3e6e83a0000482bcfe"]},{id: "djhefufjifff2r", detail: "Hey There Do you wish to die.", position: 300, items: ["602e924f3c8d8400041f21cf", "601133bef2c5780004eebbf5", "5f6eea3e6e83a0000482bcfe"]}]

const mousepositions = array_items.map(x=>x.position)
var boxPositions = []
const Canvas = props=>{
    document.title  = "RoadMap | Project Ekatra"
    const canvasRef = useRef(null)
    var records = [];
    useEffect(()=>{
    /*Elementary Stuffs*/
       const canvas = canvasRef.current
       const ctx = canvas.getContext('2d')
       let animationFrameId;
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
              
       let mousePos = {
       	x: 0,
       	y: 0
       	}
       canvas.addEventListener("mousemove", function(e){
           mousePos.x = e.pageX;
           mousePos.y = e.pageY;
       })
       canvas.addEventListener("click", function(e){
       
       })
       
       function positionAlready(positions, y)
       {
           for(var i = 0;i<positions.length;i++)
           {
               if(Math.abs(positions[i]-y) < 8)
               return true;
           }
           return false;
       }
       
       function DrawPlus()
       {
          if(mousePos.x < canvas.width/2 + 5 && mousePos.x > canvas.width/2 - 5)
          {
          if(!positionAlready(mousepositions, mousePos.y))
          {ctx.textAlign = "center";
          ctx.font = "15px Arial";
          ctx.fillStyle = "#444"
          ctx.fillText("✚",canvas.width/2, mousePos.y+7)
          }
          }
       }
       
       function DrawItems(parent, index)
       {
           var width = Math.min(200, canvas.width/2-60);
           var height = 150;
           ctx.beginPath();
           ctx.lineWidth = "0.8";
           ctx.strokeStyle = "black";
           ctx.moveTo(canvas.width/2, parent.position);
           
           if(index%2===0)
           {
              var x  = 40 ;
              var y = index/2 * (height + 10) + 40;
              var x1 = x+width;              
           }
           else
           {
               var x = canvas.width - width - 40;
               var y = index/2*(height+10) + 30;
               var x1 = x;
           }
           ctx.bezierCurveTo(x1, parent.position, canvas.width/2, y + height/2, x1, y + height/2 );
           ctx.stroke();
           ctx.beginPath();
           ctx.moveTo(x1, y + height/2);
           ctx.lineTo(x1+15, y+height/2 - 4);
           ctx.moveTo(x1, y + height/2);
           ctx.lineTo(x1+15, y+height/2 + 4);
           //ctx.arc(x1+10 + 4, y+height/2, 8, 0, -Math.atan(2/5), Math.atan(2/5))
           ctx.stroke()
           boxPositions.push({x: x, y: y})
           ctx.beginPath();
           ctx.shadowColor = '#444';
           ctx.shadowBlur = 16;
           ctx.shadowOffsetX = 5;
           ctx.shadowOffsetY = 5;
           ctx.lineWidth = "2";
           ctx.rect(x, y, width, height);
           ctx.stroke();
           ctx.shadowBlur = 0;
           ctx.shadowOffsetX = 0;
           ctx.shadowOffsetY = 0;
       }
       
       
       function DrawDataPoints()
       {
          boxPositions = []
          for(var i = 0; i< array_items.length; i++)
          {
              DrawItems(array_items[i], i);
	      ctx.beginPath();
	      ctx.arc(canvas.width/2, array_items[i].position,5, 0, 2*Math.PI)
	      ctx.fillStyle = "#888";
	      ctx.fill();
          }
       }
       
       function DrawMidLine()/*To Draw The MidLine*/
       {
           let x1 =  canvas.width/2, y1  = 0, x2 = canvas.width/2, y2 = canvas.height;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.lineWidth = "2";
           ctx.strokeStyle = "black";
          ctx.stroke();
       }
       
       function Draw(){
          DrawMidLine();
          DrawDataPoints();
          DrawPlus();
          
       }       
       const render = ()=> {
          animationFrameId = window.requestAnimationFrame(render);
          ctx.clearRect(0,0,canvas.width, canvas.height);
          Draw();
       }
       
       render();
       
       return () =>{ window.cancelAnimationFrame(animationFrameId)};
    }, [])
    
    
    return <canvas ref  = {canvasRef} {...props} />
  }
  
export default Canvas;
