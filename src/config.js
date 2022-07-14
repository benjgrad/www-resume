import tUIImageEditor from 'grapesjs-tui-image-editor'
import basicBlocks from 'grapesjs-blocks-basic'
import flexBox from 'grapesjs-blocks-flexbox'
import exportPlugin from 'grapesjs-plugin-export'
import navbar from 'grapesjs-navbar'
import countdown from 'grapesjs-component-countdown'
import forms from 'grapesjs-plugin-forms'
import tabs from 'grapesjs-tabs'
// import scroll from 'grapesjs-plugin-scroll'
import charts from './plugins/charts'


export const config = {
    container: '#gjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    height: "100vh",
    plugins: [
        charts,
        tUIImageEditor,
        basicBlocks,
        flexBox,
        exportPlugin,
        navbar,
        countdown,
        forms,
        tabs,
        //scroll,
    ],
    canvas: {
        styles: ["css/style.css"]
    },
    pluginsOpts: {
        [tUIImageEditor]: {
            config: {
                includeUI: {
                    initMenu: 'filter',
                },
            },
            icons: {
                'menu.normalIcon.path': './icons/icon-d.svg',
                'menu.activeIcon.path': './icons/icon-b.svg',
                'menu.disabledIcon.path': './icons.icon-a.svg',
                'menu.hoverIcon.path': './icons/icon-c.svg',
                'submenu.normalIcon.path': './icons/icon-d.svg',
                'submenu.activeIcon.path': './icons/icon-c.svg',
            },
        }
    }
};
