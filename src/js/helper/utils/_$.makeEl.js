"use strict";
var name = $namespace( "_$" );

function makeElement( _el, _attr ){
	var $new_el = $( "<" + _el + ">" );

	if( _$.isObject( _attr ) ){
		for( var attr in _attr ){
			if( _attr.hasOwnProperty( attr ) ){
				if( attr === "text" ){
					insertHTMLCode( _attr[ attr ] );
				}else {
					$new_el.attr( attr, _attr[ attr ] );
				}
			}
		}
	}else if( _$.isString( _attr ) ){
		insertHTMLCode( _attr );
	}

	return $new_el[0];

	function insertHTMLCode( code ){
		var $code = $( code );

		if( $code.length > 1 ){
			$.each( $code, function( index, _code ){	
				if( _code.nodeName === "SCRIPT" ){
					var script_code = _code.innerHTML;
					var $script = $("<script>");

					$script.append( script_code );
					$new_el.append( $script );
				}else {
					$new_el.append( $( _code ) );
				}
			});
		}else {
			$new_el[0].innerHTML = code;
		}
	}
}

name.makeEl = makeElement;