$("#mobileCarousel").carousel({
  interval: 10000
})

$("#mobileCarousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
        console.log("touchstart is firing");
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 3 ){
            $(this).carousel('next');
            console.log("next event is firing.");
        }
        else if( Math.floor(xClick - xMove) < -3 ){
            $(this).carousel('prev');
            console.log("prev event is firing");
        }
    });
    $(this).one("touchend", function(){
            $(this).off("touchmove");
            console.log("touchend is firing");
    });
});

$(".carousel carousel-item").each(function(){
  var minPerSlide = 1;
  var nextElement = $(this).next();
  if(!nextElement.length){
    nextElement = $(this).siblings(":first");
  }
  nextElement.children(':first-child').clone().appendTo($(this));
  console.log("first item event is firing");

  for (var i = 0; i < minPerSlide; i++) {
    nextElement = nextElement.next();
    if(!nextElement.length){
      nextElement = $(this).siblings(":first");
    }
    nextElement.children(":first-child").clone().appendTo($(this));
    console.log("next item event is firing");
  }
});
