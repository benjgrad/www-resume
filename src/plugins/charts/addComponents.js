
export function addComponents(editor, opts) {

    const componentType = opts.chartType;
    const script = opts.chartScript;
    let numDataSets = 1;


    editor.DomComponents.addType(componentType, {
        // Make the editor understand when to bind `my-input-type`
        isComponent: (el) => {
            if (el.getAttribute &&
                el.getAttribute('data-gjs-type') === componentType) {
                return { type: componentType };
            }
        },

        // Model definition
        model: {
            init() {
                this.on('change:dataSetNum', this.changeDataSetNum);
                //this.on('change:data-set-1', this.changeDataSetNum);
            },

            changeDataSetNum() {
                const { dataSetNum, dataPointNum } = this.props();
                const component = editor.getSelected(); // Component selected in canvas
                console.log('component change handler');
                // component.addTrait({
                //     type: 'number',
                //     label: '1',
                //     name: '1_1',
                //     placeholder: '0-100',
                //     min: 3, // Minimum number value
                //     max: 100, // Maximum number value
                //     changeProp: 1,
                // }, { at: 0 });
                numDataSets = dataSetNum;

                // const traits = component.get('traits');
                // traits.forEach(trait => console.log(trait.props()))
                // console.log('New value of someprop: ', dataSetNum, dataPointNum);
            },


            // Default properties
            defaults: {
                script,
                tagName: 'canvas',
                draggable: true,
                droppable: false,
                resizable: true,
                dataSetNum: 1,
                dataPointNum: 3,
                traits: [
                    'id',
                    // Each dataset would have
                    // Name : string;
                    // datapoints : number[];
                    // backgroundColor: color;
                    // lineColor: color;
                    // pointColor: color;
                    //
                    // {
                    //     type: 'number',
                    //     label: '# of Data Sets',
                    //     name: 'dataSetNum',
                    //     placeholder: '1-10',
                    //     min: 1, // Minimum number value
                    //     max: 10, // Maximum number value
                    //     changeProp: 1,
                    // },
                    // {
                    //     type: 'number',
                    //     label: '# of Data Points',
                    //     name: 'dataPointNum',
                    //     placeholder: '0-100',
                    //     min: 3, // Minimum number value
                    //     max: 100, // Maximum number value
                    //     changeProp: 1,
                    // },
                    // {
                    //     type: 'color',
                    //     name: 'color1',
                    //     text: 'Color 1',
                    //     changeProp: 1,
                    // },
                    // {
                    //     type: 'color',
                    //     name: 'color2',
                    //     text: 'Color 2',
                    //     changeProp: 1,
                    // },
                    {
                        type: 'chart-dataset',
                        name: 'ds',
                        changeProp: 1,
                        numDataSets
                    },

                ],
                'script-props': ['color1', 'color2', 'id', 'dataSetNum', 'dataPointNum', 'ds'],
            }
        }
    });
}
