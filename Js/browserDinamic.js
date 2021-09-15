'use strict'
// Subrutina en base a la rueda del raton
function browser(){
    var browser = document.getElementsByTagName('html')[0];
    var page = document.getElementById('browser');
    var finalpage = document.getElementById('final');
    
    document.addEventListener("wheel",()=>{
        let Top = browser.scrollTop;
        var pageactual = page.offsetTop;
        console.log("pageactual ->",pageactual);
        console.log("Top->",Top);

            // if(Top < 690){
            //     page.style.position = 'initial';
            //     page.style.width = "100%";
            //     page.style.marginTop = "0px";
                
            // }

            // if(Top > 1900){
            //     page.style.width = "100%";
            //     page.style.marginTop = "0px";
            // }
    });


    // Subrutina en base a Scroll
var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
    console.log("position scroll -> ",scroll_pos);
    if(scroll_pos < 1896){
        page.style.display = 'initial';
        page.style.position = 'fixed';
        page.style.width = "49%";

        page.style.marginTop = "270px";
        
        finalpage.style.backgroundColor = "initial";
        finalpage.style.backgroundImage = "none";
        finalpage.style.border = "0px";
    }

    if(scroll_pos < 900){
        page.style.position = 'initial';
        page.style.width = "100%";
        page.style.marginTop = "0px";
    }

    if(scroll_pos > 1897){
        page.style.display = 'none';
        finalpage.style.backgroundColor = "rgb(65, 65, 65,6.5)";
        finalpage.style.backgroundImage = "url(../assets/Img/browser-nav.png)";
        finalpage.style.border = "2px solid white";
        finalpage.style.padding = "5px 1px";
        finalpage.style.height = "29em";
    }
  // Hacer algo con la posición del scroll
}

window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
    window.requestAnimationFrame(function() {
        doSomething(last_known_scroll_position);
        ticking = false;
    });
}
ticking = true;
});

}

browser();


