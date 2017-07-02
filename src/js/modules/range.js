"use strict";
(function(){

$.extend({
	rangeSetting : function(){
		var range = $(".slider");
		var $slider_handle;
		var $slider_base;
		var $hidden_input;
		var $this;

		$.each( range, function( index, _range ){
			$this = $( this );

			if( $this.hasClass("range_on") ) return;

			$slider_handle = rangeObjMake("slider_handle");
			$slider_base = rangeObjMake("slider_base");
			$hidden_input = $("<input>", {
				"type" : "hidden",
				"class" : "range_value",
				"value" : "10"
			});

			$this.append( $slider_base ).append( $slider_handle ).append( $hidden_input ).addClass("range_on");

			rangeObjEvent();
		});

		function rangeObjMake( _class ){
			var $obj = $("<div>", {"class" : _class});
			return $obj;
		}

		function rangeObjEvent(){
			var drag_on = false;
			var offset_x = 0;
			var $slider_base_width = $slider_base.width();
			var $slider_handle_width = $slider_handle.width();
			var range_width = $slider_base_width - $slider_handle_width;


			$slider_base.on("mousedown", function( event ){
				drag_on = true;
				offset_x = event.offsetX;
				$slider_handle.css("left", event.offsetX);
				currentRangePercent( offset_x, range_width );
			}).on("mousemove", function( event ){
				if( drag_on ){
					offset_x = event.offsetX - $slider_handle_width;

					if( offset_x < 0 ){
						offset_x = 0;
					}

					$slider_handle.css("left", offset_x );

					currentRangePercent( offset_x, range_width );
				}
			});

			$slider_handle.on("mousedown", function(){
				drag_on = true;
			});

			$slider_handle.on("mouseup", function( event ){
				drag_on = false;
			});

			$this.on("mouseleave", function(){
				drag_on = false;
			});
		}

		function currentRangePercent( offset_x, range_width ){
			var current_value = Math.round( (offset_x / range_width ) * 100);
			$this.find(".range_value").val( current_value );
		}

		function rangeEventSetting( event ){
			$slider_origin.css("left", event.offsetX);
		}
	}
});
})();