import CategoryForm from "src/Common/CategoryForm/CategoryForm";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import styles from './CreateVideo.module.scss';

const CreateVideo = () => {

    const navigationItems = [
        { text: "Template", route: "/CreateTemplate" },
        { text: "New Video Template", route: "/createtemplate&Video" },
    ];
    
    return (
        <div className={styles.wrapper}>
            <DynamicNavigator items={navigationItems} />
            <div className={styles.container}>
                <div className={styles.leftComponent}>
                    <CategoryForm />
                </div>
                <div className={styles.rightComponent}>
                    {/* Left component can be a sidebar or similar */}
                    <h1>Section form here</h1>
                </div>
            </div>
        </div>
    );
}

export default CreateVideo;