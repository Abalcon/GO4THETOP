import React from 'react';
import Entry from './EntryComponent';
import RecordSubmit from './RecordSubmitComponent';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

function Preliminary(props) {
    return (
        <div className="container">
            <Tabs>
                <TabList>
                    <Tab>Rules</Tab>
                    <Tab>Entry</Tab>
                    <Tab>RecordSubmit</Tab>
                    <Tab>Ranking</Tab>
                </TabList>

                <TabPanel>
                    <h4>예선 규칙</h4>
                    <p>Go4TheTop 3회 예선 규칙은 준비 중입니다!</p>
                </TabPanel>
                <TabPanel>
                    <Entry />
                </TabPanel>
                <TabPanel>
                    <RecordSubmit />
                </TabPanel>
                <TabPanel>
                    <h4>예선 순위</h4>
                    <p>Go4TheTop 3회 예선은 아직 시작하지 않았습니다!</p>
                </TabPanel>
            </Tabs>

            {/*<h4>예선</h4>*/}
            {/*<p>Go4TheTop 3회 예선 진행 사항을 표시하는 페이지입니다</p>*/}
        </div>
    );
}

export default Preliminary;