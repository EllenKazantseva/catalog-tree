import { useState } from 'react';
import { Layout } from 'antd';
import FileTree from './components/file-tree/file-tree';
import TreeService from './components/tree-service/tree-service';
import LanguageSwither from './components/language-switcher/language-switcher';
import { generate } from '@ant-design/colors';
import { useTranslation } from 'react-i18next';
import "./app.css";


const { Header, Content, Footer } = Layout;
const colors = generate('#308ab4');

const App = () => {
	const initialTreeData = [
        {
            title: 'Каталоги',
            key: '0-0',
            children: [
                {
                    title: 'Каталог А',
                    key: '0-0-0',
                    children: [
                        { 
                            title: 'Категория 1', 
                            key: '0-0-0-0',
                            children: [
                                { title: 'Товар 1', key: '0-0-0-0-0' },
                                { title: 'Товар 2', key: '0-0-0-0-1' }
                            ]
                        },
                        { 
                            title: 'Категория 2',
                            key: '0-0-0-1',
                            children: [
                                { title: 'Товар 3', key: '0-0-0-1-0' },
                                { title: 'Товар 4', key: '0-0-0-1-1' }
                            ]
                        },
                    ],
                },
                {
                    title: 'Каталог Б',
                    key: '0-0-1',
                    children: [
                        { 
                            title: 'Категория 1', 
                            key: '0-0-1-0',
                            children: [
                                { title: 'Товар 5', key: '0-0-1-0-0' },
                                { title: 'Товар 6', key: '0-0-1-0-1' }
                            ]
                        },
                        { 
                            title: 'Категория 2',
                            key: '0-0-1-1',
                            children: [
                                { title: 'Товар 7', key: '0-0-1-1-0' },
                                { title: 'Товар 8', key: '0-0-1-1-1' }
                            ]
                        },
                    ],
                },
            ],
    	},
    ]

    const { t } = useTranslation();

	const [treeData, setTreeData] = useState(() => {
        const storedData = TreeService.getTreeData();
        return storedData || initialTreeData;
    });

	const saveToLocalStorage = (newTree) => {
		setTreeData(newTree);
		TreeService.saveTreeData(newTree);
	};

	return (
		<Layout style={{colors}}>
			<Header className='header'>
				<h1>{t('title')}</h1>
                <LanguageSwither />
			</Header>
			<Content className='content'>
				<FileTree 
				data={treeData} 
				setTreeData={setTreeData}
				saveToLocalStorage={saveToLocalStorage} />
			</Content>
			<Footer className='footer'>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
			</Footer>
		</Layout>
	);
};

export default App;