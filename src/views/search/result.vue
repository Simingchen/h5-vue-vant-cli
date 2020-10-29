<template>
  <section class="container">
    <search-bar ref="searchBar" @onSearch="onSearch"></search-bar>
    <van-tabs class="tabs-wrapper" v-model="tabIndex" sticky offset-top="2.3rem">
      <van-tab title="小说">
        <van-list
          class="list-wrapper"
          v-if="novelLists.length > 0"
          v-model="loading"
          :finished="novelFinished"
          @load="onLoad"
        >
          <book-item2 :list="novelLists" />
        </van-list>
        <no-data v-else></no-data>
      </van-tab>
      <van-tab title="短文">
        <van-list
          class="list-wrapper"
          v-if="shortLists.length > 0"
          v-model="loading"
          :finished="shortFinished"
          @load="onLoad"
        >
          <book-item2 :list="shortLists" />
        </van-list>
        <no-data v-else></no-data>
      </van-tab>
    </van-tabs>
  </section>
</template>

<script>
import searchBar from '@/components/common/searchBar'
import bookItem2 from '@components/book/bookItem2'
import noData from '@/components/common/noData'
const lists = [
  {
    author: '此间风月',
    chapterCnt: 5,
    clsId: 17,
    clsIdSecond: 68,
    clsName: '纯爱小说 - 现代纯爱',
    createTime: '2019-07-16 21:40:57',
    downCnt: 0,
    esScore: 0,
    fullFlag: 1,
    id: 178065,
    intro: '请问世界上是否有仙？\r\n伏羲、夸父、女娲他们真的存在吗？\r\n上下四方曰宇，古往今来曰宙，宇宙之中，究竟隐藏着怎样的秘密？\r\n一个青年机缘巧合之下，进入一个光怪陆离的修真文明，最终走向一条成仙之路。',
    isOnShelf: 0,
    lastUpdate: '2018-07-26 17:37:06',
    loveCnt: 0,
    name: '论仙道',
    photoPath: '',
    postDate: '2018-02-05 12:22:47.000',
    readCnt: 0,
    relTagName: [],
    retention: 857,
    score: 6000,
    status: 1,
    strScore: '6.0',
    wordCnt: 10436,
  },
  {
    author: '沐柒媣',
    chapterCnt: 51,
    clsId: 12,
    clsIdSecond: 76,
    clsName: '现代言情 - 娱乐明星',
    createTime: '2019-07-16 21:33:00',
    downCnt: 0,
    esScore: 0,
    fullFlag: 1,
    id: 177272,
    intro:
      '  夜幕，乌黑的空中没有一颗耀眼夺目的星星，只有一轮皎洁的圆月散发着光辉。昔日原本繁华吵闹的都市，今夜却寂静无声，仿佛是为那站在三十层高楼顶层的人专门准备。\r\n  从三十层高楼的楼顶向下眺望，除了五颜六色的霓虹彩灯之外一切都静静的睡了，只有这个人优雅的拉着他心爱的小提琴等待那个正朝着顶层慢慢走来的女孩。\r\n  微风优雅的扶起女孩的棕色的波浪卷长发，浅棕色的披肩在风中显得格外高贵优雅，长长的睫毛附和着柔美的眼皮，半掩着那深不可测的眸子。那种幽静的深蓝，仿佛蕴藏着无尽的秘密，给人穿透心脏的感觉。\r\n      黯婳琪调格群号：281175987\r\n          沐柒媣Q号：2582352772 【备注信息：17K小说阅读网】\r\n      沐柒媣凯旋而归，希望大家继续支持~~   \r\n        ',
    isOnShelf: 0,
    lastUpdate: '2013-01-10 13:20:05',
    loveCnt: 0,
    name: '黯婳琪调格',
    photoPath: '/1030/A5BA699DC96B4AEF3FB51142388E27F7/442294-1355383015000.jpg',
    postDate: '2012-12-12 19:30:08.000',
    readCnt: 0,
    relTagName: [],
    retention: 857,
    score: 6000,
    status: 1,
    strScore: '6.0',
    wordCnt: 106386,
  },
  {
    author: 'xiao少爷',
    chapterCnt: 2969,
    clsId: 1,
    clsIdSecond: 20,
    clsName: '玄幻 - 王朝争霸',
    createTime: '2018-11-04 01:16:17',
    downCnt: 0,
    esScore: 0,
    fullFlag: 3,
    id: 154517,
    intro: '得神剑，练神功，为着心中的执念不断超越自我。战强敌，战神魔，更是以力抗天！\n    无敌战技，风云大陆，谁主沉浮？\n    ========\n    新书《不死武皇》开启，附上17k/book/群号 272162474\n',
    isOnShelf: 0,
    lastUpdate: '2017-04-17 11:16:00',
    loveCnt: 0,
    name: '横扫异界之无敌天尊',
    photoPath: '/83/F383E38E756829DC934C302F03922E1D/F383E38E756829DC934C302F03922E1D.jpg',
    postDate: '',
    readCnt: 0,
    relTagName: [],
    retention: 1543,
    score: 6727,
    status: 1,
    strScore: '6.7',
    wordCnt: 10313053,
  },
  {
    author: '立磬',
    chapterCnt: 51,
    clsId: 13,
    clsIdSecond: 79,
    clsName: '幻想言情 - 魔法异界',
    createTime: '2019-07-16 21:55:49',
    downCnt: 0,
    esScore: 125,
    fullFlag: 1,
    id: 179744,
    intro: '遥想公瑾当年，小乔初嫁了。等等爱小乔的那个人叫做周瑜，即使她成为我的妻子我也不会爱她，因为我不是周瑜，即使·我帮助孙策平定江山，在赤壁战役将曹军烧的落荒而逃，即使我精通乐律弹奏广为流传的长河吟却依然改变不了我不是周瑜的事实。因为我不是周瑜，因为我是夜允，所以我可以不爱小乔，在遇到她她之前我就已经无可救药的爱上孙尚香。',
    isOnShelf: 0,
    lastUpdate: '2013-09-21 13:22:24',
    loveCnt: 0,
    name: '我爱孙尚香',
    photoPath: '/2823/FF936C4AEF16152733C7A65127D6D970/487618-1378632086000.jpg',
    postDate: '2013-02-25 23:53:35.000',
    readCnt: 0,
    relTagName: [],
    retention: 540,
    score: 6666,
    status: 1,
    strScore: '6.7',
    wordCnt: 117609,
  },
  {
    author: '无字仓颉',
    chapterCnt: 47,
    clsId: 12,
    clsIdSecond: 72,
    clsName: '现代言情 - 总裁豪门',
    createTime: '2019-07-16 21:53:03',
    downCnt: 0,
    esScore: 250,
    fullFlag: 1,
    id: 179432,
    intro: '一个阴谋，一个少年，一场旷世大战，一场血与泪的兄弟情，一种成长，一种人生，一种哲理，一种信念，且看一个普通少年成长，坚强......',
    isOnShelf: 0,
    lastUpdate: '2016-09-11 22:46:59',
    loveCnt: 0,
    name: '阿拉德战记之剑神无双',
    photoPath: '/2019/F446CB4D4CA2C3ABBBA4FEA0E9D3947E/1403170-1444221302000.jpg',
    postDate: '2015-09-04 14:39:50.000',
    readCnt: 0,
    relTagName: [],
    retention: 857,
    score: 6000,
    status: 1,
    strScore: '6.0',
    wordCnt: 142581,
  },
  {
    author: '梦入神机',
    chapterCnt: 3202,
    clsId: 1,
    clsIdSecond: 20,
    clsName: '玄幻 - 王朝争霸',
    createTime: '2018-11-04 00:00:08',
    downCnt: 0,
    esScore: 350,
    fullFlag: 3,
    id: 149814,
    intro: '圣者以脊梁撑起天堂中的诸神\n    王者以力量镇压地狱中的群魔\n    天地之间，唯有圣王\n    梦入神机新书《星河大帝》/book/\n',
    isOnShelf: 0,
    lastUpdate: '2017-06-30 02:27:00',
    loveCnt: 0,
    name: '圣王',
    photoPath: '/1487/9A214FB8E8E81191727C0DA3A460D293/9A214FB8E8E81191727C0DA3A460D293.jpg',
    postDate: '',
    readCnt: 0,
    relTagName: [],
    retention: 2396,
    score: 5636,
    status: 1,
    strScore: '5.6',
    wordCnt: 10822378,
  },
]
export default {
  components: {
    searchBar,
    bookItem2,
    noData,
  },
  data() {
    return {
      novelLists: lists,
      shortLists: [],
      loading: false,
      novelFinished: true,
      shortFinished: true,
    }
  },
  mounted() {
    const q = this.$route.query.q
    if (q) {
      this.$refs['searchBar'].handleSearchItem(q, false)
    }
  },
  methods: {
    onLoad() {
      //todo
    },
    onSearch(val) {
      // todo
    },
  },
}
</script>

<style lang="less" scoped>
.list-wrapper {
  margin-top: 16px;
  padding-top: 32px;
  background: #fff;
}
.tabs-wrapper {
  margin-top: 92px;
}

// 覆盖样式
/deep/.van-tab--active {
  color: @primary;
}

/deep/.van-tabs__line {
  width: 1rem;
  background-color: @primary;
}
</style>