import grapesjs from "grapesjs";
import { addComponents } from "./addComponents";
import addBlocks from "./blocks";

export default grapesjs.plugins.add('gjs-scroll', (editor, opts = {}) => {
  const componentType = 'grapesjs-scrollanimate';

  let config = {
    ...opts,
    componentType,
    prefix: opts.prefix ?? "gjs-scroll",
    blockName: opts.blockName ?? "Scroll",
  }

  addComponents(editor, config);
  addBlocks(editor, config);
});


