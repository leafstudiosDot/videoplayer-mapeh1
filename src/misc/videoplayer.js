import React, { Component, useEffect, useState } from 'react';

class AppVideoPlayer extends Component {
    constructor(props) {
        super(props);
    }
    //Video
    videotogglePlay() {
        if (this.refs.videoRefer.paused) {
            this.refs.playbtn.className = 'pause';
            this.refs.videoRefer.play();
        } else {
            this.refs.playbtn.className = 'play';
            this.refs.videoRefer.pause();
        }
    }
    videotimeUpdate() {
        var progpos = this.refs.videoRefer.currentTime / this.refs.videoRefer.duration;
        this.refs.videoprogressfilled.style.width = progpos * 100 + "%";
        if (this.refs.videoRefer.ended) {
            this.refs.playbtn.className = 'play';
        }
        var cursecs = parseInt(this.refs.videoRefer.currentTime % 60);
        var curmins = parseInt(this.refs.videoRefer.currentTime / 60, 10);
        var dursecs = parseInt(this.refs.videoRefer.duration % 60);
        var durmins = parseInt(this.refs.videoRefer.duration / 60, 10);

        if (cursecs < 10) { cursecs = "0" + cursecs; }
        if (dursecs < 10) { dursecs = "0" + dursecs; }
        if (curmins < 10) { curmins = "0" + curmins; }
        if (durmins < 10) { durmins = "0" + durmins; }

        this.refs.videoCurrent.innerHTML = curmins + ":" + cursecs;
        this.refs.videoDuration.innerHTML = durmins + ":" + dursecs;
    }
    videoProgScrub(e) {
        const scrubTime = (e.clientX / this.refs.videoProgScrub.offsetWidth) * this.refs.videoRefer.duration;
        this.refs.videoRefer.currentTime = scrubTime;
    }
    videoTimeReturnCurrent() {
        return this.refs.videoRefer.currentTime;
    }
    PostVideo(src) {
        const hostname = window.location.hostname;
        const videoSrc = 'http://' + hostname + ':5000/media/streamvideo?src=' + src + '/raw';
        const thumb = 'http://' + hostname + ':5000/media/streamimage?src=' + src + '/thumb';

        function toggleFlash() {
            if (localStorage.flashvideo) {
                localStorage.removeItem('flashvideo')
                window.location.reload();
            } else {
                localStorage.setItem('flashvideo', true)
                window.location.reload();
            }
        }

        let mousedown = false;

        return (
            <div className="Media">
                {localStorage.flashvideo ? (<div>
                    <div className="success" onClick={toggleFlash} style={{ cursor: "pointer" }}>- Click here to play the video using the HTML5 video player</div>
                </div>) : (<div>
                    <div className="success" onClick={toggleFlash} style={{ cursor: "pointer" }}>- Click here to play the video using the legacy Flash video player</div>
                    <div className="VideoPost">
                        <div className="c-video">{/*Video*/}
                            <video ref="videoRefer" id="videoviewport" src={videoSrc} placeholder={thumb} onClick={this.videotogglePlay.bind(this)} onTimeUpdate={this.videotimeUpdate.bind(this)} loop autoPlay />
                            <div className="controls">
                                <div ref="videoProgScrub"
                                    onMouseMove={(e) => mousedown && this.videoProgScrub.bind(this)}
                                    onMouseDown={() => mousedown = true}
                                    onMouseUp={() => mousedown = false}
                                    onClick={this.videoProgScrub.bind(this)}
                                    id="videoprogress-bar">
                                    <div id="videoprogress-loaded">

                                    </div>
                                    <div ref="videoprogressfilled" id="videoprogress-filled">

                                    </div>
                                </div>
                                <div id="videobuttons">
                                    <button ref="playbtn" id="play-pause" className="pause" onClick={this.videotogglePlay.bind(this)}></button>
                                    <span id="videoTime"><span ref="videoCurrent" /> / <span ref="videoDuration" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >)
                }

            </div >
        )
    }

    render() {
        return this.PostVideo(this.props.src)
    }
}

export default AppVideoPlayer;