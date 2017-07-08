function Languages_List_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'ps_trnsl',
								'Language_Load_All',
								'&Filter=' + EncodeArray( filter ) + '&Sort=' + encodeURIComponent( sort ) + '&Offset=' + encodeURIComponent( offset ) + '&Count=' + encodeURIComponent( count ),
								delegator );
}
//On Edit
function Languages_Update( id, fieldlist, callback, delegator ) {
	return AJAX_Call_Module_FieldList(	callback,
										'admin',
										'ps_trnsl',
										'Language_Update',
										'Languages_ID=' + encodeURIComponent( id ),
										fieldlist,
										delegator );
}
// On Delete
function Languages_Batchlist_Delete( id, callback, delegator ) {
	return AJAX_Call_Module(callback,
							'admin',
							'ps_trnsl',
							'Language_Delete',
							'Language_Id=' + encodeURIComponent( id ),
							delegator );
}
// On Create
function Languages_Batchlist_Insert( fieldlist, callback, delegator ) {
	return AJAX_Call_Module_FieldList(	callback,
										'admin',
										'ps_trnsl',
										'Language_Insert',
										'',
										fieldlist,
										delegator );
}