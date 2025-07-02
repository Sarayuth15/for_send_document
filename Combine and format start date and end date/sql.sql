SELECT 
    A.REG_DTM, 
    B.USER_NM, 
    B.EMPL_NO, 
    C.BIZ_NM,  
    C.BIZ_NO,  
    E.USER_START_DT, 
    E.USE_END_DT,

    TO_CHAR(TO_DATE(E.USER_START_DT, 'YYYYMMDD'), 'YYYY-MM-DD') || '~' || 
    TO_CHAR(TO_DATE(E.USE_END_DT, 'YYYYMMDD'), 'YYYY-MM-DD') AS USE_DT
    -- Combines and formats the start and end dates into a readable string 
    -- like "2025-06-01~2025-07-01"

FROM ENT_WLFE_LMT_DTL A 
-- Main table: Contains welfare limit usage detail records.

LEFT JOIN ENT_USER_SEQ_NO B 
    ON A.USER_NO = B.USER_NO
-- Joins the user info table to get the user's name and employee number.

LEFT JOIN ENT_INTT_LGDR C 
    ON A.USE_INTT_ID = C.USE_INTT_ID
-- Joins the institution/business ledger to get business name and number.

LEFT JOIN ENT_WLFE_INFO D 
    ON A.WLFE_SEQ = D.WLFE_SEQ AND A.USE_INTT_ID = D.USE_INTT_ID
-- Optionally joins the welfare information table (not selected in the output).

LEFT JOIN ENT_WLFE_LMT_INFO E 
    ON A.WLFE_ID = E.WLFE_ID
-- Joins the welfare limit info table to get the start and end usage dates.

WHERE 1=1
AND A.REG_DTM BETWEEN '20250602000000' AND '20250702235959'

ORDER BY A.REG_DTM DESC
-- Sorts the results by registration date/time in descending order (latest first).
