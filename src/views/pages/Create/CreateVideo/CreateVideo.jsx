import CategoryForm from "./CategoryForm/CategoryForm";
import SectionArea from "./SectionArea/SectionArea";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from "./CreateVideo.module.scss";
import ImageUpload from "./CategoryForm/ImageUpload/ImageUpload";

const CreateVideo = () => {
  const navigationItems = [
    { text: "Template", route: "/CreateTemplate" },
    { text: "New Video Template", route: "/createtemplate&Video" },
  ];

  const categories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: 3, name: "Category 3" },
  ];

  const initialOptions = ["Image", "Video", "Static URL", "Dynamic URL"];

  return (
    <>
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
      <ImageUpload
        categories={categories}
        onSave={() => console.log("Save data:")}
      />
    </>
  );
};

export default CreateVideo;
