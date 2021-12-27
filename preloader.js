'use strict'

// -----------------Preloader------------------------
window.onload = ()=>{
    setTimeout(()=>{
        $('#preloader').fadeOut(1);
        $('#invisible').removeClass('invisible');
    },1500);
}