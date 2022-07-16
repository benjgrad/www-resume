
export function addComponents(editor, opts) {

    const componentType = opts.chartType;
    const script = opts.chartScript;
    //let numDataSets = 1;

    editor.DomComponents.addType(`${componentType}_canvas`, {
        isComponent: (el) => {
            if (el.getAttribute &&
                el.getAttribute('data-gjs-type') === `${componentType}_canvas`) {
                return { type: `${componentType}_canvas` };
            }
        },
        model: {
            // Default properties
            defaults: {
                selectable: false,
                draggable: false,
                droppable: false,
                resizable: false,
                content: { type: componentType },

            }
        }
    });


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
            // Default properties
            defaults: {
                script,
                tagName: 'canvas',
                draggable: true,
                droppable: false,
                resizable: true,
                content: { type: componentType },
                traits: [
                    {
                        type: 'chart-dataset',
                        name: 'data',
                        changeProp: 1,
                    },

                ],
                'script-props': ['data'],
            }
        }
    });
}
