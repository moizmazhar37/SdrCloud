import React from "react";
import styles from "./HighlightBanner.module.scss";

const HighlightBanner = ({ bannerData }) => {
    if (!bannerData?.values.scroll || !bannerData?.values.banner_text) return null;

    return (
        <div 
            className={styles.banner} 
            style={{ backgroundColor: bannerData.values.banner_color }}
        >
            <div className={styles.bannerTextWrapper}>
                {/* Repeating text infinitely */}
                <div className={styles.bannerText}>
                    {[...Array(20)].map((_, i) => (
                        <span 
                            key={i}
                            style={{ 
                                color: bannerData.values.banner_text_color, 
                                fontSize: `${bannerData.values.banner_text_size}px`
                            }}
                        >
                            {bannerData.values.banner_text} &nbsp; • &nbsp;
                        </span>
                    ))}
                </div>
                <div className={styles.bannerText}>
                    {[...Array(20)].map((_, i) => (
                        <span 
                            key={i}
                            style={{ 
                                color: bannerData.values.banner_text_color, 
                                fontSize: `${bannerData.values.banner_text_size}px`
                            }}
                        >
                            {bannerData.values.banner_text} &nbsp; • &nbsp;
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HighlightBanner;
