<template>
  <div class="broad-element">
    <div class="thumb-wrap">
      <a v-bind:href="getPlayerLink" target="_blank">
        <img
          class="thumb"
          loading="lazy"
          v-bind:src="broad.broad_thumb"
          v-bind:alt="broad.broad_title"
          @error="onImgError"
        />
      </a>
      <div v-if="broad.visit_broad_type === '0'" class="allow">탐방 허용</div>
      <div class="broad-start">{{ getBroadStart }} 방송시작</div>
    </div>
    <div class="broad-info">
      <div class="avata-wrap">
        <a v-bind:href="getBJLink" target="_blank">
          <img
            class="avata"
            v-bind:src="broad.profile_img"
            v-bind:alt="broad.user_nick"
          />
        </a>
      </div>
      <div class="detail-wrap">
        <a
          v-bind:href="getPlayerLink"
          v-bind:title="broad.broad_title"
          target="_blank"
          ><h3 class="broad-title">{{ broad.broad_title }}</h3></a
        >
        <div class="">
          <a v-bind:href="getBJLink" target="_blank" class="nickname">{{
            broad.user_nick
          }}</a>
          <span class="view-cnt-wrap"
            ><svg
              class="icon-view-cnt"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
              /></svg
            >{{ getTotalViewCnt }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BroadElement",
  props: {
    broad: Object,
  },
  methods: {
    onImgError(e) {
      e.target.src = require("@/assets/notfound.png");
    },
  },
  computed: {
    getPlayerLink() {
      return `https://play.afreecatv.com/${this.broad.user_id}/${this.broad.broad_no}`;
    },
    getBJLink() {
      return `http://bj.afreecatv.com/${this.broad.user_id}`;
    },
    getTotalViewCnt() {
      return parseInt(this.broad.total_view_cnt).toLocaleString();
    },
    getBroadStart() {
      const broadStart = new Date(this.broad.broad_start + " GMT+0900");
      const month = ("0" + (broadStart.getMonth() + 1)).slice(-2);
      const date = ("0" + broadStart.getDate()).slice(-2);
      const hours = ("0" + broadStart.getHours()).slice(-2);
      const minutes = ("0" + broadStart.getMinutes()).slice(-2);

      let formatedString = `${month}-${date} ${hours}:${minutes}`;
      return formatedString;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.broad-element {
  width: 100%;
  height: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.thumb-wrap {
  position: relative;
  aspect-ratio: 16/9;
  background-color: whitesmoke;
  border-radius: 10px;
  overflow: hidden;
}
.thumb-wrap:hover .allow {
  opacity: 100;
  transition: opacity 0.2s;
}
.thumb-wrap:hover .broad-start {
  opacity: 100;
  transition: opacity 0.2s;
}
.thumb-wrap a {
  display: block;
  width: 100%;
  height: 100%;
}
.thumb {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
.allow {
  transition: opacity 0.2s;
  opacity: 0;
  position: absolute;
  top: 7px;
  left: 7px;
  padding: 0 9px;
  border-radius: 24px;
  font-weight: 400;
  color: #00ddff;
  border: 1px solid #36caef;
  background-color: rgba(0, 0, 0, 0.6);
}
.broad-start {
  opacity: 0;
  position: absolute;
  color: white;
  right: 7px;
  bottom: 7px;
  border-radius: 25px;
  padding: 0 6px;
  background-color: rgba(0, 0, 0, 0.7);
}
.avata {
  object-fit: cover;
  height: 3rem;
  width: 3rem;
  border-radius: 50px;
  background-color: whitesmoke;
}
.broad-info {
  margin-top: 0.5rem;
  position: relative;
  display: flex;
  align-items: center;
}
.detail-wrap {
  margin: 0.5rem;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}
.broad-title {
  max-width: 35ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nickname {
  color: #4279ff;
}
.nickname:hover {
  text-decoration-line: underline;
}
.view-cnt-wrap {
  margin-left: 0.5rem;
  color: #888;
}
.icon-view-cnt {
  fill: #888;
  height: 10px;
  padding-right: 5px;
}
</style>
