import React, {Component} from 'react';
import {Card, CardImg, CardTitle, CardSubtitle, Button, Input} from "reactstrap";
import {MainContenders} from "../shared/contenders";
import RoundSelect from "./RoundSelectComponent";
import Col from "reactstrap/es/Col";

class MakeDraw extends Component {

    constructor(props) {
        super(props);

        this.loadDivision = this.loadDivision.bind(this);
        this.putSeeds = this.putSeeds.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.putRandom = this.putRandom.bind(this);
        this.clearMusic = this.clearMusic.bind(this);

        this.state = {
            UngroupedPlayers: [],
            Groups: {
                Group1: [],
                Group2: [],
                Group3: [],
                Group4: [],
            },
            GroupedPlayers: [],
            SelectedPlayer: '',
            getOutPlayer: '',
            getInPlayer: '',
            isCompleted: false
        };
    }

    loadDivision(division) {
        this.setState({
            UngroupedPlayers: MainContenders[division]
        });
    }

    putSeeds() {
        let seededPlayers = this.state.UngroupedPlayers.slice(0, 4);
        this.setState({
            Groups: {
                Group1: [...this.state.Groups.Group1, seededPlayers[0]],
                Group2: [...this.state.Groups.Group2, seededPlayers[2]],
                Group3: [...this.state.Groups.Group3, seededPlayers[3]],
                Group4: [...this.state.Groups.Group4, seededPlayers[1]],
            },
            GroupedPlayers: seededPlayers,
            UngroupedPlayers: this.state.UngroupedPlayers.filter(
                (player) => !seededPlayers.includes(player))
        });
    }

    handleChange(event) {
        if (event.target.value !== '') {
            let value = event.target.value;
            this.setState({
                [event.target.name]: value
            })
        } else
            this.setState({
                [event.target.name]: ''
            })
    }

    selectPlayer() {
        if (this.state.UngroupedPlayers.includes(this.state.SelectedPlayer)) {
            this.setState({
                UngroupedPlayers: this.state.UngroupedPlayers.filter(
                    (player) => player !== this.state.SelectedPlayer),
                Groups: {
                    Group1: [...this.state.Groups.Group1],
                    Group2: [...this.state.Groups.Group2],
                    Group3: [...this.state.Groups.Group3],
                    Group4: [...this.state.Groups.Group4, this.state.SelectedPlayer],
                },
                GroupedPlayers: [...this.state.GroupedPlayers, this.state.SelectedPlayer]
            })
        } else if (this.state.GroupedPlayers.includes(this.state.SelectedPlayer)) {
            alert("시드 배정 선수는 지정할 수 없습니다. 다른 선수를 지정하시기 바랍니다");
        } else
            alert("입력한 카드 네임을 가진 선수가 없습니다. 다시 입력하시기 바랍니다");
    }

    switchPlayer() {
        let checkGroup1 = this.state.Groups.Group1.findIndex((player) => player === this.state.getOutPlayer);
        let checkGroup2 = this.state.Groups.Group2.findIndex((player) => player === this.state.getInPlayer);
        let checkGroup3 = this.state.Groups.Group3.findIndex((player) => player === this.state.getInPlayer);

        if (checkGroup1 < 1)
            alert("1번 시드가 있는 조에 속한 시드 미배정 선수가 아닙니다. 내보낼 선수를 다시 지정하시기 바랍니다");
        else if (checkGroup2 < 1 && checkGroup3 < 1)
            alert("1번 시드에 있는 조에 들여올 수 있는 선수가 아닙니다. 들여올 선수를 다시 지정하시기 바랍니다");
        else {
            console.log(checkGroup1, checkGroup2, checkGroup3);
            //alert("선수 교체를 구현할 예정입니다!");
            if (checkGroup2 > 0) {
                this.setState({
                    Groups: {
                        Group1: this.state.Groups.Group1.filter((_, idx) => idx !== checkGroup1)
                            .concat(this.state.getInPlayer),
                        Group2: this.state.Groups.Group2.filter((_, idx) => idx !== checkGroup2)
                            .concat(this.state.getOutPlayer),
                        Group3: this.state.Groups.Group3,
                        Group4: this.state.Groups.Group4
                    },
                    isCompleted: true
                });
            } else {
                this.setState({
                    Groups: {
                        Group1: this.state.Groups.Group1.filter((_, idx) => idx !== checkGroup1)
                            .concat(this.state.getInPlayer),
                        Group2: this.state.Groups.Group2,
                        Group3: this.state.Groups.Group3.filter((_, idx) => idx !== checkGroup3)
                            .concat(this.state.getOutPlayer),
                        Group4: this.state.Groups.Group4
                    },
                    isCompleted: true
                });
            }
        }
    }

