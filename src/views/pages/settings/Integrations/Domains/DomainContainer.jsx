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
  const [domain, setDomain] = useState("");

  const navs = [
    { text: "Settings", route: "/settings" },
    { text: "Integration", route: "/integrations" },
    { text: "Domains", route: "/domains" },
  ];

  useEffect(() => {
    if (!loading && data?.domain) {
      setDomain(data.domain);
      setShowDomains(false);
    } else if (!loading) {
      setShowDomains(true);
    }
  }, [data, loading]);

  const handleDelete = () => {
    setDomain("");
    setShowDomains(true);
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
          <Domains />
        ) : (
          <RegisteredDomain domain={domain} onDelete={handleDelete} />
        )}
      </div>
    </>
  );
};

export default DomainContainer;
