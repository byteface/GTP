jQuery(function()
{
	var hideDelay = 500;  
	var currentID;
	var hideTimer = null;

	// create a container
	var container = jQuery('<div id="toolTip"></div>');
	jQuery('body').append(container);

	jQuery('a').live('mouseover', function(evt)
	{
		evt.preventDefault();
		jQuery('a').removeAttr('title');
		
		if (hideTimer)
			clearTimeout(hideTimer);
	
		var pos = jQuery(this).offset();
		var width = jQuery(this).width();
		
		container.css({
			left: (pos.left + width) + 'px',
			top: pos.top - 5 + 'px'
		});

	//	alert( pos.left );

		var term = jQuery(evt.target).attr('href'); // TODO - update to search where you got it from or show tooltip to choose

		jQuery.ajax( { type: "POST", url: "service/wikipedia/definition.php", data: { search: term }, dataType: "json",

			success: function( data ){				
				jQuery('#toolTip').html( data.data );
			},

			error : function( XMLHttpRequest, textStatus, errorThrown ) {
				alert( "XMLHttpRequest:" + XMLHttpRequest + " | " + "textStatus:" + textStatus + " | "  + "errorThrown:" + errorThrown );
			}

      	});

      	container.css('display', 'block');
  	});

	jQuery('a').live('mouseout', function()
	{
		if (hideTimer)
			clearTimeout(hideTimer);
			
		hideTimer = setTimeout(function()
		{
			container.css('display', 'none');
		}, hideDelay);
		
	});
	
	// Allow mouse over of details without hiding details
	jQuery('#toolTip').mouseover(function()
	{
		if (hideTimer)
			clearTimeout(hideTimer);
	});

	// Hide after mouseout
	jQuery('#toolTip').mouseout(function()
	{
		if (hideTimer)
			clearTimeout(hideTimer);
			
		hideTimer = setTimeout(function()
		{
			container.css('display', 'none');
		}, hideDelay);
		
	});

});