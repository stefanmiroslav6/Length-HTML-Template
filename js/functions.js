"use strict";

$(document).ready( function() {
	
	$.fn.initAnimation = function() {
		$(this).each( function() {
			var animation_class = $(this).data('animate');
			var delay = $(this).data('delay');
			delay = delay? delay : 0;
			var obj = $(this);
			setTimeout( function() {
				obj.removeClass('not-animated').addClass(animation_class).addClass('animated');
				obj.removeClass('hide-iframe');
				obj.css( 'visibility', 'visible' );
			}, delay );
		} );
	};
	$.fn.resetAnimation = function() {
		$(this).each( function() {
			var animation_class = $(this).data('animate');
			$(this).removeClass(animation_class).removeClass('animated').addClass('not-animated');
		} );
	};
	
	/* Contact Form */
	$('#contact-form').each( function() {
		var contact_form = $(this);
		contact_form.find('#submit').on( 'click', function() {
			contact_form.submit();
		} );
		contact_form.on( 'submit', function(e) {
			e.preventDefault();
			contact_form.ajaxSubmit( {
				success: function( data, textStatus, error ) {
					alert(data);
				},
				error: function( data, textStatus, success ) {
					alert(data);
				}
			} );
		} );
		
	} );
	
	function init() {
		/* Sliding menu */
		$('#menu-toggle, #sticky-menu-toggle').on( "click", function(e) {
			e.preventDefault();
			if( window.matchMedia("(min-width: 768px)").matches ) {
				$('.sliding-menu-bg').addClass('opened');
				$('.sliding-menu').addClass('opened');
			} else {
				var mobile_menu = $('.mobile-menu');
				if( mobile_menu.hasClass('opened') ) {
					mobile_menu.removeClass('opened');
					mobile_menu.slideUp(300);
				} else {
					mobile_menu.addClass('opened');
					mobile_menu.slideDown(300);
				}
			}
		} );
		$('.menu-close').on( "click", function(e) {
			e.preventDefault();
			$('.sliding-menu-bg').removeClass('opened');
			$('.sliding-menu').removeClass('opened');
		} );
		
		/* Mobile menu item click */
		$('.mobile-menu .menu-item').on( "click", function() {
			var mobile_menu = $('.mobile-menu');
			mobile_menu.removeClass('opened');
			mobile_menu.hide();
		} );
		
		/* Menu item smooth scroll */
		$('.menu-item').smoothScroll( {
			offset: -80,
			speed: 700
		} );

		/* Piecharts initialization */
		$('.piechart').each( function() {
			var piechart = $(this);
			piechart.waypoint( function() {
				if( !piechart.hasClass('chart-drawn') ) {
					piechart.addClass('chart-drawn');
					var width = piechart.parent().width();
					piechart.circliful( {
						dimension: width,
						animationstep: 1.5
					} );
				}
			}, {
				triggerOnce: true,
				offset: 'bottom-in-view'
			} );
		} );
		
		/* "Who We Are" part slider initialization */
		var whoweare_swiper = new Swiper( '#slider-who-we-are', {
			direction: 'horizontal',
			loop: true,
			autoplay: 5000,
			speed: 600,
			prevButton: '#col-who-we-are .swiper-prev',
			nextButton: '#col-who-we-are .swiper-next'
		} );
		
		/* Counters section parallax */
		$('#counters').parallax( "50%", 0.3 );
		
		/* Counters start */
		$('.counter-value').each( function() {
			var counter = $(this);
			counter.waypoint( function() {
				counter.countTo();
			}, {
				triggerOnce: true,
				offset: 'bottom-in-view'
			} );
		} );
		
		/* Category selector */
		$('.category-selectors .category').on( "click", function( e ) {
			e.preventDefault();
			e.stopPropagation();
			$(this).parent().find('.category').removeClass('active');
			$(this).addClass('active');
			var filter_class = $(this).data('filter');
			if( filter_class != '*' ) {
				filter_class = '.' + filter_class;
			}
			var container = $(this).closest('#our-work').find('.our-works-container');
			container.isotope( {
				filter: filter_class
			} );
		} );
		
		/* Progress bars */
		$('.progress').each( function() {
			var progress = $(this);
			progress.append( '<div class="progressbar"></div>' );
			var bar = progress.find('.progressbar');
			progress.waypoint( function() {
				bar.animate( {
					width: progress.data('value') + '%'
				}, progress.data('speed'), "easeOutCubic" );
			}, {
				triggerOnce: true,
				offset: 'bottom-in-view'
			} );
		} );
		
		/* CSS Animation with waypoint */
		$('#content [data-animate]').each( function() {
			var element = $(this);
			element.waypoint( function() {
				element.initAnimation();
			}, {
				triggerOnce: true,
				offset: 'bottom-in-view'
			} );
		} );
		
		/* Project Single page slider initialization */
		var project_images_swiper = new Swiper( '#project-slider', {
			direction: 'horizontal',
			loop: false,
			autoplay: 5000,
			speed: 600,
			pagination: '.project-swiper-pagination',
			paginationClickable: true,
			paginationBulletRender: function (index, className) {
				return '<span class="' + className + '" style="background-image: url(\'images/project-single/project-slide0' + ( index + 1 ) + '-thumb.jpg\');"></span>';
			}
		} );
		
		/* Related Projects slider initialization */
		related_project_slider_init();
		
		/* Workflow step color change init */
		$('.workflow').each( function() {
			var workflow = $(this);
			workflow.waypoint( function() {
				var workflow_step = workflow.find('.workflow-step:first');
				function workflow_animate() {
					if( typeof (workflow_step.attr('class')) !== "undefined" ) {
						workflow_step.removeClass('style-gray');
						if( workflow_step.hasClass('right') ) {
							workflow_step.find('.workflow-content').addClass('slideInLeft animated');
						} else {
							workflow_step.find('.workflow-content').addClass('slideInRight animated');
						}
						workflow_step.find('.workflow-content').css( 'visibility', 'visible' );
						workflow_step = workflow_step.next('.workflow-step');
						setTimeout( workflow_animate, 600 );
					}
				}
				workflow_animate();
			}, {
				triggerOnce: true,
				offset: '70%'
			} );
		} );
		
		/* HTML5 video play */
		if( Modernizr.video ) {
			$('.play-pause-control').on( "click", function() {
				var video_container = $(this).closest('.video-container');
				if( video_container.hasClass('paused') ) {
					video_container.find('video')[0].play();
					video_container.removeClass('paused');
				} else {
					video_container.find('video')[0].pause();
					video_container.addClass('paused');
				}
			} );
		} else {
			$('.play-pause-control').hide();
		}
		
		/* To mimic ajax-loading posts */
		var posts_added = false;
		$('.load-button').on( "click", function() {
			if( !posts_added ) {
				posts_added = true;
				var load_button = $(this);
				load_button.find('.caption').hide();
				load_button.find('.spinner').show();
				setTimeout( function() {
					var new_posts = load_button.closest('.timeline-posts-container').find('.posts').append('<div class="post left-side loaded-and-hidden"> \
						<div class="row"> \
							<div class="col-xs-10 post-area"> \
								<div class="topbar"><div class="category"> \
									<i class="icon-pen"></i>Design</div><div class="publish-date"> \
									<span class="month">Dec</span><span class="day">15</span></div><div class="icon-container"> \
									<i class="icon-next"></i></div> \
								</div> \
								<section class="content"> \
									<a href="blog-single.html"><h3 class="title">Standard Blog Post Format</h3></a> \
									<div class="title-divider"></div> \
									<div class="excerpt">Aenean ac auctor nisl. Vestibulum tristique erat semper arcu elementum faucibus sit amet et mi. roin non nisi nec sem vestibulum ullamcorper.</div> \
									<a class="readmore" href="blog-single.html">READ MORE</a> \
								</section> \
							</div> \
						</div> \
					</div> \
					<div class="post right-side loaded-and-hidden"> \
						<div class="row"> \
							<div class="col-xs-10 post-area"> \
								<div class="topbar"><div class="publish-date"><span class="day">07</span><span class="month">Dec</span> \
									</div><div class="category">Design<i class="icon-pen"></i> \
									</div><div class="icon-container"><i class="icon-prev"></i></div> \
								</div> \
								<div class="featured-media"><img class="fullwidth" src="images/home/post03.jpg"></div> \
								<section class="content"> \
									<a href="blog-single.html"><h3 class="title">Standard Blog Post Format</h3></a> \
									<div class="title-divider"></div> \
									<div class="excerpt">Aenean ac auctor nisl. Vestibulum tristique erat semper arcu elementum faucibus sit amet et mi. roin non nisi nec sem vestibulum ullamcorper.</div> \
									<a class="readmore" href="blog-single.html">READ MORE</a> \
								</section> \
							</div> \
						</div> \
					</div> \
					<div class="post left-side loaded-and-hidden"> \
						<div class="row"> \
							<div class="col-xs-10 post-area"> \
								<div class="topbar"><div class="category"> \
									<i class="icon-pen"></i>Design</div><div class="publish-date"> \
									<span class="month">Nov</span><span class="day">28</span></div><div class="icon-container"> \
									<i class="icon-next"></i></div> \
								</div> \
								<section class="content"> \
									<a href="blog-single.html"><h3 class="title">Standard Blog Post Format</h3></a> \
									<div class="title-divider"></div> \
									<div class="excerpt">Aenean ac auctor nisl. Vestibulum tristique erat semper arcu elementum faucibus sit amet et mi. roin non nisi nec sem vestibulum ullamcorper.</div> \
									<a class="readmore" href="blog-single.html">READ MORE</a> \
								</section> \
							</div> \
						</div> \
					</div>');
					new_posts.find('.post').animate( {
						opacity: 1
					}, 300 );
					load_button.find('.caption').html( 'All loaded' );
					load_button.find('.caption').show();
					load_button.find('.spinner').hide();
				}, 1500 );
			}
		} );
	}
	
	/* Initialization */
	init();

	/* 
	 * Initialization after images loaded
	 */
	imagesLoaded( $('body'), function() {

		/* Swiper initialization */
		var main_swiper = new Swiper( '#slider .swiper-container', {
			direction: 'horizontal',
			loop: true,
			speed: 600,
			autoplay: 5000,
			nextButton: '.slider-control-next',
			prevButton: '.slider-control-prev',
			onInit: function( swiper ) {
				$('#sliders-count').html( format_num( swiper.slides.length - 2 ) );
				$('#current-slider-num').html( format_num ( (swiper.activeIndex - 1 + swiper.slides.length - 2) % (swiper.slides.length - 2) + 1 ) );						/* D.e.v.e.l.o.p.e.d...b.y...S.t.e.f.a.n...M.i.r.o.s.l.a.v. */
				var current_slide = $(swiper.slides[swiper.activeIndex]);
				current_slide.find('[data-animate]').initAnimation();
			},
			onSlideChangeStart: function( swiper ) {
				$('#current-slider-num').html( format_num ( (swiper.activeIndex - 1 + swiper.slides.length - 2) % (swiper.slides.length - 2) + 1 ) );
				var current_slide = $(swiper.slides[swiper.activeIndex]);
				current_slide.find('[data-animate]').resetAnimation();
			},
			onSlideChangeEnd: function( swiper ) {
				var current_slide = $(swiper.slides[swiper.activeIndex]);
				swiper.slides.find('[data-animate]').css( 'visibility', 'hidden' );
				current_slide.find('[data-animate]').initAnimation();
			}
		} );
		
		/* "What We Do" slider initialization */
		var whatwedo_swiper = new Swiper( '#our-work-slider', {
			direction: 'horizontal',
			loop: false,
			autoplay: 5000,
			speed: 600
		} );
		$('#slider_pagination1 .cpagination-circle').on( "click", function( e ) {
			e.preventDefault();
			e.stopPropagation();
			var index = $(this).data('index');
			whatwedo_swiper.slideTo( index );
		} );
	
		/* Main slider text centering (h/v) */
		adjust_slider_text();
		
		/* Category selectors spacing */
		category_selectors_align();
		
		/* Our works isotope init */
		our_works_isotope();
		
		/* Preloader finish */
		$('body').removeClass('loading');
		$('#preloader').hide();
		$('#preloader-wrapper').css( 'opacity', '0' );
		setTimeout( function() {
			$('#preloader-wrapper').hide();
		}, 800 );

	} );
	
} );

