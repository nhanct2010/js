jQuery(document).ready(function($) {
    $(".collapse").on("shown.bs.collapse", function() {
        $("#search").focus()
    });   

    // var thumb
    // $(".xxhub-thumb img[data-preview]").on("mouseenter", function() {
    //     var i = 1
    //     var img = $(this)
    //     thumb = setInterval(function preview() {
    //         img.attr('src', img.data('preview').replace('{index}', i))
    //         ++i
    //         if (i > parseInt(img.data('thumbs'))) {
    //             i = 1
    //         }
    //     }, 450)
    // }).on("mouseleave", function() {
    //     $(this).attr('src', $(this).data('src'));
    //     clearInterval(thumb)
    // });


    var lightout = false;
    $("#xxhub-full-player, .post-meta").css("position", "relative").css('z-index', 8);
    $("#toggle-light, #lightout").click(function () {
        if (!lightout) {
            lightout = true;
            $(".button-watch").addClass("dark");
            $("#lightout").css("opacity", 0.98).hide().fadeIn();
            $("#header").addClass('heads-up');
      
        } else {
            lightout = false;
            $(".button-watch").removeClass("dark");
            $("#lightout").fadeOut();
            $("#header").removeClass('heads-up');
        }
        $("#toggle-light").text(lightout ? 'Light On' : 'Light Off');
    });     
    resizeCheck="small",
    playersize={width:0,height:0}
    playerWrapper = $("#xxhub-full-player");
    playersize.width=playerWrapper.width(),
    playersize.height=playerWrapper.height(),
    $(document).on("click", "#explayer", function() {
      if("small"==resizeCheck){
      var e = 1140, pc = e/playersize.width, new_h = playersize.height * pc,t={width:e,height:Math.ceil(new_h)};
        $("#explayer").offset().top, $(playerWrapper).animate({width:t.width,height:t.height}),
        $(".box-content").animate({width: "100%"}),
        $("#sidebar").hide(),
        // $("#sidebar").animate({height:t.height+20}),
        $("#explayer").html("Zoom -"),
        resizeCheck="large"
      } else {
        $(playerWrapper).animate({width:(playersize.width-1),height:playersize.height}),
        // $("#sidebar").animate({marginTop:"0px"}),
        $(".box-content").css({"width":"min-content"}),
        $("#sidebar").show(1000),
        $("#explayer").html("Zoom +"),
        resizeCheck="small"
      }       
    });
    
    if($('.xxhub-post-single').length){      
        $.ajax({
            type: 'POST',
            url: xxhub.ajax_url,
            data: {
                action: 'set_post_view_count', 
                post_id: xxhub.postid
            },
            success: function (result) {
                $('.post-view-count').text(result + ' view');
            }
        }); 
    }       
});

