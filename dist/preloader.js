'use strict'

// -----------------Preloader------------------------
const w = window;
w.addEventListener('DOMContentLoaded',e => {
    setTimeout(()=>{
        $('#preloader').fadeOut(1);
        $('#invisible').removeClass('invisible');
    },2000);
})