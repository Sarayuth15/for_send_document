<% 
    // Dynamic
    IDODynamic dynamic = new IDODynamic();

    // Get the start date from the input parameters and convert to string
    String startDate    = StringUtil(input.getString("START_DT"));

    // Get the end date from the input parameters and convert to string
    String endDate    = StringUtil(input.getString("ENT_DT"));

    // If both start date and end date are not empty or null
    if (!StringUtil.isBlank(startDate) && !StringUtil.isBlank(endDate)) {

        // Add SQL condition to filter between the start and end datetime
        dynamic.addSQL("\n AND MAIN.REQ_DT BETWEEN ? AND ?");

        // Add start date with time 00:00:00 (start of the day)
        dynamic.addParameter(startDate +"000000");

        // Add end date with time 23:59:59 (end of the day)
        dynamic.addParameter(endDate +"235959");
    }
%>

<%-- Result --%>
WHERE 1=1
AND MAIN.REQ_DT BETWEEN '20250601000000' AND '20250630235959'