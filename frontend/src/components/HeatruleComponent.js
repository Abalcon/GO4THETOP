import React from 'react';

export const Heatrule = (props) => {

    return (
        <div>
            <h4>예선 규칙</h4>
            <p>
                - 예선기간 내 지정곡 2곡의 EX Score의 합으로 순위를 결정합니다.<br/>
                - 각 부문별 점수 합 상위 15명이 본선에 진출 합니다.<br/>
                - 예선곡의 난이도는<br/>
                &nbsp;&nbsp;&nbsp;Lower Division 12레벨/Upper Division 15레벨 예정되어 있습니다.<br/>
                - 곡이 결정되면, 규칙내에 해당 곡을 추가 해두도록 하겠습니다.<br/>
                - 예선기간 중 닉네임과 사진을 판독하는 툴을 사용하므로 닉네임 고정을 부탁드립니다.<br/>
                &nbsp;&nbsp;&nbsp;(변경에 의한 누락은 별도 체크가 어려울 수 있습니다.)<br/>
                - 예선 마감 이후의 점수 투고는 받지 않습니다.<br/>
                - 순위 내 동점이 발생할 경우, 투고 시간을 우선으로 고려하되, 플레이 시간이 명확히 판단될 경우<br/>
                &nbsp;&nbsp;&nbsp;플레이 시간을 기준으로 순위를 결정합니다.<br/>
                - 본선 진출 확정 후 기권 및 불참 발생시 차순위에게로 본선 진출 권한이 넘어갑니다.<br/>
                - 시드는 예선 1위에게 주어지며, 조 추첨식때 자신의 조로 한명을 데려올 수 있습니다.<br/>
                - 자세한 문의사항은 이메일 및 대회 공식 트위터로 문의 바랍니다.
            </p>
        </div>
    );
};