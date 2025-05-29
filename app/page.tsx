import Link from "next/link";
import styles from "./css/landing.module.css";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

export default function Home() {
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const m = new Date(); // get the current date
  let name = month[m.getMonth()]; // get the name of the current month

  return (
    <div className={styles.container}>
      <h1 className={styles.text}><span className={styles.color1}>Check</span><span className={styles.color2}>mate</span> <CheckBoxIcon className={styles.icon}/></h1>
      <Link href={`/productivity/${name}`} className={styles.link}>Get started</Link>
    </div>
  );
}
