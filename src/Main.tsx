import React from "react";
import { TextField, MaskedTextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, Label, PrimaryButton, Checkbox } from 'office-ui-fabric-react';
import * as _ from "lodash";
import { copyFile } from "fs";

import copy from "clipboard-copy";

export interface IMainProps {

}

let findStoreRegExp = new RegExp("(https:\/\/.*amazon\.[^/]*)");

export default class Main extends React.Component<IMainProps, any> {

    constructor(props: IMainProps) {
        super(props);
        const columnProps: Partial<IStackProps> = {
            tokens: { childrenGap: 15 },
            styles: { root: { width: "500", } }
        };
        let code = localStorage.getItem("code");
        this.state = {
            columnProps,
            rememberCode : _.isEmpty(code) ? false : true,
            code: code,
            link:null
        }
    }

    getStore = (url: string) => {
        let result = findStoreRegExp.exec(url);
        if (result === null || result.length === 0) {
            return null;
        }

        let entries = result.entries();

        return entries.next().value[1];
    };

    generateUrl = () => {
        if(!_.isEmpty(this.state.url) && !_.isEmpty(this.state.code)) {
            let store = this.getStore(this.state.url!);
            let url = `${store}?${this.state.code}`;
            this.setState({link:url});
        }
        this.storeCode();
    };


    onCheckboxChange = (ev:any, isChecked?: boolean) : void => {
        if(isChecked === null) {
            return;
        }
        this.setState({rememberCode: isChecked!}, () => {
            if(isChecked! === false){
                localStorage.removeItem("code");
            }
            this.storeCode();
        });
    };

    showLink = () => {
        let { link } = this.state;
        if(_.isEmpty(link)){
            return null;
        }
        return (
            <Stack horizontal tokens={{ childrenGap: 50 }} >
                <a href={link} target="_blank" >{link}</a>
                <PrimaryButton onClick={() => {
                    let { link } = this.state;
                    copy(link);
                }}>Copy</PrimaryButton>
            </Stack>
        )
    }

    storeCode = () => {
        let {code, rememberCode} = this.state;
        if(rememberCode){
            localStorage.setItem("code", code);
        }
    }

    render(): React.ReactElement<IMainProps> {
        let {columnProps, url, code} = this.state;
        return (<Stack tokens={{ childrenGap: 50 }} styles={{ root: { width: "100%", padding: "2rem" } }}>
            <Stack horizontalAlign="center" horizontal {...columnProps}>
                <TextField label="Amazon URL" onChange={(e, newValue?: string) => this.setState({url: newValue })} />
                <TextField label="Affiliate Code" value={code} onChange={(e, newValue?: string) => {
                    this.setState({code: newValue });
                    this.storeCode();
                }} />
            </Stack>
            <Stack  horizontalAlign="center" {...columnProps}>
                <Checkbox label="Remember affiliate code (in the browser no data is sent anywhere)" onChange={this.onCheckboxChange} />
                <DefaultButton
                    disabled={_.isEmpty(url) || _.isEmpty(code)}
                    text="Generate"
                    onClick={this.generateUrl}
                />
                {this.showLink()}
            </Stack>
        </Stack>);
    }

}