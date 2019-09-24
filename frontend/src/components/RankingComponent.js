import React, {Component} from "react";
import {Button, Table} from "reactstrap";
import {Loading} from './LoadingComponent';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";


class Ranking extends Component {

    dateCompare = (a, b) => {
        if (a == null && b == null)
            return 0;
        else if (a != null && b == null)
            return 1;
        else if (a == null && b != null)
            return -1;
        else {
            var diff = 0;
            for (var i = 0; i < 6; i++) {
                diff = a[i] - b[i];
                if (diff !== 0)
                    return diff;
            }
            return diff;
        }
    };

    lowerScoreCompare = (a, b) => {
        if (b.lowerTotal !== a.lowerTotal)
            return b.lowerTotal - a.lowerTotal;

        return this.dateCompare(a.lowerUpdateDate, b.lowerUpdateDate);
    };

    upperScoreCompare = (a, b) => {
        if (b.upperTotal !== a.upperTotal)
            return b.upperTotal - a.upperTotal;

        return this.dateCompare(a.upperUpdateDate, b.upperUpdateDate);
    };

    setRowColor = (index) => {
        if (index === 0)
            return {align: 'center', backgroundColor: 'Gold'};
        else if (index < 15)
            return {align: 'center', backgroundColor: 'Silver'};
    };

    refreshRanking = () => {
        this.props.fetchContenders(true);
    };

    render() {
        const lowerContenders = this.props.contenders.filter((contender) => (contender.lower && contender.lowerTotal > 0))
            .sort(this.lowerScoreCompare)
            .map((contender, index) => {
                return (
                    <tr key={contender.id} style={this.setRowColor(index)}>
                        <th scope="row">{index + 1}</th>
                        <td>{contender.cardName}</td>
                        <td>{contender.lowerTrack1}</td>
                        <td>{contender.lowerTrack2}</td>
                        <td>{contender.lowerTotal}</td>
                        <td>{contender.lowerTotal - 2091}</td>
                    </tr>
                );
            });

        const upperContenders = this.props.contenders.filter((contender) => (contender.upper && contender.upperTotal > 0))
            .sort(this.upperScoreCompare)
            .map((contender, index) => {
                return (
                    <tr key={contender.id} style={this.setRowColor(index)}>
                        <th scope="row">{index + 1}</th>
                        <td>{contender.cardName}</td>
                        <td>{contender.upperTrack1}</td>
                        <td>{contender.upperTrack2}</td>
                        <td>{contender.upperTotal}</td>
                        <td>{contender.upperTotal - 3372}</td>
                    </tr>
                );
            });

        const tableStyle = {textAlign: 'center'};

        if (this.props.isLoading) {
            return (
                <div>
                    <h4>예선 순위</h4>
                    <h5>Now Loading...</h5>
                    <Loading/>
                </div>
            );
        } else if (this.props.errMsg) {
            return (
                <div>
                    <h4>예선 순위</h4>
                    <h5>순위를 불러오는데 실패했습니다</h5>
                    <h4>{this.props.errMsg}</h4>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>예선 순위 &nbsp;&nbsp;
                        <Button type="submit" color="info" onClick={() => this.refreshRanking()}>
                            <span className="fa fa-refresh"/>
                            &nbsp;새로고침
                        </Button>
                    </h4>
                    <Tabs>
                        <TabList>
                            <Tab>Lower 순위</Tab>
                            <Tab>Upper 순위</Tab>
                        </TabList>

                        <TabPanel>
                            <h5>Lower 순위</h5>
                            <div className="row">
                                <Table bordered responsive style={tableStyle}>
                                    <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Dancer Name</th>
                                        <th>Unreal</th>
                                        <th>Starry Sky</th>
                                        <th>Total Score</th>
                                        <th>Max Diff.</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {lowerContenders}
                                    </tbody>
                                </Table>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <h5>Upper 순위</h5>
                            <div className="row">
                                <Table bordered responsive style={tableStyle}>
                                    <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Dancer Name</th>
                                        <th>天空の華</th>
                                        <th>Neverland</th>
                                        <th>Total Score</th>
                                        <th>Max Diff.</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {upperContenders}
                                    </tbody>
                                </Table>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            );
        }
    };
}

export default Ranking;