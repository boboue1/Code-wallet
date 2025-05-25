import { useState, useEffect } from 'react';
import FragmentFormModal from './FragmentFormModal';
import FragmentViewerModal from './FragmentViewerModal';
import { 
  Container, Header, ButtonNew, FragmentList, FragmentItem, FragmentHeader, 
  LeftContent, Title, TagsContainer, Tag, EyeButton, EditButton 
} from '../styles/Fragments.style';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase';

function FragmentPage() {
  const [fragments, setFragments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFragment, setSelectedFragment] = useState(null);
  const [editFragment, setEditFragment] = useState(null);

  useEffect(() => {
    const fetchFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));
      const loadedFragments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFragments(loadedFragments);
    };

    fetchFragments();
  }, []);

  const handleSave = async (newFragment) => {
    if (editFragment !== null) {
      const fragmentRef = doc(db, 'fragments', fragments[editFragment].id);
      await updateDoc(fragmentRef, newFragment);
    } else {
      await addDoc(collection(db, 'fragments'), newFragment);
    }

    const querySnapshot = await getDocs(collection(db, 'fragments'));
    const updated = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFragments(updated);
    setShowModal(false);
    setEditFragment(null);
  };

  const handleDelete = async (indexToDelete) => {
    const fragment = fragments[indexToDelete];
    const fragmentRef = doc(db, 'fragments', fragment.id);
    await deleteDoc(fragmentRef);

    const querySnapshot = await getDocs(collection(db, 'fragments'));
    const updated = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFragments(updated);
    setShowModal(false);
    setEditFragment(null);
  };

  const openViewer = (fragment) => {
    setSelectedFragment(fragment);
  };

  const openEditForm = (fragment, index) => {
    setEditFragment(index);
    setShowModal(true);
  };

  return (
    <Container>
      <Header>
        <h2>Fragments</h2>
        <ButtonNew onClick={() => {
          setEditFragment(null);
          setShowModal(true);
        }}>
          + New
        </ButtonNew>
      </Header>

      <FragmentList>
        {fragments.map((frag, i) => (
          <FragmentItem key={frag.id || i}>
            <FragmentHeader>
              <LeftContent>
                <Title>{frag.title}</Title>
                <TagsContainer>
                  {frag.tags?.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </LeftContent>
              <div>
                <EditButton onClick={() => openEditForm(frag, i)}>✏️</EditButton>
                <EyeButton onClick={() => openViewer(frag)}>👁️</EyeButton>
              </div>
            </FragmentHeader>
          </FragmentItem>
        ))}
      </FragmentList>

      {showModal && (
        <FragmentFormModal
          onClose={() => {
            setShowModal(false);
            setEditFragment(null);
          }}
          onSave={handleSave}
          onDelete={editFragment !== null ? () => handleDelete(editFragment) : null}
          initialData={editFragment !== null ? fragments[editFragment] : null}
        />
      )}

      {selectedFragment && (
        <FragmentViewerModal
          fragment={selectedFragment}
          onClose={() => setSelectedFragment(null)}
        />
      )}
    </Container>
  );
}

export default FragmentPage;
