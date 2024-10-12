const STORAGE_KEY = 'treeData';

class TreeService {
    static getTreeData() {
        const storedData = localStorage.getItem(STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : null;
    }

    static saveTreeData(treeData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(treeData));
    }

    static clearTreeData() {
        localStorage.removeItem(STORAGE_KEY);
    }
}

export default TreeService;