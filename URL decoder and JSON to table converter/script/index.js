$(document).ready(function () {
    // Dark mode detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        $('html').addClass('dark');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
            $('html').addClass('dark');
        } else {
            $('html').removeClass('dark');
        }
    });

    // Tab switching
    $('#url-tab').on('click', function () {
        $('#url-tab').addClass('tab-active');
        $('#json-tab').removeClass('tab-active');
        $('#url-section').removeClass('hidden');
        $('#json-section').addClass('hidden');
    });

    $('#json-tab').on('click', function () {
        $('#json-tab').addClass('tab-active');
        $('#url-tab').removeClass('tab-active');
        $('#json-section').removeClass('hidden');
        $('#url-section').addClass('hidden');
    });

    // URL Decoder functionality
    $('#decode-btn').on('click', function () {
        try {
            const input = $('#url-input').val().trim();
            if (!input) {
                $('#url-output').html('<span class="text-gray-500 dark:text-gray-400">Please enter some URL-encoded text.</span>');
                return;
            }

            const decoded = decodeURIComponent(input);

            // Try to detect and format different types of content
            if (decoded.includes('?') && decoded.includes('=')) {
                // Format as URL with query parameters
                formatUrlWithParams(decoded);
            } else if ((decoded.startsWith('{') && decoded.endsWith('}')) ||
                (decoded.startsWith('[') && decoded.endsWith(']'))) {
                // Try to format as JSON if it looks like JSON
                formatJsonContent(decoded);
            } else if (decoded.includes('\n') || decoded.length > 100) {
                // Format multi-line content or long content with better readability
                formatTextContent(decoded);
            } else {
                // Basic formatting for simple content
                $('#url-output').html(`<div class="p-2 font-mono text-sm whitespace-pre-wrap">${escapeHtml(decoded)}</div>`);
            }
        } catch (error) {
            $('#url-output').html(`<span class="text-red-500">Error: ${error.message}</span>`);
        }
    });

    // Function to format a URL with query parameters
    function formatUrlWithParams(url) {
        try {
            let formattedOutput = '';

            // Split URL into base and query string
            let [baseUrl, queryString] = url.split('?');

            // Format the base URL
            formattedOutput += `<div class="mb-3 font-medium">
                        <span class="text-primary">Base URL:</span> 
                        <span class="font-mono">${escapeHtml(baseUrl)}</span>
                    </div>`;

            // If there are query parameters, format them
            if (queryString) {
                formattedOutput += `<div class="mb-2 font-medium text-primary">Query Parameters:</div>`;
                formattedOutput += `<table class="w-full mb-3 text-sm">
                            <thead>
                                <tr>
                                    <th class="text-left py-2 px-3 w-1/3">Parameter</th>
                                    <th class="text-left py-2 px-3">Value</th>
                                </tr>
                            </thead>
                            <tbody>`;

                // Split into individual parameters
                const params = queryString.split('&');

                $.each(params, function (index, param) {
                    const [key, value] = param.split('=');
                    formattedOutput += `<tr>
                                <td class="py-2 px-3 font-mono font-medium">${escapeHtml(key || '')}</td>
                                <td class="py-2 px-3 font-mono">${escapeHtml(value || '')}</td>
                            </tr>`;
                });

                formattedOutput += `</tbody></table>`;
            }

            // Add full decoded URL
            formattedOutput += `<div class="mt-4 pt-3 border-t border-gray-300 dark:border-gray-700">
                        <div class="font-medium text-primary mb-1">Full Decoded URL:</div>
                        <div class="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">${escapeHtml(url)}</div>
                    </div>`;

            $('#url-output').html(formattedOutput);
        } catch (error) {
            // If there's an error in the formatting logic, fall back to simple display
            $('#url-output').html(`<div class="p-2 font-mono text-sm whitespace-pre-wrap">${escapeHtml(url)}</div>`);
        }
    }

    // Function to format multi-line or long text content
    function formatTextContent(text) {
        try {
            let formattedOutput = '';

            // Check if it looks like a multi-line format
            if (text.includes('\n')) {
                // Split by lines for better formatting
                const lines = text.split('\n');

                formattedOutput += `<div class="mb-2 font-medium text-primary">Formatted Text:</div>`;
                formattedOutput += `<div class="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">`;

                $.each(lines, function (index, line) {
                    if (line.includes(':')) {
                        // This might be a key-value pair
                        const [key, ...valueParts] = line.split(':');
                        const value = valueParts.join(':');

                        formattedOutput += `<div class="mb-1 flex">
                                    <span class="font-medium text-primary mr-2">${escapeHtml(key.trim())}:</span>
                                    <span>${escapeHtml(value.trim())}</span>
                                </div>`;
                    } else {
                        formattedOutput += `<div class="mb-1">${escapeHtml(line)}</div>`;
                    }
                });

                formattedOutput += `</div>`;
            } else {
                // For long text without line breaks, add some structure
                formattedOutput += `<div class="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm leading-relaxed">${escapeHtml(text)}</div>`;
            }

            $('#url-output').html(formattedOutput);
        } catch (error) {
            // Fall back to simple display
            $('#url-output').html(`<div class="p-2 font-mono text-sm whitespace-pre-wrap">${escapeHtml(text)}</div>`);
        }
    }

    // Function to format JSON content with proper indentation and line breaks
    function formatJsonContent(text) {
        try {
            // Try to parse the JSON to validate it and format it properly
            const jsonObj = JSON.parse(text);

            // Format the JSON with 4-space indentation and line breaks
            const formattedJson = JSON.stringify(jsonObj, null, 4);

            // Apply syntax highlighting to the formatted JSON
            let highlighted = formattedJson.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function (match) {
                    let cls = 'text-gray-800 dark:text-gray-300'; // default for numbers
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            // This is a key
                            cls = 'text-primary font-medium';
                            // Remove the trailing colon from the match for better styling
                            match = match.replace(/:$/, '');
                            return `<span class="${cls}">${match}</span>:`;
                        } else {
                            // This is a string
                            cls = 'text-green-600 dark:text-green-400';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'text-blue-600 dark:text-blue-400';
                    } else if (/null/.test(match)) {
                        cls = 'text-red-600 dark:text-red-400';
                    }
                    return `<span class="${cls}">${match}</span>`;
                });

            // Replace line breaks and spaces with HTML elements for proper formatting
            highlighted = highlighted.replace(/\n/g, '<br>');
            highlighted = highlighted.replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;');

            // Create the formatted output with a title
            let formattedOutput = `
                        <div class="mb-2 font-medium text-primary">Formatted JSON:</div>
                        <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm overflow-x-auto">
                            ${highlighted}
                        </div>
                    `;

            $('#url-output').html(formattedOutput);
        } catch (error) {
            // If it's not valid JSON, display the error and show the content as text
            $('#url-output').html(`
                        <div class="text-red-500 mb-2">Invalid JSON: ${error.message}</div>
                        <div class="p-2 font-mono text-sm whitespace-pre-wrap">${escapeHtml(text)}</div>
                    `);
        }
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        const div = $('<div>');
        div.text(text);
        return div.html();
    }

    $('#clear-url-btn').on('click', function () {
        $('#url-input').val('');
        $('#url-output').html('');
    });

    // JSON to Table functionality
    $('#convert-btn').on('click', function () {
        try {
            const input = $('#json-input').val().trim();
            if (!input) {
                $('#json-output').html('<span class="text-gray-500 dark:text-gray-400">Please enter some JSON data.</span>');
                return;
            }

            const jsonData = JSON.parse(input);

            if (Array.isArray(jsonData) && jsonData.length > 0) {
                // Handle array of objects (most common case)
                const table = createTableFromArray(jsonData);
                $('#json-output').empty().append(table);
            } else if (typeof jsonData === 'object' && jsonData !== null) {
                // Handle single object
                const table = createTableFromObject(jsonData);
                $('#json-output').empty().append(table);
            } else {
                // Handle primitive values or empty arrays
                $('#json-output').html(`<div class="p-2">${formatValue(jsonData)}</div>`);
            }
        } catch (error) {
            $('#json-output').html(`<span class="text-red-500">Error: ${error.message}</span>`);
        }
    });

    $('#clear-json-btn').on('click', function () {
        $('#json-input').val('');
        $('#json-output').html('');
    });

    // Function to create a table from an array of objects
    function createTableFromArray(data) {
        if (data.length === 0) {
            return $('<div>').text('Empty array');
        }

        const table = $('<table>');
        const thead = $('<thead>');
        const tbody = $('<tbody>');
        const headerRow = $('<tr>');

        // Create headers from the first object's keys
        const firstItem = data[0];
        let keys = [];

        if (typeof firstItem === 'object' && firstItem !== null) {
            keys = Object.keys(firstItem);

            $.each(keys, function (index, key) {
                const th = $('<th>').text(key);
                headerRow.append(th);
            });

            thead.append(headerRow);
            table.append(thead);

            // Create rows for each object
            $.each(data, function (index, item) {
                const row = $('<tr>');

                $.each(keys, function (i, key) {
                    const td = $('<td>');
                    const value = item[key];

                    if (typeof value === 'object' && value !== null) {
                        // Format with 4-space indentation for consistency
                        const formattedValue = JSON.stringify(value, null, 4);
                        td.html(`<pre class="text-xs whitespace-pre-wrap">${formattedValue}</pre>`);
                    } else {
                        td.text(value !== undefined ? value : '');
                    }

                    row.append(td);
                });

                tbody.append(row);
            });
        } else {
            // Handle array of primitives
            const th = $('<th>').text('Value');
            headerRow.append(th);
            thead.append(headerRow);

            $.each(data, function (index, item) {
                const row = $('<tr>');
                const td = $('<td>');

                if (typeof item === 'object' && item !== null) {
                    // Format with 4-space indentation for consistency
                    const formattedValue = JSON.stringify(item, null, 4);
                    td.html(`<pre class="text-xs whitespace-pre-wrap">${formattedValue}</pre>`);
                } else {
                    td.text(item !== undefined ? item : '');
                }

                row.append(td);
                tbody.append(row);
            });
        }

        table.append(tbody);
        return table;
    }

    // Function to create a table from a single object
    function createTableFromObject(data) {
        const table = $('<table>');
        const tbody = $('<tbody>');

        const keys = Object.keys(data);

        $.each(keys, function (index, key) {
            const row = $('<tr>');
            const keyCell = $('<th>').text(key);
            const valueCell = $('<td>');

            const value = data[key];
            if (typeof value === 'object' && value !== null) {
                // Format with 4-space indentation for consistency
                const formattedValue = JSON.stringify(value, null, 4);
                valueCell.html(`<pre class="text-xs whitespace-pre-wrap">${formattedValue}</pre>`);
            } else {
                valueCell.text(value !== undefined ? value : '');
            }

            row.append(keyCell, valueCell);
            tbody.append(row);
        });

        table.append(tbody);
        return table;
    }

    // Helper function to format values for display
    function formatValue(value) {
        if (typeof value === 'object' && value !== null) {
            // Use 4-space indentation for consistency with other functions
            return `<pre class="whitespace-pre-wrap">${JSON.stringify(value, null, 4)}</pre>`;
        } else {
            return String(value);
        }
    }
});