import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Dropdown from "src/Common/Dropdown/Dropdown";
import FiltersDropdown from 'src/Common/FiltersDropdown/FiltersDropdown';
import styles from './Graph.module.scss';

const Graph = ({ data, title, dropdownOptions, selectedOption, type, setIsViewed }) => {
  const renderDropdown = () => {
    if (type === 'filters') {
      return (
        <FiltersDropdown
          options={dropdownOptions}
          className={styles.dropdown}
          setIsViewed={setIsViewed}
        />
      );
    }
    
    return (
      <Dropdown
        options={dropdownOptions}
        buttonText={selectedOption || "Monthly"}
        className={styles.dropdown}
      />
    );
  };

  return (
    <div className={styles.graphCard}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {renderDropdown()}
      </div>
      <div className={styles.graphContainer}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              dx={-10}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}
              itemStyle={{ color: '#1F2937' }}
            />
            <Area
              type="monotone"
              dataKey="hvo"
              stroke="#F97316"
              fill="#FFEDD5"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="videos"
              stroke="#1D4ED8"
              fill="#DBEAFE"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;