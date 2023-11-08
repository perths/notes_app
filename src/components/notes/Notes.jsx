import { useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useRef } from 'react'
import styles from './Notes.module.css'
import BackArrow from './../../assets/back-arrow.png'
import SendIcon from './../../assets/send.png'

const Notes = ({ groups, groupDetails, setNoteOpen, notes, setNotes, groupID }) => {
  const [note, setNote] = useState({ groupID: null, data: { date: '', time: '', content: '' } });
  const textInputRef = useRef(null);

  useEffect(() => {
    setNotes(prev => ([...prev, note]));
    const allNotes = [...notes, note];
    localStorage.setItem("notes-data", JSON.stringify(allNotes));
  }, [note]);


  const setDateTime = () => {
    const dateObj = new Date();
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const date = `${day} ${month} ${year}`;

    const dateTime = dateObj.toLocaleDateString('default', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const time = (dateTime.split(','))[1];
    setNote(prev => ({ ...prev, data: { ...prev.data, date, time } }));

  }

  const addNote = (e, clickEvent) => {
    let text = null;

    if (clickEvent) {
      text = textInputRef.current.value;
      textInputRef.current.value = '';
    } else if (e.key === 'Enter') {
      text = e.target.value;
      e.target.value = '';
    }
    let value = text ? text.trim() : null;
    if (value) {
      setNote(prev => ({ ...prev, groupID, data: { ...prev.data, content: value } }));
      setDateTime();
    }
  }

  const backButtonOp = () => {
    setNoteOpen(false);
    for (const group of groups) {
      group.background = false;
    }
  }

  const filteredNotes = useMemo(() => {
    return notes?.filter(note => note.groupID === groupID);
  }, [notes, groupID]);


  const displayNotes = filteredNotes?.map((note, index) => (
    <div key={index} className={styles.note}>
      <div className={styles.date}>
        <p>{note?.data.time}</p>
        <p>{note?.data.date}</p>
      </div>
      <div className={styles.text}>
        <p>{note?.data.content}</p>
      </div>
    </div>
  ))

  return (
    <div className={styles.notes}>
      <div className={styles["open-note"]}>
        <div className={styles["arrow-box"]}>
          <img src={BackArrow} alt="Go Back" onClick={backButtonOp} />
        </div>
        <p className={styles.groupIcon} style={{ backgroundColor: `${groupDetails?.colour}` }}>
          {groupDetails?.acronymn}
        </p>
        <p className={styles["note-heading"]}>{groupDetails?.title}</p>
      </div>
      <div className={styles["main-content"]}>
        {displayNotes}
      </div>
      <div className={styles["write-note"]}>
        <input placeholder='Enter your text here...' ref={textInputRef} onKeyDown={(e) => addNote(e, false)}></input>
        <img src={SendIcon} alt="Send" className={styles.send} onClick={(e) => addNote(e, true)} />
      </div>
    </div>
  )
}

export default Notes
