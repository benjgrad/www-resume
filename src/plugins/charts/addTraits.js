// import InputColor from "grapesjs/src/domain_abstract/ui/InputColor";

export const addTraits = (editor, opts) => {

  // editor.TraitManager.addType('chart-dataset', {
  //   templateInput: '',

  //   /**
  //    * Returns input element
  //    * @return {HTMLElement}
  //    * @private
  //    */
  //   getInputEl() {
  //     if (!this.input) {
  //       const model = this.model;
  //       const value = this.getModelValue();
  //       const inputColor = new InputColor({
  //         model,
  //         target: this.config.em,
  //         contClass: this.ppfx + 'field-color',
  //         ppfx: this.ppfx,
  //       });
  //       const input = inputColor.render();
  //       input.setValue(value, { fromTarget: 1 });
  //       this.input = input.el;
  //     }

  //     return this.input;
  //   }
  // });

  editor.TraitManager.addType('chart-dataset', {
    noLabel: true,
    events: {
      'change': 'onChange',
    },
    createInput(inputProps) {
      const { trait } = inputProps;
      console.log("createInput", inputProps);
      // Here we can decide to use properties from the trait
      const traitOpts = trait.get('options') || [];
      const options = traitOpts.length ? traitOpts : [
        { id: 'url', name: 'URL' },
        { id: 'email', name: 'Email' },
      ];

      // Create a new element container add some content
      const el = document.createElement('div');
      el.innerHTML = `
        <input class="charts__datasetnum" type="number" placeholder="# of data sets"/>
        <input class="charts__datapointnum" type="number" placeholder="# of data points"/>
      `;
      const dataSetNumInput = el.querySelector(".charts__datasetnum");
      const dataPointNumInput = el.querySelector(".charts__datapointnum");

      dataSetNumInput.addEventListener('change', e => {
        console.log("eventhandler - dataSetNum changed");
      });

      dataPointNumInput.addEventListener('change', e => {
        console.log("eventhandler - dataPointNum changed");
      });

      // // Let's make our content alive
      // const inputsUrl = el.querySelector('.href-next__url-inputs');
      // const inputsEmail = el.querySelector('.href-next__email-inputs');
      // const inputType = el.querySelector('.href-next__type');
      // inputType.addEventListener('change', ev => {
      //   switch (ev.target.value) {
      //     case 'url':
      //       inputsUrl.style.display = '';
      //       inputsEmail.style.display = 'none';
      //       break;
      //     case 'email':
      //       inputsUrl.style.display = 'none';
      //       inputsEmail.style.display = '';
      //       break;
      //   }
      // });

      return el;
    },

    // Update the component based element changes
    onEvent(eventProps) {
      const { elInput, component } = eventProps;
      // `elInput` is the result HTMLElement you get from `createInput`
      console.log("onEvent", component);
      const dataSetNumInput = elInput.querySelector('.charts__datasetnum');
      const dataPointNumInput = elInput.querySelector('.charts__datapointnum');
      const dataSetNum = dataSetNumInput.value;
      const dataPointNum = dataPointNumInput.value;

      const dataBefore = component.getAttributes().data || '[[0]]';
      const valuesBefore = JSON.parse(dataBefore);

      let values = [];
      const numDataSetsBefore = valuesBefore.length;
      for (let i = 0; i < dataSetNum; i++) {
        let dataSetBefore = [];
        if (i < numDataSetsBefore) {
          dataSetBefore = valuesBefore[i];
        }
        let dataSet = [];
        const numDataPointsBefore = dataSetBefore.length;
        for (let j = 0; j < dataPointNum; j++) {
          if (j < numDataPointsBefore) {
            dataSet[j] = dataSetBefore[j];
          }
          else {
            dataSet[j] = Math.random() * 100;
          }
        }
        values[i] = dataSet;
      }
      const data = JSON.stringify(values);

      component.addAttributes({ data });
      component.view.render()

    },

    onUpdate(eventProps) {
      const { elInput, component } = eventProps;
      console.log("onUpdate", component);
      const dataSetNumInput = elInput.querySelector('.charts__datasetnum');
      const dataPointNumInput = elInput.querySelector('.charts__datapointnum');
      const data = component.getAttributes().data || '[[0]]';
      const values = JSON.parse(data);

      dataSetNumInput.value = values.length;
      dataPointNumInput.value = values[0].length;

      dataSetNumInput.dispatchEvent(new CustomEvent('change'));
    },
  });


  // editor.TraitManager.addType('chart-dataset', {
  //   noLabel: true,

  //   events: {
  //     'change': 'onChange'
  //   },

  //   onChange() {
  //     console.log('changed');
  //     this.model.set('value', this.getInputEl().value);
  //   },
  //   // inputHtml: '<input class="mycolorPicker"/>',
  //   // getInputEl() {
  //   //   console.log("getInputEl")
  //   //   if (!this.inputEl) {
  //   //     var input = document.createElement('input');
  //   //     input.innerHTML = this.inputHtml
  //   //     var inputEl = input;
  //   //     var pickerEl = inputEl.querySelector(".mycolorPicker");
  //   //     pickerEl.id = "ppcp" + this.cid;
  //   //     if (!this.model.colorPickerEl) {// add the jQuery spectrum color picker to our trait editor
  //   //       this.model.colorPickerEl = editor.TraitManager.getType('color').prototype.getInputEl.apply(this, arguments);
  //   //     }
  //   //     pickerEl.appendChild(this.model.colorPickerEl)
  //   //     this.inputEl = inputEl;
  //   //     ///... code to handle value changes and update other fields ...

  //   //     return this.inputEl;
  //   //   }
  //   // },
  //   // Return a simple HTML string or an HTML element
  //   createInput(inputProps) {
  //     const { trait } = inputProps;
  //     console.log("createInput", inputProps);
  //     // Here we can decide to use properties from the trait
  //     const traitOpts = trait.get('options') || [];
  //     const options = traitOpts.length ? traitOpts : [
  //       { id: 'url', name: 'URL' },
  //       { id: 'email', name: 'Email' },
  //     ];

  //     // Create a new element container add some content
  //     const el = document.createElement('div');
  //     el.innerHTML = `
  //     <select class="href-next__type">
  //       ${options.map(opt =>
  //       `<option value="${opt.id}">${opt.name}</option>`)
  //         .join('')}
  //     </select>
  //     <div class="href-next__url-inputs">
  //       <input class="href-next__url" placeholder="Insert URL"/>
  //     </div>
  //     <div class="href-next__email-inputs">
  //     <input class="href-next__email" placeholder="Insert email"/>
  //     <input class="href-next__email-subject" placeholder="Insert subject"/>
  //     </div>
  //   `;

  //     // Let's make our content alive
  //     const inputsUrl = el.querySelector('.href-next__url-inputs');
  //     const inputsEmail = el.querySelector('.href-next__email-inputs');
  //     const inputType = el.querySelector('.href-next__type');
  //     inputType.addEventListener('change', ev => {
  //       switch (ev.target.value) {
  //         case 'url':
  //           inputsUrl.style.display = '';
  //           inputsEmail.style.display = 'none';
  //           break;
  //         case 'email':
  //           inputsUrl.style.display = 'none';
  //           inputsEmail.style.display = '';
  //           break;
  //       }
  //     });

  //     return el;
  //   },

  //   // Update the component based element changes
  //   onEvent(eventProps) {
  //     const { elInput, component } = eventProps;
  //     // `elInput` is the result HTMLElement you get from `createInput`
  //     console.log("onEvent", component);
  //     const inputType = elInput.querySelector('.href-next__type');
  //     let href = '';

  //     switch (inputType.value) {
  //       case 'url':
  //         const valUrl = elInput.querySelector('.href-next__url').value;
  //         href = valUrl;
  //         break;
  //       case 'email':
  //         const valEmail = elInput.querySelector('.href-next__email').value;
  //         const valSubj = elInput.querySelector('.href-next__email-subject').value;
  //         href = `mailto:${valEmail}${valSubj ? `?subject=${valSubj}` : ''}`;
  //         break;
  //     }

  //     component.addAttributes({ href });
  //     component.view.render()

  //   },

  //   onUpdate(eventProps) {
  //     const { elInput, component } = eventProps;
  //     console.log("onEvent", component);
  //     const href = component.getAttributes().href || '';
  //     const inputType = elInput.querySelector('.href-next__type');
  //     let type = 'url';

  //     if (href.indexOf('mailto:') === 0) {
  //       const inputEmail = elInput.querySelector('.href-next__email');
  //       const inputSubject = elInput.querySelector('.href-next__email-subject');
  //       const mailTo = href.replace('mailto:', '').split('?');
  //       const email = mailTo[0];
  //       const params = (mailTo[1] || '').split('&').reduce((acc, item) => {
  //         const items = item.split('=');
  //         acc[items[0]] = items[1];
  //         return acc;
  //       }, {});
  //       type = 'email';

  //       inputEmail.value = email || '';
  //       inputSubject.value = params.subject || '';
  //     } else {
  //       elInput.querySelector('.href-next__url').value = href;
  //     }

  //     inputType.value = type;
  //     inputType.dispatchEvent(new CustomEvent('change'));
  //   },
  // });
}