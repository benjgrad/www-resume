
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex({ r, g, b }) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRandomColor() {
  return { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) };
}

export const addTraits = (editor, opts) => {
  editor.TraitManager.addType('chart-dataset', {
    noLabel: true,
    events: {
      'change': 'onChange',
    },
    createInput(inputProps) {
      const { component } = inputProps;

      // Create a new element container add some content
      const el = document.createElement('div');
      el.innerHTML = `
        <div>
          <input class="charts__datasetnum" type="number" step="1" min="1" max="10" placeholder="# of data sets"/>
          <input class="charts__datapointnum" type="number" step="1" min="3" max="50" placeholder="# of data points"/>
          <div class="charts__label_data"></div>
          <div class="charts__data"></div>
        </div>
      `;
      const dataSetNumInput = el.querySelector(".charts__datasetnum");
      const dataPointNumInput = el.querySelector(".charts__datapointnum");


      const changeHandler = function (e) {
        const dataDiv = el.querySelector('.charts__data');
        const labelDiv = el.querySelector('.charts__label_data');
        dataDiv.innerHTML = ""

        const data = component.getAttributes().data || '[{"data":[]}]';
        const labelData = component.getAttributes().labels || '[""]';
        const labels = JSON.parse(labelData)
        const values = JSON.parse(data);
        let i = 0;

        if (values.length > 0) {
          const dataPointNum = values[0].data?.length ?? 0;
          for (let j = 0; j < dataPointNum; j++) {
            let hiddenLabelInput = document.createElement("input");
            hiddenLabelInput.className = "charts__label_" + j;
            hiddenLabelInput.style = "display:none";
            hiddenLabelInput.value = labels[j] ?? ""
            let existingInput = el.querySelector(".charts__label_" + j);
            if (!existingInput) {
              labelDiv.appendChild(hiddenLabelInput);
            }
          }
        }

        values.forEach(dataSet => {
          const div = document.createElement("div");
          div.style = "margin:5px; outline:2px solid;display:block;overflow:auto;"
          const dataSetLabelInput = document.createElement("input");
          dataSetLabelInput.type = "text";
          dataSetLabelInput.className = "charts__data_set_label_" + i;
          dataSetLabelInput.placeholder = "Data Set Label";
          dataSetLabelInput.value = dataSet.label ?? "";
          div.appendChild(dataSetLabelInput);

          const colorInput = document.createElement("input");
          colorInput.type = "color";
          colorInput.className = "charts__color_" + i;
          colorInput.value = dataSet.color ? rgbToHex(dataSet.color) : getRandomColor();
          div.appendChild(colorInput);

          const alphaInput = document.createElement("input");
          alphaInput.type = "range";
          alphaInput.className = "charts__color_alpha_" + i;
          alphaInput.min = "0"
          alphaInput.max = "1"
          alphaInput.step = "0.01"
          alphaInput.value = dataSet?.color?.a ?? 0.3;
          alphaInput.style = "height: 0.1px; outline: none; border-radius: 1px; appearance: auto; width: 98%;";

          div.appendChild(alphaInput);

          let j = 0;
          dataSet.data.forEach(val => {
            const label = document.createElement("input");
            const input = document.createElement("input");

            input.id = `chart-input-${i}-${j}`;
            input.className = `chart-input-${i}-${j}`;
            input.setAttribute("name", input.id);
            label.setAttribute("for", input.id);
            label.value = labels[j] ?? `Data Point ${j + 1}`;
            const labelClass = ".charts__label_" + j;
            label.placeholder = "Label";
            label.addEventListener('change', e => {
              labelDiv.querySelector(labelClass).value = e.target.value;
            });

            input.value = val;
            input.style = "width:40%; float:left;"
            label.style = "width:60%; float:left;"
            input.type = "number";
            div.append(label);
            div.appendChild(input);
            j++;
          });
          dataDiv.appendChild(div);
          i++;
        });



      }
      component.view.render();
      changeHandler();
      dataSetNumInput.addEventListener('change', changeHandler);

      dataPointNumInput.addEventListener('change', changeHandler);

      return el;
    },

    // Update the component based element changes
    onEvent(eventProps) {
      const { elInput, component } = eventProps;
      // `elInput` is the result HTMLElement you get from `createInput`
      const dataSetNumInput = elInput.querySelector('.charts__datasetnum');
      const dataPointNumInput = elInput.querySelector('.charts__datapointnum');
      const dataSetNum = dataSetNumInput.value;
      const dataPointNum = dataPointNumInput.value;

      const dataBefore = component.getAttributes().data || '[{"data":[]}]';
      const valuesBefore = JSON.parse(dataBefore);
      let labels = []

      for (let j = 0; j < Math.max(dataPointNum, 3); j++) {
        let hiddenLabelInput = elInput.querySelector(".charts__label_" + j);
        if (hiddenLabelInput) {
          labels[j] = hiddenLabelInput.value;
        }
        else {
          labels[j] = "";
        }
      }

      let values = [];
      const numDataSetsBefore = valuesBefore.length;
      for (let i = 0; i < dataSetNum; i++) {
        let dataSetBefore = { data: [] };
        if (i < numDataSetsBefore) {
          dataSetBefore = valuesBefore[i];
        }
        let dataSet = { data: [] };


        let dataSetLabelInput = elInput.querySelector(".charts__data_set_label_" + i);
        dataSet.label = dataSetLabelInput?.value;
        let dataSetColorInput = elInput.querySelector(".charts__color_" + i);
        dataSet.color = hexToRgb(dataSetColorInput?.value) ?? getRandomColor();
        let dataSetAlphaInput = elInput.querySelector(".charts__color_alpha_" + i);
        dataSet.color.a = dataSetAlphaInput?.value ?? 0.3;

        const numDataPointsBefore = dataSetBefore.data.length ?? 0;
        for (let j = 0; j < dataPointNum; j++) {

          let input = elInput.querySelector(`.chart-input-${i}-${j}`);
          if (input) {
            dataSet.data[j] = Math.floor(input.value);
          }
          else {
            if (j < numDataPointsBefore) {
              dataSet.data[j] = Math.floor(dataSetBefore.data[j]);
            }
            else {
              dataSet.data[j] = Math.floor(Math.random() * 100);
            }
          }
        }
        values[i] = dataSet;
      }

      const data = JSON.stringify(values);
      const labelData = JSON.stringify(labels);
      component.addAttributes({ labels: labelData, data });
      const id = component.getId();

      component.set('data', { id, labels, values })

      dataSetNumInput.dispatchEvent(new CustomEvent('change'));

    },

    onUpdate(eventProps) {
      const { elInput, component } = eventProps;
      const dataSetNumInput = elInput.querySelector('.charts__datasetnum');
      const dataPointNumInput = elInput.querySelector('.charts__datapointnum');
      const data = component.getAttributes().data || '[{"data":[]}]';
      const values = JSON.parse(data);

      dataSetNumInput.value = Math.max(values.length, 1);
      if (values.length > 0) {
        dataPointNumInput.value = Math.max(values[0].data.length, 3);
      }
      else {
        dataPointNumInput.value = 3;
      }

      dataSetNumInput.dispatchEvent(new CustomEvent('change'));
    },
  });
}