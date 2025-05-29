import styles from "./css/landing.module.css";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Home() {

  return (
    <div className={styles.container}>
      <h1 className={styles.text}><span className={styles.color1}>Check</span><span className={styles.color2}>mate</span> <CheckBoxIcon className={styles.icon}/></h1>
      <a href="/productivity/january" className={styles.link}>Get started</a>
    </div>
  );
}
