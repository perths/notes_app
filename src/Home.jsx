import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import CreateNotes from './components/createNotes/CreateNotes'
import Notes from './components/notes/Notes'
import NotesGroup from './components/notes/NotesGroup'
import AppInfo from './components/appInfo/AppInfo'

const Home = () => {
  
  const [openModal, setOpenModal] = useState(false);
  const [openNote, setNoteOpen] = useState(false);
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes-data")) || []);
  const [groupID, setGroupID] = useState(null);
  const [groups, setGroups] = useState(JSON.parse(localStorage.getItem("notes-group-metadata")) || []);
  const [groupDetails, setGroupDetails] = useState({ colour: '', title: '', acronymn: '', id: '', background: false }); 

  useEffect(() => {
    setGroupDetails(prev => ({ ...prev, background: false }));
  }, []);

  return (
    <main className={styles["main-app"]}>
      <div className={styles["mobile-view"]}>
        {!openNote ?
          <>
            <CreateNotes
              openModal={openModal}
              groups={groups}
              setOpenModal={setOpenModal}
              setGroups={setGroups}
              setGroupDetails={setGroupDetails}
            />
            <NotesGroup
              groups={groups}
              setNoteOpen={setNoteOpen}
              setGroupDetails={setGroupDetails}
              setGroupID={setGroupID}
            />
          </> :
          <Notes
            notes={notes}
            groupID={groupID}
            groups={groups}
            groupDetails={groupDetails}
            setNoteOpen={setNoteOpen}
            setNotes={setNotes}
          />}
      </div>
      <div className={styles["desktop-view"]}>
        <div className={styles["create-notes"]}>
          <CreateNotes
            openModal={openModal}
            groups={groups}
            setOpenModal={setOpenModal}
            setGroups={setGroups}
            setGroupDetails={setGroupDetails} />
          <NotesGroup
            groups={groups}
            setNoteOpen={setNoteOpen}
            setGroupDetails={setGroupDetails}
            setGroupID={setGroupID}
          />
        </div>
        <div className={styles["notes"]}>
          {openNote ?
            <Notes
              notes={notes}
              groupID={groupID}
              groups={groups}
              groupDetails={groupDetails}
              setNoteOpen={setNoteOpen}
              setNotes={setNotes}
            />
            :
            <AppInfo />
          }
        </div>
      </div>
    </main>
  )
}

export default Home
