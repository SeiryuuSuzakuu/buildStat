import React from 'react';
import { Input, Icon, Tree } from 'antd';
import { Link } from 'react-router-dom';

const { TreeNode, DirectoryTree } = Tree;
let tree = {};

class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      folders: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.addNode = this.addNode.bind(this);
    this.objectToArr = this.objectToArr.bind(this);
    this.generateNodeElement = this.generateNodeElement.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        folders: this.props.folders.filter(folder => folder.path !== '\\').map(
          folder => folder.path = folder.path.replace(/[\\]/g, '/').substring(1))
      })
  }

  handleChange(event) {
    this.setState({ search: event.target.value }, () => {
      this.setState({
        folders: this.props.folders.filter(folder => folder.path !== '\\').filter(folder => {
          if (this.state.search !== '') {
            const arr = folder.path.split('/');
           return arr[arr.length - 1]
              .toLowerCase()
              .includes(this.state.search.toLowerCase());
          }
          return folder;
        }).map(folder => folder.path)
      });
    });
  }

  foldersToTreeNodes(foldersArray) {
    tree = {};
    foldersArray.map(folder => this.addNode(folder));
    this.objectToArr(tree);
    return Object.values(tree);
  }

  addNode(obj) {
    var splitpath = obj.split('/');
    var ptr = tree;
    for (let i = 0; i < splitpath.length; i++) {
      let node = { name: splitpath[i], leaf: true, path: '/' + obj };
      ptr[splitpath[i]] = ptr[splitpath[i]] || node;
      ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
      ptr = ptr[splitpath[i]].children;
    }
  }

  objectToArr(node) {
    Object.keys(node || {}).map(k => {
      if (node[k].children) {      
         if(Object.values(node[k].children).length > 0){
           node[k].leaf = false;
        }
        this.objectToArr(node[k]);
      }
      return node;
    });
    if (node.children) {
      node.children = Object.values(node.children);
      node.children.forEach(this.objectToArr);
    }
  }

  generateNodeElement(nodes) {
    return nodes.map(node => {
      return (
        <TreeNode
          key={node.path}
          title={<Link to={node.path}>{node.name}</Link>}
          isLeaf={node.leaf}
          dataRef={node}
        ></TreeNode>
      );
    });
  }

  
    
  render() {
    const treeNodes = this.foldersToTreeNodes(this.state.folders).map(node => {
      const childNodes = node.children.length > 0 && this.generateNodeElement(node.children);
      return (
        <TreeNode expanded={true}
          key={node.path}
          title={<Link to={node.path}>{node.name}</Link>}
          isLeaf={node.leaf}
          dataRef={node}>
          {childNodes}
        </TreeNode>
      );
    });

    const dupkakupka = <TreeNode key="dupa" title="dupa" >
    <TreeNode key="kupa" title="kupa">
    </TreeNode>
</TreeNode>

console.log(dupkakupka)
    return (
      <div className="certain-category-search-wrapper" style={{ width: 300 }}>
        <Input 
          suffix={<Icon type="search" className="certain-category-icon" />}
          style={{ width: 300, padding: 10}}
          placeholder="input search"
          value={this.state.search}
          onChange={event => this.handleChange(event)}
        />
        <DirectoryTree  style={{top: 10}} defaultExpandAll defaultExpandedKeys={['/CBR']}>{treeNodes}</DirectoryTree>
        {/* <DirectoryTree style={{top: 10}} defaultExpandedKeys={['dupa']}>
          {dupkakupka}
        </DirectoryTree> */}
      </div>
    );
  }
}

export default SearchPage;
