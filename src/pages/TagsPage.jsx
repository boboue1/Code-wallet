import { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import db from '../firebase';
import TagEditModal from '../components/TagEditModal';
import * as S from '../styles/TagsPage';

export default function TagsPage() {
  // Liste des tags uniques extraits des fragments
  const [tags, setTags] = useState([]);

  // Liste complète des fragments récupérés depuis Firestore
  const [fragments, setFragments] = useState([]);

  // Contrôle l'ouverture ou fermeture de la modale d'édition/création de tag
  const [modalOpen, setModalOpen] = useState(false);

  // Tag actuellement sélectionné pour édition
  const [currentTag, setCurrentTag] = useState('');

  // Indique si on est en mode création d’un nouveau tag
  const [isNew, setIsNew] = useState(false);

  // Au montage du composant, récupère tous les fragments et extrait les tags uniques
  useEffect(() => {
    const fetchFragments = async () => {
      const querySnapshot = await getDocs(collection(db, 'fragments'));

      // Récupère tous les fragments avec leur id
      const allFragments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Extrait tous les tags et retire les doublons
      const extractedTags = allFragments.flatMap(frag => frag.tags || []);
      const uniqueTags = [...new Set(extractedTags)];

      setFragments(allFragments);
      setTags(uniqueTags);
    };

    fetchFragments(); // Appelle la fonction de récupération
  }, []);

  // Ouvre la modale pour modifier un tag existant
  const openModalForTag = (tag) => {
    setCurrentTag(tag);
    setIsNew(false);
    setModalOpen(true);
  };

  // Ouvre la modale pour créer un nouveau tag
  const openModalForNewTag = () => {
    setCurrentTag('');
    setIsNew(true);
    setModalOpen(true);
  };

  // Ferme la modale et réinitialise l’état
  const closeModal = () => {
    setModalOpen(false);
    setCurrentTag('');
    setIsNew(false);
  };

  // Enregistre un nouveau tag ou modifie un tag existant
  const handleSave = async (oldTag, newTag) => {
    const trimmedNewTag = newTag.trim();

    // Vérifie que le tag n'est pas vide
    if (!trimmedNewTag) {
      alert('Tag cannot be empty.');
      return false;
    }

    if (isNew) {
      // Création : refuse si le tag existe déjà
      if (tags.includes(trimmedNewTag)) {
        alert('This tag already exists.');
        return false;
      }

      // Les tags ne sont créés que via leur association à un fragment
      alert("To create a tag, please add it to at least one fragment.");
      return false;
    } else {
      // Modification : vérifie que le nouveau nom ne duplique pas un autre tag
      if (trimmedNewTag !== oldTag && tags.includes(trimmedNewTag)) {
        alert('This tag already exists.');
        return false;
      }

      try {
        // Met à jour tous les fragments contenant l’ancien tag
        const updatedFragments = fragments.filter(frag => frag.tags?.includes(oldTag));
        await Promise.all(
          updatedFragments.map(frag => {
            const newTags = frag.tags.map(t => (t === oldTag ? trimmedNewTag : t));
            return updateDoc(doc(db, 'fragments', frag.id), { tags: newTags });
          })
        );

        // Met à jour la liste des tags côté client
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

  // Supprime un tag de tous les fragments où il apparaît
  const handleDelete = async (tagToDelete) => {
    if (!window.confirm(`Are you sure you want to delete the tag "${tagToDelete}" from all fragments?`)) {
      return false;
    }

    try {
      // Trouve tous les fragments contenant le tag à supprimer
      const updatedFragments = fragments.filter(frag => frag.tags?.includes(tagToDelete));
      await Promise.all(
        updatedFragments.map(frag => {
          const newTags = frag.tags.filter(t => t !== tagToDelete);
          return updateDoc(doc(db, 'fragments', frag.id), { tags: newTags });
        })
      );

      // Met à jour la liste des tags localement
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
      {/* En-tête avec titre et bouton pour créer un nouveau tag */}
      <S.Header>
        <h2>Tags</h2>
        <S.ButtonNew onClick={openModalForNewTag}>
          + New Tag
        </S.ButtonNew>
      </S.Header>

      <p>Filter and manage all tags used in your code fragments.</p>

      {/* Liste des tags ou message si aucun tag trouvé */}
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

      {/* Modale d'édition / création d’un tag */}
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