    clearMusic() {
        this.setState({
            musicNumber: 0,
            musicList: [],
            musicSelectLog: [],

        });
    }

    /* 순서쌍 랜덤 선택
    * 1회 시행에 random을 두번 돌려서 값이 서로 다른 순서쌍을 만들어야 한다.
    * 또한 같은 곡은 최대 2번까지만 나오도록 (필요하면 3번까지)
    */
    putRandom() {
        let randomPlayer = this.state.UngroupedPlayers[Math.floor(Math.random() * this.state.UngroupedPlayers.length)];
        let groupNumber = 4 - this.state.GroupedPlayers.length % 4;
        // var beforeGroup = this.state.Groups;
        // beforeGroup["Group" + groupNumber].push(this.state.UngroupedPlayers[randomPlayer]);
        switch (groupNumber) {
            case 1:
                this.setState({
                    Groups: {
                        Group1: [...this.state.Groups.Group1, randomPlayer],
                        Group2: [...this.state.Groups.Group2],
                        Group3: [...this.state.Groups.Group3],
                        Group4: [...this.state.Groups.Group4],
                    }
                });
                break;
            case 2:
                this.setState({
                    Groups: {
                        Group1: [...this.state.Groups.Group1],
                        Group2: [...this.state.Groups.Group2, randomPlayer],
                        Group3: [...this.state.Groups.Group3],
                        Group4: [...this.state.Groups.Group4],
                    }
                });
                break;
            case 3:
                this.setState({
                    Groups: {
                        Group1: [...this.state.Groups.Group1],
                        Group2: [...this.state.Groups.Group2],
                        Group3: [...this.state.Groups.Group3, randomPlayer],
                        Group4: [...this.state.Groups.Group4],
                    }
                });
                break;
            case 4:
                this.setState({
                    Groups: {
                        Group1: [...this.state.Groups.Group1],
                        Group2: [...this.state.Groups.Group2],
                        Group3: [...this.state.Groups.Group3],
                        Group4: [...this.state.Groups.Group4, randomPlayer],
                    }
                });
                break;
            default:
                break;
        }

        this.setState({
            GroupedPlayers: [...this.state.GroupedPlayers, randomPlayer],
            UngroupedPlayers: this.state.UngroupedPlayers.filter((player) => player !== randomPlayer),
        })
    }

    componentDidUpdate() {
        if (this.state.isCompleted) {
            alert("그룹 추첨이 끝났습니다!");
        }
    }