/*
* HeadsUp 1.5.6
* @author Kyle Foster (@hkfoster)
* @license MIT
*/
;(function( window, document, undefined ) {

  'use strict';

  // Extend function
  function extend( a, b ) {
    for( var key in b ) {
      if( b.hasOwnProperty( key ) ) {
        a[ key ] = b[ key ];
      }
    }
    return a;
  }

  // Throttle function (http://bit.ly/1eJxOqL)
  function throttle( fn, threshhold, scope ) {
    threshhold || ( threshhold = 250 );
    var previous, deferTimer;
    return function () {
      var context = scope || this,
          current = Date.now(),
          args    = arguments;
      if ( previous && current < previous + threshhold ) {
        clearTimeout( deferTimer );
        deferTimer = setTimeout( function () {
        previous   = current;
        fn.apply( context, args );
        }, threshhold );
      } else {
        previous = current;
        fn.apply( context, args );
      }
    };
  }

  // Class management functions
  function classReg( className ) {
    return new RegExp( '(^|\\s+)' + className + '(\\s+|$)' );
  }

  function hasClass( el, cl ) {
    return classReg( cl ).test( el.className );
  }

  function addClass( el, cl ) {
    if ( !hasClass( el, cl ) ) {
      el.className = el.className + ' ' + cl;
    }
  }

  function removeClass( el, cl ) {
    el.className = el.className.replace( classReg( cl ), ' ' );
  }

  // Main function definition
  function headsUp( selector, options ) {
    this.selector = document.querySelector( selector );
    this.options  = extend( this.defaults, options );
    this.init();
  }

  // Overridable defaults
  headsUp.prototype = {
    defaults : {
      delay       : 200,
      sensitivity : 20
    },

    // Init function
    init : function( selector ) {

      var self         = this,
          options      = self.options,
          selector     = self.selector,
          oldScrollY   = 0, 
          winHeight;

      // Resize handler function
      function resizeHandler() {
        winHeight = window.innerHeight;
        return winHeight;
      }

      // Scroll handler function
      function scrollHandler() {

        // Scoped variables
        var newScrollY = window.pageYOffset,
            docHeight  = document.body.scrollHeight,
            pastDelay  = newScrollY > options.delay,
            goingDown  = newScrollY > oldScrollY,
            fastEnough = newScrollY < oldScrollY - options.sensitivity,
            rockBottom = newScrollY < 0 || newScrollY + winHeight >= docHeight;

        // Where the magic happens
        if ( pastDelay && goingDown ) {
          addClass( selector, 'heads-up' );
        } else if ( !goingDown && fastEnough && !rockBottom || !pastDelay ) {
          removeClass( selector, 'heads-up' );
        }

        // Keep on keeping on
        oldScrollY = newScrollY;
      }

      // Attach listeners
      if ( selector ) {
        
        // Trigger initial resize
        resizeHandler();

        // Resize function listener
        window.addEventListener( 'resize', throttle( resizeHandler ), false );

        // Scroll function listener
        window.addEventListener( 'scroll', throttle( scrollHandler, 100 ), false );
      }
    }
  };

  window.headsUp = headsUp;

})( window, document );

// Instantiate HeadsUp
new headsUp( '#xxhub-header' );


jQuery(document).ready(function($){if(window.matchMedia('(max-width: 767px)').matches){$('#search-form-pc').prependTo('#mobile-search-form');}
$(".show-more").click(function(){$(this).parent().parent().find(".item-content").toggleClass("toggled");if($(this).data('single')==true){var text=$(this).text()==$(this).data('showmore')?$(this).data('showless'):$(this).data('showmore');$(this).text(text);}else{var icon=$(this).data('icon');var toggled_icon=(icon=='hl-angle-down')?'hl-angle-up':'hl-angle-down';$(this).toggleClass(toggled_icon).toggleClass('hl-angle-down');}});var resizeCheck="small";var playersize={width:0,height:0}
var playerWrapper=$(".videoWrapper");var wrapper=$('#wrapper').width();playersize.width=playerWrapper.width();playersize.height=playerWrapper.height();$("#explayer").click(function(){var container=$('.container').width();if(container<970){return;}
if(resizeCheck=="small"){playerWrapper.animate({width:wrapper-30,height:(wrapper-30)/1.78});$("#sidebar").animate({marginTop:(wrapper-30)/1.78+15});$("#explayer").html("<i class='fa fa-compress'></i> Zoom-");resizeCheck="large";}
else if(resizeCheck=="large"){playerWrapper.animate({width:playersize.width,height:playersize.height});$("#sidebar").animate({marginTop:0});$("#explayer").html("<i class='fa fa-expand'></i> Zoom+");resizeCheck="small";}
$("html, body").animate({scrollTop:$(playerWrapper).offset().top-10},1500);});});
jQuery(document).ready(function($) {
  $('.ajax-tab').click(function() {
      var showpost = $(this).attr('data-showpost');
      var type = $(this).attr('data-type');
      var showview = $(this).attr('data-showview');
      loadPopularPost(type, showpost);
      $('.ajax-tab').removeClass('active');
      $(this).addClass('active');
  })
  function loadPopularPost(type, showpost) {
      $.ajax({
          url: ajax_var.url,
          type: "POST",
          data: {
              action: "get_popular_video",
              postnum: showpost,
              type: type
          },
          beforeSend: function() {
              $('.dp-ajax-popular-post-loading').removeClass('hidden');
          },
          success: function(data) {
              $('#dp-ajax-popular-post').html(data);
              $('.dp-ajax-popular-post-loading').addClass('hidden');
          },
          error: function(e) {
              $('#dp-ajax-popular-post').html('Không có video nào !');
          }
      });
  }
});