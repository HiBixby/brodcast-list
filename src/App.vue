<template>
  <div class="title-wrap">
    <h2>전체</h2>
    <form>
      <select v-model="orderType">
        <option value="broad_start">최신순</option>
        <option value="view_cnt">시청자순</option>
      </select>
      <button @click.prevent="getBroadList" class="refresh">
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
      <div v-if="broad.visit_broad_type === '0'">탐방 허용</div>
      <div>{{ getBroadStart(i) }} 방송시작</div>
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
          ><h3 class="broad-title">{{ broad.broad_title }}</h3></a
        >
        <div class="">
          <a v-bind:href="getBJLink(i)" target="_blank" class="nickname">{{
            broad.user_nick
          }}</a>
          <span
            ><svg
              class="icon-view-cnt"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
              <path
                d="M352 128c0 70.7-57.3 128-128 128s-128-57.3-128-128S153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8c2.4-.1 4.7-.2 7.1-.2h61.4C567.8 320 640 392.2 640 481.3c0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9C372.4 196.5 384 163.6 384 128c0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z"
              /></svg
            >{{ getTotalViewCnt(i) }}</span
          >
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
      orderType: "broad_start",
      pageNo: 1,
      broadcastList: null,
      broads: null,
    };
  },
  methods: {
    getBroadList() {
      const clientId = "e8201566692601ecee34820c9862e516";
      this.$axios
        .get("https://openapi.afreecatv.com/broad/list", {
          params: {
            client_id: clientId,
            order_type: this.orderType,
            page_no: this.pageNo,
          },
        })
        .then((res) => {
          this.broadcastList = res.data;
          this.broads = res.data.broad;
        })
        .catch((error) => console.log(error));
    },
    getPlayerLink(i) {
      return `https://play.afreecatv.com/${this.broads[i].user_id}/${this.broads[i].broad_no}`;
    },
    getBJLink(i) {
      return `http://bj.afreecatv.com/${this.broads[i].user_id}`;
    },
    getTotalViewCnt(i) {
      return parseInt(this.broads[i].total_view_cnt).toLocaleString();
    },
    getBroadStart(i) {
      const broadStart = new Date(this.broads[i].broad_start + " GMT+0900");
      const month = ("0" + (broadStart.getMonth() + 1)).slice(-2);
      const date = ("0" + broadStart.getDate()).slice(-2);
      const hours = ("0" + broadStart.getHours()).slice(-2);
      const minutes = ("0" + broadStart.getMinutes()).slice(-2);

      let formatedString = `${month}-${date} ${hours}:${minutes}`;
      return formatedString;
    },
  },
  computed: {},
  watch: {
    orderType: function () {
      this.getBroadList();
    },
  },
  created() {
    this.getBroadList();
  },
};
</script>

<style>
#app {
  font-family: "Pretendard JP Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
a {
  text-decoration-line: none;
  color: inherit;
}
h3 {
  margin: 0;
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
  object-fit: cover;
  height: 50px;
  width: 50px;
  border-radius: 50px;
}
.broad-info {
  display: flex;
  align-items: center;
}
.broad-title {
  max-width: 35ch;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.nickname {
  color: blue;
}
.nickname:hover {
  text-decoration-line: underline;
}
.icon-view-cnt {
  fill: gray;
  height: 10px;
}
</style>
