import { useState } from 'react';
import FragmentFormModal from './FragmentFormModal';
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
  width: 400px;
  border-radius: 8px;
  word-break: break-word;
`;

function FragmentPage() {
    const [fragments, setFragments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSave = (newFragment) =>{
    console.log('REÇU DANS LE PARENT:', newFragment);
    setFragments((prev) => [...prev, newFragment]);
    setShowModal(false);
  };
  return (
    <Container>
      <Header>
        <h2>Vos Fragments</h2>
        <ButtonNew onClick={() => setShowModal(true)}>New</ButtonNew>
      </Header>
         <FragmentList>
        {fragments.map((frag, i) => (
          <FragmentItem key={i}>
            <strong>{frag.title}</strong>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#aaa' }}>{frag.code}</pre>
          </FragmentItem>
        ))}
      </FragmentList>

      {showModal && (
        <FragmentFormModal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}
    </Container>
  );
}

export default FragmentPage;
