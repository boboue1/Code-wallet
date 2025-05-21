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
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: #fff;
  padding: 20px;
  width: 600px;
  border-radius: 8px;
`;

const CodeBlock = styled.pre`
  background-color: #1e1e1e;
  color: white;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  max-height: 400px;

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
        <h3>{fragment.title}</h3>
        <CodeBlock>
          <code className="language-javascript">{fragment.code}</code>
        </CodeBlock>
        <Actions>
          <Button onClick={copyToClipboard}>📋 Copier</Button>
          <Button onClick={onClose}>Fermer</Button>
        </Actions>
      </Modal>
    </Backdrop>
  );
}

export default FragmentViewerModal;
