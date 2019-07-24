import React from "react";
import { TextField, MaskedTextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { css, classNamesFunction, DefaultButton, IButtonProps, IStyle, Label, PrimaryButton, Checkbox } from 'office-ui-fabric-react';
import * as _ from "lodash";
import { copyFile } from "fs";
import logo from './amazon-link-builder.png';
import copy from "clipboard-copy";

export interface IMainProps {

}

let findStoreRegExp = new RegExp("(https:\/\/.*amazon\.[^/]*)");
let findAsinRegExp = new RegExp("(?:[/dp/]|$)([A-Z0-9]{10})");

export default class Main extends React.Component<IMainProps, any> {

    constructor(props: IMainProps) {
        super(props);
        const columnProps: Partial<IStackProps> = {
            tokens: { childrenGap: 15 },
            styles: { root: { width: "100%", maxWidth:"500px" } }
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

    getAsin = (url: string) => {
        let m = url.match(findAsinRegExp)
        console.log("match", m);
        if(m){
            return m[1];
        }
        return null;
    };

    generateUrl = () => {
        if(!_.isEmpty(this.state.url) && !_.isEmpty(this.state.code)) {
            let store = this.getStore(this.state.url!);
            let asin = this.getAsin(this.state.url);
            if(!_.isEmpty(store) && !_.isEmpty(asin)){
                let url = `${store}/dp/product/${asin}?tag=${this.state.code}`;
                this.setState({link:url});
            }
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
        return (<Stack horizontalAlign="center" tokens={{ childrenGap: 20 }} styles={{ root: { width: "100%", padding: "2rem" } }}>
            <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
                <img src={logo} style={{width:"100px"}}></img>
                <h1>Amazon Affiliate link builder</h1>
            </Stack>
            <Stack horizontalAlign="stretch"  {...columnProps} >
                
                <TextField styles={{ root: { width: '100%'} }} label="Amazon URL" onChange={(e, newValue?: string) => this.setState({url: newValue })} />
                <TextField label="Tracking Id" value={code} onChange={(e, newValue?: string) => {
                    this.setState({code: newValue }, () => {
                        this.storeCode();
                    });
                }} />
            </Stack>
            <Stack  horizontalAlign="center" {...columnProps}>
                <Checkbox checked={!_.isEmpty(code)} label="Remember affiliate code (in the browser no data is sent anywhere)" onChange={this.onCheckboxChange} />
                <DefaultButton
                    disabled={_.isEmpty(url) || _.isEmpty(code)}
                    text="Generate"
                    onClick={this.generateUrl}
                />
                {this.showLink()}
            </Stack>
            <Stack horizontal   horizontalAlign="center" >
                <a href="https://www.nukedbit.it">Built by NukedBit</a> &nbsp;- &nbsp;<a href="https://github.com/nukedbit/amazonlinkgen-app">Get Source Code</a>
            </Stack>
        </Stack>);
    }

}