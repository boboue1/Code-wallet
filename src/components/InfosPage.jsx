import styled from 'styled-components';

const PageContainer = styled.div`
  /* width: 100%;
  height: 100vh; */
  color: #141111;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

function InfosPage() {
  return (
    <PageContainer>
      <p>This app helps you store and manage reusable code snippets efficiently.</p>
      <p>Made with ❤️ using React & styled-components.</p>
    </PageContainer>
  );
}

export default InfosPage;
