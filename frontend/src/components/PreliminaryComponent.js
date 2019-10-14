import React, {Component} from 'react';
import {Heatrule} from './HeatruleComponent';
import Entry from './EntryComponent';
import RecordSubmit from './RecordSubmitComponent';
import Ranking from './RankingComponent';
import { Tab, TabList, Tabs, TabPanel } from 'react-tabs';
import {Loading} from "./LoadingComponent";

class Preliminary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: this.setStartIndex(this.props.isRefresh),
        };
    }

    setStartIndex = (isRefresh) => {
        if (isRefresh)
            return 3;
        return 0;
    };

    handleChange(value) {
        this.setState({
            slideIndex: value,
        });
    };


    render() {
        if (this.props.isProcessing) {
            return (
                <div className="container">
                    <Loading/>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Tabs selectedIndex={this.state.slideIndex} onSelect={tab => this.handleChange(tab)}>
                        <TabList>
                            <Tab>Rules</Tab>
                            <Tab>Entry (Watching Only)</Tab>
                            <Tab>RecordSubmit</Tab>
                            <Tab>Ranking</Tab>
                        </TabList>

                        <TabPanel>
                            <Heatrule/>
                        </TabPanel>
                        <TabPanel>
                            <Entry contenders={this.props.contenders}
                                   isProcessing={this.props.contenders.isProcessing}
                                   postContender={this.props.postContender}/>
                        </TabPanel>
                        <TabPanel>
                            <RecordSubmit postHeatRecord={this.props.postHeatRecord}
                                          isProcessing={this.props.contenders.isProcessing}/>
                        </TabPanel>
                        <TabPanel>
                            <Ranking contenders={this.props.contenders}
                                     fetchContenders={this.props.fetchContenders}
                                     isLoading={this.props.isLoading}
                                     errMsg={this.props.errMsg}/>
                        </TabPanel>
                    </Tabs>
                </div>
            );
        }
    };
}

export default Preliminary;