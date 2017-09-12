// ##############################################
//   e-mail sending
var getData = function() {
	var data = {
		name: $('#name').val(),
		email: $('#email').val(),
		message: $('#message').val()
	};
	console.log(data);
	return data;
}

var showResult = function( type, msg) {
	$('#result').addClass( type );
	$('#result').text( msg ); 
}

var sendEmail = function(e) {
	e.preventDefault();
	var data = getData();
	$.ajax({
	    url: $('#form').attr('action'),
	    method: 'POST',
	    data: data,
	    success: function(response, xhr) {
	    	var res = JSON.parse( response );
	    	console.log(res);

	    	 if(Array.isArray(res)) {
                showResult("error", res.join("<br>"));
            } else if("error" in res) {
                showResult("error", res.error);
            } else if("success" in res) {
                showResult("success", res.success);
                // form.removeEventListener("submit", sendEmail, false);
                $('#submit').attr("disabled", "disabled");
            }
	    }
  	});
}
// ##############################################
$(document).ready( function () {

	$('#form').submit( function () {
		sendEmail();
	});

	$('.flota-main-item').mouseover( function() {
		flotaAnimate($(this), 0.7);
	}).mouseleave( function() {
		flotaAnimate($(this), 0.4, 100);
	});
	//##############  PRZYKLAJANE MENU   ##########################
	var NavY = $('.navbar').offset().top;

	var stickyNav = function() {
		var ScrollY = $(window).scrollTop();
		if (ScrollY > NavY+200) { 
			$('.navbar').addClass('sticky');
		} else {
			$('.navbar').removeClass('sticky'); 
		}
	};
	 
	stickyNav();
	 
	$(window).scroll(function() {
		stickyNav();
	});


	//##############  ANIMACJA PRZEWIJANIA STRONY  ###############
	var lastActive;
	var licznik = 0;
	// Animacja gornego menu
	$('a[href^="#"]').on('click', function(event) {
		var target = $( $(this).attr('href') );
		var toactive = $(this);
		toactive.addClass("active");
		if(licznik++ > 0) lastActive.removeClass("active");
		if( target.length ) {
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000);
		}
		lastActive = toactive;
	});

	tabs();
	$.stellar();
});

//##############  ANIMACJA Elementów na stronie  ###############
window.sr = ScrollReveal({ 
	duration: 500,
	delay: 300,
	reset: false,
	distance: 20
 });
	sr.reveal('.subtitle', 50);
	sr.reveal('.row', 50);


//##############  FLOTA onMouseOver animate() ###############
var flotaAnimate = function( e, upToHeight, maxImgSize = 140, speed = 250 ) {
	var flotaHover = e.children('.flota-hover');
	var backgroundImg = e.children('.flota-image');
	flotaHover.animate({
		// height: upToHeight + "px" 
		opacity: upToHeight
	},
	speed);
	backgroundImg.animate({
		"background-size": maxImgSize + "%"
	},
	speed);
}

//##############  FLOTA Tabs ###############

   var tabs = function() {
      $('#flota').css('height', $('.tab-content.active').height() + 600);

      // $(window).resize(function(){
      //    $('#flota').css('height', $('.tab-content.active').height() + 600);
      // });

      $('.tabs-nav > div > a').on('click', function(e){
         
         var tab = $(this).data('tab');

         $('.tabs-nav > div > a > .flota-main-item > h2').removeClass('flota-active');
         $(this).find('.flota-main-item > h2').addClass('flota-active');

         $('.tab-content').removeClass('active show');
         
         setTimeout(function(){
            $('.tab-content[data-tab-content="'+tab+'"]').addClass('active');
            $('#flota').css('height', $('.tab-content.active').height() + 600);
         }, 200);
         setTimeout(function(){
            $('.tab-content[data-tab-content="'+tab+'"]').addClass('show');
         }, 400);
         

         e.preventDefault();
      });
   };