export default function filterElements(
  elements,
  materials,
  objective,
  quality
) {
  var filterArray = elements;

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
  const filteredArray = array.filter((item) => {
    for (let i = 0; i < materials.length; i++) {
      if (item.nomeCategoria === materials[i]) {
        return true;
      }
    }
    return false;
  });
  return filteredArray;
}

function filterObjective(array, objective) {
  const filteredArray = array.filter((item) => {
    for (let i = 0; i < objective.length; i++) {
      if (item.tipoAcao === objective[i]) {
        return true;
      }
    }
    return false;
  });
  return filteredArray;
}

function filterQuality(array, quality) {
  const filteredArray = array.filter((item) => {
    for (let i = 0; i < quality.length; i++) {
      if (item.qualidade === quality[i]) {
        return true;
      }
    }
    return false;
  });
  return filteredArray;
}
