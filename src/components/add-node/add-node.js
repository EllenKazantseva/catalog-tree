import React, { useState } from "react";
import { Modal, Input, message, Button, Tooltip, Popconfirm } from "antd";
import "./add-node.css";

const AddNode = ({ onAdd, onDelete, selectedKey }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newNodeTitle, setNewNodeTitle] = useState("");

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
        message.error("Введите название для нового узла.");
        }
    };

    const handleDelete = () => {
        if (selectedKey) {
          onDelete(selectedKey);
        } else {
          message.error("Выберите узел для удаления.");
        }
    };

    return (
        <>
        <Tooltip 
        title="Сначала выберите узел для добавления"
        placement="right"
        color="#082a42" >
            <Button 
            type="primary"
            className="add-node-button"
            onClick={showModal} >
                Добавить узел
            </Button>
        </Tooltip>

        <Popconfirm
        title="Вы уверены, что хотите удалить этот узел?"
        onConfirm={handleDelete}
        okText="Да"
        cancelText="Нет"
        disabled={!selectedKey} >
            <Button 
            type="default" 
            disabled={!selectedKey}
            className="delete-node-button" >
            Удалить узел
            </Button>
        </Popconfirm>

        <Modal
        title="Добавить новый узел"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Добавить"
        cancelText="Отмена" >
            <Input
            value={newNodeTitle}
            onChange={(e) => setNewNodeTitle(e.target.value)}
            placeholder="Введите название нового узла" />
        </Modal>
        </>
    );
};

export default AddNode;