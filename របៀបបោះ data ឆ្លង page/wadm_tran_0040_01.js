var jexCodeManager = jexjs.plugin('code_manager');

var _pagingInfo = {
    'SVC_ID': 'wadm_tran_0040_01_r001',
    'CNT_OBJ': 'CNT',								
    'REC_OBJ': 'REC', 								
    'TBODY_ID': 'REC',								
    'PAGING_ID': 'CREATE_PG_LINK',						
    'TABLE_TEMPLATE': '<tr data-trxdv=${TRX_DV} data-trxseq=${TRX_SEQ} data-trxdt=${TRX_DT}>'            
        + '<td><div class="tx_ellipsis_nm mw95per click_detail" title="${BIZ_NM}"><a href="#none" class="txt_b">${BIZ_NM}</a></div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${BIZ_NO}">${BIZ_NO}</div></td>'
        + '<td><div>${_thisPage.fn_inttDvCd(INTT_DV_CD)}</div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${USER_NM}">${_thisPage.maskUserName(USER_NM)}</div></td>'
        + '<td><div>${EMPL_NO}</div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${TRX_DV}">${_thisPage.fn_trxDv(TRX_DV)}</div></td>'
        + '<td><div>${_thisPage.fn_txStts(TX_STS)}</div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${RSLT_CD}">${RSLT_CD}</div></td>'
        + '<td><div>${LMT_NM}</div></td>'
        + '<td><div>${formatter.card(_comm.null2Void(CARD_NO))}</div></td>'
        + '<td><div>${formatter.datetime(_comm.null2Void(TRX_DTM),"yyyy-mm-dd hh24:mi:ss")}</div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${TRX_SEQ}" style="text-align:right">${TRX_SEQ}</div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${_thisPage.fn_txStts(TRX_AMT)}">${_thisPage.moneyForm(TRX_AMT)}</div></td>'
        + '<td><div class="tx_ellipsis_nm mw95per" title="${AFT_LMT_AMT}">${_thisPage.moneyForm(AFT_LMT_AMT)}</div></td>'
        + '<td></td>'
        + '</tr>'
}
$(function () {

    _thisPage.onload();

    $("#REC").delegate(".click_detail", "click", function () {
        var paramDat = {
            TRX_DT: $(this).closest("tr").data("trxdt"),
            TRX_SEQ: $(this).closest("tr").data("trxseq"),
            TRX_DV: $(this).closest("tr").data("trxdv"),
        };
        _comm.formDataSubmit("wadm_tran_0040_02.act", paramDat);
    });
   
});

var _thisPage = {
    onload: function () {
    },

    
}