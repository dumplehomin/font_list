"use strict";
(function(){

var fontSizeSetting = function(){
	var _slider_arr = _$.queryAll(".slider");

	_$.each( _slider_arr, function( _slider, index ){
		var slider_input = _$.query( ".range_value", _slider );
		var colorpicker_container = _$.query("#colorSelector");
		var colorpicker_input = _$.query("input", colorpicker_container);
		var _popup_content = _$.query(".popup_content");

		popupFontSetting( "15px" );

		survey( colorpicker_input, function(){
			var color = colorpicker_input.value;
			_$.css( _popup_content, "color", "#" + color );
		});

		survey( slider_input, function(){ 
			var input_value = parseInt( slider_input.value, 10 );

			input_value = Math.ceil(input_value / 10) + 15;

			popupFontSetting( input_value + "px" );
		}); 

		function popupFontSetting( font_size ){
			_$.css( _popup_content, "font-size", font_size );
		}

		function survey( selector, callback) {
			var input = selector;
			var oldvalue = input.value;

			setInterval(function(){
				if ( selector.value != oldvalue ){
					oldvalue = selector.value;
					callback();
				}
			}, 100);
		}
	});
}

window.fontSizeSetting = fontSizeSetting;
})();