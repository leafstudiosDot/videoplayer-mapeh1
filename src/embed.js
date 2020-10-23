import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Twemoji } from 'react-emoji-render';
import axios from 'axios';

import hodotslogo from './images/logo.png';
import bufferingicon from './images/loading.png';
import DefPFP from './images/defaultpicture.png';

import VideoTest2 from './misc/videotest2.mp4'

import queryString from 'query-string'
class EmbeddedPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      height: window.innerHeight,

      postlink: '',
      loadingpost: false,
      posttitle: 'St. Servus presents the Bad Guys',
      postauthor: 'aliamanuba',
      postcreated: '23-10-2020',
      type: 'text',
      nsfw: false,

      //Media
      thumb: '',
      video: '',

      error: '',
    }
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount = () => {
    this.setState({ loadingpost: true })
    window.addEventListener('resize', this.updateDimensions);
    this.SendAPI()
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  SendAPI() {
    //const hostname = window.location.hostname;
    //let postlink = queryString.parse(window.location.search).p
    //this.setState({ postlink: postlink })
    /*if (postlink) {
      axios.get(`http://` + hostname + `/posts/postpage?link=${postlink}`)
        .then((res) => {
          if (res.data.options.status === "deleted") {
            this.setState({ error: "460" })
            this.setState({ loadingpost: false })
            return
          }
          if (res.data.options.status === "public" || res.data.options.status === "link") {
            this.setState({ posttitle: res.data.title })
            this.setState({ postcreated: res.data.date })
            this.setState({ type: res.data.type })
            this.setState({ nsfw: res.data.options.nsfw })
            this.setState({ video: res.data.media.videosrc })
            this.setState({ thumb: res.data.media.videothumbsrc })

            axios.get(`http://` + hostname + `/accounts/getid?id=${res.data.userid}`)
              .then((resuser) => {
                this.setState({ postauthor: resuser.data.username })
                if (!resuser.data.status.banned) {
                  if (!this.state.nsfw) {
                    this.setState({ loadingpost: false })
                  } else {
                    this.setState({ error: "512" })
                    this.setState({ loadingpost: false })
                    return
                  }
                } else {
                  this.setState({ error: "478" })
                  this.setState({ loadingpost: false })
                  return
                }
              })

          } else if (res.data.options.status === "tosviolation") {
            this.setState({ error: "430" })
            this.setState({ loadingpost: false })
            return
          } else if (res.data.options.status === "cgviolation") {
            this.setState({ error: "452" })
            this.setState({ loadingpost: false })
            return
          } else {
            this.setState({ error: "450" })
            this.setState({ loadingpost: false })
            return
          }
        })
        .catch((err) => {
          this.setState({ loadingpost: false })
          this.setState({ error: '404' })
        })
    } else {
      this.setState({ loadingpost: false })
      this.setState({ error: '404' })
    }
    */
   this.setState({loadingpost: false})
  }

  ProfilePicHoverText1() {
    this.refs.headertext1.style.opacity = '0%';
    this.refs.headertext2.style.opacity = '100%';
  }
  ProfilePicHoverText2() {
    this.refs.headertext1.style.opacity = '100%';
    this.refs.headertext2.style.opacity = '0%';
  }

  hodotsHover1() {
    this.refs.viewonhodotspopup.style.opacity = "100%"
  }
  hodotsHover2() {
    this.refs.viewonhodotspopup.style.opacity = "0%"
  }

  openTabFromMain() {
    const hostname = window.location.hostname;
    //window.open(`http://${hostname}/post?p=${this.state.postlink}`);
  }
  openTabFromHome() {
    const hostname = window.location.hostname;
    //window.open(`http://${hostname}/`);
  }

  //Video
  PlayEmbedVideo() {
    this.refs.PostVideoThumb.style.display = "none";
    this.refs.playbtn.className = 'pause';
    this.refs.videoRefer.play();
  }
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
    const thumb = null;

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
      <div className="Media"><div>
        <div className="VideoPost">
          <div className="c-video">{/*Video*/}
            <video height={this.state.height} ref="videoRefer" id="videoviewport" src={VideoTest2} onClick={this.videotogglePlay.bind(this)} onTimeUpdate={this.videotimeUpdate.bind(this)} loop />
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
                <button ref="playbtn" id="play-pause" class="pause" onClick={this.videotogglePlay.bind(this)}></button>
                <span id="videoTime"><span ref="videoCurrent" /> / <span ref="videoDuration" /></span>
              </div>
            </div>
          </div>
        </div>
      </div >

      </div >
    )
  }

  //Errors
  //404
  /*PostNotFound() {
    return (
      <div className="error">
        <Helmet>
          <title>Post Not Found - hodots.</title>
        </Helmet>
        <img src={hodotslogo} onClick={this.openTabFromHome.bind(this)} /> <text>- Post not found</text></div>
    )
  }*/
  //460
  /*PostDeletedByUser() {
    return (
      <div className="error">
        <Helmet>
          <title>Post Unavailable - hodots.</title>
        </Helmet>
        <img src={hodotslogo} onClick={this.openTabFromHome.bind(this)} /> <text>- Post deleted by user</text></div>
    )
  }*/



  render() {
    switch (this.state.error) {
      case "404":
        return (
          !this.state.loadingpost ? (
            this.PostNotFound()
          ) : (<div><div id="loadingbg"><img id="loadingpost" draggable={false} width="150px" src={bufferingicon} /></div><div id="loadingtext">Loading Post...</div></div>)
        )
      case "460":
        return (
          !this.state.loadingpost ? (
            this.PostDeletedByUser()
          ) : (<div><div id="loadingbg"><img id="loadingpost" draggable={false} width="150px" src={bufferingicon} /></div><div id="loadingtext">Loading Post...</div></div>)
        )
      case "512":
        return (
          !this.state.loadingpost ? (
            <div className="error">
              <Helmet>
                <title>Post Unavailable - hodots.</title>
              </Helmet>
              <img src={hodotslogo} onClick={this.openTabFromHome.bind(this)} /> <text>- This post has NSFW content, <textlinktomain style={{ cursor: 'pointer' }} onClick={this.openTabFromMain.bind(this)}>Click here to view the page.</textlinktomain></text>
            </div>
          ) : (<div><div id="loadingbg"><img id="loadingpost" draggable={false} width="150px" src={bufferingicon} /></div><div id="loadingtext">Loading Post...</div></div>)
        )
      default:
        const hostname = window.location.hostname
        return (
          !this.state.loadingpost ? (
            <div className="Post">
              <Helmet>
                <title>{this.state.posttitle} - hodots.</title>
              </Helmet>
              <div id="headerPost">
                <texts>
                  <text1 ref="headertext1">
                    {this.state.posttitle}
                  </text1>
                  <text2 ref="headertext2">
                    {this.state.postauthor} since {this.state.postcreated}
                  </text2>
                </texts>
                <div id="profilepicture"><img onMouseOver={this.ProfilePicHoverText1.bind(this)} onMouseOut={this.ProfilePicHoverText2.bind(this)} src={DefPFP} id="profilepicimage" /></div>
                <div id="hodotslogo" onClick={this.openTabFromMain.bind(this)}><img src={hodotslogo} onMouseOver={this.hodotsHover1.bind(this)} onMouseOut={this.hodotsHover2.bind(this)} /></div>
                <div id="hodotslogoonhover" ref="viewonhodotspopup">hodots. Video Player</div>

              </div>

              <div>
                <div ref="PostVideoThumb" id="videothumbdiv" onClick={this.PlayEmbedVideo.bind(this)}>
                  <textvideothumb>
                    Click to play the video
                  </textvideothumb>
                  <img src={`http://` + hostname + `:5000/media/streamimage?src=${this.state.thumb}`} id="videothumbnail" />
                </div>
                <div ref="PostVideo">
                  {this.PostVideo(this.state.video)}</div>
              </div>

            </div>
          ) : (<div><div id="loadingbg"><img id="loadingpost" draggable={false} width="150px" src={bufferingicon} /></div><div id="loadingtext">Loading Post...</div></div>)
        );
    }
  }
}

export default EmbeddedPost;
