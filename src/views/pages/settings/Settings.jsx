import React from "react";
import Card from "../../../Common/Card/Card";
import styles from "./settings.module.scss";
import add_integration from "../../../images/Setting/add_integration.svg";
import add_archive_user from "../../../images/Setting/add_archive_user.svg";
import add_intent from "../../../images/Setting/add_intent.png";
import add_email from "../../../images/Setting/add_email.svg";
import add_alerts from "../../../images/Setting/add_alerts.svg";
import company from "../../../images/Setting/Company.png";
import meetings from "src/images/Setting/meetings.png";
import emailSchedule from "src/images/Setting/emailSchedule.png";

const NewSettings = () => {

  const userType = localStorage.getItem("userType");

  return (
    <div className={styles.container}>

      <Card
        image={add_archive_user}
        route={"/myprofile"}
        text={"My Profile"}
        infoText={"View and edit personal information here."}
      />

      {(userType !== "SDRC_ADMIN" && userType !== "ADMIN" && userType !== "SALES_USER") && (
      <Card
          image={add_intent}
          route={"/intent"}
          text={"Intent Tracking"}
          infoText={"Track pixels and footer links here."}
        />
      )}

      {(userType !== "SDRC_ADMIN" && userType !== "ADMIN" && userType !== "SALES_USER" && userType !== "MARKETING_USER") && (
        <>
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
        image={add_alerts}
        route={"/alerts"}
        text={"Alerts"}
        infoText={"Manage custom alerts here."}
      />
      {/* <Card
        image={add_email}
        route={"/book-meeting"}
        text={"Schedule Availability"}
        infoText={"Set meeting slots as per available schedule"}
      /> */}
      <Card
        image={meetings}
        route={"/booked-meetings"}
        text={"Booked Meetings"}
        infoText={"View the currently booked meetings"}
      />
      </>
      )}
    </div>
  );
};

export default NewSettings;
