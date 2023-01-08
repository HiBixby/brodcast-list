<template>
  <div class="container">
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
    <BroadElement v-for="broad in broads" :broad="broad" v-bind:key="broad">
    </BroadElement>

    <div class="more" v-if="hasMore">
      <button v-if="hasMore" @click="getBroadList(false)" class="btn-more">
        더보기
      </button>
    </div>
  </div>
</template>

<script>
import BroadElement from "./components/BroadElement.vue";
export default {
  name: "App",
  components: { BroadElement },
  data() {
    return {
      orderType: "broad_start",
      pageNo: 1,
      hasMore: true,
      broadcastList: null,
      lastPageBlock: 0,
      broads: null,
    };
  },
  methods: {
    getBroadList(isReload = true) {
      const clientId = "e8201566692601ecee34820c9862e516";
      const params = {
        params: {
          client_id: clientId,
          order_type: this.orderType,
          page_no: isReload ? this.pageNo : this.pageNo++,
        },
      };
      this.$axios
        .get("https://openapi.afreecatv.com/broad/list", params)
        .then((res) => {
          console.log(res);
          this.broadcastList = res.data;
          const pageBlock = res.data.broad.length;
          this.lastPageBlock = pageBlock;
          if (pageBlock < 60) {
            this.hasMore = false;
          }
          if (isReload) {
            this.broads = res.data.broad;
          } else {
            this.broads.push(...res.data.broad);
          }
        })
        .catch((error) => console.log(error));
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
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Pretendard JP Variable", Pretendard, -apple-system,
    BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
    "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
a {
  text-decoration-line: none;
  color: inherit;
}
h3 {
  margin: 0;
}
form {
  display: flex;
  align-items: center;
}
span {
  font-family: inherit;
}
select {
  border-radius: 6px;
  padding: 10px 5px;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  color: #333;
}
option {
  color: #888;
}
select:hover {
  cursor: pointer;
  background-color: #f5f6f7;
}
select:focus {
  outline: none;
  background-color: #f2f8ff;
}
button:hover {
  cursor: pointer;
}
.title-wrap {
  grid-column: 1/-1;
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
}
.refresh {
  width: 2rem;
  fill: #8c8c8c;
  padding: 0.3rem;
  border: none;
  background-color: transparent;
}
.refresh:hover {
  cursor: pointer;
}
.container {
  justify-content: center;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(231px, 306px));
  row-gap: 2rem;
  column-gap: 2rem;
  overflow-y: scroll;
  margin-bottom: 3rem;
}
.more {
  grid-column: 1/-1;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}
.btn-more {
  font-family: inherit;
  padding: 0.5rem;
  border: none;
  width: 100%;
}
</style>
