/* --------------------------------------------
 MAIN FUNCTION
-------------------------------------------- */
$(document).ready(function() {

	//MixPanel
	$("#utilisateur_click").click(function() {
		mixpanel.track("Home",{
			'Page':'Utilisateurs'
		});
	})
	$("#psychologue_click").click(function() {
		mixpanel.track("Home",{
			'Page':'Psychologue'
		});
	})
	//Menu Psys
	$("#accueil_menu_psy").click(function() {
		mixpanel.track("Menu",{
			'Page':'Psychologue',
			'Link':'Accueil'
		})
	})
	$("#about_menu_psy").click(function() {
		mixpanel.track("Menu",{
			'Page':'Psychologue',
			'Link':'About'
		})
	})
	$("#price_menu_psy").click(function() {
		mixpanel.track("Menu",{
			'Page':'Psychologue',
			'Link':'Pricing'
		})
	})
	$("#contact_menu_psy").click(function() {
		mixpanel.track("Menu",{
			'Page':'Psychologue',
			'Link':'Contact'
		})
	})
	//Menu Utilisateurs
	$("#accueil_menu_uti").click(function() {
		mixpanel.track("Menu",{
			'Page':'Utilisateurs',
			'Link':'Accueil'
		})
	})
	$("#about_menu_uti").click(function() {
		mixpanel.track("Menu",{
			'Page':'Utilisateurs',
			'Link':'About'
		})
	})
	$("#price_menu_uti").click(function() {
		mixpanel.track("Menu",{
			'Page':'Utilisateurs',
			'Link':'Pricing'
		})
	})
	$("#contact_menu_uti").click(function() {
		mixpanel.track("Menu",{
			'Page':'Utilisateurs',
			'Link':'Contact'
		})
	})
	//Psys
	$("#first_signup_psy").click(function() {
		mixpanel.track("Signup",{
			'Page':'Psychologue',
			'Location':'First_Banner'
		})
	})
	$("#learn_more_psy").click(function() {
		mixpanel.track("Learn_More",{
			'Page':'Psychologue'
		})
	})
	//Util
	$("#first_signup_uti").click(function() {
		mixpanel.track("Signup",{
			'Page':'Utilisateurs',
			'Location':'First_Banner'
		})
	})
	$("#learn_more_uti").click(function() {
		mixpanel.track("Learn_More",{
			'Page':'Utilisateurs'
		})
	})
	//Psys
	$("#try_now_psy").click(function() {
		mixpanel.track("Signup",{
			'Page':'Psychologue',
			'Location':'Pricing'
		})
	})
	//Util
	$("#pricing_schools").click(function() {
		mixpanel.track("Signup",{
			'Page':'Utilisateurs',
			'Location':'Pricing',
			'Type':'School'
		})
	})
	$("#pricing_indiv").click(function() {
		mixpanel.track("Signup",{
			'Page':'Utilisateurs',
			'Location':'Pricing',
			'Type':'Individuel'
		})
	})
	$("#pricing_biz").click(function() {
		mixpanel.track("Signup",{
			'Page':'Utilisateurs',
			'Location':'Pricing',
			'Type':'Business'
		})
	})
	//Psys
	$("#privacy_psy").click(function() {
		mixpanel.track("Privacy",{
			'Page':'Psychologue'
		})
	})
	$("#terms_psy").click(function() {
		mixpanel.track("Terms_Conditions",{
			'Page':'Psychologue'
		})
	})
	//Util
	$("#privacy_uti").click(function() {
		mixpanel.track("Privacy",{
			'Page':'Utilisateurs'
		})
	})
	$("#terms_uti").click(function() {
		mixpanel.track("Terms_Conditions",{
			'Page':'Utilisateurs'
		})
	})

	/* --------------------------------------------------------
	 ANIMATED PAGE ON REVEALED
	----------------------------------------------------------- */
	$(function($) {
		"use strict";
		$('.animated').appear(function() {
			var elem = $(this);
			var animation = elem.data('animation');
			if ( !elem.hasClass('visible') ) {
				var animationDelay = elem.data('animation-delay');
				if ( animationDelay ) {

					setTimeout(function(){
					 elem.addClass( animation + " visible" );
					}, animationDelay);

				} else {
					elem.addClass( animation + " visible" );
				}
			}
		});
	});


    /* --------------------------------------------
	 CLOSE COLLAPSE MENU ON MOBILE VIEW EXCEPT DROPDOWN
	-------------------------------------------- */
	$(function () {
        "use strict";
        $('.navbar-collapse ul li a:not(.dropdown-toggle)').on('click',function (event) {
            $('.navbar-toggle:visible').click();
        });
    });

    /* --------------------------------------------
	 STICKY SETTING
	-------------------------------------------- */
	$(function () {
        "use strict";
        if( $(".navbar-sticky").length > 0){
            $(".navbar-sticky").sticky({ topSpacing: 0 });
            $(".navbar-sticky").css('z-index','100');
            $(".navbar-sticky").addClass('bg-light');
            $(".navbar-sticky").addClass("top-nav-collapse");
        };
    });


    /* --------------------------------------------------------
	 ANIMATED SCROLL PAGE WITH ACTIVE MENU - BOOTSTRAP SROLLSPY
	----------------------------------------------------------- */
    $(function(){
        "use strict";
        $(".navbar-op ul li a, .navbar-op a.navbar-brand, .intro-direction a, a.go-to-top, .allerwelcome").on('click', function(event) {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function(){
                window.location.hash = hash;
            });
        });
    });


    /* --------------------------------------------------------
	 NAVBAR FIXED TOP ON SCROLL
	----------------------------------------------------------- */
    $(function(){
        "use strict";
        if( $(".navbar-standart").length > 0 ){
            $(".navbar-pasific").addClass("top-nav-collapse");
        } else {
            $(window).scroll(function() {
                if ($(".navbar").offset().top > 10)  {
                    $(".navbar-pasific").addClass("top-nav-collapse");

                } else {
                    $(".navbar-pasific").removeClass("top-nav-collapse");
                }
            });
        };
    });

    /* --------------------------------------------------------
	 NAVBAR-INVERSE FIXED TOP ON SCROLL
	----------------------------------------------------------- */
    $(function(){
        "use strict";
        if( $(".navbar-pasific-inverse").length > 0 ){
            $(window).scroll(function() {
                if ($(".navbar").offset().top > 10)  {
                    $(".navbar-pasific").addClass("top-nav-collapse-inverse");

                } else {
                    $(".navbar-pasific").removeClass("top-nav-collapse-inverse");
                }
            });
        };
    });


    /* --------------------------------------------------------
	 GO TO TOP SCROLL
	----------------------------------------------------------- */
    $(function(){
        "use strict";
        if( $("a.go-to-top").length > 0 ){
            $("a.go-to-top").fadeOut();
            $(window).scroll(function() {
                if ($(".navbar").offset().top > 1200)  {
                    $("a.go-to-top").fadeIn();
                } else {
                    $("a.go-to-top").fadeOut();
                }
            });
        };
    });


    /* --------------------------------------------------------
	 COUNT TO
	----------------------------------------------------------- */
    $(function() {
        "use strict";
		$(".fact-number").appear(function(){
            var dataperc = $(this).attr('data-perc');
						$(this).each(function(){
							$(this).find('.factor').delay(6000).countTo({
								from: 10,
								to: dataperc,
								speed: 3000,
								refreshInterval: 50,
								onUpdate : function(now) {
					         $(this).text(Math.ceil(now).toLocaleString('en'));
					      }
							});
						});
		});
	});

    /* --------------------------------------------------------
	 PAGE LOADER
	----------------------------------------------------------- */
    $(function() {
		"use strict";
        $("body").imagesLoaded(function(){
            $(".loader-item").delay(700).fadeOut();
            $("#pageloader").delay(800).fadeOut("slow");
        });
	});



}(jQuery));

