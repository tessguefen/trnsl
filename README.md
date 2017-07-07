# trnsl
For J-Remy.

## Notes
- Attribute Option Layout for Items
- Settings Tab

- Tie into CTGY/ PROD

## Item
<mvt:item name="trnsl" param="Translate( 'jeremy' )" />
<mvt:item name="trnsl" param="Translate( 'jeremy', g.my_current_lang  )" />

<mvt:item name="trnsl" param="Translate_Product( l.settings:product )" />
^- required :id, overwrites :name, :descrip

<mvt:item name="trnsl" param="Language_Selector()" />
