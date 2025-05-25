import styled from 'styled-components';
import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css'; // ou une autre

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(51, 51, 51, 0.8); /* gris foncé semi-transparent */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #ffffff; /* blanc */
  padding: 20px;
  width: 600px;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(154, 72, 208, 0.4); /* violet doux */
`;

const CodeBlock = styled.pre`
  background-color: #333333; /* gris foncé */
  color: #ffffff; /* blanc */
  border-radius: 6px;
  overflow-x: auto;
  max-height: 400px;
  padding: 16px;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    color: #b288c0; /* lavande clair pour le texte */
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #9a48d0; /* violet vif */
  color: #ffffff; /* blanc */
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b288c0; /* lavande clair */
  }
`;

function FragmentViewerModal({ fragment, onClose }) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fragment.code);
  };

  return (
    <Backdrop>
      <Modal>
        <h3 style={{ color: '#333333' }}>{fragment.title}</h3>
        <CodeBlock>
          <code className="language-javascript">{fragment.code}</code>
        </CodeBlock>
        <Actions>
          <Button onClick={copyToClipboard}>Copy</Button>
          <Button onClick={onClose}>Fermer</Button>
        </Actions>
      </Modal>
    </Backdrop>
  );
}

export default FragmentViewerModal;
