import React, { Component } from 'react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import MainRule from './MainRuleComponent';
import {Qualifiers} from "./QualifiersComponent";
import MusicRandom from './MusicRandomComponent';
import MakeDraw from './MakeDrawComponent';
import MusicSelect from './MusicSelectComponent'
import {ShowDraw} from "./ShowDrawComponent";

class MainEvent extends Component {

    render () {
        return (
            <div className="container">
                <Tabs>
                    <TabList>
                        <Tab>본선 규칙 및 지정곡</Tab>
                        <Tab>본선 진출자</Tab>
                        <Tab>랜덤 선곡</Tab>
                        <Tab>그룹 추첨</Tab>
                      <Tab>지정 선곡 (검색)</Tab>
                      <Tab>대진표</Tab>
                    </TabList>

                    <TabPanel>
                        <MainRule/>
                    </TabPanel>
                    <TabPanel>
                        <Qualifiers/>
                    </TabPanel>
                  <TabPanel>
                    <MusicRandom/>
                  </TabPanel>
                  <TabPanel>
                    <MakeDraw/>
                  </TabPanel>
                    <TabPanel>
                        <MusicSelect/>
                    </TabPanel>
                    <TabPanel>
                      <ShowDraw/>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default MainEvent;
