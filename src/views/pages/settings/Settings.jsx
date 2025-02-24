import React from "react";
import Card from "../../../Common/Card/Card";
import styles from "./settings.module.scss";
import add_integration from "../../../images/Setting/add_integration.svg";
import add_archive_user from "../../../images/Setting/add_archive_user.svg";
import my_personal_svg from "../../../images/Setting/my_personal.svg";
import company from "../../../images/Setting/Company.png";

const NewSettings = () => {
  return (
    <div className={styles.container}>
      <Card
        image={company}
        route={"/company-information"}
        text={"Company"}
        infoText={"View and edit company information here."}
      />
      <Card
        image={add_integration}
        route={"/integrations"}
        text={"Integrations"}
        infoText={"Integrate sheets and API's here."}
      />
      <Card
        image={add_integration}
        route={"/intent"}
        text={"Intent Tracking"}
        infoText={"Track pixels and footer links here."}
      />

      <Card
        image={add_archive_user}
        route={"/myprofile"}
        text={"My Profile"}
        infoText={"View and edit personal information here."}
      />
      <Card
        image={add_archive_user}
        route={"/alerts"}
        text={"Alerts"}
        infoText={"Manage custom alerts here."}
      />
    </div>
  );
};

export default NewSettings;
