var fire = ee.Image('projects/mapbiomas-fogo-colecao2/assets/COLECAO2_FOGO/mapbiomas-fire-collection2-monthly-burned-coverage-v1')

print(fire);

fire.bandNames().getInfo()
.forEach(function(bandName){
  var fire_year = fire.select(bandName).gte(1);
  
  var description = 'mapbiomas_fire_collection2_'+bandName;
  
  Export.image.toDrive({
    image:fire_year,
    description:'GT_Fogo-'+description,
    folder:'mapbiomas_fire_collection2',
    fileNamePrefix:description,
    // dimensions:,
    region:fire.geometry(),
    scale:30,
    // crs:,
    // crsTransform:,
    maxPixels:1e11, 
    // shardSize:,
    // fileDimensions:,
    // skipEmptyTiles:,
    // fileFormat:,
    // formatOptions:
  });
});
