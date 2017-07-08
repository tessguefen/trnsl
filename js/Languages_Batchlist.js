function Languages_Batchlist() {
	MMBatchList.call( this, 'Languages_Batchlist' );
	this.Feature_SearchBar_SetPlaceholderText( 'Search Languages...' );
	this.SetDefaultSort( 'id', '' );
	this.Feature_Delete_Enable('Delete Language(s)');
	this.Feature_Edit_Enable('Edit Language(s)');
	this.Feature_RowDoubleClick_Enable();
	this.Feature_Add_Enable('Add New Language');
}

DeriveFrom( MMBatchList, Languages_Batchlist );

Languages_Batchlist.prototype.onLoad = Languages_List_Load_Query;

Languages_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist =
	[
		new MMBatchList_Column_Name( 'ID', 'id', 'id')
			.SetDisplayInMenu(false)
			.SetDisplayInList(false)
			.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Text( 'Code', 'code', 'code' ),
		new MMBatchList_Column_Text( 'Prompt', 'prompt', 'prompt' )
	];
	return columnlist;
}

// On Save/ Edit
Languages_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	var wrapped_callback = function( response ) {callback( response );}
	Languages_Update( item.record.id, item.record.mmbatchlist_fieldlist, wrapped_callback, delegator );
}
// On Delete
Languages_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Languages_Batchlist_Delete( item.record.id, callback, delegator );
}

// On Create
Languages_Batchlist.prototype.onCreate = function() {
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.prompt = '';
	return record;
}
// On Insert
Languages_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Languages_Batchlist_Insert( item.record.mmbatchlist_fieldlist, callback, delegator );
}