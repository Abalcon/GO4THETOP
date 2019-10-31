import React, {Component} from 'react';
import {
  Card, CardImg, CardTitle, CardSubtitle, Col, Row,
  Button, Input, ListGroup, ListGroupItem
} from "reactstrap";
import {G4TTMusics} from "../shared/musics";
import RoundSelect from "./RoundSelectComponent";

class MusicSelect extends Component {

    constructor(props) {
        super(props);

        this.loadMusic = this.loadMusic.bind(this);
        this.clearMusic = this.clearMusic.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.myRef = React.createRef();

        this.state = {
            musicNumber: 0,
            musicList: [],
          filteredList: [],
          musicSelectLog: [],
          selectedMusic: null,
          decidedMusic: null
        };
    }

    loadMusic(round) {
        this.setState({
            musicList: G4TTMusics[round],
            musicNumber: G4TTMusics[round].length,
            musicSelectLog: [] // clear random selection record
        });
    }

    clearMusic() {
        this.setState({
            musicNumber: 0,
            musicList: [],
            musicSelectLog: [],

        });
    }

  handleChange(event) {
    // TODO: 입력 값에 따라 filteredList를 결정
    if (event.target.value !== '') {
      let updatedList = this.state.musicList;
      updatedList = updatedList.filter((item) =>
        item.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1 ||
        (item.read !== undefined && item.read.toLowerCase().search(event.target.value.toLowerCase()) !== -1)
      );
      this.setState({
        filteredList: updatedList
      });
        }
        else {
            this.setState({
              filteredList: []
            });
    }
  }

  handleSelect(event) {
    //console.log(event.target.value);
    this.setState({
      selectedMusic: this.state.musicList.find((music) =>
        music.name === event.target.value)
    });
  }

  decision = null;

  makeDecision() {
    if (this.state.selectedMusic !== null) {
      this.setState({
        decidedMusic: this.state.selectedMusic
      });
      console.log("Now Scrolling to: " + this.myRef.current.offsetTop)
      window.scrollTo(0, this.myRef.current.offsetTop)
    } else
      alert('곡을 먼저 선택하고 결정하세요');
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

      const showSelection = () => {
        if (this.state.selectedMusic !== null) {
          return (
            <Card className="m-1">
              <CardImg top src={"assets/images/" + this.state.selectedMusic.image}
                       style={borderColor(this.state.selectedMusic.difficulty)} alt="SelectedMusic"/>
              <CardTitle tag="h4">{this.state.selectedMusic.name}</CardTitle>
              <CardSubtitle tag="h4">{this.state.selectedMusic.difficulty}{' '}
                {this.state.selectedMusic.level}</CardSubtitle>
            </Card>
          );
        } else {
          return (
            <Card className="m-1">
              <CardImg top src="assets/images/G4TT_Logo.jpeg" alt="SelectMusic"/>
              <CardTitle tag="h4">곡을 선택하세요</CardTitle>
              <CardSubtitle tag="h4">검색 문자열을 입력하여 클릭</CardSubtitle>
            </Card>
          );
        }
      };

      const showDecision = () => {
        if (this.state.decidedMusic !== null) {
          return (
            <Card className="m-1">
              <CardImg top src={"assets/images/" + this.state.decidedMusic.image}
                       style={borderColor(this.state.decidedMusic.difficulty)} alt="SelectedMusic"/>
              <CardTitle tag="h4">{this.state.decidedMusic.name}</CardTitle>
              <CardSubtitle tag="h4">{this.state.decidedMusic.difficulty}{' '}
                {this.state.decidedMusic.level}</CardSubtitle>
            </Card>
          );
        } else {
          return (
            <Card className="m-1">
              <CardImg top src="assets/images/G4TT_Logo.jpeg" alt="SelectMusic"/>
              <CardTitle tag="h4">곡을 선택하세요</CardTitle>
              <CardSubtitle tag="h4">검색 문자열을 입력하여 클릭</CardSubtitle>
            </Card>
          );
        }
      };

        return (
            <div className="container">
                <h3>라운드 선택 - 지정곡 불러오기</h3>
                <div className="row ml-auto">
                  <RoundSelect value="Lower_WSF" description="Lower 승자전"
                               onSelect={(value) => this.loadMusic(value)}/>
                  <RoundSelect value="Lower_WSF" description="Lower 패자 2차"
                               onSelect={(value) => this.loadMusic(value)}/>
                  <RoundSelect value="Lower_F" description="Lower 결승"
                               onSelect={(value) => this.loadMusic(value)}/>
                  <RoundSelect value="Upper_WSF" description="Upper 승자전"
                               onSelect={(value) => this.loadMusic(value)}/>
                  <RoundSelect value="Upper_WSF" description="Upper 패자 2차"
                               onSelect={(value) => this.loadMusic(value)}/>
                  <RoundSelect value="Upper_F" description="Upper 결승"
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
              <h3>검색</h3>
                <div className="m-1">
                  <Row>
                    <Col md={6}>
                      <Input name="searchMusic"
                             onChange={(value) => this.handleChange(value)}
                             placeholder="원하는 곡을 검색하세요. 읽는 방법으로도 검색됩니다"/>
                    </Col>
                    <Col md={6}>
                      <Button color="primary" value="makeDecision"
                              disabled={this.state.selectedMusic === null}
                              onClick={() => this.makeDecision()}>
                        Let's Heat it up with this Number!
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <ListGroup>
                        {this.state.filteredList.slice(0, Math.min(8, this.state.filteredList.length))
                          .map((music, idx) => (
                              <ListGroupItem key={idx} tag="button" value={music.name}
                                             action onClick={(e) => this.handleSelect(e)}>
                                {music.name}<br/>{music.difficulty}{' '}{music.level}
                              </ListGroupItem>
                            )
                          )}
                      </ListGroup>
                    </Col>
                    <Col md={6}>
                      <div className="row ml-auto">
                        {showSelection()}
                      </div>
                    </Col>
                  </Row>
                </div>
              <h3>선곡 결과</h3>
              <div className="row ml-auto" ref={this.myRef}>
                {showDecision()}
                </div>
            </div>
        );
    }
}

export default MusicSelect;
