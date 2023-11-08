import peopleImage from './../../assets/people.png'
import lockImage from './../../assets/lock.png'
import styles from './AppInfo.module.css'

const HeroSection = () => {
  return (
    <div className={styles["hero-section"]}>
      <img src={peopleImage} alt="People" />
      <div className={styles["text-section"]}>
        <h2>Pocket Notes</h2>
        <p>Send and receive messages without keeping your phone online. Use Pocket Notes on up to 4 linked devices and 1 mobile phone. </p>
      </div>

      <div className={styles.watermark}>
        <img src={lockImage} alt="Lock" />
        <p>End-to-End Encrypted</p>
      </div>
    </div>
  )
}

export default HeroSection
