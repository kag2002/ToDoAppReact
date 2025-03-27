import { useState } from 'react';

export const useModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const openEditModal = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  const openDeleteModal = (record) => {
    setSelectedRecord(record);
    setModalConfirmDeleteVisible(true);
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
  };

  const closeDeleteModal = () => {
    setModalConfirmDeleteVisible(false);
    setSelectedRecord(null);
  };

  return {
    modalVisible,
    setModalVisible,
    modalConfirmDeleteVisible,
    setModalConfirmDeleteVisible,
    selectedRecord,
    openEditModal,
    openDeleteModal,
    closeEditModal,
    closeDeleteModal
  };
}; 