import React, { useState } from "react";
import { Modal, Input, message, Button, Tooltip, Popconfirm } from "antd";
import { useTranslation } from "react-i18next";
import "./add-node.css";

const AddNode = ({ onAdd, onDelete, selectedKey }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newNodeTitle, setNewNodeTitle] = useState("");
    const { t } = useTranslation();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setNewNodeTitle("");
    };

    const handleOk = () => {
        if (newNodeTitle.trim()) {
        onAdd(newNodeTitle);
        setIsModalVisible(false);
        setNewNodeTitle("");
        } else {
        message.error('Enter the name of the new node');
        }
    };

    const handleDelete = () => {
        if (selectedKey) {
          onDelete(selectedKey);
        } else {
          message.error('Select the node to delete');
        }
    };

    return (
        <>
        <Tooltip 
        title={t('enterNodeTitle')}
        placement="right"
        color="#082a42" >
            <Button 
            type="primary"
            className="add-node-button"
            onClick={showModal} >
                {t('addNode')}
            </Button>
        </Tooltip>

        <Popconfirm
        title={t('confirmDelete')}
        onConfirm={handleDelete}
        okText={t('yes')}
        cancelText={t('no')}
        disabled={!selectedKey} >
            <Button 
            type="default" 
            disabled={!selectedKey}
            className="delete-node-button" >
            {t('deleteNode')}
            </Button>
        </Popconfirm>

        <Modal
        title={t('addNewNode')}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={t('addNode')}
        cancelText={t('cancel')} >
            <Input
            value={newNodeTitle}
            onChange={(e) => setNewNodeTitle(e.target.value)}
            placeholder={t('enterNodeName')} />
        </Modal>
        </>
    );
};

export default AddNode;