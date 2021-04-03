/* eslint-disable object-curly-spacing, prefer-const, array-bracket-spacing, prefer-arrow-callback, space-before-function-paren, object-property-newline, quotes, indent, brace-style, no-trailing-spaces, eqeqeq, keyword-spacing, block-spacing, curly, comma-dangle, no-unused-expressions, comma-spacing */
const { React, getModuleByDisplayName, getModule } = require("powercord/webpack");
const Tooltip = getModuleByDisplayName("Tooltip", false);
const { Button } = require("powercord/components");
const buttonClasses = getModule(["button"], false);
const buttonWrapperClasses = getModule(["buttonWrapper","pulseButton"], false);
const buttonTextAreaClasses = getModule(["button", "textArea"], false);

module.exports = () => (
    <Tooltip color="black" postion="top" text="Beakoifier">
        {({ onMouseLeave, onMouseEnter }) => (
            <Button
                look={Button.Looks.BLANK}
                size={Button.Sizes.ICON}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div
                    className={`${buttonClasses.contents} ${buttonWrapperClasses.button} ${buttonTextAreaClasses.button}`}
                >
                    <img
                        className={`${buttonWrapperClasses.icon}`}
                        style={{ filter: "invert(70%)" }}
                        src="https://gist.githubusercontent.com/Julz4455/dda8bda9c74077692d73de33938f83cc/raw/681b376f371f53ebcffa93eca178b0f688abe240/rem.svg"
                     alt="Beakoifier"/>
                </div>
            </Button>
        )}
    </Tooltip>
);
