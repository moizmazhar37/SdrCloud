import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={styles.abmFooter}>
      <h2 className={styles.abmTitle}>Your ABM Squad Team</h2>
      <p className={styles.abmSubtitle}>
        Powered By <span className={styles.brand}>Found&amp;Chosen</span>
      </p>

      <div className={styles.teamGrid}>
        <div className={styles.teamMember}>
          <img src="/images/HVO/emma.png" alt="Emma Monro" className={styles.teamImage} />
          <p className={styles.teamName}>Emma Monro</p>
          <p className={styles.teamRole}>Strategy Advisor</p>
        </div>
        <div className={styles.teamMember}>
          <img src="/images/HVO/lindsey.png" alt="Lindsey Light" className={styles.teamImage} />
          <p className={styles.teamName}>Lindsey Light</p>
          <p className={styles.teamRole}>Campaign Manager</p>
        </div>
        <div className={styles.teamMember}>
          <img src="/images/HVO/ivy.png" alt="Ivy Verallo" className={styles.teamImage} />
          <p className={styles.teamName}>Ivy Verallo</p>
          <p className={styles.teamRole}>Data Manager</p>
        </div>
        <div className={styles.teamMember}>
          <img src="/images/HVO/arpit.png" alt="Arpit Srivastava" className={styles.teamImage} />
          <p className={styles.teamName}>Arpit Srivastava</p>
          <p className={styles.teamRole}>Graphic Designer</p>
        </div>
        <div className={styles.teamMember}>
          <img src="/images/HVO/manish.png" alt="Manish Parasher" className={styles.teamImage} />
          <p className={styles.teamName}>Manish Parasher</p>
          <p className={styles.teamRole}>Paid Media Manager</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
