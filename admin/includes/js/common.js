jQuery(document).ready(function($) {
	// Save dismiss state
	$( '.notice.is-dismissible' ).click( function ( event ) {
		event.preventDefault();

		$.post( ajaxurl, {
			action: "caldera_warnings_dismissible_notice",
			url: ajaxurl,
			nag: caldera_commonL10n.nag || '',
			nonce: caldera_commonL10n.nonce || ''
		});

	});

	// Make notices dismissible - backward compatabity -4.2
	$( '.notice.is-dismissible' ).each( function() {
		if( caldera_commonL10n.wp_version ){
			return;
		}

		var $this = $( this ),
			$button = $( '<button type="button" class="notice-dismiss"><span class="screen-reader-text"></span></button>' ),
			btnText = caldera_commonL10n.dismiss || '';

		// Ensure plain text
		$button.find( '.screen-reader-text' ).text( btnText );

		$this.append( $button );

		$button.on( 'click.wp-dismiss-notice', function( event ) {
			event.preventDefault();
			$this.fadeTo( 100 , 0, function() {
				$(this).slideUp( 100, function() {
					$(this).remove();
				});
			});
		});
	});
});