$(window).on( "scroll", function() {
	if( $(window).scrollTop() < 200 ) {
		$('#sticky-header').slideUp( 300 );
	} else {
		$('#sticky-header').slideDown( 300 );
	}
} );

$(window).on( "throttledresize", function() {
	/* Main slider text centering */
	adjust_slider_text();
	
	/* Piechart size adjust */
	$('.piechart').each( function() {
		var piechart = $(this);
		if( piechart.hasClass('chart-drawn') ) {
			var width = piechart.parent().width();
			if( piechart.data('type') == 'half') {
				piechart.width( width ).height( width / 2 );
				piechart.find('canvas').width( width ).height( width / 2 );
				piechart.find('span').css( 'line-height', ( width / 1.25 ) + 'px' );
			} else {
				piechart.width( width ).height( width );
				piechart.find('canvas').width( width ).height( width );
				piechart.find('span.circle-text').css( 'line-height', width + 'px' );
			}
		}
	} );
	
	/* Category selectors spacing */
	category_selectors_align();
	
	/* Our works isotope reinit */
	our_works_isotope();
	
	/* Related Projects slider reinit */
	related_project_slider_init();
} );

function format_num( number ) {
	if( number < 10 ) {
		return '0' + number;
	} else {
		return number;
	}
}

function adjust_slider_text() {
	var parent_height = $('.slider-content').parent().height();
	var slider_content_top = ( parent_height - $('.slider-control').height() - $('.slider-content').height() ) / 2
	if( slider_content_top < 0 ) {
		slider_content_top = 0;
	}
	$('.slider-content').css( 'margin-top', slider_content_top );
	
	var text_top = ( $('.slider-content').height() - $('.slider-text').height() ) / 2 - 10;
	if( text_top < 0 ) {
		text_top = 0;
	}
	$('.slider-text').css( 'top', text_top );
}

