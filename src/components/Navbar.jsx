import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 40px;
  /* padding: 10px 0 15px; */
`;

const StyledLink = styled(NavLink)`
  color: #ccc;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  /* padding: 5px 10px; */
  border-radius: 4px;
  transition: background-color 0.2s;

  &.active {
    color: white;
    background-color: #007bff;
  }

  &:hover {
    color: white;
    background-color: #0056b3;
  }
`;

function Navbar() {
  return (
    <NavbarContainer>
      <StyledLink to="/fragments">Fragments</StyledLink>
      <StyledLink to="/tags">Tags</StyledLink>
      <StyledLink to="/infos">Infos</StyledLink>
    </NavbarContainer>
  );
}

export default Navbar;
