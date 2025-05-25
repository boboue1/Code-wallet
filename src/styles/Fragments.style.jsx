import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
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

export const FragmentList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
`;

export const FragmentItem = styled.div`
  background-color: #333333;
  color: white;
  padding: 12px;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  word-break: break-word;
`;

export const FragmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
`;

export const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Title = styled.strong`
  font-size: 1rem;
`;

export const TagsContainer = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const Tag = styled.span`
  background-color: #444;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
`;

export const EyeButton = styled.button`
  background: none;
  border: none;
  color: #00bfff;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    color: #1ec8ff;
  }
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: #ffaa00;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 8px;

  &:hover {
    color: #ffc94b;
  }
`;
