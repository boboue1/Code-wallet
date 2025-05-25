// src/pages/TagsPage.jsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// Exemple local de fragments simulés
const mockFragments = [
  { id: 1, title: "React snippet", tags: ["react", "js"] },
  { id: 2, title: "PHP Code", tags: ["php", "backend"] },
  { id: 3, title: "MySQL Query", tags: ["sql", "backend", "php"] },
];

const PageContainer = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const TagItem = styled.li`
  background-color: #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: inline-block;
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

function TagsPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const extractedTags = mockFragments.flatMap(f => f.tags || []);
    const uniqueTags = [...new Set(extractedTags)];
    setTags(uniqueTags);
  }, []);

  return (
    <PageContainer>
      <Header>
        <h2>Tags</h2>
        <ButtonNew onClick={() => alert("Feature coming soon!")}>+ New Tag</ButtonNew>
      </Header>

      <p>Filter and manage all tags used in your code fragments.</p>

      <TagList>
        {tags.length === 0 ? (
          <p>No tags available.</p>
        ) : (
          tags.map((tag, index) => <TagItem key={index}>{tag}</TagItem>)
        )}
      </TagList>
    </PageContainer>
  );
}

export default TagsPage;
