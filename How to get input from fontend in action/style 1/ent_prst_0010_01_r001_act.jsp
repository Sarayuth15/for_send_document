<%
    // Check if the "BIZ_NM" (business name) input field is NOT blank.
    if (!StringUtil.isBlank(input.getString("BIZ_NM"))) {
        // If BIZ_NM is not blank, append a new condition to the SQL query.
        dynamic.addSQL(" \n AND B.BIZ_NM LIKE '%'" + input.getString("BIZ_NM") + "% '");
    }
%>