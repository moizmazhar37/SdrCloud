import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Dropdown from "src/Common/Dropdown/Dropdown";
import FiltersDropdown from 'src/Common/FiltersDropdown/FiltersDropdown';
import styles from './Graph.module.scss';

const Graph = ({ 
  data, 
  title, 
  dropdownOptions, 
  selectedOption, 
  type 
}) => {
  return (
    <div className={styles.graphContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {/* Conditionally render the Dropdown or FiltersDropdown */}
        {type === 'filters' ? (
          <FiltersDropdown 
            options={dropdownOptions}
            className={styles.dropdown}
          />
        ) : (
          <Dropdown 
            options={dropdownOptions}
            buttonText={selectedOption || "Monthly"} 
            className={styles.dropdown}
          />
        )}
      </div>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ backgroundColor: '#FF9466' }}></span>
          <span>HVO</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendDot} style={{ backgroundColor: '#4C6FFF' }}></span>
          <span>Videos</span>
        </div>
      </div>
      <div className={styles.chartWrapper}>
        <AreaChart
          width={800}
          height={400}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="hvoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF9466" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#FF9466" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="videoGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4C6FFF" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#4C6FFF" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8E8E8E' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#8E8E8E' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          />
          <Area
            type="monotone"
            dataKey="hvo"
            stroke="#FF9466"
            fill="url(#hvoGradient)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="videos"
            stroke="#4C6FFF"
            fill="url(#videoGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default Graph;
