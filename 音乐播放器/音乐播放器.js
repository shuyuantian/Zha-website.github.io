document.addEventListener('DOMContentLoaded', () => {
    // 等待DOM内容加载完成事件
    const trackList = [
        { title: 'Track 1', src: 'path/to/track1.mp3' },
        { title: 'Track 2', src: 'path/to/track2.mp3' },
        { title: 'Track 3', src: 'path/to/track3.mp3' }
    ];
    // 定义播放列表

    const audio = new Audio();
    // 创建Audio对象
    let currentTrackIndex = 0;
    // 当前播放曲目的索引

    const trackListElement = document.getElementById('track-list');
    // 获取播放列表元素
    const trackTitleElement = document.getElementById('track-title');
    // 获取曲目标题元素
    const progressBar = document.getElementById('progress-bar');
    // 获取进度条元素
    const playButton = document.getElementById('play-button');
    // 获取播放按钮元素
    const prevButton = document.getElementById('prev-button');
    // 获取上一曲按钮元素
    const nextButton = document.getElementById('next-button');
    // 获取下一曲按钮元素
    const volumeBar = document.getElementById('volume-bar');
    // 获取音量控制条元素

    function loadTrack(index) {
        // 加载曲目函数
        const track = trackList[index];
        // 获取曲目
        audio.src = track.src;
        // 设置音频源
        trackTitleElement.textContent = track.title;
        // 设置曲目标题
    }

    function playTrack() {
        // 播放曲目函数
        audio.play();
        // 播放音频
        playButton.textContent = 'Pause';
        // 设置按钮文本为暂停
    }

    function pauseTrack() {
        // 暂停曲目函数
        audio.pause();
        // 暂停音频
        playButton.textContent = 'Play';
        // 设置按钮文本为播放
    }

    function togglePlayPause() {
        // 切换播放/暂停函数
        if (audio.paused) {
            // 如果音频暂停
            playTrack();
            // 播放曲目
        } else {
            pauseTrack();
            // 暂停曲目
        }
    }

    function prevTrack() {
        // 上一曲函数
        if (currentTrackIndex > 0) {
            // 如果当前曲目索引大于0
            currentTrackIndex--;
            // 曲目索引减1
            loadTrack(currentTrackIndex);
            // 加载上一曲
            playTrack();
            // 播放曲目
        }
    }

    function nextTrack() {
        // 下一曲函数
        if (currentTrackIndex < trackList.length - 1) {
            // 如果当前曲目索引小于播放列表长度减1
            currentTrackIndex++;
            // 曲目索引加1
            loadTrack(currentTrackIndex);
            // 加载下一曲
            playTrack();
            // 播放曲目
        }
    }

    function updateProgressBar() {
        // 更新进度条函数
        const progress = (audio.currentTime / audio.duration) * 100;
        // 计算进度
        progressBar.value = progress;
        // 设置进度条值
    }

    function setProgress() {
        // 设置进度函数
        const progress = progressBar.value;
        // 获取进度条值
        audio.currentTime = (progress / 100) * audio.duration;
        // 设置音频当前时间
    }

    function setVolume() {
        // 设置音量函数
        audio.volume = volumeBar.value / 100;
        // 设置音频音量
    }

    trackList.forEach((track, index) => {
        // 遍历播放列表
        const li = document.createElement('li');
        // 创建列表项元素
        li.textContent = track.title;
        // 设置列表项文本
        li.addEventListener('click', () => {
            // 添加点击事件监听器
            currentTrackIndex = index;
            // 设置当前曲目索引
            loadTrack(currentTrackIndex);
            // 加载曲目
            playTrack();
            // 播放曲目
        });
        trackListElement.appendChild(li);
        // 将列表项添加到播放列表元素中
    });

    playButton.addEventListener('click', togglePlayPause);
    // 为播放按钮添加点击事件监听器
    prevButton.addEventListener('click', prevTrack);
    // 为上一曲按钮添加点击事件监听器
    nextButton.addEventListener('click', nextTrack);
    // 为下一曲按钮添加点击事件监听器
    progressBar.addEventListener('input', setProgress);
    // 为进度条添加输入事件监听器
    volumeBar.addEventListener('input', setVolume);
    // 为音量控制条添加输入事件监听器
    audio.addEventListener('timeupdate', updateProgressBar);
    // 为音频添加时间更新事件监听器

    loadTrack(currentTrackIndex);
    // 加载初始曲目
});
