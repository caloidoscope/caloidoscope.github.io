/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 
function changeVideo (src, index) {
    src = getVideoId(src);
    $(".video-container iframe").remove();
    $('<iframe width="420" height="315" frameborder="0" allowfullscreen frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>')
        .attr("src", (src.indexOf("https://www.youtube.com/embed/")>-1? "" : "https://www.youtube.com/embed/")+src+ "?autoplay=1")
        .appendTo(".video-container");        
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if (index || index>-1){
        document.getElementsByClassName('song-active')[0].classList.remove('song-active');
        document.getElementById('song-'+index).classList.add('song-active');
    }
}
function getVideoId(src){
    src = src.replace('https://youtu.be/', '');
    src = src.replace('https://www.youtube.com/watch?v=','')
    return src
}
function stopVideo(){
    changeVideo('')
}
window.addEventListener('DOMContentLoaded', event => {

    

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible || !navbarCollapsible.classList.contains("home-nav")) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
