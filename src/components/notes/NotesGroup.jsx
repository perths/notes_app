import styles from './NotesGroup.module.css';

const initGroups = ({ group, groups, setNoteOpen, setGroupDetails, groupID, setGroupID }) => {
  const getHeaderAndIcon = (group) => {
    setGroupDetails(prev => ({ ...prev, title: group.title, colour: group.colour, acronymn: group.acronymn, id: group.id, background: true }));
    if (group) {
      group.background = true;
    }

    for (let i = 0; i <= groups.length; i++) {
      if (i !== groupID) {
        if (groups[i]) {
          groups[i].background = false;
        }
      }
    }
    setNoteOpen(true)
  }

  return (
    <section onClick={() => setGroupID(groupID)}>
      <div className={`${styles["open-note"]} ${group.background && styles["add-background"]}`} onClick={() => getHeaderAndIcon(group)}>
        <p className={styles.groupIcon} style={{ backgroundColor: `${group.colour}` }}>
          {group.acronymn}
        </p>
        <p className={styles.note}>{group.title}</p>
      </div>
    </section>
  )
}

const NotesGroup = ({ groups, setNoteOpen, setGroupDetails, setGroupID }) => {
  let allGroups = '';
  if (groups) {
    allGroups = groups.map((group, index) => (
      initGroups({ group, groups, setNoteOpen, setGroupDetails, groupID: index, setGroupID })
    ))
  }
  return (
    <div className={styles["all-notes"]}>
      {allGroups}
    </div>
  )
}

export default NotesGroup
