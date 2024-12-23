import styles from './sheet-details.module.scss'

const SheetDetails = (props) => {

    const displayNames = {
        title: "Title",
        field_count: "Field Count",
        created_at: "Connected",
        total_records: "Total Records",
        recent: "Recent",
        fetch_url: "Fetch URL",
        fetch_days: "New Records Each",
    };
    
    const truncateUrl = (url) => {
        const maxLength = 15;
        if (url.length <= maxLength * 2) {
            return url;
        }
        return `${url.substring(0, maxLength)}.....${url.substring(url.length - maxLength)}`;
    };

    const renderValue = (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (key === "created_at" || key === "updated_at") {
                return new Date(value).toLocaleString(); 
            }
            return JSON.stringify(value);
        }
        return value; 
    };
    
    const viewData = props.viewData || {};

    const filteredData = Object.entries(viewData).filter(([key]) => displayNames[key]);

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>Sheet Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map(([key, value]) => (
                        <tr className={styles.row} key={key}>
                            <td className={styles.column}>
                                <p className={styles.title}>
                                    {displayNames[key] || key}
                                </p>
                            </td>
                            <td className={styles.column}>
                                <p className={styles.value}>
                                    {key === "fetch_url" ? (
                                        <a href={value} target="_blank" rel="noopener noreferrer">
                                            {truncateUrl(value)} 
                                        </a>
                                    ) : (
                                        renderValue(key, value) 
                                    )}
                                </p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.tableHeader}>Sheet Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={styles.dropwdrownrow}>
                        <td className={styles.column}>
                            <p className={styles.title}>Select Sheet Type</p>
                            <select className={styles.dropdown} disabled>
                                <option value={viewData.sheet_type}>{viewData.sheet_type || "N/A"}</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SheetDetails;