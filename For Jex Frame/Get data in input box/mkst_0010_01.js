$(function () {

    _set = {
        SEARCH_BTN: $(".btn_search_tb"),
        EXCEL_BTN: $("#btn_excel"),
        START_DT: $(".dateCombo > input[type=text]:eq(0)"),
        END_DT: $(".dateCombo > input[type=text]:eq(1)"),
        BIZ_NM_EL: $(".tbl_srch").find("td:eq(0) input[type=text]"), // 이용기관명
        BIZ_NO_EL: $(".tbl_srch").find("td:eq(1) input[type=text]"), // 사업자번호
        MLTK_NM_EL: $(".tbl_srch").find("td:eq(2) input[type=text]") // 식관명
    }

    // 조회
    _set.SEARCH_BTN.click(function () {
        _thisPage.search();
    });

    // 이용기관명
    _set.BIZ_NM_EL.keyup(function (e) {
        if (e.keyCode == 13) {
            _thisPage.search();
        }
    });

});

var _thisPage = {
    onload: function () {
        _thisPage.initDate();

    },

    search: function (inputDat) {
        if (!inputDat) inputDat = {};

        if (!inputDat.PAGE_NO) {
            inputDat.PAGE_NO = '1';
        }

        inputDat.START_DT = _set.START_DT.val().replace(/-/g, "");		// 전송일자 시작 
        inputDat.END_DT = _set.END_DT.val().replace(/-/g, "");		// 전송일자 종료
        inputDat.BIZ_NM = $("#BIZ_NM").val();
        inputDat.BIZ_NO = $("#BIZ_NO").val();
        inputDat.MLTK_NM = $("#MLTK_NM").val();

        $(".no_hover").hide();
        console.log("Search =>", inputDat);

        _comm.pagingSearch(_pagingInfo, inputDat, _thisPage.callback);
    },

    initDate: function () {
        _comm.setCalendar(_set.START_DT, moment().add("month", -1).format("YYYY-MM-DD"));
        _comm.setCalendar(_set.END_DT, moment().format("YYYY-MM-DD"));
    },
}