    render() {
        const borderColor = (diff) => {
            switch (diff) {
                case "challenge":
                    return {border: '5px solid BlueViolet'};
                case "expert":
                    return {border: '5px solid Chartreuse'};
                case "difficult":
                    return {border: '5px solid Coral'};
                default:
                    return;
            }
        };

        return (
            <div className="container">
                <h3>부문 선택 - Lower & Upper</h3>
                <div className="row ml-auto">
                    <RoundSelect value="Lower" description="Lower 추첨 시작"
                                 onSelect={(value) => this.loadDivision(value)}/>
                    <RoundSelect value="Upper" description="Upper 추첨 시작"
                                 onSelect={(value) => this.loadDivision(value)}/>
                </div>
                <h3>본선 진출자 불러오기 - 그룹 미배정자</h3>
                <div className="row ml-auto">
                    {this.state.UngroupedPlayers.map((contender, index) => (
                        <Card key={index} className="m-1">
                            <CardTitle tag="h4">{contender}</CardTitle>
                        </Card>
                    ))}
                </div>
                {this.state.Groups.keys}
                <h3>시드 배정자 배치</h3>
                <div className="m-1">
                    <Button color="primary" value="putSeeds"
                            disabled={this.state.UngroupedPlayers.length === 0 ||
                            Object.keys(this.state.Groups).every((group) => this.state.Groups[group].length >= 1)}
                            onClick={() => this.putSeeds()}>
                        Put Seeded Contenders!
                    </Button>
                </div>
                <h3>2번 시드(예선 1위): 진출자 지정</h3>
                <div className="m-1">
                    <Input name="SelectedPlayer" value={this.state.SelectedPlayer}
                           onChange={(value) => this.handleChange(value)}
                           disabled={!Object.keys(this.state.Groups).every(
                               (group) => this.state.Groups[group].length === 1)}
                           placeholder="자신의 조로 들여올 선수의 카드 네임을 입력하세요"/>
                    <Button color="primary" value="selectContender"
                            disabled={!Object.keys(this.state.Groups).every(
                                (group) => this.state.Groups[group].length === 1)}
                            onClick={() => this.selectPlayer()}>
                        Put the Selected Player!
                    </Button>
                </div>
                <h3>나머지 진출자 무작위 배치</h3>
                <div className="m-1">
                    <Button color="primary" value="putRandom"
                            disabled={!(this.state.UngroupedPlayers.length > 0 && this.state.UngroupedPlayers.length < 12)}
                            onClick={() => this.putRandom()}>
                        Put the Other Players Randomly!
                    </Button>
                </div>
                <h3>1번 시드(2회차 우승자): 진출자 교체</h3>
                <div className="m-1">
                    <h4>자신의 조에서 내보내고 싶은 선수의 카드 네임을 입력하세요</h4>
                    <Input name="getOutPlayer" value={this.state.getOutPlayer}
                           onChange={(value) => this.handleChange(value)}
                           disabled={!Object.keys(this.state.Groups).every(
                               (group) => this.state.Groups[group].length === 4)}
                           placeholder="자신의 조에서 내보내고 싶은 선수의 카드 네임을 입력하세요"/>
                    <h4>
                        2,3조에 속한 선수 중에서, 시드를 배정받은 선수를 제외하고<br/>
                        자신의 조로 들여올 선수의 카드 네임을 입력하세요
                    </h4>
                    <Input name="getInPlayer" value={this.state.getInPlayer}
                           onChange={(value) => this.handleChange(value)}
                           disabled={!Object.keys(this.state.Groups).every(
                               (group) => this.state.Groups[group].length === 4)}
                           placeholder="2,3조에서 시드 배정 선수를 제외한 나머지 선수 중에서 자신의 조로 들여올 선수의 카드 네임을 입력하세요"/>
                    <Button color="primary" value="switchContender"
                            disabled={this.state.isCompleted || !Object.keys(this.state.Groups).every(
                                (group) => this.state.Groups[group].length === 4)}
                            onClick={() => this.switchPlayer()}>
                        Switch the Two Players!
                    </Button>
                </div>
                <h3>그룹 추첨 결과</h3>
                <div className="row ml-auto">
                    <Col md={3} style={{border: '1px solid'}}>
                        {this.state.Groups.Group1.map(
                            (ctd, idx) => (
                                <Card key={idx} className="m-1">
                                    <CardTitle tag="h4">{ctd}</CardTitle>
                                </Card>
                            )
                        )}
                    </Col>
                    <Col md={3} style={{border: '1px solid'}}>
                        {this.state.Groups.Group2.map(
                            (ctd, idx) => (
                                <Card key={idx} className="m-1">
                                    <CardTitle tag="h4">{ctd}</CardTitle>
                                </Card>
                            )
                        )}
                    </Col>
                    <Col md={3} style={{border: '1px solid'}}>
                        {this.state.Groups.Group3.map(
                            (ctd, idx) => (
                                <Card key={idx} className="m-1">
                                    <CardTitle tag="h4">{ctd}</CardTitle>
                                </Card>
                            )
                        )}
                    </Col>
                    <Col md={3} style={{border: '1px solid'}}>
                        {this.state.Groups.Group4.map(
                            (ctd, idx) => (
                                <Card key={idx} className="m-1">
                                    <CardTitle tag="h4">{ctd}</CardTitle>
                                </Card>
                            )
                        )}
                    </Col>
                </div>
            </div>
        );
    }
}

export default MakeDraw;