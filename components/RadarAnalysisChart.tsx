import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { SelectedElements } from '../types';
import { DIMENSION_LABELS } from '../constants';

interface RadarAnalysisChartProps {
  selectedData: SelectedElements;
  color: string;
  name: string;
}

const RadarAnalysisChart: React.FC<RadarAnalysisChartProps> = ({ selectedData, color, name }) => {
  const chartData = useMemo(() => {
    return Object.entries(selectedData).map(([key, value]) => ({
      subject: DIMENSION_LABELS[key as keyof typeof DIMENSION_LABELS].join(' '),
      value: value,
      fullMark: 5,
    }));
  }, [selectedData]);

  if (chartData.length < 3) {
    return (
        <div className="fr-alert fr-alert--info fr-alert--sm">
            <h3 className="fr-alert__title">Données insuffisantes</h3>
            <p>Au moins 3 dimensions de ce type sont nécessaires pour afficher le diagramme.</p>
        </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid stroke="var(--border-default-grey)"/>
        <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--text-mention-grey)' }} />
        <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} stroke="var(--border-default-grey)" />
        <Radar 
          name={name} 
          dataKey="value" 
          stroke={color} 
          fill={color} 
          fillOpacity={0.6} 
        />
        <Tooltip
            contentStyle={{
                backgroundColor: 'var(--background-default-grey)',
                border: '1px solid var(--border-default-grey)',
                borderRadius: '0.25rem',
            }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarAnalysisChart;