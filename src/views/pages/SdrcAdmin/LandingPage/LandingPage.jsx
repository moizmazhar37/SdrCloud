import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "src/Common/Loader/Loader";
import useGetSdrcAdminTenants from "./Hooks/useGetSdrcAdminTenants";

const LandingPage = () => {
  const history = useHistory();
  const { data, loading, error } = useGetSdrcAdminTenants();

  const handleCompanyClick = (companyId) => {
    localStorage.setItem("tenant_id", companyId);
    history.push(`/sdrc-tenant-insights`);
  };

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader size={160} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>My Companies</h1>
        <div className={styles.subtitle}>
          <span className={styles.subtitleText}>
            Click a company to see insights
          </span>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {data && data.length > 0 ? (
          data.map((company) => (
            <div
              key={company.id}
              className={styles.companyCard}
              onClick={() => handleCompanyClick(company.id)}
            >
              <div className={styles.logoContainer}>
                {company.account_logo ? (
                  <img
                    src={company.account_logo}
                    alt={`${company.compnay_name} logo`}
                    className={styles.companyLogo}
                  />
                ) : (
                  <div className={styles.noLogo}>
                    {company.compnay_name.charAt(0)}
                  </div>
                )}
              </div>

              <div className={styles.companyInfo}>
                <h2 className={styles.companyName}>{company.compnay_name}</h2>
                <div className={styles.companyMeta}></div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noData}>No companies found</div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default LandingPage;