$(window).load(function() {

    /* --------------------------------------------
     SECURITY CHECK HUMAN
    -------------------------------------------- */
    if($("#senderHuman").length > 0 ) {
        var a = Math.ceil(Math.random() * 10) + 1;
        var b = Math.ceil(Math.random() * 10) + 1;
        document.getElementById("senderHuman").placeholder = a +" + "+ b +" = ?";
        document.getElementById("checkHuman_a").value = a;
        document.getElementById("checkHuman_b").value = b;
    }

    /* --------------------------------------------
     CONTACT FORM
    -------------------------------------------- */
    var messageDelay = 2000;
    $(init);

    function init() {
      $('#contactForm').show().submit( submitForm ).addClass( 'positioned' );
    }

    // Submit the form via Ajax
    function submitForm() {
      var contactForm = $(this);

      // Are all the fields filled in?

      if ( !$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val() ) {

        // No; display a warning message and return to the form
        $('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
        contactForm.fadeOut().delay(messageDelay).fadeIn();

      } else {

        // Yes; submit the form to the PHP script via Ajax

        $('#sendingMessage').fadeIn();
        contactForm.show();

        $.ajax( {
          url: contactForm.attr( 'action' ) + "?ajax=true",
          type: contactForm.attr( 'method' ),
          data: contactForm.serialize(),
          success: submitFinished
        } );
      }

      // Prevent the default form submission occurring
      return false;
    }


    // Handle the Ajax response
    function submitFinished( response ) {
      response = $.trim( response );
      $('#sendingMessage').fadeOut();

      if ( response == "success" ) {

        // Form submitted successfully:
        // 1. Display the success message
        // 2. Clear the form fields
        // 3. Fade the content back in

        $('#successMessage').fadeIn().delay(messageDelay).fadeOut();
        $('#senderName').val( "" );
        $('#senderEmail').val( "" );
        $('#message').val( "" );

        $('#content').delay(messageDelay+500).fadeTo( 'slow', 1 );

      } else {

        // Form submission failed: Display the failure message,
        // then redisplay the form
        $('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
        $('#contactForm').delay(messageDelay+500).fadeIn();
      }
    }

});
