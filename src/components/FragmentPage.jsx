import { useState } from 'react';
import FragmentFormModal from './FragmentFormModal';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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

function FragmentPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header>
        <h2>Vos Fragments</h2>
        <ButtonNew onClick={() => setShowModal(true)}>New</ButtonNew>
      </Header>
      {showModal && <FragmentFormModal onClose={() => setShowModal(false)} />}
    </Container>
  );
}

export default FragmentPage;
