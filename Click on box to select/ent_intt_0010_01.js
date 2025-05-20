$(function () {
    _set = {
        INTT_DV_CD_EL: $(".combo2_bg:eq(0) > a"),   // 기관구분코드
        STTS_EL: $(".combo2_bg:eq(1) > a"),         // 상태
    };

    $(document).on("click", "html", function (e) {
        var _target = $(e.target);
        var except = _target.parent().next(".layer_combo2");
        $(".layer_combo2").not(except).hide();
    });

    // 기관구분코드
    _set.INTT_DV_CD_EL.click(function () {
        $(this).parent().next().show();
    });
    $(".layer_combo2:eq(0) li").click(function () {
        _set.INTT_DV_CD_EL.data("intt_dv_cd", $(this).data("intt_dv_cd"));
        $(".selected_item:eq(0)").text($(this).text());

        _thisPage.search();
    });

    // 상태
    _set.STTS_EL.click(function () {
        $(this).parent().next().show();
    });
    $(".layer_combo2:eq(1) li").click(function () {
        _set.STTS_EL.data("stts", $(this).data("stts"));
        $(".selected_item:eq(1)").text($(this).text());
    });

    // html 클릭시 모든 레이어 닫기 (Close all layers when clicked)
    $(document).on("click", "html", function (e) {
        var _target = $(e.target);

        if (!(_target.is(".selected_item:eq(0)") || _target.is(".arrow:eq(0)"))) {
            $(".layer_combo2:eq(0)").hide();
        }
        
        if (!(_target.is(".selected_item:eq(1)") || _target.is(".arrow:eq(1)"))) {
            $(".layer_combo2:eq(1)").hide();
        }
    });
});

var _thisPage = {

    search: function (inputDat) {

        if (!inputDat) inputDat = {};
        inputDat.INTT_DV_CD = _comm.null2Void(_set.INTT_DV_CD_EL.data("intt_dv_cd"));   // 기관구분코드
        inputDat.STTS = _set.STTS_EL.data("stts");	// 상태

        if (!inputDat.PAGE_NO) {
            inputDat.PAGE_NO = '1';
        }
    },
};