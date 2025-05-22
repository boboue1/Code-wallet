import { useState, useEffect } from 'react';
import FragmentFormModal from './FragmentFormModal';
import FragmentViewerModal from './FragmentViewerModal';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const ButtonNew = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #005fcc;
  }
`;

const FragmentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
`;

const FragmentItem = styled.div`
  background-color: #1e1e1e;
  color: white;
  padding: 12px;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  word-break: break-word;
`;

const FragmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Title = styled.strong`
  font-size: 1rem;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  background-color: #444;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
`;

const EyeButton = styled.button`
  background: none;
  border: none;
  color: #00bfff;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #1ec8ff;
  }
`;

const EditButton = styled.button`
  background: none;
  border: none;
  color: #ffaa00;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 8px;

  &:hover {
    color: #ffc94b;
  }
`;

function FragmentPage() {
  const [fragments, setFragments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFragment, setSelectedFragment] = useState(null);
  const [editFragment, setEditFragment] = useState(null);

  // Chargement depuis localStorage au premier rendu
  useEffect(() => {
    const stored = localStorage.getItem('fragments');
    if (stored) {
      setFragments(JSON.parse(stored));
    }
  }, []);

  // Sauvegarde à chaque changement
  useEffect(() => {
    localStorage.setItem('fragments', JSON.stringify(fragments));
  }, [fragments]);

  const handleSave = (newFragment) => {
    if (editFragment !== null) {
      // Mode édition : on remplace
      setFragments(prev =>
        prev.map((frag, i) => (i === editFragment ? newFragment : frag))
      );
      setEditFragment(null);
    } else {
      // Nouveau fragment
      setFragments(prev => [...prev, newFragment]);
    }
    setShowModal(false);
  };

  const handleDelete = (indexToDelete) => {
    setFragments(prev => prev.filter((_, i) => i !== indexToDelete));
    setShowModal(false);
    setEditFragment(null);
  };

  const openViewer = (fragment) => {
    setSelectedFragment(fragment);
  };

  const openEditForm = (fragment, index) => {
    setEditFragment(index);
    setShowModal(true);
  };

  return (
    <Container>
      <Header>
        <h2>Vos Fragments</h2>
        <ButtonNew onClick={() => {
          setEditFragment(null);
          setShowModal(true);
        }}>
          + New
        </ButtonNew>
      </Header>

      <FragmentList>
        {fragments.map((frag, i) => (
          <FragmentItem key={i}>
            <FragmentHeader>
              <LeftContent>
                <Title>{frag.title}</Title>
                <TagsContainer>
                  {frag.tags?.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </LeftContent>
              <div>
                <EyeButton onClick={() => openViewer(frag)}>👁️</EyeButton>
                <EditButton onClick={() => openEditForm(frag, i)}>✏️</EditButton>
              </div>
            </FragmentHeader>
          </FragmentItem>
        ))}
      </FragmentList>

      {showModal && (
        <FragmentFormModal
          onClose={() => {
            setShowModal(false);
            setEditFragment(null);
          }}
          onSave={handleSave}
          onDelete={editFragment !== null ? () => handleDelete(editFragment) : null}
          initialData={editFragment !== null ? fragments[editFragment] : null}
        />
      )}

      {selectedFragment && (
        <FragmentViewerModal
          fragment={selectedFragment}
          onClose={() => setSelectedFragment(null)}
        />
      )}
    </Container>
  );
}

export default FragmentPage;
