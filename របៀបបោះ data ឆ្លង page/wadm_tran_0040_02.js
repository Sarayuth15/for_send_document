var jexCodeManager = jexjs.plugin('code_manager');

$(function () {
    _thisPage.onload();

    $("#cnlBtn").on("click", function () {
        _comm.goBack("wadm_tran_0040_01");
    });
});

var _thisPage = {

    onload: function () {
        _thisPage.setData();
    },

    setData: function () {
        var inputDat = {
            // Assigns the value of '_paramData.TRX_DT' to the 'TRX_DT' property of 'inputDat'
            TRX_DT: _paramData.TRX_DT,
            TRX_SEQ: _paramData.TRX_SEQ,
            TRX_DV: _paramData.TRX_DV,
        };
        var jexAjax = jexjs.plugin("ajax", "wadm_tran_0040_02_r001");
        jexAjax.setting({
            'suffix': ".jct"
        }); jexAjax.set(inputDat);
        jexAjax.setting('async', false);
        jexAjax.execute(function (dat) {
            _thisPage.resultDat(dat.REC[0]);
        });
    },

};
