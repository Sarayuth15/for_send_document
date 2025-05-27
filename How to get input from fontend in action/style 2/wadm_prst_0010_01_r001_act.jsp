<%
    // Retrieve the "START_DT" (start date) from the input.
    // StringUtil.null2void() likely converts null values to an empty string ("") to prevent NullPointerExceptions.
    String statDate         = StringUtil.null2void(input.getString("START_DT"));
    String endDate          = StringUtil.null2void(input.getString("END_DT"));
    String bizNmm           = StringUtil.null2void(input.getString("BIZ_NM"));

    if (!StringUtil.isBlank(statDate) && !StringUtil.isBlank(endDate)) {
        dynamic.addSQL(" \n AND A.APV_DY BETWEEN ? AND ?");
        dynamic.addParameter(statDate); // Add the 'statDate' as the first parameter to the SQL query.
        dynamic.addParameter(endDate); // Add the 'endDate' as the second parameter to the SQL query.
    }

    if (!StringUtil.isBlank(bizNmm)) {
        String searchBizNm = "%" + bizNmm + "%";
        dynamic.addSQL(" \n AND B.BIZ_NM LIKE ?");
        dynamic.addParameter("%"+bizNmm+"%");
    }
%>