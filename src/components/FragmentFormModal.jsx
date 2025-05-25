import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(51, 51, 51, 0.8); /* gris foncé semi-transparent */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background-color: #333333; /* gris foncé */
  color: #ffffff; /* blanc */
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(122, 72, 208, 0.6); /* violet flou */
`;

const Title = styled.h3`
  margin-top: 0;
  color: #b288c0; /* lavande clair */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #b288c0; /* lavande clair */
  background-color: #333333; /* gris foncé */
  color: #ffffff; /* blanc */
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #9a48d0; /* violet vif */
    box-shadow: 0 0 5px #9a48d0;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 6px;
  border: 1px solid #b288c0; /* lavande clair */
  background-color: #333333; /* gris foncé */
  color: #ffffff; /* blanc */
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #9a48d0; /* violet vif */
    box-shadow: 0 0 5px #9a48d0;
  }
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
  font-size: 1rem;
  transition: background-color 0.3s ease;
`;

// Vert clair pour Save
const SaveButton = styled(Button)`
  background-color: #7bc950; 
  color: #333333; /* texte gris foncé pour contraste */

  &:hover {
    background-color: #68b03f;
  }
`;

// Lavande clair pour Cancel
const CancelButton = styled(Button)`
  background-color: #b288c0;
  color: #333333;

  &:hover {
    background-color: #9a70af;
  }
`;

// Violet vif pour Delete
const DeleteButton = styled(Button)`
  background-color: #9a48d0;
  color: #ffffff;

  &:hover {
    background-color: #7c33aa;
  }
`;

function FragmentFormModal({ onClose, onSave, onDelete, initialData = null }) {
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [tags, setTags] = useState('');

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
