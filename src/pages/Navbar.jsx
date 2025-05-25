import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: center;
  gap: 40px;
`;

const StyledLink = styled(NavLink)`
  color: #000000;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  /* padding: 5px 10px; */
  border-radius: 4px;
  transition: background-color 0.2s;

  &.active {
    color: white;
    background-color: #9a48d0;
  }

  &:hover {
    color: white;
    background-color: #9a48d0;
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
