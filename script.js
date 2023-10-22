// var crsr = document.querySelector('#cursor');
// var main =  document.querySelector('#main');

// main.addEventListener("mousemove", function(dets){
//     crsr.style.left =  dets.x + "px";
//     crsr.style.top = dets.y + "px";
//     // console.log(dets);
// })


// var elem = document.querySelectorAll(".elem");


// elem.forEach (function (val){
//     // console.log(val.childNodes);

//     val.addEventListener("mouseenter", function(){
//         val.childNodes[1].style.display = "block";
//     })

//     val.addEventListener("mouseleave", function(){
//         val.childNodes[1].style.display = "none";
//     })
//     val.addEventListener("mousemove", function(dets){
//         val.childNodes[1].style.left = dets.x + "px";
//     })
// })

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10",
        opacity : 0,
        duration: 1.5,
        ease : Expo.easeInOut
    })
    .to(".boundingelem", {
        y: "0",
        ease : Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger : .2
    })
    .to(".boundingelem2", {
        y: "0",
        ease : Expo.easeInOut,
        duration: 0.6,
        delay: -1,
        stagger: .2
    })
    .from("#homefooter",{
        y: "-10",
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}


var timeOut;
function circleSkew(){
    var xscale = 1;
    var yscale = 1;


    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets) 
    {

        clearTimeout(timeOut);

        xscale = gsap.utils.clamp(.6, 1.4, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.6, 1.4, dets.clientY -  yprev);


        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeOut = setTimeout(function () {
            document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`
        })

    });
}


function circleMouseFollower(xscale, yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#cursor').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`
    })
}

circleSkew();
circleMouseFollower();
firstPageAnim();



document.querySelectorAll(".elem").forEach(function (photo) {
    var rotate = 0;
    var rotDiff = 0;


    photo.addEventListener("mousemove", function(dets) {
        var diff = dets.clientY - photo.getBoundingClientRect().top;
        rotDiff = dets.clientX - rotate;
        rotate = dets.clientX;

        gsap.to(photo.querySelector("img"), {
            opacity : 1,
            // display : "Block",
            ease : Power3,
            top : diff,
            left : dets.clientX,
            rotate : gsap.utils.clamp(-20, 20, rotDiff),
        })
        // console.log(diff);
    })

    photo.addEventListener("mouseleave", function(){
        gsap.to(photo.querySelector("img"), {
            opacity : 0,
        })
    })

});