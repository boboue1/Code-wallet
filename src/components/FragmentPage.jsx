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
  // État local pour stocker la liste des fragments de code
  const [fragments, setFragments] = useState([]);

  // Contrôle l’affichage du formulaire (modale)
  const [showModal, setShowModal] = useState(false);

  // Fragment actuellement sélectionné pour l’affichage dans la modale de visualisation
  const [selectedFragment, setSelectedFragment] = useState(null);

  // Index du fragment en cours d’édition (null si ajout d’un nouveau)
  const [editFragment, setEditFragment] = useState(null);

  // Récupère les fragments depuis Firestore au chargement initial de la page
  useEffect(() => {
    const fetchFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));
      const loadedFragments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFragments(loadedFragments); // Met à jour l'état avec les fragments récupérés
    };

    fetchFragments(); // Appelle la fonction de récupération
  }, []);

  // Enregistre un nouveau fragment ou met à jour un fragment existant
  const handleSave = async (newFragment) => {
    if (editFragment !== null) {
      // Mise à jour d’un fragment existant
      const fragmentRef = doc(db, 'fragments', fragments[editFragment].id);
      await updateDoc(fragmentRef, newFragment);
    } else {
      // Ajout d’un nouveau fragment
      await addDoc(collection(db, 'fragments'), newFragment);
    }

    // Recharge tous les fragments après modification
    const querySnapshot = await getDocs(collection(db, 'fragments'));
    const updated = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFragments(updated);

    // Ferme la modale et réinitialise l’état d’édition
    setShowModal(false);
    setEditFragment(null);
  };

  // Supprime un fragment à partir de son index
  const handleDelete = async (indexToDelete) => {
    const fragment = fragments[indexToDelete];
    const fragmentRef = doc(db, 'fragments', fragment.id);
    await deleteDoc(fragmentRef);

    // Recharge la liste des fragments après suppression
    const querySnapshot = await getDocs(collection(db, 'fragments'));
    const updated = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFragments(updated);

    // Ferme la modale et réinitialise l’état d’édition
    setShowModal(false);
    setEditFragment(null);
  };

  // Ouvre la modale de visualisation du fragment
  const openViewer = (fragment) => {
    setSelectedFragment(fragment);
  };

  // Ouvre la modale de formulaire pour l’édition d’un fragment
  const openEditForm = (fragment, index) => {
    setEditFragment(index);
    setShowModal(true);
  };

  return (
    <Container>
      {/* En-tête avec le titre de la page et le bouton "New" */}
      <Header>
        <h2>Fragments</h2>
        <ButtonNew onClick={() => {
          setEditFragment(null); // Réinitialise l’édition pour ajouter un nouveau
          setShowModal(true);   // Affiche la modale
        }}>
          + New
        </ButtonNew>
      </Header>

      {/* Liste des fragments affichés dans des cartes */}
      <FragmentList>
        {fragments.map((frag, i) => (
          <FragmentItem key={frag.id || i}>
            <FragmentHeader>
              {/* Partie gauche avec le titre et les tags */}
              <LeftContent>
                <Title>{frag.title}</Title>
                <TagsContainer>
                  {frag.tags?.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </LeftContent>

              {/* Boutons d’action (éditer / voir) */}
              <div>
                <EditButton onClick={() => openEditForm(frag, i)}>✏️</EditButton>
                <EyeButton onClick={() => openViewer(frag)}>👁️</EyeButton>
              </div>
            </FragmentHeader>
          </FragmentItem>
        ))}
      </FragmentList>

      {/* Modale de création ou édition de fragment */}
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

      {/* Modale de visualisation d’un fragment sélectionné */}
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

