$(function () {

    _thisPage.onload();

});

var _thisPage = {

    onload: function () {
        _comm.searchOnload(_paramData, _thisPage.search);
    },

    search: function () {
        var inputDat = _thisPage.getInputJSON() || {};

        if (!inputDat.PAGE_NO) {
            inputDat.PAGE_NO = '1';
        }
        inputDat.PAGE_SZ = $("#PAGE_SZ").text();


        // 최초 세팅된 function 재호출
        $(".no_hover").removeAttr("hidden");
        _comm.pagingSearch(_pagingInfo, inputDat, _thisPage.callback);
    },

    callback: function (dat) {
        if (!_comm.isNullChk(dat.REC)) $(".no_hover").attr("hidden", "hidden");
        $(".unit_wrap").remove();
        // $(".paging_wrap").append('<div class="unit_wrap"><div class="totalSum"><p>총 ' + changeIntMoneyType(dat.CNT.toString()) + '건</p></div></div>');
        $(".paging_wrap").append('<div class="unit_wrap" style="margin-top:30px;"><div class="totalSum"><p>총 ' + changeIntMoneyType(dat.CNT.toString()) + '건 / ' +
            '총 결제금액 : ' + changeIntMoneyType(dat.ALL_SETL_AMT.toString()) + ' / ' +
            '총 취소금액 : ' + changeIntMoneyType(dat.ALL_CAN_AMT.toString()) + ' / ' +
            '총 환불금액 : ' + changeIntMoneyType(dat.ALL_RFND_AMT.toString()) +
            '</p></div></div>');
    },


}















