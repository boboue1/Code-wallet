import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #2a2a2a;
  color: white;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #2a2a2a;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  gap: 10px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;

  &:hover {
    background-color: #5a6268;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;

  &:hover {
    background-color: #c82333;
  }
`;

function FragmentFormModal({ onClose, onSave, onDelete, initialData = null }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');

  // Préremplir si on est en édition
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCode(initialData.code);
      setTags(initialData.tags.join(', '));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFragment = {
      title,
      code,
      tags: tags.split(',').map((t) => t.trim()).filter((t) => t),
    };
    onSave(newFragment);
  };

  return (
    <Overlay>
      <Modal>
        <Title>{initialData ? 'Modifier le fragment' : 'Nouveau fragment'}</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Tags (séparés par des virgules)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <ButtonGroup>
             <CancelButton type="button" onClick={onClose}>
              Annuler
            </CancelButton>
            <SaveButton type="submit">
              {initialData ? 'Enregistrer' : 'Ajouter'}
            </SaveButton>

           

            {onDelete && (
              <DeleteButton type="button" onClick={onDelete}>
                Supprimer
              </DeleteButton>
            )}
          </ButtonGroup>
        </form>
      </Modal>
    </Overlay>
  );
}

export default FragmentFormModal;
