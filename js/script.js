// JavaScript Document
(function($) {
  "use strict";
	var rows = $('tr').filter(function(){
		if($(this).css('background-color') == "#fdead0" || $(this).css('background-color') == "rgb(253,234,208)") {
			$(this).css('display','none');
		}
	});
	 

	// makes sure the whole site is loaded
	
	$(window).load(function() {
		// will first fade out the loading animation
		$(".signal").fadeOut();
		// will fade out the whole DIV that covers the website.
		$("#preloader").delay(500).fadeOut("slow");
		
	})
	
	$(function() {
		
		
		$("input,textarea").jqBootstrapValidation({
			preventSubmit: true,
			submitError: function($form, event, errors) {
				// additional error messages or events
			},
			submitSuccess: function($form, event) {
				event.preventDefault(); // prevent default submit behaviour
				// get values from FORM
				var name = $("input#name").val();
				var email = $("input#email").val();
				var website = $("input#website").val();
				var message = $("textarea#message").val();
				var firstName = name; // For Success/Failure Message
				// Check for white space in name for Success/Fail message
				if (firstName.indexOf(' ') >= 0) {
					firstName = name.split(' ').slice(0, -1).join(' ');
				}
				$.ajax({
					url: "././contact/contact.php",
					type: "POST",
					data: {
						name: name,
						website: website,
						email: email,
						message: message
					},
					cache: false,
					success: function() {
						// Success message
						$('#success').html("<div class='alert alert-success'>");
						$('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-success')
							.append("<strong>Your message has been sent. </strong>");
						$('#success > .alert-success')
							.append('</div>');

						//clear all fields
						$('#contactForm').trigger("reset");
					},
					error: function() {
						// Fail message
						$('#success').html("<div class='alert alert-danger'>");
						$('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
							.append("</button>");
						$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
						$('#success > .alert-danger').append('</div>');
						//clear all fields
						$('#contactForm').trigger("reset");
					},
				})
			},
			filter: function() {
				return $(this).is(":visible");
			},
		});

		$("a[data-toggle=\"tab\"]").click(function(e) {
			e.preventDefault();
			$(this).tab("show");
		});
	});


	/*When clicking on Full hide fail/success boxes */
	$('#name').focus(function() {
		$('#success').html('');
	});



	jQuery(document).ready(function(){
		
		if($(window).width() < 1024){
			$("div").removeClass('animate');
		}
			
		var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
		var is_explorer = navigator.userAgent.indexOf('MSIE') > -1;
		var is_firefox = navigator.userAgent.indexOf('Firefox') > -1;
		var is_safari = navigator.userAgent.indexOf("Safari") > -1;
		var is_opera = navigator.userAgent.indexOf("Presto") > -1;
		if ((is_chrome)&&(is_safari)) {is_safari=false;}
		
		if( is_safari ){
			$('body').addClass('safari');	
		}
		else if( is_explorer ){
			$('body').addClass('ie');
		}
		else if( is_firefox ){
			$('body').addClass('firefox');	
		}
		else if( is_opera ){
			$('body').addClass('opera');	
		}
		else {
			$('body').addClass('chrome');
		}
		
		// back to top	
		
		$('.back-to-top').fadeOut(duration);
		var offset = 220;
		var duration = 1000;
		$(window).scroll(function() {
			if ($(this).scrollTop() > offset) {
				$('.back-to-top').fadeIn(duration);
			} else {
				$('.back-to-top').fadeOut(duration);
			}
		});
		
		$('.back-to-top').click(function(event) {
			event.preventDefault();
			$('html, body').animate({scrollTop: 0}, duration);
			return false;
		})
		
		
		
		// parallax	
		
		$('.parallax').parallax("50%", 0.3);
			
		
		if( $('#slides, #image_slides, #text_slides').width() ){
			
			// super slider
			
			var $slides = $('#slides, #image_slides, #text_slides' );
			
			Hammer($slides[0]).on("swipeleft", function(e) {
				$slides.data('superslides').animate('next');
			});

			Hammer($slides[0]).on("swiperight", function(e) {
				$slides.data('superslides').animate('prev');
			});
			
			
			
			$('#text_slides').superslides({
				animation: 'slide',
				pagination:false,
				play: 7000
			});
					

			$('#slides, #image_slides').superslides({
				animation: 'fade',
				pagination:false,
				play: 6000
			});
			
		}
		if( $('#video_background').width() ){
			
			// Video bg
			
			$('#video_background').superslides();
		}
		$(".player").mb_YTPlayer({
						
			});
		
		if( $('.slit-slider').width() ){
		
			//slit slider
			
			var Page = (function() {

					var $navArrows = $( '#nav-arrows' ),
						$nav = $( '#nav-dots > span' ),
						slitslider = $( '#slit_slides' ).slitslider( {
							onBeforeChange : function( slide, pos ) {

								$nav.removeClass( 'nav-dot-current' );
								$nav.eq( pos ).addClass( 'nav-dot-current' );

							}
						} ),

						init = function() {

							initEvents();
							
						},
						initEvents = function() {

							// add navigation events
							$navArrows.children( ':last' ).on( 'click', function() {

								slitslider.next();
								return false;

							} );

							$navArrows.children( ':first' ).on( 'click', function() {
								
								slitslider.previous();
								return false;

							} );

							$nav.each( function( i ) {
							
								$( this ).on( 'click', function( event ) {
									
									var $dot = $( this );
									
									if( !slitslider.isActive() ) {

										$nav.removeClass( 'nav-dot-current' );
										$dot.addClass( 'nav-dot-current' );
									
									}
									
									slitslider.jump( i + 1 );
									return false;
								
								} );
								
							} );

						};

						return { init : init };

				})();

				Page.init();

			
		}
		
		// Sticky Header
		
		if( $('.bottom-header').width() ){
			var offset = $(window).height();
			$(window).scroll(function() {				
				if ($(this).scrollTop() < offset) {
					$('.header-menu-bg').addClass('bottom-header').css({'top':'auto'});
				} 
				else{
					$('.header-menu-bg').removeClass('bottom-header').css({'top':'0'});
				}
			});
		}
		
		$(window).scroll(function() {
			var offset = 10;
			if( $('.white-bg').width() ){
				if ($(this).scrollTop() > offset) {
					$('.transparent-bg').removeClass('transparent').animate('slow');
					$('.transparent-bg').removeClass('white').animate('slow');
				} else {
					$('.transparent-bg').addClass('transparent').animate('slow');
					$('.transparent-bg').addClass('white').animate('slow');
				}	
				
			}
			else{
				if ($(this).scrollTop() > offset) {
					$('.transparent-bg').removeClass('transparent').animate('slow');
				} else {
					$('.transparent-bg').addClass('transparent').animate('slow');
				}

			}
		});
		
		// tab-nav-menu
		
		$('.toggle-nav-menu').click(function(m){
			m.preventDefault();
			if ( $('.tab-nav-menu-content').is(':hidden') ) {		
				$('.tab-nav-menu-content').slideDown(400);
			}
			else{
				$('.tab-nav-menu-content').slideUp(400);	
			}
					
		});
		
		$('.tp-leftarrow').add("<i></i>");
		$('.tab-nav-menu-content .menu-item-has-children a').append("<a class=indicator href=#><i></i></a>");
		
		$('.tab-nav-menu-content .menu-item-has-children >a .indicator i').addClass("icon ion-ios7-plus-empty");
		
		$('.tab-nav-menu-content .menu-item-has-children a.indicator').click(function(m){
			m.preventDefault();
			if ( $(this).parent(' a ').parent(' li ').children('.sub-menu').is(':hidden')  ) {		
				$(this).parent(' a ').parent(' li ').children('.sub-menu').slideDown(400);
			}
			else
			{
				$(this).parent(' a ').parent(' li ').children('.sub-menu').slideUp(400);
			}		
			
		});	
		
		$('.tab-nav-menu-content .menu-item-has-children').removeClass("megamenu");
		
		
		
		// header Search
		
		$('.header-search-toggle').click(function(e){
			e.preventDefault();
			if ( $('.header-search').is(':hidden') ) {		
				$('.header-search').slideDown(300);
			}
			else{
				$('.header-search').slideUp(300);	
			}
					
		});
				
		
		// tablet menu
		
		$(".nav-menu-content a").click(function(e){
			
			$(this).addClass('active');
			$(this).parent().siblings().find('a').removeClass('active');
		});

		
		
		//menu
		if( $(".slide-menu").width() ){
			$(".slide-menu").pageslide({ modal: true, width:350 });
		
		}
		
		// page scroll
		
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top -80
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});

		 /**
		 * This part handles the highlighting functionality.
		 * We use the scroll functionality again, some array creation and 
		 * manipulation, class adding and class removing, and conditional testing
		 */
		var aChildren = $("nav li").children(); // find the a children of the list items
		var aArray = []; // create the empty aArray
		for (var i=0; i < aChildren.length; i++) {    
			var aChild = aChildren[i];
			var ahref = $(aChild).attr('href');
			aArray.push(ahref);
		} // this for loop fills the aArray with attribute href values

		$(window).scroll(function(){
			var windowPos = $(window).scrollTop()+85; // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();

			for (var i=0; i < aArray.length; i++) {
				var theID = aArray[i];	
				
				var divPosid = $(theID);
				if (!divPosid.length) {
					return;
				}
				var divPos = divPosid.offset().top; // get the offset of the div from the top of page
				
				var divHeight = $(theID).height(); // get the height of the div in question
				if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
					$("a[href='" + theID + "']").addClass("active");
				} else {
					$("a[href='" + theID + "']").removeClass("active");
				}
			}

			if(windowPos + windowHeight == docHeight) {
				if (!$("nav li:last-child a").hasClass("active")) {
					var navActiveCurrent = $(".active").attr("href");
					$("a[href='" + navActiveCurrent + "']").removeClass("active");
					$("nav li:last-child a").addClass("active");
				}
			}
		});
		
		
		// initialize Isotope
		if( $('.portfolio-masonry').width() ){
			var colwidth =  $(window).width()/4;
			var $portfolio_container = $('.portfolio-masonry').isotope({
				itemSelector: '.portfolio-thumbnail',
				masonry: {
					columnWidth: colwidth,
					gutter:0,
				}
			});		
			$portfolio_container.imagesLoaded(function() {
				$portfolio_container.isotope('layout');
			});
			
		}
		$(window).resize(function(){
			if( $('.portfolio-masonry').width() ){
				var colwidth =  $(window).width()/4;
				var $portfolio_container = $('.portfolio-masonry').isotope({
					itemSelector: '.portfolio-thumbnail',
					masonry: {
						columnWidth: colwidth,
						gutter:0,
					}
				});		
				$portfolio_container.imagesLoaded(function() {
					$portfolio_container.isotope('layout');
				});
				
			}
		});
		
		
		
		
		
		// filter	

		$("#filters a").click(function(e){
			e.preventDefault();
			$(this).addClass('active');
			$(this).parent().siblings().find('a').removeClass('active');
		});
		
		var $portfolio_container = $('.portfolio-page');
		
		// filter items when filter link is clicked
		$('.filter a').click(function(){
			
			var selector = $(this).attr('data-filter');
			$portfolio_container.isotope({ 
				itemSelector: '.portfolio-thumbnail',
				filter: selector,
				
			});
			return false;  
		});
		
		
		
		// carousel
		
		var owl = $(".carousel-portfolio");
		owl.owlCarousel({
			autoPlay : 5000,
			items : 3, //10 items above 1000px browser width
			responsive:{
				0:{
					items:1,
				},
				768:{
					items:2,
				},
				992:{
					items:3,
				}
			}
		
		});
		
		var owl = $(".carousel-portfolio-full");
		owl.owlCarousel({
			autoPlay : 5000,
			items : 4, //10 items above 1000px browser width
			responsive:{
				0:{
					items:1,
				},
				768:{
					items:2,
				},
				992:{
					items:4,
				}
			}
		
		});
		
		// carousel clients
		
		var owl = $("#carousel-clients");
		owl.owlCarousel({
			autoPlay : 4000,
			items : 6, //10 items above 1000px browser width
			responsive:{
				0:{
					items:1,
				},
				768:{
					items:3,
				},
				992:{
					items:6,
				}
			}
		
		});
		
		$(".carousel-team").owlCarousel({
			autoPlay : 5000,
			items : 4, //10 items above 1000px browser width
			responsive:{
				0:{
					items:1,
				},
				768:{
					items:2,
				},
				992:{
					items:4,
				}
			}
		
		});
		
		$(".carousel-testimonials").owlCarousel({
			autoPlay : 6000,
			slideSpeed : 700,
			paginationSpeed : 400,
			items: 1,
		});
		
		
		
		//	Blog hover
		
		$('.post-content-container').hover(
			function(){
				$(this).siblings('.post-thumbnail').children('.post-thumbnail-overlay').css({'background-color':'rgba(143,128,114,0)'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').css({'border-color':'#8f8072'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').children('a').css({'color':'#8f8072'});
			},
			function(){
				$(this).siblings('.post-thumbnail').children('.post-thumbnail-overlay').css({'background-color':'rgba(143,128,114,1)'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').css({'border-color':'#f0f0f0'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').children('a').css({'color':'#f0f0f0'});
			}
		)
		
		//	Blog hover
		
		$('.blog-modern-lite .post-content-container').hover(
			function(){
				$(this).siblings('.post-thumbnail').children('.post-thumbnail-overlay').css({'background-color':'rgba(251,251,251,0)'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').css({'border-color':'#f0f0f0'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').children('a').css({'color':'#f0f0f0'});
			},
			function(){
				$(this).siblings('.post-thumbnail').children('.post-thumbnail-overlay').css({'background-color':'rgba(251,251,251,1)'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').css({'border-color':'#8f8072'});
				$(this).children('.post-inner').children('.post-content').children('.post-date').children('a').css({'color':'#8f8072'});
			}
		)
		
		$('.blog-2-post-top').hover(
			function(){
				$(this).siblings('.blog-2-post-bottom').css({'opacity':'1'});
				$(this).children('.entry-content').children('.entry-title').children('h5').children('a').css({'color':'#f0f0f0'});
				$(this).children('.entry-content').children('.entry-title').children('h4').children('a').css({'color':'#f0f0f0'});
				$(this).children('.entry-content').children('p').css({'color':'#f0f0f0'});
				$(this).children('.entry-content').siblings('.entry-footer').children('.entry-description').children('h6').css({'color':'#f0f0f0'});
			},
			function(){
				$(this).siblings('.blog-2-post-bottom').css({'opacity':'0'});
				$(this).children('.entry-content').children('.entry-title').children('h5').children('a').css({'color':'#8f8072'});
				$(this).children('.entry-content').children('.entry-title').children('h4').children('a').css({'color':'#8f8072'});
				$(this).children('.entry-content').children('p').css({'color':'#707070'});
				$(this).children('.entry-content').siblings('.entry-footer').children('.entry-description').children('h6').css({'color':'#333333'});
			}
		)
		
		
		if( $('.blog-masonry').width() ){
			var $container = $('.blog-masonry').imagesLoaded( function() {
				$container.isotope({
					itemSelector: '.blog-content',
					layoutMode: 'masonry',
				});
			});
		}
	
	
		// Animate
		
		$('.animate').each(function () {
			$(this).one('inview', function (e) {
				$(this).addClass('animated').css('visibility', 'visible');
			});
		});
		
		// Contact form
		
		$("body").on("input propertychange", ".floating-label-form-group", function(e) {
			$(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
		}).on("focus", ".floating-label-form-group", function() {
			$(this).addClass("floating-label-form-group-with-focus");
		}).on("blur", ".floating-label-form-group", function() {
			$(this).removeClass("floating-label-form-group-with-focus");
		});
		
		if( $('#map_canvas').width() ){
		
			// google map
			
			var get_lat = '10.010509';
			var get_lng = '77.487774';
			var get_add1 ='AgniDesigns';
			var get_add2 ='Envato, Level 13, 2 Elizabeth St, Melbourne,';
			var get_add3 ='Victoria 3000, Australia.';
			
			var lat=get_lat;   // Latitude of location
			var lang=get_lng;  // Longitude  of location
			var desc='<div>'+
						  '<h6>'+get_add1+'</h6>'+
						  '<p>'+get_add2+'</p>'+
						  '<p>'+get_add3+'</p>'+
					 '</div>';
			var showImage='img/marker.png';
			var imageTitle=get_add1;
			var divId='map_canvas';
			initializeMap(lat,lang,desc,showImage,imageTitle,divId);
						
		}
		
	});


})(jQuery);
