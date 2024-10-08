import React, { useState, useEffect } from "react";
import { Tree, ConfigProvider } from "antd";
import AddNode from "./add-node";

const FileTree = ({ data, setTreeData, saveToLocalStorage }) => {
	const [treeData, setTreeDataLocal] = useState(data);
	const [selectedKey, setSelectedKey] = useState(null);

	useEffect(() => {
		setTreeDataLocal(data);
	}, [data]);

	const findAndRemoveNode = (nodes, key) => {
		let foundNode = null;

		const filterNodes = (children) => {
			return children.map((child) => {
				if (child.key === key) {
					foundNode = child;
					return null;
				}

				if (child.children) {
					child.children = filterNodes(child.children);
				}
				return child;
				})
				.filter(Boolean);
		};

		const filteredData = filterNodes(nodes);
		return { newTreeData: filteredData, foundNode };
	};

	const insertNode = (nodes, dropKey, nodeToInsert) => {
		const insertRecursive = (children) => {
		return children.map((child) => {
			if (child.key === dropKey) {
				if (!child.children) {
					child.children = [];
				}
				child.children.push(nodeToInsert);
				} else if (child.children) {
				child.children = insertRecursive(child.children);
				}
			return child;
		});
		};

		return insertRecursive(nodes);
	};

	const onDrop = (info) => {
		const { node, dragNode } = info;
		const { newTreeData: dataAfterRemoval, foundNode } = findAndRemoveNode(treeData, dragNode.key);

		if (!foundNode) {
		return;
		}

		const updatedTreeData = insertNode(dataAfterRemoval, node.key, foundNode);
		
		setTreeDataLocal(updatedTreeData);
		setTreeData(updatedTreeData);
		saveToLocalStorage(updatedTreeData);
  	};

	
	const addNode = (title) => {
		const newKey = `${Date.now()}`;
		const newNode = { title, key: newKey, children: [] };
	
		const addNodeToTree = (nodes, targetKey) => {
			return nodes.map((node) => {
				if (node.key === targetKey) {
				return {
					...node,
					children: node.children ? [...node.children, newNode] : [newNode],
				};
				}
		
				if (node.children) {
				return { ...node, children: addNodeToTree(node.children, targetKey) };
				}
		
				return node;
			});
		};
	
		let updatedTreeData;
		if (selectedKey) {
			updatedTreeData = addNodeToTree(treeData, selectedKey);
		} else {
			updatedTreeData = [...treeData, newNode];
		}
	
		setTreeDataLocal(updatedTreeData);
		setTreeData(updatedTreeData);
		saveToLocalStorage(updatedTreeData);
	};

	const deleteNode = (key) => {
		const deleteNodeFromTree = (nodes, targetKey) => {
		return nodes
			.map((node) => {
			if (node.key === targetKey) {
				return null;
			}
		
			if (node.children) {
				return {
				...node,
				children: deleteNodeFromTree(node.children, targetKey),
				};
			}
		
			return node;
			})
			.filter((node) => node !== null);
		};
		
		const updatedTreeData = deleteNodeFromTree(treeData, key);
		
		setTreeDataLocal(updatedTreeData);
		setTreeData(updatedTreeData);
		saveToLocalStorage(updatedTreeData);
	};

	
	const onSelect = (selectedKeys) => {
		setSelectedKey(selectedKeys[0] || null);
	};

	return (
		<ConfigProvider
		theme={{
			components: {
			  Tree: {
				nodeSelectedBg: '#53a3c2',
				nodeHoverBg: '#a4cfdb'
			  },
			},
		}}>
			<Tree
			treeData={treeData}
			onDrop={onDrop}
			onSelect={onSelect}
			draggable
			defaultExpandAll
			style={{
				background: '#e6f3f5'
			}}
			/>
			<AddNode onAdd={addNode}
			onDelete={deleteNode}
			selectedKey={selectedKey} />
		</ConfigProvider>
	);
};

export default FileTree;
