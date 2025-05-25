import styled from 'styled-components';

export const PageContainer = styled.div`
  padding: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px; 
`;


export const TagItem = styled.li`
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: inline-block;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

export const ButtonNew = styled.button`
  padding: 8px 12px;
  background-color: #7bc950;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #000000;
  }
`;
