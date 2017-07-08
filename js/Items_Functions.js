function Items_List_Load_Query( filter, sort, offset, count, callback, delegator ) {
	return AJAX_Call_Module(	callback,
								'admin',
								'ps_trnsl',
								'Item_Load_All',
								'&Filter=' + EncodeArray( filter ) + '&Sort=' + encodeURIComponent( sort ) + '&Offset=' + encodeURIComponent( offset ) + '&Count=' + encodeURIComponent( count ),
								delegator );
}
//On Edit
function Items_Update( id, fieldlist, callback, delegator ) {
	return AJAX_Call_Module_FieldList(	callback,
										'admin',
										'ps_trnsl',
										'Item_Update',
										'Items_ID=' + encodeURIComponent( id ),
										fieldlist,
										delegator );
}
// On Delete
function Items_Batchlist_Delete( id, callback, delegator ) {
	return AJAX_Call_Module(callback,
							'admin',
							'ps_trnsl',
							'Item_Delete',
							'Item_Id=' + encodeURIComponent( id ),
							delegator );
}
// On Create
function Items_Batchlist_Insert( fieldlist, callback, delegator ) {
	return AJAX_Call_Module_FieldList(	callback,
										'admin',
										'ps_trnsl',
										'Item_Insert',
										'',
										fieldlist,
										delegator );
}