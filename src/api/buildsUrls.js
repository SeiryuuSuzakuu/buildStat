import  {headersData, host, collection, project}  from './consts';

function getFolders() {
  return `${host}/${collection}/${project}/_apis/build/folders?api-version=3.1-preview`;
}

function getBuildsFromPath(path) {
  return `${host}/${collection}/${project}/_apis/build/definitions?path=${path}\\*&api-version=3.1-preview`;
}

function getBuildsByDefinition(definitionIds) {
  return `${host}/${collection}/${project}/_apis/build/builds?definitions=${definitionIds}&maxBuildsPerDefinition=1&api-version=3.1-preview`;
}


//get builds from path
export async function getBuildsDataFromPath(path) {
  const response = await fetch(getBuildsFromPath(path),  headersData );
  return await response.json();
}

//get builds data by definition
export async function getBuildsDataByDefinition(definitionIds) {
  const response = await fetch(getBuildsByDefinition(definitionIds),  headersData );
  return await response.json();
}

//get build folders
export async function getFoldersData() {
  const response = await fetch(getFolders(),  headersData );
  return await response.json();
}


