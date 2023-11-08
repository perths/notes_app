import styles from './CreateNotes.module.css'
import CreateNotesModal from './CreateNotesModal';

const CreateNotes = ({ openModal, setOpenModal, groups, setGroups, setGroupDetails }) => {

  return (
    <section className={styles["create-notes"]}>
      <h2 className={styles.title}>Pocket Notes</h2>
      <button className={styles["create-group-btn"]} onClick={() => setOpenModal(true)}>
        <span id="plus-icon">+</span>
        <span>Create Notes Group</span>
      </button>
      {openModal &&
        <CreateNotesModal
          setOpenModal={setOpenModal}
          groups={groups}
          setGroups={setGroups}
          setGroupDetails={setGroupDetails}
        />
      }
    </section>
  )
}

export default CreateNotes
