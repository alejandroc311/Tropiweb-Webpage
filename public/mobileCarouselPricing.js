$("#pricingCarousel").carousel({
  interval: 15000
})

$("#pricingCarousel").on("touchstart", function(event){
        var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function(event){
        var xMove = event.originalEvent.touches[0].pageX;
        if( Math.floor(xClick - xMove) > 3 ){
            $(this).carousel('next');
        }
        else if( Math.floor(xClick - xMove) < -3 ){
            $(this).carousel('prev');
        }
    });
    $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
    });
});

$("#pricingCarousel carousel-item").each(function(){
  var minPerSlide = 3;
  var nextElement = $(this).next();
  if(!nextElement.length){
    nextElement = $(this).siblings(":first");
  }
  nextElement.children(':first-child').clone().appendTo($(this));

  for (var i = 0; i < minPerSlide; i++) {
    nextElement = nextElement.next();
    if(!nextElement.length){
      nextElement = $(this).siblings(":first");
    }
    nextElement.children(":first-child").clone().appendTo($(this));
  }
});
