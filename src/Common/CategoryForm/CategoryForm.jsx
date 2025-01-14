import { useState, useEffect } from 'react';
import styles from './CategoryForm.module.scss';

const CategoryForm = () => {
    const [category, setCategory] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [ingestionSource, setIngestionSource] = useState('');

    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isConnectDisabled, setIsConnectDisabled] = useState(true);

    useEffect(() => {
        setIsSaveDisabled(!(category && templateName));
    }, [category, templateName]);

    useEffect(() => {
        setIsConnectDisabled(!ingestionSource);
    }, [ingestionSource]);

    const handleSave = () => {
        console.log({ category, templateName });
    };

    const handleConnect = () => {
        console.log({ ingestionSource });
    };

    return (
        <div className={styles.container}>
            <div className={styles.formGroup}>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Select Category</option>
                            <option value="category1">Category 1</option>
                            {/* Add your category options here */}
                        </select>
                    </div>
                    <div className={styles.field}>
                        <label>Template Name</label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="text"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                                placeholder="Enter Template Name"
                                className={styles.input}
                            />
                            <button
                                onClick={handleSave}
                                disabled={isSaveDisabled}
                                className={`${styles.button} ${isSaveDisabled ? styles.disabled : ''}`}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Ingestion</label>
                        <div className={styles.inputWithButton}>
                            <select
                                value={ingestionSource}
                                onChange={(e) => setIngestionSource(e.target.value)}
                                className={styles.select}
                            >
                                <option value="">Select Ingestion Source</option>
                                {/* Add your ingestion source options here */}
                            </select>
                            <button
                                onClick={handleConnect}
                                disabled={isConnectDisabled}
                                className={`${styles.button} ${isConnectDisabled ? styles.disabled : ''}`}
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryForm;

