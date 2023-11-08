import { useState } from 'react'
import styles from './CreateNotesModal.module.css'

const CreateNotesModal = ({ setOpenModal, groups, setGroups, setGroupDetails }) => {
  const [error, setError] = useState({ title: false, colour: false });
  const [details, setDetails] = useState({ title: '', id: '', acronymn: '', colour: '', });

  const changeTitle = (e) => {
    setDetails(prev => ({ ...prev, title: String(e.target.value).trim() }));
    setError(prev => ({ ...prev, title: false }));
  }

  const colorPicker = (e, colour) => {
    const parent = e.target.parentElement;
    const allColors = parent.children;
    for (const colorBtn of allColors) {
      colorBtn.classList.remove(`${styles['add-border']}`);
    }
    const colorBtn = e.target.classList;
    colorBtn.add(`${styles['add-border']}`);
    setDetails(prev => ({ ...prev, colour }));
    setError(prev => ({ ...prev, colour: false }));
  }

  const createGroup = () => {
    let validationFlag = true;
    if (!details.title) {
      setError(prev => ({ ...prev, title: true }));
      validationFlag = false;
    }
    if (!details.colour) {
      setError(prev => ({ ...prev, colour: true }));
      validationFlag = false;
    }
    if (validationFlag) {

      // for acronymn
      const title = details.title;
      const titleArray = title.split(' ');
      let acronymn;
      if (titleArray.length === 1)
        acronymn = titleArray[0].charAt(0).toUpperCase();
      else
        acronymn = titleArray[0].charAt(0).toUpperCase() + titleArray[1].charAt(0).toUpperCase();

      details.acronymn = acronymn;

      setGroups(prev => {
        if (prev.length) details.id = prev[prev.length - 1]['id'] + 1;
        else details.id = 0;
        return ([...prev, details])
      });
      setDetails(details);
      setGroupDetails(prev => ({ ...prev, ...details }));
      setOpenModal(false);
      localStorage.setItem('notes-group-metadata', JSON.stringify([...groups, details]));
    }
  }

  return (
    <div className={styles['group-options']}>
      <div className={styles.overlay} onClick={() => setOpenModal(false)}></div>
      <div className={styles.container}>
        <h3>Create New Notes Group</h3>
        <div className={styles['options']}>
          <p className={styles['group-name']}>Group Name</p>
          <div className={`${styles['input-section']} ${styles['input-error']} ${error.title && styles['add-margin']}`}>
            <input type='text' placeholder='Enter notes group name'
              onChange={(e) => changeTitle(e)} />
            {error.title && <p className={styles['error-msg']}>Please enter a valid name</p>}
          </div>
        </div>
        <div className={styles['options']}>
          <p className={styles['group-color']}>Choose Color</p>
          <div className={`${styles['input-error']} ${error.colour && styles['add-margin']}`}>
            <div className={styles['color-circles']}>
              <div className={`${styles.circle} ${styles.violet}`} onClick={(e) => colorPicker(e, 'var(--violet)')}></div>
              <div className={`${styles.circle} ${styles.pink}`} onClick={(e) => colorPicker(e, 'var(--pink)')}></div>
              <div className={`${styles.circle} ${styles.teal}`} onClick={(e) => colorPicker(e, 'var(--teal)')}></div>
              <div className={`${styles.circle} ${styles.orange}`} onClick={(e) => colorPicker(e, 'var(--orange)')}></div>
              <div className={`${styles.circle} ${styles['blue-dark']}`} onClick={(e) => colorPicker(e, 'var(--dark-blue')}></div>
              <div className={`${styles.circle} ${styles['blue-fade']}`} onClick={(e) => colorPicker(e, 'var(--fade-blue')}></div>
            </div>
            {error.colour && <p className={`${styles['error-msg']} ${styles['color-error']}`}>Please select a colour</p>}
          </div>
        </div>
        <button onClick={createGroup}>Create</button>
      </div>
    </div>
  )
}

export default CreateNotesModal
