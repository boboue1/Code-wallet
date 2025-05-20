import { useState } from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  width: 400px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  height: 150px;
  padding: 8px;
  font-family: monospace;
  font-size: 0.9rem;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonDelete = styled.button`
  padding: 8px 12px;
  background-color: #dc3545;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonSave = styled.button`
  padding: 8px 12px;
  background-color: #28a745;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`;

function FragmentFormModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');

  const handleSave = () => {
    console.log({ title, code });
    onClose();
  };

  return (
    <Backdrop>
      <Modal>
        <h3>Nouveau Fragment</h3>
        <Input
          type="text"
          placeholder="Titre du fragment"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextArea
          placeholder="Code du fragment"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <ModalActions>
          <ButtonDelete onClick={onClose}>Supprimer</ButtonDelete>
          <ButtonSave onClick={handleSave}>Sauvegarder</ButtonSave>
        </ModalActions>
      </Modal>
    </Backdrop>
  );
}

export default FragmentFormModal;
