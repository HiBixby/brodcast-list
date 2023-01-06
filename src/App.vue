<template>
  <div class="title-wrap">
    <h2>전체</h2>
    <form>
      <select>
        <option value="broad_start">최신순</option>
        <option value="view_cnt">시청자순</option>
      </select>
      <button @click.prevent="" class="refresh">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
          <path
            d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
          />
        </svg>
      </button>
    </form>
  </div>
  <div class="broadlist-wrap" v-for="(broad, i) in broads" v-bind:key="broad">
    <div class="thumb-wrap">
      <a v-bind:href="getPlayerLink(i)" target="_blank">
        <img
          class="thumb"
          v-bind:src="broad.broad_thumb"
          v-bind:alt="broad.broad_title"
        />
      </a>
    </div>
    <div class="broad-info">
      <div class="avata-wrap">
        <a v-bind:href="getBJLink(i)" target="_blank">
          <img class="avata" v-bind:src="broad.profile_img" alt="" />
        </a>
      </div>
      <div class="detail-wrap">
        <a
          v-bind:href="getPlayerLink(i)"
          v-bind:title="broad.broad_title"
          target="_blank"
          ><h3>{{ broad.broad_title }}</h3></a
        >
        <div class="">
          <a v-bind:href="getBJLink(i)" target="_blank" class="nickname">{{
            broad.user_nick
          }}</a>
          <span>{{ getTotalViewCnt(i) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      broadcastList: null,
      broads: [
        {
          broad_title: "이상호 BWC포를란 내가간다 기다려라...",
          visit_broad_type: "0",
          is_password: "0",
          broad_cate_no: "00040070",
          broad_no: "244390303",
          user_id: "lshooooo",
          user_nick: "BJ이상호",
          profile_img:
            "//profile.img.afreecatv.com/LOGO/ls/lshooooo/lshooooo.jpg?dummy=4345126843",
          broad_thumb: "//liveimg.afreecatv.com/m/244390303",
          broad_start: "2023-01-06 12:25:42",
          broad_grade: "0",
          broad_bps: "8000",
          broad_resolution: "1920x1080",
          total_view_cnt: "14357",
        },
      ],
    };
  },
  methods: {
    getPlayerLink(i) {
      return `https://play.afreecatv.com/${this.broads[i].user_id}/${this.broads[i].broad_no}`;
    },
    getBJLink(i) {
      return `http://bj.afreecatv.com/${this.broads[i].user_id}`;
    },
    getTotalViewCnt(i) {
      return parseInt(this.broads[i].total_view_cnt).toLocaleString();
    },
  },
  created() {
    // this.$axios
    //   .get(
    //     "https://openapi.afreecatv.com/broad/list?client_id=e8201566692601ecee34820c9862e516&order_type=view_cnt&page_no=1"
    //   )
    //   .then((res) => (this.broadcastList = res.data));
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration-line: none;
  color: inherit;
}
.title-wrap {
  display: flex;
  justify-content: space-between;
}
.refresh {
  width: 30px;
}
.thumb {
  width: 306px;
  height: 172px;
  border-radius: 15px;
}
.avata {
  width: 50px;
  border-radius: 100%;
}
.broad-info {
  display: flex;
  align-items: center;
}
.nickname {
  color: blue;
}
.nickname:hover {
  text-decoration-line: underline;
}
</style>