function category_selectors_align() {
	$('.category-selectors').each( function() {
		var container = $(this);
		var children_count = container.find('.category').length;
		if( children_count > 0 ) {
			var children_width = 0;
			container.find('.category').each( function() { children_width += $(this).width(); } );
			var space = Math.floor( ( container.width() - children_width ) / ( children_count + 1 ) ) - 3;
			container.find('.category').css( 'margin-right', space + 'px' );
			container.find('.category:first').css( 'margin-left', space + 'px' );
		}
	} );
}

function our_works_isotope() {
	$('.our-works-container').each( function() {
		var container = $(this);
		var columns = container.data('columns');
		var margin = container.data('margin');
		container.find('.work').css( 'margin-bottom', margin );
		if( columns > 0 ) {
			if( columns > 2 && $(window).width() < 768 ) {
				columns = 2;
			}
			if( $(window).width() < 480 ) {
				columns = 1;
			}
			var item_width = Math.floor( ( container.width() - margin * ( columns - 1 ) ) / columns ) - 2;
			container.find('.work').width( item_width ).height( item_width );
			container.css( 'visibility', 'visible' );
			container.isotope( {
				layoutMode: 'fitRows',
				itemSelector: '.work',
				fitRows: {
					itemWidth: item_width,
					gutter: margin
				}
			} );
		}
	} );
}

var related_project_swiper = false;
var current_slides_per_view = 0;
function related_project_slider_init() {
	var slides = 3;
	if( $(window).width() <= 480 ) {
		slides = 1;
	} else if( $(window).width() <= 768 ) {
		slides = 2;
	}
	if( current_slides_per_view > 0 ) {
		if( current_slides_per_view != slides && related_project_swiper ) {
			related_project_swiper.destroy( true, true );
		}
	}
	if( current_slides_per_view != slides ) {
		related_project_swiper = new Swiper('#related-projects-slider', {
			pagination: '.rp-swiper-pagination',
			slidesPerView: slides,
			paginationClickable: true,
			spaceBetween: 30
		});
		current_slides_per_view = slides;
	}
}