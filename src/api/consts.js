export const username = 'username';
export const password = 'password';
export const host = 'host'
export const collection = 'collection'
export const project = 'project'
export const headersData = {
  headers: {
    Authorization: 'Basic ' + btoa(`${username}:${password}`),
    'Content-Type': 'application/json',
  },
};


export function generateBuildPathName(path) {
  const arr = path.split('\\');
  return arr[arr.length - 1];
}