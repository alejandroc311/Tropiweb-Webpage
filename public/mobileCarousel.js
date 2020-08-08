$("#mobileCarousel").carousel({
  interval: 10000
})

$("#mobileCarousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
        console.log("touchstart is firing");
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 1 ){
            $(this).carousel('next');
            console.log("next event is firing.");
        }
        else if( Math.floor(xClick - xMove) < -1 ){
            $(this).carousel('prev');
            console.log("prev event is firing");
        }
    });
    $(this).one("touchend", function(){
            $(this).off("touchmove");
            console.log("touchend is firing");
    });
});
