// dark mode
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.documentElement.classList.add('dark');
// }
// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
//     if (event.matches) {
//         document.documentElement.classList.add('dark');
//     } else {
//         document.documentElement.classList.remove('dark');
//     }
// });

$(document).ready(function () {
    // File upload functionality
    function setupFileUpload(uploadId, fileId, textId) {
        const uploadArea = $(`#${uploadId}`);
        const fileInput = $(`#${fileId}`);
        const textArea = $(`#${textId}`);

        uploadArea.on('click', function () {
            fileInput.click();
        });

        fileInput.on('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    textArea.val(e.target.result);
                };
                reader.readAsText(file);
            }
        });

        // Drag and drop
        uploadArea.on('dragover', function (e) {
            e.preventDefault();
            $(this).addClass('dragover');
        });

        uploadArea.on('dragleave', function (e) {
            e.preventDefault();
            $(this).removeClass('dragover');
        });

        uploadArea.on('drop', function (e) {
            e.preventDefault();
            $(this).removeClass('dragover');

            const files = e.originalEvent.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = function (e) {
                    textArea.val(e.target.result);
                };
                reader.readAsText(file);
            }
        });
    }

    setupFileUpload('upload1', 'file1', 'text1');
    setupFileUpload('upload2', 'file2', 'text2');

    // Compare functionality
    $('#compareBtn').on('click', function () {
        const text1 = $('#text1').val();
        const text2 = $('#text2').val();

        if (!text1.trim() || !text2.trim()) {
            alert('Please enter or upload text in both files before comparing.');
            return;
        }

        compareTexts(text1, text2);
    });

    // Clear functionality
    $('#clearBtn').on('click', function () {
        $('#text1').val('');
        $('#text2').val('');
        $('#results').hide();
        $('#file1').val('');
        $('#file2').val('');
    });

    function compareTexts(text1, text2) {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');

        const comparison = getLineDifferences(lines1, lines2);
        displayComparison(comparison);

        // Show results
        $('#results').show();

        // Scroll to results
        $('html, body').animate({
            scrollTop: $('#results').offset().top - 50
        }, 500);
    }

    function getLineDifferences(lines1, lines2) {
        const maxLines = Math.max(lines1.length, lines2.length);
        const result = {
            left: [],
            right: [],
            stats: {
                added: 0,
                removed: 0,
                modified: 0,
                unchanged: 0
            }
        };

        for (let i = 0; i < maxLines; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';

            let status = 'unchanged';
            let highlightedLine1 = line1;
            let highlightedLine2 = line2;

            if (line1 === '' && line2 !== '') {
                status = 'added';
                result.stats.added++;
                highlightedLine2 = `<span class="highlight-added">${escapeHtml(line2)}</span>`;
            } else if (line1 !== '' && line2 === '') {
                status = 'removed';
                result.stats.removed++;
                highlightedLine1 = `<span class="highlight-removed">${escapeHtml(line1)}</span>`;
            } else if (line1 !== line2) {
                status = 'modified';
                result.stats.modified++;
                const diff = getCharacterDiff(line1, line2);
                highlightedLine1 = diff.left;
                highlightedLine2 = diff.right;
            } else {
                result.stats.unchanged++;
                highlightedLine1 = escapeHtml(line1);
                highlightedLine2 = escapeHtml(line2);
            }

            result.left.push({
                line: line1,
                highlightedLine: highlightedLine1,
                number: i + 1,
                status: status === 'added' ? 'empty' : status
            });

            result.right.push({
                line: line2,
                highlightedLine: highlightedLine2,
                number: i + 1,
                status: status === 'removed' ? 'empty' : status
            });
        }

        return result;
    }

    function getCharacterDiff(str1, str2) {
        const diff = computeDiff(str1, str2);
        let left = '';
        let right = '';

        for (let i = 0; i < diff.length; i++) {
            const item = diff[i];

            if (item.type === 'equal') {
                const escaped = escapeHtml(item.value);
                left += escaped;
                right += escaped;
            } else if (item.type === 'delete') {
                left += `<span class="highlight-removed">${escapeHtml(item.value)}</span>`;
            } else if (item.type === 'insert') {
                right += `<span class="highlight-added">${escapeHtml(item.value)}</span>`;
            }
        }

        return { left, right };
    }

    function computeDiff(str1, str2) {
        const len1 = str1.length;
        const len2 = str2.length;
        const dp = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));

        // Build the LCS table
        for (let i = 1; i <= len1; i++) {
            for (let j = 1; j <= len2; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Backtrack to find the diff
        const diff = [];
        let i = len1, j = len2;

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
                diff.unshift({ type: 'equal', value: str1[i - 1] });
                i--;
                j--;
            } else if (i > 0 && (j === 0 || dp[i - 1][j] >= dp[i][j - 1])) {
                diff.unshift({ type: 'delete', value: str1[i - 1] });
                i--;
            } else {
                diff.unshift({ type: 'insert', value: str2[j - 1] });
                j--;
            }
        }

        return diff;
    }

    function displayComparison(comparison) {
        // Display stats
        const stats = comparison.stats;
        const totalChanges = stats.added + stats.removed + stats.modified;
        const totalLines = stats.added + stats.removed + stats.modified + stats.unchanged;

        $('#statsContainer').html(`
                    <div class="row text-center">
                        <div class="col-md-2 col-6">
                            <div class="h4 text-success">${stats.added}</div>
                            <div class="small">Added</div>
                        </div>
                        <div class="col-md-2 col-6">
                            <div class="h4 text-danger">${stats.removed}</div>
                            <div class="small">Removed</div>
                        </div>
                        <div class="col-md-2 col-6">
                            <div class="h4 text-warning">${stats.modified}</div>
                            <div class="small">Modified</div>
                        </div>
                        <div class="col-md-2 col-6">
                            <div class="h4 text-muted">${stats.unchanged}</div>
                            <div class="small">Unchanged</div>
                        </div>
                        <div class="col-md-2 col-6">
                            <div class="h4 text-primary">${totalChanges}</div>
                            <div class="small">Total Changes</div>
                        </div>
                        <div class="col-md-2 col-6">
                            <div class="h4">${totalLines}</div>
                            <div class="small">Total Lines</div>
                        </div>
                    </div>
                `);

        // Display comparisons
        displaySide('comparison1', comparison.left);
        displaySide('comparison2', comparison.right);
    }

    function displaySide(containerId, lines) {
        const container = $(`#${containerId}`);
        let html = '';

        lines.forEach(function (lineObj) {
            if (lineObj.status === 'empty') {
                html += `<div class="p-2 border-bottom">
                            <span class="line-number">${lineObj.number}</span>
                            <span class="line-content text-muted">— (empty line)</span>
                        </div>`;
            } else {
                const statusClass = lineObj.status !== 'unchanged' ? lineObj.status : '';
                html += `<div class="p-2 border-bottom ${statusClass}">
                            <span class="line-number">${lineObj.number}</span>
                            <span class="line-content">${lineObj.highlightedLine || '&nbsp;'}</span>
                        </div>`;
            }
        });

        container.html(html);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});