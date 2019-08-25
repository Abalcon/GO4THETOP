import React from "react";
import {Table} from "reactstrap";
import {Loading} from './LoadingComponent';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";

function lowerScoreCompare(a, b) {
    if (b.lowerTotal !== a.lowerTotal)
        return b.lowerTotal - a.lowerTotal;

    return new Date(b.lowerUpdateDate) - new Date(a.lowerUpdateDate);
}

function upperScoreCompare(a, b) {
    if (b.upperTotal !== a.upperTotal)
        return b.upperTotal - a.upperTotal;

    return new Date(b.upperUpdateDate) - new Date(a.upperUpdateDate);
}

function setRowColor(index) {
    if (index === 0)
        return {backgroundColor: 'Aqua'};
    else if (index < 15)
        return {backgroundColor: 'Aquamarine'};
}

const Ranking = (props) => {
    const lowerContenders = props.contenders.filter((contender) => (contender.lower && contender.lowerTotal > 0))
        .sort(lowerScoreCompare)
        .map((contender, index) => {
            return (
                <tr key={contender.id} style={setRowColor(index)}>
                    <th scope="row">{contender.cardName}</th>
                    <td>{contender.lowerTrack1}</td>
                    <td>{contender.lowerTrack2}</td>
                    <td>{contender.lowerTotal}</td>
                </tr>
            );
        });

    const upperContenders = props.contenders.filter((contender) => (contender.upper && contender.upperTotal > 0))
        .sort(upperScoreCompare)
        .map((contender) => {
            return (
                <tr key={contender.id}>
                    <th scope="row">{contender.cardName}</th>
                    <td>{contender.upperTrack1}</td>
                    <td>{contender.upperTrack2}</td>
                    <td>{contender.upperTotal}</td>
                </tr>
            );
        });

    if (props.isLoading) {
        return (
            <div>
                <h4>예선 순위</h4>
                <h5>Now Loading...</h5>
                <Loading/>
            </div>
        );
    } else if (props.errMsg) {
        return (
            <div>
                <h4>예선 순위</h4>
                <h5>순위를 불러오는데 실패했습니다</h5>
                <h4>{props.errMsg}</h4>
            </div>
        );
    } else {
        return (
            <div>
                <h4>예선 순위</h4>
                <Tabs>
                    <TabList>
                        <Tab>Lower 순위</Tab>
                        <Tab>Upper 순위</Tab>
                    </TabList>

                    <TabPanel>
                        <h5>Lower 순위</h5>
                        <div className="row">
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th>Dancer Name</th>
                                    <th>Unreal</th>
                                    <th>Starry Sky</th>
                                    <th>Total Score</th>
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
                            <Table bordered>
                                <thead>
                                <tr>
                                    <th>Dancer Name</th>
                                    <th>天空の華</th>
                                    <th>Neverland</th>
                                    <th>Total Score</th>
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

export default Ranking;