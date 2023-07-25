# scar-id

## OBJETIVO:
Identificar cada cicatriz de fogo nos mapas anuais do MapBiomas-Fogo sem perder os trinta metros de resolução.

## ESTRATEGIA
Vetorizar os dados anuais de area queimada e assim atribuir um ID para cada poligono fechado que represente um conjunto de pixeis conectados.

##ETAPAS:
#### ETAPA 0
Exportar dados do MapBiomas-Fogo coleção 2 para o Google Drive

script: [Download das imagens anuais de area queimada.js](https://code.earthengine.google.com/db5e8b901c15c5625fe7323b0e5be723?noload=1)


#### ETAPA 1
Vetorizar cicatrizes e enviar de volta ao Earth Engine como uma feature collection por ano.

PASSO 0: Mosaicar as imagens do ano em um só tif usando **gdalbuildvrt** e **gdal_translate**

PASSO 1: Vetorizar ela com **gdal_poligonize.py**

PASSO 2: Atribuir uma coluna de ID decimal a cada poligono com **GeoPandas**

PASSO 3: Enviar de volta ao Earth Engine como assets

NOTEBOOK: [Vetorização das cicatrizes.ipynb](https://colab.research.google.com/drive/1sgkU3j8s4UuYpY63Mfggnx6PSnM5dqsU?usp=sharing)


#### ETAPA 2: 
Rasterizar os vetores de cicatrizes anuais com a função **ee.Image().paint()** e construir um raster stack, de uma banda por ano com o valor do pixel sendo um id unico naquele ano para cada cicatriz

script: [rasterização dos dados de identificação de cicatrizes.js](https://code.earthengine.google.com/b4c08a9601167fe6eb381d909b73736f)

#### Outros resultados:

<picture>
  <img alt="mapa dos shapes e rasters no qgis" src="https://github.com/wallyboy22/scar-id/blob/27ccd345c57522a6043f387818f88d9337b94aca/mapa0.png">
</picture>

Base de dados: [Google Drive](https://drive.google.com/drive/folders/1zsbCJa88UyYBokRKCrgEA_cMXI82n22K?usp=sharing)

~~~javascript
// raster stack de indentificação das cicatrizes da coleção 2 do mapbiomas-fogo (1985-2022)
var scar_id = ee.Image('projects/mapbiomas-workspace/FOGO_COL2/SUBPRODUTOS/mapbiomas-fire-collection2-annual-burned-id-v1')
// raster stack com a area de cada cicatriz da coleção 2 do mapbiomas-fogo (1985-2022)
var scar_area = ee.Image('projects/mapbiomas-workspace/FOGO_COL2/SUBPRODUTOS/mapbiomas-fire-collection2-annual-burned-area-v1')
  
~~~
~~~javascript
// raster stack de indentificação das cicatrizes da coleção 1 do mapbiomas-fogo (1985-2020)
var scar_id = ee.Image('projects/workspace-ipam/assets/FOGO/mapbiomas-fire-collection1-annual-scar_id-1')
~~~
~~~javascript
// ASSETS: vetores das cicatrizes da coleção 2 do mapbiomas-fogo (1985 à 2022)
var scar_vector_1985 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL2/mbfogo-col2-1985-v1');
var scar_vector_1986 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL2/mbfogo-col2-1986-v1');
...
var scar_vector_2021 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL2/mbfogo-col2-2021-v1');
var scar_vector_2022 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL2/mbfogo-col2-2022-v1');

~~~
~~~javascript
// ASSETS: vetores das cicatrizes da coleção 1 do mapbiomas-fogo (1985 à 2020)
var scar_vector_1985 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL1/mbfogo-col1-1985-v2');
var scar_vector_1986 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL1/mbfogo-col1-1986-v2');
...
var scar_vector_2019 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL1/mbfogo-col1-2019-v2');
var scar_vector_2020 = ee.FeatureCollection('projects/workspace-ipam/assets/FOGO/VECTOR-COL1/mbfogo-col1-2020-v2');

~~~

<table>
  <tr>
    <td>
      <picture>
        <img src="https://github.com/wallyboy22/scar-id/blob/1957ac2b0f950793fc06afc21a281e86b6cb1d32/mosaico_de_qualidade.png">
      </picture>
    </td>
    <td>
      <picture>
        <img src="https://github.com/wallyboy22/scar-id/blob/1957ac2b0f950793fc06afc21a281e86b6cb1d32/scar-cover.png">
      </picture>
    </td>
  </tr>
  <tr>
    <td>
      <picture>
        <img src="https://github.com/wallyboy22/scar-id/blob/1957ac2b0f950793fc06afc21a281e86b6cb1d32/scar-id.png">
      </picture>
    </td>
    <td>
      <picture>
        <img src="https://github.com/wallyboy22/scar-id/blob/1957ac2b0f950793fc06afc21a281e86b6cb1d32/scar-area.png">
      </picture>
    </td>
  </tr>
</table>

