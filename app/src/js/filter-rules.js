export default function filterElements(
  elements,
  materials,
  objective,
  quality,
) {
  var filterArray = elements;

  if(materials?.length === 0 && objective?.length === 0 && quality?.length === 0){
    return []
  }

  if (materials?.length > 0) {
    filterArray = filterMaterial(filterArray, materials);
  }

  if (objective?.length > 0) {
    filterArray = filterObjective(filterArray, objective);
  }

  if (quality?.length > 0) {
    filterArray = filterQuality(filterArray, quality);
  }

  return filterArray;
}

function filterMaterial(array, materials) {
  return array.filter((item) => materials.includes(item.descricao));
}

function filterObjective(array, objective) {
  return array.filter((item) => objective.includes(item.objetivo));
}

function filterQuality(array, quality) {
  return array.filter((item) => quality.includes(item.qualidade));
}
