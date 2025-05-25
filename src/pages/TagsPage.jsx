import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from '../firebase';
import TagEditModal from '../components/TagEditModal';
import * as S from '../styles/TagsPage';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [fragments, setFragments] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));
      const allFragments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const extractedTags = allFragments.flatMap(frag => frag.tags || []);
      const uniqueTags = [...new Set(extractedTags)];

      setFragments(allFragments);
      setTags(uniqueTags);
    };

    fetchFragments();
  }, []);

  const openModalForTag = (tag) => {
    setCurrentTag(tag);
    setIsNew(false);
    setModalOpen(true);
  };

  const openModalForNewTag = () => {
    setCurrentTag('');
    setIsNew(true);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTag('');
    setIsNew(false);
  };

  const handleSave = async (oldTag, newTag) => {
    const trimmedNewTag = newTag.trim();
    if (!trimmedNewTag) {
      alert('Tag cannot be empty.');
      return false;
    }
    if (isNew) {
      if (tags.includes(trimmedNewTag)) {
        alert('This tag already exists.');
        return false;
      }
      alert("To create a tag, please add it to at least one fragment.");
      return false;
    } else {
      if (trimmedNewTag !== oldTag && tags.includes(trimmedNewTag)) {
        alert('This tag already exists.');
        return false;
      }

      try {
        const updatedFragments = fragments.filter(frag => frag.tags?.includes(oldTag));
        await Promise.all(
          updatedFragments.map(frag => {
            const newTags = frag.tags.map(t => (t === oldTag ? trimmedNewTag : t));
            return updateDoc(doc(db, 'fragments', frag.id), { tags: newTags });
          })
        );

        const newTagsList = tags.map(t => (t === oldTag ? trimmedNewTag : t));
        setTags(newTagsList);

        alert('Tag updated successfully.');
        closeModal();
        return true;
      } catch (err) {
        console.error(err);
        alert('Failed to update tag.');
        return false;
      }
    }
  };

  const handleDelete = async (tagToDelete) => {
    if (!window.confirm(`Are you sure you want to delete the tag "${tagToDelete}" from all fragments?`)) {
      return false;
    }
    try {
      const updatedFragments = fragments.filter(frag => frag.tags?.includes(tagToDelete));
      await Promise.all(
        updatedFragments.map(frag => {
          const newTags = frag.tags.filter(t => t !== tagToDelete);
          return updateDoc(doc(db, 'fragments', frag.id), { tags: newTags });
        })
      );
      setTags(tags.filter(t => t !== tagToDelete));
      alert('Tag deleted successfully.');
      closeModal();
      return true;
    } catch (err) {
      console.error(err);
      alert('Failed to delete tag.');
      return false;
    }
  };

  return (
    <S.PageContainer>
      <S.Header>
        <h2>Tags</h2>
        <S.ButtonNew onClick={openModalForNewTag}>
          + New Tag
        </S.ButtonNew>
      </S.Header>

      <p>Filter and manage all tags used in your code fragments.</p>

      <S.TagList>
        {tags.length === 0 ? (
          <p>No tags found.</p>
        ) : (
          tags.map((tag, index) => (
            <S.TagItem key={index} onClick={() => openModalForTag(tag)}>
              {tag}
            </S.TagItem>
          ))
        )}
      </S.TagList>

      {modalOpen && (
        <TagEditModal
          oldTag={isNew ? '' : currentTag}
          isNew={isNew}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </S.PageContainer>
  );
}
