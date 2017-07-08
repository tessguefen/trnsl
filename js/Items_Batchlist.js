function Items_Batchlist() {
	MMBatchList.call( this, 'Items_Batchlist' );
	this.Feature_SearchBar_SetPlaceholderText( 'Search Items...' );
	this.SetDefaultSort( 'id', '' );
	this.Feature_Delete_Enable('Delete Item(s)');
	this.Feature_Edit_Enable('Edit Item(s)');
	this.Feature_RowDoubleClick_Enable();
	this.Feature_Add_Enable('Add New Item');
}

DeriveFrom( MMBatchList, Items_Batchlist );

Items_Batchlist.prototype.onLoad = Items_List_Load_Query;

Items_Batchlist.prototype.onCreateRootColumnList = function() {
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
Items_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	var wrapped_callback = function( response ) {callback( response );}
	Items_Update( item.record.id, item.record.mmbatchlist_fieldlist, wrapped_callback, delegator );
}
// On Delete
Items_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Items_Batchlist_Delete( item.record.id, callback, delegator );
}

// On Create
Items_Batchlist.prototype.onCreate = function() {
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.prompt = '';
	return record;
}
// On Insert
Items_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Items_Batchlist_Insert( item.record.mmbatchlist_fieldlist, callback, delegator );
}