const form = document.getElementById('uploadForm');
const result = document.getElementById('uploadResult');
const input = document.getElementById('formFileMultiple');
const maxSizeMB = 200;
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const files = input.files;
    result.className = "";
    result.textContent = "";
    if (files.length === 0) {
        result.className = "alert alert-warning";
        result.textContent = "Please select at least one file.";
        return result;
    }

    for (let file of files) {
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > maxSizeMB) {
            result.className = "alert alert-danger";
            result.textContent = `File "${file.name}" exceeds the maximum allowed size of ${maxSizeMB} MB.`;
            return result;
        }
    }
    const data = new FormData(form);
    const apiUrl = window.appConfig?.baseApiUrl || "/api";
    console.log(apiUrl);
    try {
        const res = await fetch(`${apiUrl}/uploadapi`, {
            method: 'POST',
            body: data
        });

        if (res.ok) {
            result.className = "alert alert-success";
            result.textContent = "Upload successful. Refreshing...";
            // Wait 2 seconds before reload
            setTimeout(() => {
                location.reload();
            }, 2000); // 2000ms = 2 seconds
            //location.reload();
        } else {
            const error = await res.text();
            result.className = "alert alert-danger";
            result.textContent = "Upload failed: " + error;
            return result;
        }
    } catch (err) {
        result.className = "alert alert-danger";
        result.textContent = "❌ Unexpected error: " + err.message;
    }
});

function playVideo(src) {
    const player = document.getElementById('player');
    player.src = src;
    player.style.display = 'block';
    player.load();
    player.play();
}