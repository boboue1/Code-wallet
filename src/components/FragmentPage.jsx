import { useState } from 'react';
import FragmentFormModal from './FragmentFormModal';
import FragmentViewerModal from './FragmentViewerModal';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
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
  width: 400px;
  border-radius: 8px;
  word-break: break-word;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

function FragmentPage() {
  const [fragments, setFragments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFragment, setSelectedFragment] = useState(null);

  const handleSave = (newFragment) => {
    setFragments((prev) => [...prev, newFragment]);
    setShowModal(false);
  };

  const openViewer = (fragment) => {
    setSelectedFragment(fragment);
  };

  return (
    <Container>
      <Header>
        <h2>Code Wallet</h2>
        <ButtonNew onClick={() => setShowModal(true)}>+ New</ButtonNew>
      </Header>

      <FragmentList>
        {fragments.map((frag, i) => (
          <FragmentItem key={i}>
            <strong>{frag.title}</strong>
            <EyeButton onClick={() => openViewer(frag)}>👁️</EyeButton>
          </FragmentItem>
        ))}
      </FragmentList>

      {showModal && (
        <FragmentFormModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
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
