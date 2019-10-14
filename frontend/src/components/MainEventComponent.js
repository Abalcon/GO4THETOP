import React, { Component } from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import MainRule from './MainRuleComponent';
import {Qualifiers} from "./QualifiersComponent";

class MainEvent extends Component {

    render () {
        return (
            <div className="container">
                <Tabs>
                    <TabList>
                        <Tab>본선 규칙 및 지정곡</Tab>
                        <Tab>본선 진출자</Tab>
                    </TabList>

                    <TabPanel>
                        <MainRule/>
                    </TabPanel>
                    <TabPanel>
                        <Qualifiers/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default MainEvent;