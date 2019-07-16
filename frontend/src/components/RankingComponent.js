import React from "react";
// import {Card, CardBody, CardHeader, CardSubtitle, CardText, CardTitle} from "reactstrap";
// import {Loading} from './LoadingComponent';
//
// function RenderContender ({contender}) {
//     return (
//         <Card>
//             <CardHeader tag="h3">{contender.fullName}</CardHeader>
//             <CardBody>
//                 <CardTitle>인게임 이름: {contender.cardName} / SNS: {contender.sns}</CardTitle>
//                 <CardSubtitle>참가 부문: Lower - {String(contender.lower)} / Upper - {String(contender.upper)} / Watch - {String(contender.watching)}</CardSubtitle>
//                 <CardText>한마디: {contender.comments}</CardText>
//             </CardBody>
//         </Card>
//     );
// }

const Ranking = (props) => {
    // const contenders = props.contenders.map((contender) => {
    //     return (
    //         <div key={contender.id} className="col-12 m-1">
    //             <RenderContender contender={contender}/>
    //         </div>
    //     );
    // });
    //
    // if (props.isLoading) {
    //     return (
    //         <div>
    //             <h4>예선 순위</h4>
    //             <p>Go4TheTop 3회 예선은 아직 시작하지 않았습니다!</p>
    //             <Loading />
    //         </div>
    //     );
    // }
    // else if (props.errMsg) {
    //     return (
    //         <div>
    //             <h4>예선 순위</h4>
    //             <p>Go4TheTop 3회 예선은 아직 시작하지 않았습니다!</p>
    //             <h4>{props.errMsg}</h4>
    //         </div>
    //     );
    // }
    // else {
    //     return (
    //         <div>
    //             <h4>예선 순위</h4>
    //             <p>Go4TheTop 3회 예선은 아직 시작하지 않았습니다!</p>
    //             <div className="row">
    //                 {contenders}
    //             </div>
    //         </div>
    //     );
    // }
    return (
        <div>
            <h4>예선 순위</h4>
            <p>Go4TheTop 3회 예선은 아직 시작하지 않았습니다!</p>
        </div>
    );
};

export default Ranking;