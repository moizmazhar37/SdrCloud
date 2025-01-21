import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from "./intent-tracking.module.scss";
import FooterLinks from "./FooterLinks";
import TrackingPixels from "./TrackingPixels";


const IntentTracking = () => {
  const navigationItems = [
    { text: "Settings", route: "/settings" },
    { text: "Footer Links", route: "/intent" },
  ];
  return (
    <div className={styles.wrapper}>
            <DynamicNavigator items={navigationItems} />
            <div className={styles.container}>
                <div className={styles.leftComponent}>
                    <FooterLinks />
                </div>
                <div className={styles.rightComponent}>
                    <TrackingPixels />
                </div>
            </div>
        </div>
  );
};


export default IntentTracking;