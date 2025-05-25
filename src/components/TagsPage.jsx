// src/pages/TagsPage.jsx
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase';

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
    const fetchTagsFromFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));
      const allFragments = querySnapshot.docs.map(doc => doc.data());

      // Extraire tous les tags
      const extractedTags = allFragments.flatMap(frag => frag.tags || []);
      const uniqueTags = [...new Set(extractedTags)]; // supprimer doublons
      setTags(uniqueTags);
    };

    fetchTagsFromFragments();
  }, []);

  return (
    <PageContainer>
      <Header>
        <h2>Tags</h2>
        <ButtonNew onClick={() => alert('Coming soon: Create new tags directly.')}>
          + New Tag
        </ButtonNew>
      </Header>

      <p>Filter and manage all tags used in your code fragments.</p>

      <TagList>
        {tags.length === 0 ? (
          <p>No tags found.</p>
        ) : (
          tags.map((tag, index) => <TagItem key={index}>{tag}</TagItem>)
        )}
      </TagList>
    </PageContainer>
  );
}

export default TagsPage;
