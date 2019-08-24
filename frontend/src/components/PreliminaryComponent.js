import React, {Component} from 'react';
import {Heatrule} from './HeatruleComponent';
import Entry from './EntryComponent';
import RecordSubmit from './RecordSubmitComponent';
import Ranking from './RankingComponent';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';

class Preliminary extends Component {
    render() {
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
                        <Heatrule/>
                    </TabPanel>
                    <TabPanel>
                        <Entry contenders={this.props.contenders}
                               postContender={this.props.postContender}/>
                    </TabPanel>
                    <TabPanel>
                        <RecordSubmit postHeatRecord={this.props.postHeatRecord}/>
                    </TabPanel>
                    <TabPanel>
                        <Ranking contenders={this.props.contenders}
                                 isLoading={this.props.isLoading}
                                 errMsg={this.props.errMsg}/>
                    </TabPanel>
                </Tabs>

                {/*<h4>예선</h4>*/}
                {/*<p>Go4TheTop 3회 예선 진행 사항을 표시하는 페이지입니다</p>*/}
            </div>
        );
    };
}

export default Preliminary;