import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from "./CreateVideo.module.scss";

const CreateVideo = () => {
  const navigationItems = [
    { text: "Template", route: "/CreateTemplate" },
    { text: "New Video Template", route: "/createtemplate&Video" },
  ];

  const initialOptions = ["Image", "Video", "Static URL", "Dynamic URL"];

  return (
    <div className={styles.wrapper}>
      <DynamicNavigator items={navigationItems} />
      <div className={styles.container}>
        <div className={styles.leftComponent}>
          <CategoryForm />
        </div>
        <div className={styles.rightComponent}>
          <SectionArea initialOptions={initialOptions} />
        </div>
      </div>
    </div>
  );
};

export default CreateVideo;
