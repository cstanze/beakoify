/* eslint-disable object-curly-spacing, prefer-const, array-bracket-spacing, prefer-arrow-callback, space-before-function-paren, object-property-newline, quotes, indent, brace-style, no-trailing-spaces, eqeqeq, keyword-spacing, block-spacing, curly, comma-dangle, no-unused-expressions, no-useless-constructor */
const { React } = require('powercord/webpack');
const { FormTitle } = require('powercord/components');
const { SwitchItem } = require('powercord/components/settings');

module.exports = class BeakoifierSettings extends React.PureComponent {  
    constructor(props) {
        super(props);
    }

    render() {
        const { getSetting, toggleSetting } = this.props;      
        return <> 
        <FormTitle tag='h2'>Button</FormTitle>
        <SwitchItem
        note="Whether the button should enabled or not."
        value={getSetting('buttonEnabled', true)}
        onChange={() => toggleSetting('buttonEnabled')}
      >
        Enable
      </SwitchItem>
      <SwitchItem
        note="Whether the button should be at the left of the list of buttons."
        value={getSetting('buttonPos', false)}
        onChange={() => toggleSetting('buttonPos')}
      >
        Button end of the list
      </SwitchItem>
        </>;
    }
};
