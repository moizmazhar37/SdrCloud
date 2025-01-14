import React from "react";
import Card from "../../../Common/Card/Card";
import styles from "./settings.module.scss";
import add_integration from "../../../images/Setting/add_integration.svg";
import add_archive_user from "../../../images/Setting/add_archive_user.svg";
import CategoryModal from "../Create/CreateVideo/CategoryModal/CategoryModal";
import company from "../../../images/Setting/Company.png";

const NewSettings = () => {
  return (
    <>
      <div className={styles.container}>
        <Card image={company} route={"/company-information"} text={"Company"} />
        <Card
          image={add_integration}
          route={"/integrations"}
          text={"Integrations"}
        />
        <Card
          image={add_integration}
          route={"/intent"}
          text={"Intent Tracking"}
        />

        <Card
          image={add_archive_user}
          route={"/myprofile"}
          text={"My Profile"}
        />
      </div>
      <CategoryModal isOpen={true} />
    </>
  );
};

export default NewSettings;
