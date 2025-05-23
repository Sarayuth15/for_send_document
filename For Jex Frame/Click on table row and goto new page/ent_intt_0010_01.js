var _pagingInfo = {
    'SVC_ID': 'ent_intt_0010_01_r001',					// 조회 웹 서비스 ID
    'CNT_OBJ': 'CNT',								// 총건수 필드 ID
    'REC_OBJ': 'REC', 								// 반복부 데이터 필드 ID
    'TBODY_ID': 'TABLE_RESULT',					    // 조회 결과를 표시할 TBODY 태그 ID
    'PAGING_ID': 'CREATE_PG_LINK',					// 페이징을 표시할 DIV ID
    'TABLE_TEMPLATE': '<tr data-use_intt_id=${USE_INTT_ID}>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${BIZ_NM}"><a href="#none" class="txt_b">${BIZ_NM}</a></div></td>'
        + '<td><div>${BIZ_NO}</div></td>'
        + '</tr>'
}

$(function () {
    // 결제사업자 상세조회 Check the details of the payment service provider
    $("#TABLE_RESULT").on("click", ".txt_b", function () {
        var paramDat = {
            USE_INTT_ID: $(this).closest("tr").data("use_intt_id")
        };
        _comm.formDataSubmit("ent_intt_0010_02.act", paramDat);
    });
});

var _thisPage = {

};