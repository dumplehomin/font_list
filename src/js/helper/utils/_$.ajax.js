"use strict";

var name = $namespace( "_$" );

function html( html_url, success, complete, error ){
	ajax( html_url, "get", "html", success, complete, error );
}

function ajax( _url, _type, _dataType, _success, _complete, _error ){
	$.ajax({
		type: _type ? _type : "get",
		url : _url,
		dataType : _dataType,
		success : _success,
		complete : _complete ? _complete : null,
		error : _error ? _error : function( request, status, error ){
			alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
		}
	});
}

name.ajax = ajax;
name.htmlAjax = html;