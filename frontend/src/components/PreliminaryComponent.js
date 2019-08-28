import React, {Component} from 'react';
import {Heatrule} from './HeatruleComponent';
import Entry from './EntryComponent';
import RecordSubmit from './RecordSubmitComponent';
import Ranking from './RankingComponent';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import LoadingOverlay from 'react-loading-overlay';

class Preliminary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <LoadingOverlay active={this.props.contenders.isProcessing} text='Please wait...'>
                <div className="container">
                    <Tabs onChange={this.handleChange.bind(this)} value={this.state.slideIndex}>
                        <TabList>
                            <Tab value={0}>Rules</Tab>
                            <Tab value={1}>Entry</Tab>
                            <Tab value={2}>RecordSubmit</Tab>
                            <Tab value={3}>Ranking</Tab>
                        </TabList>

                        <TabPanel>
                            <Heatrule/>
                        </TabPanel>
                        <TabPanel>
                            <Entry contenders={this.props.contenders}
                                   postContender={this.props.postContender}/>
                        </TabPanel>
                        <TabPanel>
                            <RecordSubmit postHeatRecord={this.props.postHeatRecord}
                                          isProcessing={this.props.contenders.isProcessing}/>
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
            </LoadingOverlay>
        );
    };
}

export default Preliminary;