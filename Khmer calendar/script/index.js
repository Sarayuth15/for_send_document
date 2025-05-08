// Generate year options select dynamic
const now = new Date()
const currentYear = now.getFullYear()
for (let y = 2000; y <= 2100; y++) {
    $("#year").append(`<option value="${y}">${y}</option>`)
}
$("#year").val(currentYear)
$('#month').val(now.getMonth())

const renderCalendar = (month, year) => {
    // 0 (Sun) to 6 (Sat)
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const getToday = new Date()
    const isTodayMonth = getToday.getFullYear() === year && getToday.getMonth() === month
    const todayDate = getToday.getDate()
    console.log(todayDate)

    let calendarHTML = ''
    let date = 1

    for (let i = 0; i < 6; i++) {
        let row = '<tr>'
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                row += '<td></td>'
            } else if (date > daysInMonth) {
                break;
            } else {
                // Highlight today's date
                const highlight = (isTodayMonth && date === todayDate) ? 'highlight' : ''
                // row += `<td class="${highlight}">${date}<br><small>ថ្ងៃទី ${date}</small></td>`
                row += `<td class="${highlight}"><br><small>ថ្ងៃទី ${date}</small></td>`
                date++
            }
        }
        row += '</tr>'
        calendarHTML += row

        if (date > daysInMonth) break
    }

    $("#calendar-body").html(calendarHTML)
}

// Event change
$("#month, #year").change(function () {
    const month = parseInt($('#month').val())
    const year = parseInt($('#year').val())

    renderCalendar(month, year)
})

// Initial render
renderCalendar(now.getMonth(), now.getFullYear())