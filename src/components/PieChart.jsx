import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const TaskPieChart = () => {
    const projects = useSelector(state => state.projects.projects);

    const prepareChartData = () => {
        const taskCounts = {
            'To Do': 0,
            'In Progress': 0,
            'Done': 0,
        };

        projects.forEach(project => {
            project.tasks.forEach(task => {
                taskCounts[task.state]++;
            });
        });

        return Object.entries(taskCounts).map(([key, value]) => ({
            name: key,
            value,
        }));
    };

    const data = prepareChartData();

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

export default TaskPieChart;
