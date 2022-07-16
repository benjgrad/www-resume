/* global Chart */

import grapesjs from 'grapesjs';
import addBlocks from './addBlocks';
import { addComponents } from './addComponents';
import { addTraits } from './addTraits';

export default grapesjs.plugins.add('gjs-charts', (editor, opts = {}) => {

    const script = function (props) {
        if (props.data && props.data.labels) {
            const datasets = [];
            props.data?.values?.forEach(dataSet => {
                datasets.push({
                    label: dataSet.label,
                    backgroundColor: `rgba(${dataSet.color.r},${dataSet.color.g},${dataSet.color.b},${dataSet.color.a})`,
                    pointBackgroundColor: `rgba(${dataSet.color.r},${dataSet.color.g},${dataSet.color.b},1)`,
                    borderColor: `rgba(${dataSet.color.r},${dataSet.color.g},${dataSet.color.b},1)`,
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: `rgba(${dataSet.color.r},${dataSet.color.g},${dataSet.color.b},1)`,
                    data: dataSet.data
                });
            });

            const initLib = function () {
                var data = {
                    labels: props.data.labels,
                    datasets
                };
                var options = {
                    responsive: true,
                    tooltips: {
                        mode: 'label'
                    },
                    scales: {
                        r: {
                            angleLines: {
                                display: false
                            },
                            suggestedMin: 0,
                        }
                    }
                };
                const element = document.getElementById(props.data.id);
                const canvas = element.querySelector(".chartsjs");
                element && new Chart(canvas, {
                    type: 'radar',
                    data: data,
                    options: options
                });

            };

            if (typeof someExtLib == 'undefined') {
                const script = document.createElement('script');
                script.onload = initLib;
                script.setAttribute('type', 'text/javascript');
                script.src = './chart.min.js';
                document.body.appendChild(script);
            } else {
                initLib();
            }
        }
    };
    const config = {
        chartType: 'gjs-charts',
        chartScript: script,
        chartBlockName: 'Chart',
        ...opts
    }
    addTraits(editor, config);
    addBlocks(editor, config);
    addComponents(editor, config);
});