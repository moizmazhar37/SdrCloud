import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import styles from './dynamicNavigator.module.scss';

const DynamicNavigator = ({ items }) => {
  const history = useHistory();

  const handleBackClick = () => {
    if (items.length >= 2) {
      history.push(items[items.length - 2].route);
    }
  };

  const handleClick = (route) => {
    history.push(route);
  };

  return (
    <div className={styles.navigator}>
      {items.length >= 2 && (
        <FontAwesomeIcon
          icon={faArrowLeft}
          className={styles.backArrow}
          onClick={handleBackClick}
        />
      )}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`${styles.navItem} ${
              index === items.length - 1 ? styles.lastItem : ''
            }`}
            onClick={() => handleClick(item.route)}
          >
            {item.text}
          </span>
          {index < items.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default DynamicNavigator;