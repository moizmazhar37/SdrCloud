import React, { useState, useEffect } from "react";
import useGetStatus from "./Hooks/useGetDomainStatus";
import Domains from "./Domains";
import RegisteredDomain from "./RegisteredDomain/RegisteredDomain";
import DynamicNavigator from "src/Common/DynamicNavigator/DynamicNavigator";
import Loader from "src/Common/Loader/Loader";
import styles from "./DomainContianer.module.scss";

const DomainContainer = () => {
  const { data, loading, error } = useGetStatus();
  const [showDomains, setShowDomains] = useState(false);
  const [initialStep, setInitialStep] = useState(1);
  const [domain, setDomain] = useState("");

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Domains", route: "/domains" },
  ];

  useEffect(() => {
    if (!loading && data) {
      if (data.domain && data.is_authenticated) {
        // Domain exists and is authenticated - show RegisteredDomain
        setDomain(data.domain);
        setShowDomains(false);
      } else if (data.domain && !data.is_authenticated) {
        // Domain exists but not authenticated - show step 2 of Domains
        setDomain(data.domain);
        setShowDomains(true);
        setInitialStep(2);
      } else {
        // No domain - show step 1 of Domains
        setShowDomains(true);
        setInitialStep(1);
      }
    } else if (!loading && !data) {
      // No data - show step 1 of Domains
      setShowDomains(true);
      setInitialStep(1);
    }
  }, [data, loading]);

  const handleDelete = () => {
    setDomain("");
    setShowDomains(true);
    setInitialStep(1);
  };

  if (loading)
    return (
      <div className={styles.loader}>
        <Loader />
      </div>
    );

  return (
    <>
      <DynamicNavigator items={navs} />
      <div>
        {showDomains ? (
          <Domains initialStep={initialStep} existingDomain={domain} />
        ) : (
          <RegisteredDomain domain={domain} onDelete={handleDelete} />
        )}
      </div>
    </>
  );
};

export default DomainContainer;
