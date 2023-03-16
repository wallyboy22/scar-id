var scar_vector = 'projects/workspace-ipam/assets/FOGO/VECTOR-COL2/mbfogo-col2-YEAR-v1';

var scar_id = ee.Image().select();
var scar_area = ee.Image().select();
var scar_length = ee.Image().select();

ee.List.sequence(1985,2022,1).getInfo()
  .forEach(function(year){
    var scar_vector_year = ee.FeatureCollection(scar_vector.replace('YEAR',''+year))
      .map(function(feature){
        return feature.set({
          id:feature.getNumber('id').int(),
          area:feature.geometry().area().int(),
          length:feature.geometry().length(),
        });
      });
    
    // print(year,scar_vector_year.limit(10));
    
    scar_id = scar_id.addBands(ee.Image().paint(scar_vector_year,'id').rename('scar_id_'+year).int());
    scar_area = scar_area.addBands(ee.Image().paint(scar_vector_year,'area').rename('scar_area_'+year).int());
    // scar_length = scar_length.addBands(ee.Image().paint(scar_vector_year,'length').rename('scar_length_'+year).float());
    
  });
  
Map.addLayer(scar_id.aside(print,'scar_id'),{},'scar_id');
Map.addLayer(scar_area.aside(print,'scar_area'),{},'scar_area');
Map.addLayer(scar_length.aside(print,'scar_length'),{},'scar_length');

var region = ee.Image('projects/mapbiomas-workspace/FOGO_COL2/SUBPRODUTOS/mapbiomas-fire-collection2-accumulated-burned-coverage-v1')
  .geometry();

[
  ['mapbiomas-fire-collection2-annual-burned-id-v1',scar_id,'mode'],
  ['mapbiomas-fire-collection2-annual-burned-area-v1',scar_area,'median'],
].forEach(function(list){
  
  var assetId = 'projects/mapbiomas-workspace/FOGO_COL2/SUBPRODUTOS/';
  
  Export.image.toAsset({
    image:list[1],
    description:'GT_Fogo-'+list[0],
    assetId:assetId + list[0],
    pyramidingPolicy:list[2],
    // dimensions:,
    region:region,
    scale:30,
    // crs:,
    // crsTransform:,
    maxPixels:1e11,
    // shardSize:
  });
});

