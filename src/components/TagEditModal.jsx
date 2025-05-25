import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(51, 51, 51, 0.8); /* gris foncé transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #333333;  /* gris foncé */
  padding: 24px;
  border-radius: 10px;
  width: 320px;
  color: #ffffff; /* blanc */
  box-shadow: 0 0 10px #222; /* légèrement plus sombre */
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  color: #b288c0; /* violet clair */
`;

const InputTag = styled.input`
  width: 100%;
  padding: 8px 10px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1.5px solid #b288c0; /* violet clair */
  font-size: 1rem;
  color: #333333; /* gris foncé texte */
  background-color: #ffffff; /* fond blanc */
  outline-offset: 2px;

  &:focus {
    border-color: #9a48d0; /* violet foncé */
    box-shadow: 0 0 5px #9a48d0;
  }
`;

const ButtonsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  color: #ffffff;

  background-color: ${props => 
    props.danger ? '#7bc950' : 
    props.primary ? '#9a48d0' : 
    '#b288c0'};

  &:hover {
    background-color: ${props => 
      props.danger ? '#5f8a38' : 
      props.primary ? '#b288c0' : 
      '#9a48d0'};
  }
`;

export default function TagEditModal({ oldTag, isNew, onClose, onSave, onDelete }) {
  const [editedTag, setEditedTag] = useState(oldTag);

  useEffect(() => {
    setEditedTag(oldTag);
  }, [oldTag]);

  return (
    <ModalBackground onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <ModalContainer>
        <ModalTitle>{isNew ? 'Create New Tag' : `Edit Tag "${oldTag}"`}</ModalTitle>

        <InputTag
          value={editedTag}
          onChange={e => setEditedTag(e.target.value)}
          placeholder="Enter tag name"
          onKeyDown={e => {
            if (e.key === 'Enter') onSave(oldTag, editedTag);
            if (e.key === 'Escape') onClose();
          }}
          autoFocus
        />

        <ButtonsRow>
          {!isNew && (
            <Button danger onClick={() => onDelete(oldTag)}>
              Delete
            </Button>
          )}
          <Button onClick={onClose}>Cancel</Button>
          <Button primary onClick={() => onSave(oldTag, editedTag)}>
            {isNew ? 'Create' : 'Save'}
          </Button>
        </ButtonsRow>
      </ModalContainer>
    </ModalBackground>
  );
}
