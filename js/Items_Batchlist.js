function Items_Batchlist() {
	var self = this;

	Load_Languages_JSON_Columns( function( response )
	{
		if ( response.success )
		{
			self.languages = response.data.data;
			MMBatchList.call( self, 'Items_Batchlist' );
			self.Feature_SearchBar_SetPlaceholderText( 'Search Items...' );
			self.SetDefaultSort( 'id', '' );
			self.Feature_Delete_Enable('Delete Item(s)');
			self.Feature_Edit_Enable('Edit Item(s)');
			self.Feature_RowDoubleClick_Enable();
			self.Feature_Add_Enable('Add New Item');
		}
	} );
	
}

DeriveFrom( MMBatchList, Items_Batchlist );

Items_Batchlist.prototype.onLoad = Items_List_Load_Query;

Items_Batchlist.prototype.onCreateRootColumnList = function() {
	var self = this;
	var columnlist =
	[
		new MMBatchList_Column_Name( 'ID', 'id', 'id')
			.SetDisplayInMenu(false)
			.SetDisplayInList(false)
			.SetAdvancedSearchEnabled(false),
		new MMBatchList_Column_Text( 'Code', 'code', 'code' ),
		new MMBatchList_Column_Text( 'Default Prompt', 'prompt', 'prompt' )
	];

	for ( i = 0, i_len = self.languages.length; i < i_len; i++ ) {
		columnlist.push( new MMBatchList_Column_Text( self.languages[ i ].prompt, self.languages[ i ].code, self.languages[ i ].json_code ).SetSortByField(false).SetSearchable( false ) );
	}
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
	var self = this;
	var record;
	record = new Object();
	record.id = 0;
	record.code = '';
	record.prompt = '';
	for ( i = 0, i_len = self.languages.length; i < i_len; i++ ) {
		var code = self.languages[ i ].code;
		record[ code ] = '';
	}
	return record;
}
// On Insert
Items_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Items_Batchlist_Insert( item.record.mmbatchlist_fieldlist, callback, delegator );
}