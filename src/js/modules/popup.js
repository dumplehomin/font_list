"use strict";

var popup_btn = _$.queryAll("[data-popup]");

var popup_wrap_attr = {
	"class" : "popup_wrap"
}

var popup_container_attr = {
	"class" : "popup_container"
}

_$.each( popup_btn, function( btn, index ){
	_$.eventsOn( btn, "click", function( event ){
		popupOpen( event );
	});
});

function popupOpen( event, insert_el, _w ){
	event.preventDefault();
	var _this = event.target;

	var popup_url = _this.getAttribute("data-popup") + ".html";
	var insert_el = insert_el ? _$.query( insert_el ) : document.body;
	var popup_wrap =_$.makeEl( "div", popup_wrap_attr );
	var popup_container = _$.makeEl( "div", popup_container_attr );

	var popup_width;

	_$.htmlAjax( popup_url, function( result ){
		var data_popup;
		var popup_header;
		var popup_title;
		var _$h3;

		var popup_content = _$.makeEl( "div", {
			"class" : "popup_content",
			"text" : result
		});

		var _$closeBtn = _$.makeEl("i", {
			"class" : "popup_close_btn",
			"aria-hidden" : "true",
			"text" : "x"
		});

		if( _this.classList ){
			_this.classList.add("popup_on_btn");
		}else {
			$(_this).addClass("popup_on_btn");
		}

		data_popup = _$.query("[data-popup_width]", popup_content);

		popup_width = data_popup ? data_popup.getAttribute("data-popup_width") + "px" : "250px";
		popup_title = data_popup ? data_popup.getAttribute("data-popup_title") : "Title";

		 _$h3 = _$.makeEl("h3", popup_title);

		popup_header = _$.makeEl("div", {
			"class" : "popup_header"
		});

		_$.css( popup_container, "width",  popup_width);

		popup_header.appendChild( _$h3 );
		popup_header.appendChild( _$closeBtn );
		popup_container.appendChild( popup_header );
		popup_container.appendChild( popup_content );
	}, function( result ){
		var _closeBtn;
		var _popup_wrap;

		popup_wrap.appendChild( popup_container );
		insert_el.appendChild( popup_wrap );

		 _closeBtn =  _$.query( ".popup_close_btn", popup_container );
		 _popup_wrap =  _$.query( ".popup_wrap", insert_el );
		

		_$.eventsOn( _closeBtn, "click", closePopup);

		if( _popup_wrap.classList ){
			setTimeout(function(){
				_popup_wrap.classList.add( "visible" );
			}, 300 );
		}else {
			$( _popup_wrap ).animate({
				"opacity" : 1
			});
		}
	});

	function closePopup( event ){
		var _popup_wrap = _$.query(".popup_wrap");

		if( _this.classList ){
			_this.classList.remove("popup_on_btn");
		}else {
			$(_this).removeClass("popup_on_btn");
		}
		
		if( _popup_wrap.classList ){
			_popup_wrap.classList.remove( "visible" );
			setTimeout(function(){
				_popup_wrap.outerHTML = "";
			}, 800 );
		}else {
			$( _popup_wrap ).animate({
				"opacity" : 0
			}).remove();
		}
	}
}







































