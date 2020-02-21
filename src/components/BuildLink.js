import React from 'react';
import { Link } from 'react-router-dom';

function generateBuildPathName(path) {
  const arr = path.split('\\');
  return arr[arr.length - 1];
}

function BuildLink(props) {
  const folderName = generateBuildPathName(props.path);
  const link = props.path.replace(/[\\]/g, '/');
  return (
      <Link to={link}>{folderName}</Link>
  );
}

export default BuildLink;
