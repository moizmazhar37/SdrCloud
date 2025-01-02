import React from 'react';
import LeadsFilter from './LeadsFilter/LeadsFilter';
import styles from './LeadsGraph.module.scss';

const LeadsGraph = ({ data = [], timeframeOptions = [], websiteOptions = [] }) => {
  const getMaxValue = () => {
    return Math.max(...data.map(item => item.lead));
  };

  const maxValue = getMaxValue();
  const yAxisValues = [0, 1000, 5000];

  return (
    <div className={styles.leadsGraphContainer}>
      <div className={styles.header}>
        <h2>Leads</h2>
        <div className={styles.filterContainer}>
          <LeadsFilter
            timeframeOptions={timeframeOptions}
            websiteOptions={websiteOptions}
          />
        </div>
      </div>
      
      <div className={styles.graphOuterWrapper}>
        <div className={styles.graphWrapper}>
          <div className={styles.yAxis}>
            {yAxisValues.map((value) => (
              <div key={value} className={styles.yAxisLabel}>
                {value}
              </div>
            ))}
          </div>
          
          <div className={styles.graphContent}>
            {data.map((item, index) => (
              <div key={index} className={styles.barColumn}>
                <div className={styles.barWrapper}>
                  <div
                    className={styles.barSegment1}
                    style={{
                      height: `${(item.lead / maxValue) * 100}%`
                    }}
                  />
                </div>
                <span className={styles.xAxisLabel}>{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsGraph;