import React, { useState, useEffect } from 'react';
import LeadsFilter from './LeadsFilter/LeadsFilter';
import styles from './LeadsGraph.module.scss';
import useLeads from '../Hooks/useLeads';

const LeadsGraph = ({ timeframeOptions = [], websiteOptions = [] }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');
  const [selectedWebsite, setSelectedWebsite] = useState(websiteOptions[0]?.label || '');

  const getApiTimeframe = (displayTimeframe) => {
    const timeframeMap = {
      'monthly': 'month',
      'yearly': 'year',
      'weekly': 'week'
    };
    return timeframeMap[displayTimeframe.toLowerCase()] || 'month';
  };

  const { leadsData = [], isLoading, isError } = useLeads(
    selectedWebsite, 
    getApiTimeframe(selectedTimeframe)
  );

  const getMaxValue = () => {
    if (!leadsData || !Array.isArray(leadsData) || leadsData.length === 0) return 1000;
    return Math.max(...leadsData.map(item => item.lead)) || 1000;
  };

  const maxValue = getMaxValue();
  const yAxisValues = [0, Math.round(maxValue / 2), maxValue];

  const enhancedTimeframeOptions = timeframeOptions.map(option => ({
    ...option,
    onClick: () => {
      setSelectedTimeframe(option.label);
    }
  }));

  const enhancedWebsiteOptions = websiteOptions.map(option => ({
    ...option,
    onClick: () => {
      setSelectedWebsite(option.label);
    }
  }));

  return (
    <div className={styles.leadsGraphContainer}>
      <div className={styles.header}>
        <h2>Leads</h2>
        <div className={styles.filterContainer}>
          <LeadsFilter
            timeframeOptions={enhancedTimeframeOptions}
            websiteOptions={enhancedWebsiteOptions}
            selectedTimeframe={selectedTimeframe}
            selectedWebsite={selectedWebsite}
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
            {leadsData && Array.isArray(leadsData) && leadsData.map((item, index) => (
              <div key={index} className={styles.barColumn}>
                <div className={styles.barWrapper}>
                  <div
                    className={styles.barSegment1}
                    style={{
                      height: `${(item.lead / maxValue) * 100}%`
                    }}
                  />
                </div>
                <span className={styles.xAxisLabel}>{item.period}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadsGraph;