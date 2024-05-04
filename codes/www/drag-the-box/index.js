function drag() {
    let dragging = null;
    let mouseX, mouseY;
    let eleX, eleY;
    const boxes = document.querySelectorAll("[draggable]");
    const dragPlaySound=document.getElementById("dragPlaySound");
    const dragPlaySound1=document.getElementById("dragPlaySound1");
    const dragPlaySound2=document.getElementById("dragPlaySound2");
    const dragPlaySound3=document.getElementById("dragPlaySound3");
    const dragPlaySound4=document.getElementById("dragPlaySound4");
    // dragPlaySound.volume=0.0009;

    boxes.forEach(box => {
        box.addEventListener("mousedown", mouseDown);
        box.style.position = 'absolute';
        box.style.top = 0;
        box.style.left = 0;
    });

    function mouseDown(e) {
        e.preventDefault();
        dragging = this;
        mouseX = e.pageX;
        mouseY = e.pageY;

        eleX = dragging.offsetLeft;
        eleY = dragging.offsetTop;

        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
       
      
        
    }

    function mouseMove(e) {
        if (dragging) {
            const DMX = e.pageX - mouseX;
            const DMY = e.pageY - mouseY;
            dragging.style.left = eleX + DMX + "px";
            dragging.style.top = eleY + DMY + "px";
           

            
            const coordDisplay = document.getElementById("coordDisplay");
            coordDisplay.innerText = `Left: ${eleX + DMX}px`;
            coordDisplay.innerText += `\nTop: ${eleY + DMY}px`;
           
            if (DMX+eleX <= 100) {
                dragPlaySound2.volume=0.03;
                dragPlaySound2.play();
                dragPlaySound1.pause();
                dragPlaySound.pause();
               
            }else if(DMX+eleX > 101 && DMX+eleX <=200) {
                dragPlaySound2.volume=0.3;
                dragPlaySound2.play();
                dragPlaySound1.pause();
                dragPlaySound.pause();
               
            }
            else if(DMX+eleX > 201 && DMX+eleX <=250) {
                dragPlaySound2.volume=0.9;
                dragPlaySound2.play();
                dragPlaySound1.pause();
                dragPlaySound.pause();
               
            }
            else if (DMX+eleX >= 251 && DMX+eleX <=350) {
                dragPlaySound1.volume=0.05;
                dragPlaySound1.play();
                dragPlaySound.pause();
                dragPlaySound2.pause();

            }else if (DMX+eleX >= 351 && DMX+eleX <=450) {
                dragPlaySound1.volume=0.5;
                dragPlaySound1.play();
                dragPlaySound.pause();
                dragPlaySound2.pause();

            }
            else if (DMX+eleX >= 451 && DMX+eleX <=500) {
                dragPlaySound1.volume=0.999;
                dragPlaySound1.play();
                dragPlaySound.pause();
                dragPlaySound2.pause();

            }
            else if (DMX+eleX >= 501 && DMX+eleX <=600) {
                dragPlaySound3.volume=0.05;
                dragPlaySound3.play();
                dragPlaySound.pause();
                dragPlaySound1.pause();
                dragPlaySound2.pause();

            }else if (DMX+eleX >= 601 && DMX+eleX <=700) {
                dragPlaySound3.volume=0.5;
                dragPlaySound3.play();
                dragPlaySound.pause();
                dragPlaySound1.pause();
                dragPlaySound2.pause();

            }
            else if (DMX+eleX >= 701 && DMX+eleX <=750) {
                dragPlaySound3.volume=0.99;
                dragPlaySound3.play();
                dragPlaySound.pause();
                dragPlaySound1.pause();
                dragPlaySound2.pause();

            }
            else if (DMX+eleX >= 751 && DMX+eleX <=850) {
                dragPlaySound4.volume=0.05;
                dragPlaySound4.play();
                dragPlaySound.pause();
                dragPlaySound1.pause();
                dragPlaySound2.pause();

            } else if (DMX+eleX >= 851 && DMX+eleX <=950) {
                dragPlaySound4.volume=0.5;
                dragPlaySound4.play();
                dragPlaySound.pause();
                dragPlaySound1.pause();
                dragPlaySound2.pause();

            }else if (DMX+eleX >= 951 && DMX+eleX <=1050) {
                dragPlaySound4.volume=0.99;
                dragPlaySound4.play();
                dragPlaySound.pause();
                dragPlaySound1.pause();
                dragPlaySound2.pause();

            }

            else{
                dragPlaySound.volume=0.999999999999999999999999999999999999999999999999999999;
                dragPlaySound.play();
            }
        }
      
    }

    function mouseUp() {
        dragging = null;
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
      
        
    }
}

drag();
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

console.log("Window height:", windowHeight);
console.log("Window width:", windowWidth);

