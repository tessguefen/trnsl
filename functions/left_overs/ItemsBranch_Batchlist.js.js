function Items_Batchlist( form_id ) {
	this.form_id = form_id;

	MMBatchList.call( this, 'Items_Batchlist' );

	this.branch_languages = this.AddBranch( this.CreateColumnList_Languages(), 'languages' );
	this.Branch_SetCreateFunction( this.branch_languages, this.Option_Create );

	this.Branch_SetInsertFunction( this.branch_languages, this.Option_Insert );
	this.Branch_SetSaveFunction( this.branch_languages, this.Option_Save );
	this.Branch_SetDeleteFunction( this.branch_languages, this.Option_Delete );

	this.Feature_Add_RowSupportsChildren_AddHook( this.Item_RowSupportsChildren_Hook );

	this.Feature_Delete_Enable( 'Delete Item(s)' );
	this.Feature_Edit_Enable( 'Edit Item(s)' );
	this.Feature_RowDoubleClick_Enable();

	this.Feature_Add_Enable( 'Add Item', 'Save Item', 'Add Option', 'Cancel', 'Add Item', 'Save Item', 'Add Option', '' );

	this.Feature_SearchBar_SetPlaceholderText( 'Search Items...' );
	this.SetDefaultSort( 'id', '' );
}

DeriveFrom( MMBatchList, Items_Batchlist );

Items_Batchlist.prototype.onLoad = Items_List_Load_Query;

Items_Batchlist.prototype.onCreateRootColumnList = function() {
	var columnlist;

		this.id				=	new MMBatchList_Column_Name( 'ID', 'id', 'id')
											.SetDisplayInMenu(false)
											.SetDisplayInList(false)
											.SetAdvancedSearchEnabled(false)
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
		this.code			=	new MMBatchList_Column_Name( 'Code', 'code', 'code')
											.SetDisplayInMenu(false)
											.SetDisplayInList(false)
											.SetAdvancedSearchEnabled(false)
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
		this.prompt			=	new MMBatchList_Column_Text( 'Default Prompt', 'prompt', 'prompt' )
											.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } );
	columnlist =
	[
		this.id,
		this.code,
		this.prompt
	];

	return columnlist;
}

Items_Batchlist.prototype.CreateColumnList_Languages = function()
{
	var columnlist =
	[
		new MMBatchList_Column_Code( 'ID', 'id', 'id' )
				.SetRootColumn( this.fields_id ),
		new Items_Column_Type()
			.SetContentAttributeList( { 'class': 'mm9_batchlist_level_col' } ),
		new MMBatchList_Column_Name( 'Prompt', 'prompt', 'prompt' )
				.SetRootColumn( this.fields_prompt )
	];

	return columnlist;
}

Items_Batchlist.prototype.onRetrieveChildBranch = function( item )
{
	if ( !item || !item.root )
	{
		return null;
	}

	return item.branch.children[ 'languages' ];
}


// On Save/ Edit
Items_Batchlist.prototype.onSave = function( item, callback, delegator ) {
	var self = this;
	var original_callback;

	if ( ( item.original_record.type == 'radio' || item.original_record.type == 'select' ) &&
		 ( item.record.type != 'radio' && item.record.type != 'select' ) )
	{
		original_callback	= callback;
		callback			= function( response )
		{
			var i, i_len, child_item, removelist;

			if ( response.success )
			{
				removelist = new Array();

				for ( i = 0, i_len = item.child_indices.length; i < i_len; i++ )
				{
					if ( ( child_item = self.GetListItem( item.child_indices[ i ] ) ) !== null )
					{
						removelist.push( child_item );
					}
				}

				for ( i = 0, i_len = removelist.length; i < i_len; i++ )
				{
					self.DeleteListItem( removelist[ i ] );
				}

				item.child_indices = new Array();
			}

			original_callback( response );
		}
	}
	Items_Update( item.record.id, item.record.mmbatchlist_fieldlist, callback, delegator );
}
// On Delete
Items_Batchlist.prototype.onDelete = function( item, callback, delegator ) {
	Items_Batchlist_Delete( item.record.id, callback, delegator );
}

