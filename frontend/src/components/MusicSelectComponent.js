import React, {Component} from 'react';
import {Card, CardTitle, CardSubtitle, Button} from "reactstrap";
import {G4TTMusics} from "../shared/musics";
import RoundSelect from "./RoundSelectComponent";

class MusicSelect extends Component {

    constructor(props) {
        super(props);

        this.loadMusic = this.loadMusic.bind(this);
        this.clearMusic = this.clearMusic.bind(this);
        this.makeRandomPair = this.makeRandomPair.bind(this);

        this.state = {
            musicNumber: 0,
            musicList: [],
            musicSelectLog: []
        };
    }

    loadMusic(round) {
        //console.log(round);
        this.setState({
            musicList: G4TTMusics[round],
            musicNumber: G4TTMusics[round].length,
            musicSelectLog: [] // clear random selection record
        });
        //console.log(this.state.musicList);
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
    makeRandomPair() {
        const isSelectedTwice = (idx) => {
            console.log(this.state.musicSelectLog.filter((j) => j === idx).length);
            return this.state.musicSelectLog.filter((j) => j === idx).length >= 2
        };

        if (this.state.musicNumber === 0) {
            alert("먼저 지정곡을 불러와야합니다!");
        } else if (this.state.musicSelectLog.length >= 2 * this.state.musicNumber) { // 왜 여기로 못 들어가지
            alert("모든 지정곡이 2번씩 나왔습니다! 지정곡을 새로 불러오시기 바랍니다");
        }
        // else if ([...Array(this.state.musicNumber).keys()]
        //     .every((i) => isSelectedTwice(i))) {
        //     alert("모든 지정곡이 2번씩 나왔습니다! 지정곡을 새로 불러오시기 바랍니다");
        // }
        else {
            let first = Math.floor(Math.random() * this.state.musicNumber);
            while (isSelectedTwice(first))
                first = Math.floor(Math.random() * this.state.musicNumber);

            let second = Math.floor(Math.random() * this.state.musicNumber);
            while (second === first || isSelectedTwice(second))
                second = Math.floor(Math.random() * this.state.musicNumber);

            this.setState({
                musicSelectLog: [...this.state.musicSelectLog, first, second]
            });
            console.log(this.state.musicList[first], this.state.musicList[second], this.state.musicSelectLog);
            console.log([...Array(this.state.musicNumber).keys()]);
        }
    }

    render() {
        return (
            <div className="container">
                <h3>라운드 선택 - 지정곡 불러오기</h3>
                <div className="row ml-auto">
                    <RoundSelect value="Lower_R16" description="Lower 16강"
                                 onSelect={(value) => this.loadMusic(value)}/>
                    <RoundSelect value="Lower_R8" description="Lower 8강"
                                 onSelect={(value) => this.loadMusic(value)}/>
                    <RoundSelect value="Lower_Rep" description="Lower 패자 1차"
                                 onSelect={(value) => this.loadMusic(value)}/>
                    <RoundSelect value="Upper_R16" description="Upper 16강"
                                 onSelect={(value) => this.loadMusic(value)}/>
                    <RoundSelect value="Upper_R8" description="Upper 8강"
                                 onSelect={(value) => this.loadMusic(value)}/>
                    <RoundSelect value="Upper_Rep" description="Upper 패자 1차"
                                 onSelect={(value) => this.loadMusic(value)}/>
                </div>
                <h3>지정곡 불러오기 테스트</h3>
                <div className="row ml-auto">
                    {this.state.musicList.map((music, index) => (
                        <Card key={index} className="m-1">
                            <CardTitle>{music.name}</CardTitle>
                            <CardSubtitle>{music.difficulty}</CardSubtitle>
                        </Card>
                    ))}
                </div>
                <h3>순서쌍 랜덤 선택</h3>
                <div className="m-1">
                    <Button color="primary" value="getRandomPair"
                            disabled={this.state.musicNumber === 0 || this.state.musicSelectLog.length >= 2 * this.state.musicNumber}
                            onClick={() => this.makeRandomPair()}>
                        Get a Random Pair!
                    </Button>
                </div>
                <h3>랜덤 선택 결과</h3>
                <div className="row ml-auto">
                    {this.state.musicSelectLog.slice(Math.max(this.state.musicSelectLog.length - 2, 0))
                        .map((idx) => (
                            <Card key={idx} className="m-1">
                                <CardTitle>{this.state.musicList[idx].name}</CardTitle>
                                <CardSubtitle>{this.state.musicList[idx].difficulty}</CardSubtitle>
                            </Card>
                        ))}
                </div>
            </div>
        );
    }
}

export default MusicSelect;