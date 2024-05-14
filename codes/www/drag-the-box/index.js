function drag() {
    let dragging = null;
    let mouseX, mouseY;
    let eleX, eleY;
    const boxes = document.querySelectorAll("[draggable]");
    const dragPlaySound = document.getElementById("dragPlaySound");
    const dragPlaySound1 = document.getElementById("dragPlaySound1");
    const dragPlaySound2 = document.getElementById("dragPlaySound2");
    const dragPlaySound3 = document.getElementById("dragPlaySound3");
    const dragPlaySound4 = document.getElementById("dragPlaySound4");
    
    boxes.forEach(box => {
        box.addEventListener("mousedown", mouseDown);
        box.addEventListener("touchstart", touchStart);
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

    function touchStart(e) {
        e.preventDefault();
        dragging = this;
        mouseX = e.touches[0].pageX;
        mouseY = e.touches[0].pageY;

        eleX = dragging.offsetLeft;
        eleY = dragging.offsetTop;

        document.addEventListener('touchmove', touchMove);
        document.addEventListener('touchend', touchEnd);
    }

    function mouseMove(e) {
        if (dragging) {
            const DMX = e.pageX - mouseX;
            const DMY = e.pageY - mouseY;
            const windowWidth = window.innerWidth;

            const maxPosX = windowWidth - dragging.offsetWidth;
            const posX = eleX + DMX;
            dragging.style.left = posX <= maxPosX ? Math.max(0, posX) + "px" : maxPosX + "px";
            dragging.style.top = eleY + DMY + "px";

            const coordDisplay = document.getElementById("coordDisplay");
            
            coordDisplay.innerText = `Difference between boxes: ${Math.abs(parseInt(boxes[0].style.left) - parseInt(boxes[1].style.left))}px\nBox1 Left: ${parseInt(boxes[0].style.left)}px\nBox1 top: ${parseInt(boxes[0].style.top)}px\nBox2 Left: ${parseInt(boxes[1].style.left)}px\nBox2 top: ${parseInt(boxes[1].style.top)}px`;
       
            if (dragging === boxes[0] &&  parseInt(boxes[0].style.left) < 200) {
                dragPlaySound2.volume =0.2;
               dragPlaySound2.play();
            }else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left) > 201 && parseInt(boxes[0].style.left) < 400) {
                dragPlaySound2.volume =0.4;
               dragPlaySound2.play();
            }else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left) > 401 && parseInt(boxes[0].style.left) < 650) {
                dragPlaySound2.volume =0.55;
               dragPlaySound2.play();
            }
            else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left)>651 &&  parseInt(boxes[0].style.left) < 800) {
                dragPlaySound2.volume =0.7;
               dragPlaySound2.play();
            }
            else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left)> 800) {
                dragPlaySound2.volume =0.9;
               dragPlaySound2.play();
            }
            else if (dragging === boxes[1] &&  parseInt(boxes[1].style.left) < 200) {
                dragPlaySound1.volume =0.2;
               dragPlaySound1.play();
            }

            else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left) > 201 && parseInt(boxes[1].style.left) < 400) {
                dragPlaySound1.volume =0.4;
               dragPlaySound1.play();
            }else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left) > 401 && parseInt(boxes[1].style.left) < 650) {
                dragPlaySound1.volume =0.55;
               dragPlaySound1.play();
            }
            else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left)>651 &&  parseInt(boxes[1].style.left) < 800) {
                dragPlaySound1.volume =0.7;
               dragPlaySound1.play();
            }
            else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left)> 800) {
                dragPlaySound1.volume =0.9;
               dragPlaySound1.play();
            }


            //  else if (dragging === boxes[1]) {
            //     dragPlaySound1.play();
            // }
        }
    }

    function touchMove(e) {
        if (dragging) {
            const DMX = e.touches[0].pageX - mouseX;
            const DMY = e.touches[0].pageY - mouseY;
            const windowWidth = window.innerWidth;

            const maxPosX = windowWidth - dragging.offsetWidth;
            const posX = eleX + DMX;
            dragging.style.left = posX <= maxPosX ? Math.max(0, posX) + "px" : maxPosX + "px";
            dragging.style.top = eleY + DMY + "px";

            const coordDisplay = document.getElementById("coordDisplay");
           
            coordDisplay.innerText = `Difference between boxes: ${Math.abs(parseInt(boxes[0].style.left) - parseInt(boxes[1].style.left))}px\nBox1 Left: ${parseInt(boxes[0].style.left)}px\nBox1 top: ${parseInt(boxes[0].style.top)}px\nBox2 Left: ${parseInt(boxes[1].style.left)}px\nBox2 top: ${parseInt(boxes[1].style.top)}px`;
       
            if (dragging === boxes[0] &&  parseInt(boxes[0].style.left) < 100) {
                dragPlaySound2.volume =0.2;
                dragPlaySound2.play();
            }else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left) > 101 && parseInt(boxes[0].style.left) < 200) {
                dragPlaySound2.volume =0.4;
                dragPlaySound2.play();
            }else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left) > 201 && parseInt(boxes[0].style.left) < 300) {
                dragPlaySound2.volume =0.55;
                dragPlaySound2.play();
            }
            else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left) > 301 &&  parseInt(boxes[0].style.left) < 550) {
                dragPlaySound2.volume =0.7;
                dragPlaySound2.play();
            }
            else if (dragging === boxes[0] &&   parseInt(boxes[0].style.left)> 551) {
                dragPlaySound2.volume =0.9;
                dragPlaySound2.play();
            }
            else if (dragging === boxes[1] &&  parseInt(boxes[1].style.left) < 100) {
                dragPlaySound1.volume =0.2;
                dragPlaySound1.play();
            }else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left) > 101 && parseInt(boxes[1].style.left) < 200) {
                dragPlaySound1.volume =0.4;
                dragPlaySound1.play();
            }else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left) > 201 && parseInt(boxes[1].style.left) < 300) {
                dragPlaySound1.volume =0.55;
                dragPlaySound1.play();
            }
            else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left) > 301 &&  parseInt(boxes[1].style.left) < 550) {
                dragPlaySound1.volume =0.7;
                dragPlaySound1.play();
            }
            else if (dragging === boxes[1] &&   parseInt(boxes[1].style.left)> 551) {
                dragPlaySound1.volume =0.9;
                dragPlaySound1.play();
            }
        }
    }

    function mouseUp() {
        dragging = null;
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }

    function touchEnd() {
        dragging = null;
        document.removeEventListener('touchmove', touchMove);
        document.removeEventListener('touchend', touchEnd);
    }

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    console.log("Window height:", windowHeight);
    console.log("Window width:", windowWidth);
}

drag();
