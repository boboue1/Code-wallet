import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import FragmentPage from './components/FragmentPage';
import TagsPage from './components/TagsPage';
import InfosPage from './components/InfosPage';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: sans-serif;
`;

const FixedHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #1e1e1e;
  z-index: 999;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 10px 20px;
`;

const AppTitle = styled.h1`
  color: white;
  font-size: 1.6rem;
  text-align: left;
  margin: 0;
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const MainContent = styled.main`
  padding-top: 100px;
  padding-left: 20px;
  padding-right: 20px;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <FixedHeader>
          <AppTitle>🧠 Code Wallet</AppTitle>
          <NavWrapper>
            <Navbar />
          </NavWrapper>
        </FixedHeader>
        <MainContent>
          <Routes>
            <Route path="/" element={<Navigate to="/fragments" />} />
            <Route path="/fragments" element={<FragmentPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/infos" element={<InfosPage />} />

          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;
