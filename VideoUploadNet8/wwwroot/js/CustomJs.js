let currentIndex = 0;

function openVideoModal(index) {
    currentIndex = index;
    const video = document.getElementById("popupVideo");
    const videoTitle = document.getElementById("videoTitle");
    video.pause();
    video.querySelector("source").src = videoList[currentIndex];
    video.load();
    const modal = new bootstrap.Modal(document.getElementById("videoModal"));
    modal.show();

    document.getElementById("videoModal").addEventListener('shown.bs.modal', function () {
        video.play();
    }, { once: true });
}

function navigateVideo(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = 0;
        return;
    }
    if (currentIndex >= videoList.length) {
        currentIndex = videoList.length - 1;
        return;
    }

    const video = document.getElementById("popupVideo");
    video.pause();
    video.querySelector("source").src = videoList[currentIndex];
    video.load();
    video.play();

}

function pauseVideo() {
    const video = document.getElementById("popupVideo");
    video.pause();
}

document.getElementById('videoModal').addEventListener('hidden.bs.modal', pauseVideo);