/* global Chart, item */

import grapesjs from 'grapesjs';
import addBlocks from './addBlocks';
import { addComponents } from './addComponents';
import { addTraits } from './addTraits';

export default grapesjs.plugins.add('gjs-charts', (editor, opts = {}) => {

    const script = function (props) {
        console.log(props);
        const initLib = function () {
            var data = {
                labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                datasets: [
                    {
                        label: "My First dataset",
                        backgroundColor: props.color1,
                        borderColor: "rgba(179,181,198,1)",
                        pointBackgroundColor: "rgba(179,181,198,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        backgroundColor: props.color2,
                        borderColor: "rgba(255,99,132,1)",
                        pointBackgroundColor: "rgba(255,99,132,1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
            };
            var options = {
                tooltips: {
                    mode: 'label'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            };
            new Chart(item, {
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