// On Create
Items_Batchlist.prototype.onCreate = function() {
	var record;

	record			= new Object();
	record.id		= 0;
	record.code		= '';
	record.prompt	= '';
	record.languages	= new Array();

	return record;
}
// On Insert
Items_Batchlist.prototype.onInsert = function( item, callback, delegator ) {
	Items_Batchlist_Insert( item.record.mmbatchlist_fieldlist, callback, delegator );
}
// Go Back
Items_Batchlist.prototype.goback = function( e ) {
	return OpenLinkHandler( e, adminurl, { 'Screen': 'SMOD', 'Store_Code': Store_Code, 'Tab': 'TGCF_SETT', 'Module_Type': 'system' } );
}


Items_Batchlist.prototype.Option_Create = function() {
	var record;

	record			= new Object();
	record.id		= 0;
	record.code		= '';
	record.prompt	= '';

	return record;
}

Items_Batchlist.prototype.Option_Insert = function( item, callback, delegator ) {
	var parent_field = this.GetListItemRecord_Parent( item.index );
	Option_Insert(parent_field.id, item.record.mmbatchlist_fieldlist, callback, delegator );
}

Items_Batchlist.prototype.Item_RowSupportsChildren_Hook = function( item ) {
	if ( !item || !item.record ) {
		return false;
	}

	if ( item.record.type != 'radio' && item.record.type != 'select' ){
		return false;
	}

	return true;
} 


Items_Batchlist.prototype.onProcessLoadedData = function( recordlist, start_index ) {
	var i, j, index, root_index;

	index = start_index;

	for ( i = 0; i < recordlist.length; i++ )
	{
		root_index = index;
		this.ItemList_CreateInsertAtIndex( recordlist[ i ], index++, -1, this.branch_root );

		if ( recordlist[ i ].languages )
		{
			for ( j = 0; j < recordlist[ i ].languages.length; j++ )
			{
				this.ItemList_CreateInsertAtIndex( recordlist[ i ].languages[ j ], index++, root_index, this.branch_languages );
			}
		}
	}
}

Items_Batchlist.prototype.Option_Save = function( item, callback, delegator ) {
	Option_Update( item.record.mmbatchlist_fieldlist, callback, delegator );
}

Items_Batchlist.prototype.Option_Delete = function( item, callback, delegator ) {
	Option_Delete( item.record.mmbatchlist_fieldlist, callback, delegator );
}

// Column 'type'
function Items_Column_Type() {
	MMBatchList_Column_Text.call( this, 'Language', 'language_code', 'language_code' );

	this.SetOnDisplayData( this.onDisplayData );
	this.SetOnDisplayEdit( this.onDisplayEdit );
}
DeriveFrom( MMBatchList_Column_Text, Items_Column_Type );

Items_Column_Type.prototype.onDisplayEdit = function( record, item ) {
	var i, i_len;
	var select;

	select									= newElement( 'select', { 'name': 'type' }, null, null );
	select.options[ select.options.length ] = new Option( 'Radio Buttons', 'radio' );
	select.options[ select.options.length ] = new Option( 'Drop-down List', 'select' );
	select.options[ select.options.length ] = new Option( 'Checkbox', 'checkbox' );
	select.options[ select.options.length ] = new Option( 'Text Item', 'text' );
	select.options[ select.options.length ] = new Option( 'Text Area', 'memo' );

	for ( i = 0, i_len = select.options.length; i < i_len; i++ )
	{
		if ( select.options[ i ].value == record.type )
		{
			select.selectedIndex = i;
			break;
		}
	}
	return select;
}

Items_Column_Type.prototype.onDisplayData = function( record ) {
	var text = newElement( 'div', null, null, null );

	if ( record.type == 'radio' )					text.innerHTML = 'Radio Buttons';
	else if ( record.type == 'select' )				text.innerHTML = 'Drop-down List';
	else if ( record.type == 'checkbox' )			text.innerHTML = 'Checkbox';
	else if ( record.type == 'text' )				text.innerHTML = 'Text Item';
	else if ( record.type == 'memo' )				text.innerHTML = 'Text Area';

	return text;
}