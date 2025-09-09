import settings_vector from "src/images/Email/setting_vector.png";
import configuration from "src/images/Email/configuration.png";
import styles from "./Header.module.scss";

const Header = ({ activeStep = 1 }) => {
  const steps = [
    {
      id: 1,
      icon: settings_vector,
      alt: "Settings",
      text: "Settings",
    },
    {
      id: 2,
      icon: settings_vector,
      alt: "Email Setup",
      text: "Email Setup",
    },
    {
      id: 3,
      icon: configuration,
      alt: "Setup Configuration",
      text: "Setup Configuration",
    },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.stepContainer}>
        {steps.map((step, index) => (
          <>
            {/* Step */}
            <div
              key={step.id}
              className={`${styles.step} ${
                activeStep === step.id ? styles.active : ""
              }`}
            >
              <div className={styles.iconWrapper}>
                <img src={step.icon} alt={step.alt} className={styles.icon} />
              </div>
              <span className={styles.stepText}>{step.text}</span>
            </div>

            {/* Connector Line (don't render after last step) */}
            {index < steps.length - 1 && (
              <div
                className={`${styles.connector} ${
                  activeStep === step.id + 1 ? styles.completed : ""
                }`}
              ></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Header;
