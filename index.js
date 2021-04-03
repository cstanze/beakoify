/* eslint-disable object-curly-spacing, prefer-const, array-bracket-spacing, prefer-arrow-callback, space-before-function-paren, object-property-newline, quotes, indent, brace-style, no-trailing-spaces, eqeqeq, keyword-spacing, block-spacing, curly, comma-dangle, no-unused-expressions */
const { Plugin } = require('powercord/entities');
const { getModule, React } = require('powercord/webpack');
const { inject, uninject} = require('powercord/injector');
const { findInReactTree } = require('powercord/util');

const Settings = require('./components/Settings');
const Button = require('./components/Button');
let beakoifierAutoToggle = false;

module.exports = class Beakoify extends Plugin { 
  async startPlugin () {
    this.addButton();
    powercord.api.settings.registerSettings(this.entityID, {
      category: this.entityID,
      label: 'Beakoifier',
      render: (props) => React.createElement(Settings, {
        main:this,
        ...props
      })
    });

    function owoifyText(v) {
      if ((/\.|,/gi).test(v[v.length - 1])) {
        return `${v} I suppose.`;
      }
      return `${v}, I suppose.`;
    }
    
    const messageEvents = await getModule(['sendMessage']);
    inject('beakoifierSend', messageEvents, 'sendMessage', function (args) {
      if (beakoifierAutoToggle) {
        let text = args[1].content;
        text = owoifyText(text);
        args[1].content = text;      
      }      
      return args;  
    }, true);

    powercord.api.commands.registerCommand({
      command: 'beakoify',
      description: 'beakoify your message',
      usage: '{c} [ text ]',
      executor: (args) => ({send: true, result: owoifyText(args.join(' '))})
    });
    powercord.api.commands.registerCommand({
      command: 'beakoifyauto',
      description: `beakoify all of your messages`,
      executor: this.toggleAuto.bind(this)
    });    
  }
  
  addButton() {    
    const ChannelTextAreaContainer = getModule(
        m =>
            m.type &&
            m.type.render &&
            m.type.render.displayName === 'ChannelTextAreaContainer',
        false
    );

    inject(
        'beakoifierButton',
        ChannelTextAreaContainer.type,
        'render',
        (_args, res) => {
            const props = findInReactTree(
                res,
                r => r && r.className && r.className.indexOf('buttons-') === 0
            );

            const element = React.createElement(
                'div',
                {
                    className: '.beakoifierButton',
                    onClick: () => this.toggleAuto(),
                },
                React.createElement(Button)
            );
            
            const btnEnb = this.settings.get('buttonEnabled', true);
            const posSetting = this.settings.get('buttonPos', false);
            if(btnEnb) {posSetting ? props.children.push(element) : props.children.unshift(element);}
            return res;
        }
    );
    ChannelTextAreaContainer.type.render.displayName = 'ChannelTextAreaContainer';
}

  pluginWillUnload() {
    powercord.api.settings.unregisterSettings(this.entityID);
    uninject('beakoifierSend'); 
    powercord.api.commands.unregisterCommand('beakoifyauto');   
    powercord.api.commands.unregisterCommand('beakoify');   
    uninject('beakoifierButton');
    const button = document.querySelector('.beakoifierButton');
    if(button) button.remove();
  }

  toggleAuto () {
    beakoifierAutoToggle = !beakoifierAutoToggle;
    powercord.api.notices.sendToast('beakoifyNotif', {
      header: `Beakoify Auto Status`,
      content: `${(beakoifierAutoToggle == true) ? 'Its ready to go, I suppose.' : 'Ok chill we are back to normal again.'}`,
      buttons: [{
        text: 'Dismiss',
        color: 'red',
        look: 'outlined',
        onClick: () => powercord.api.notices.closeToast('beakoifyNotif')
      }]      
    });
  }
};
