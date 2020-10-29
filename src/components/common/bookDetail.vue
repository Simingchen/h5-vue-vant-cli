<template>
  <div class="book-detail">
    <div class="book-content">
      <img class="book-cover" v-lazy="$config.imgBookUrl + detail.photoPath" />
      <div class="book-main">
        <div class="download flex-box">
          <img class="icon" :src="require('@img/ic_reader_download_red.png')" @click="minxinTips" />
        </div>
        <div class="book-name ellipsis">{{detail.name}}</div>
        <div class="book-author flex-center">
          <div class="book-num">{{detail.wordCnt | filterCount}} 万字</div>
          <div class="flex-center">
            <img class="author-icon" :src="require('@img/icon_author.png')" @click="minxinTips" />
            {{detail.author}}
            <van-icon name="arrow" />
          </div>
        </div>
        <div class="book-score flex-center">
          {{detail.strScore}}
          <van-rate
            :value="(detail.strScore / 2)"
            allow-half
            void-icon="star"
            void-color="#b7b7b7"
            size="10"
            :color="$config.primaryColor"
          />
        </div>
        <div class="flex-center">
          <van-button class="add-btn" plain color="#999">免费阅读</van-button>
          <van-button class="add-btn" :color="$config.primaryColor">加入书架</van-button>
        </div>
      </div>
      <!-- 书籍简介 -->
      <div class="book-intro bgf">
        <div class="tag-list">
          <van-button round size="mini" color="#f1f7fd" v-for="item in 8" :key="item">免费阅读</van-button>
        </div>
        <van-cell title="书籍简介" :border="false" />
        <div class="book-desc">{{detail.intro}}</div>
        <div class="desc-more flex-center van-hairline--bottom">
          展开
          <van-icon name="arrow-down" />
        </div>
        <van-card
          class="book-income"
          :title="detail.createTime"
          :desc="`转自网络《${detail.name}》`"
          :thumb="require('@img/icon_default_author.png')"
        />
        <van-cell class="book-chapter" is-link :border="false">
          <template #title>
            查看目录
            <span class="txt">共{{detail.chapterCnt}}章</span>
          </template>
        </van-cell>
        <van-card
          class="book-relation flex-start"
          :title="`同名有声小说`"
          desc="相关作品>"
          :thumb="require('@img/icon_same_audio.png')"
        />
      </div>
      <!-- 书圈 -->
      <div class="book-momment">
        <van-cell class="momment-cell" :border="false">
          <template #title>
            书圈
            <span class="txt">{{commentList.count.friendCnt || filterCount}} 书友</span>
            <span class="txt">{{commentList.count.backBookCnt || filterCount}}条评论</span>
          </template>
          <div class="momment-go flex-start">
            撰写书评
            <img class="icon" :src="require('@img/icon_edit_book_circle.png')" />
          </div>
        </van-cell>
        <commemtItem :list="commentList" />
        <div
          class="momment-more flex-center bgf"
        >进入书圈，查看全部{{commentList.count.backBookCnt || filterCount}}条评论</div>
      </div>
      <!-- 猜你喜欢 -->
      <lazy-component>
        <div class="module bgf">
          <van-cell title="喜欢这本书的人也喜欢" center :border="false" is-link value="更多" />
          <bookItem :list="likeList" />
        </div>
      </lazy-component>
    </div>
  </div>
</template>
<script>

var infoData = {"code":0,"data":[{"id":179729,"name":"风神归位","clsName":"其它","intro":"  意外到来，是悲剧？还是传奇的开始？！\r\n  且看风扬在清清大陆怎样扬名天下，成为不朽的传奇！","author":"超能枫","photoPath":"/2343/FF02B613F286641C6A20AE229010966F/736198-1391160467000.jpg","fullFlag":1,"postDate":"2013-12-17 22:22:04","lastUpdate":"2014-06-20 22:08:16","chapterCnt":46,"wordCnt":53533,"status":1,"chapterVersion":1,"createTime":"2019-07-16 21:55:39","score":6000,"strScore":"6.0","readCnt":0,"loveCnt":0,"downCnt":0,"retention":857,"strLastCharpterTime":"","isOnShelf":0}],"enumCode":"SUCCESS","msg":"1","success":true}
infoData = infoData.data[0]

var likeList = {"code":0,"data":[{"author":"断桥残雪","chapterCnt":4130,"clsId":1,"clsIdSecond":20,"clsName":"玄幻 - 王朝争霸","createTime":"2018-11-03 22:22:51","downCnt":0,"esScore":3799726,"fullFlag":3,"id":143978,"intro":"他当过搬砖工，当过酒吧服务生，当过办公室文员，当过老师，当过医生……他是千千万万打工仔中的一名，为了生计而奔波劳碌，但同时他却又是一位得上古巫王夏禹血脉传承的巫师。\n    巫，上一横顶天，下一横立地，中间一竖直通天地，中统人与人，是真正通天达地，掌控天地万物生灵之大能者！\n","isOnShelf":0,"lastUpdate":"2016-11-21 10:06:00","loveCnt":0,"name":"打工巫师生活录","photoPath":"/3757/0D228707CBA925E32B6A5FA16346DDE7/0D228707CBA925E32B6A5FA16346DDE7.jpg","postDate":"","readCnt":0,"relTagName":[],"retention":5558,"score":7428,"status":1,"strScore":"7.4","wordCnt":13024129},{"author":"唐家三","chapterCnt":24,"clsId":1,"clsIdSecond":18,"clsName":"玄幻 - 东方玄幻","createTime":"2019-07-16 21:55:53","downCnt":0,"esScore":3540298,"fullFlag":1,"id":179751,"intro":"入得了天堂，下得鸟炼狱。老婆一二三四排成行，唯独木有小JJ。\r\n\r\n我叫剑剑，非常非常非常非常非常的强！我有三绝招。一，飞天穿云剑。二，花拳绣腿。三，吃西瓜。\r\n\r\n巨人是猎物，俺是猎人！\r\n\r\n这是个吹牛逼不犯死罪的世界——欢迎来到剑人的世界。","isOnShelf":0,"lastUpdate":"2014-06-22 23:59:51","loveCnt":0,"name":"我叫剑剑","photoPath":"","postDate":"2014-05-24 17:43:39.000","readCnt":0,"relTagName":[],"retention":857,"score":6000,"status":1,"strScore":"6.0","wordCnt":140744},{"author":"耀火","chapterCnt":3962,"clsId":1,"clsIdSecond":20,"clsName":"玄幻 - 王朝争霸","createTime":"2018-11-03 22:26:41","downCnt":0,"esScore":3280386,"fullFlag":2,"id":144014,"intro":"因为一个手镯，秦飞从家族天才成为万人耻笑的废人。为守护心中那份责任，他战恶少，杀霸主，斗苍天……太古凶兽、九天神灵、地狱幽魔、洪荒百族，无尽世界，无尽宇宙，至尊降临……\n","isOnShelf":0,"lastUpdate":"2018-06-30 21:31:00","loveCnt":0,"name":"remove-丹武至尊","photoPath":"/2638/161EAF071986812AD2BC64C09F490630/161EAF071986812AD2BC64C09F490630.jpg","postDate":"","readCnt":0,"relTagName":[],"retention":3959,"score":6727,"status":1,"strScore":"6.7","wordCnt":10554624},{"author":"百里龙虾","chapterCnt":5010,"clsId":1,"clsIdSecond":20,"clsName":"玄幻 - 王朝争霸","createTime":"2018-11-04 01:03:51","downCnt":0,"esScore":2982948,"fullFlag":2,"id":153740,"intro":"【最热爽文】苏家少主苏莫，觉醒出逆天武魂，却被认为是最低级的垃圾武魂，受尽屈辱……且看苏莫如何凭借着逆天武魂，一路崛起，一路逆袭……练奇功、得奇宝、闯绝地、战天骄，吞噬无尽生灵，融合诸天血脉，鏖战天下，举世无敌！【vip书友群570815745，正版读者入群请出示粉丝值验证！】\n","isOnShelf":0,"lastUpdate":"2018-10-31 00:12:00","loveCnt":0,"name":"remove-绝代神主","photoPath":"/1785/E2C7360BC2E459D0022CE581FB7745F5/E2C7360BC2E459D0022CE581FB7745F5.jpg","postDate":"","readCnt":0,"relTagName":[],"retention":3454,"score":6727,"status":1,"strScore":"6.7","wordCnt":11605077},{"author":"唐家三少","chapterCnt":363,"clsId":1,"clsIdSecond":19,"clsName":"玄幻 - 异世大陆","createTime":"2019-11-06 21:16:05","downCnt":0,"esScore":2858170,"fullFlag":2,"id":703008,"intro":"      光明历四五九八年五月一日，也就是雷暴元年五月一日，深夜。\r\n        位于星空北极部分的光明星突然大放光明，光辉的亮度超过了月亮，将整个光明大陆都照亮了。\r\n        面对这样一种奇特的天象，大陆上几乎所有智慧生物都充满了好奇，驻足观望者不计其数。\r\n        然而，却有极少数有学问的人痛哭流涕，认为世界末日即将来临。\r\n        “极星耀月，天崩地裂！”难道传说中的天劫真的要降临了吗？\r\n","isOnShelf":0,"lastUpdate":"2012-05-03 00:00:00","loveCnt":0,"name":"骷髅兵的后宫","photoPath":"/3287/26BB3E6AE25A472B52D889DE79B67F42/26BB3E6AE25A472B52D889DE79B67F42.jpg","postDate":"","readCnt":0,"relTagName":[],"retention":681,"score":6000,"status":1,"strScore":"6.0","wordCnt":1722294},{"author":"梦入神机","chapterCnt":3202,"clsId":1,"clsIdSecond":20,"clsName":"玄幻 - 王朝争霸","createTime":"2018-11-04 00:00:08","downCnt":0,"esScore":2510952,"fullFlag":3,"id":149814,"intro":"圣者以脊梁撑起天堂中的诸神\n    王者以力量镇压地狱中的群魔\n    天地之间，唯有圣王\n    梦入神机新书《星河大帝》/book/\n","isOnShelf":0,"lastUpdate":"2017-06-30 02:27:00","loveCnt":0,"name":"圣王","photoPath":"/1487/9A214FB8E8E81191727C0DA3A460D293/9A214FB8E8E81191727C0DA3A460D293.jpg","postDate":"","readCnt":0,"relTagName":[],"retention":2396,"score":5636,"status":1,"strScore":"5.6","wordCnt":10822378}],"enumCode":"SUCCESS","msg":"","success":true}
likeList = likeList.data

var commentList = {"code":0,"data":[{"comments":[{"msg":"评论挂号费风格复古狗","orderNumber":1,"star":4,"headImg":"/57/9e3999ca97dc7e113c2643dd6d8b6441.jpg","level":7,"nickName":"地方附近的人格个开关电源","back":0,"official":0,"userId":76071,"down":0,"titleNo":1,"parentId":0,"isDown":0,"titleName":"兔职员","relId1":703007,"isUp":0,"createTime":"2020-10-17","id":150,"up":0,"decorationImg":"/73/59a57b440c91d8cb2a4e03972be7ca6d.png"}],"count":{"backBookCnt":1,"friendCnt":23,"readCnt":0,"backCnt":1}}],"enumCode":"SUCCESS","msg":"","success":true}
commentList = commentList.data[0]

import bookItem from '@components/book/bookItem.vue'
import commemtItem from '@components/book/commemtItem.vue'
export default {
  components: { bookItem, commemtItem },
  data() {
    return {
      detail: {},
      likeList: likeList,
      commentList: commentList,
    }
  },
  created () {
    // 页面路由传参数
    if (this.$route) {
        // const detail = JSON.parse(decodeURIComponent(this.$route.query.item));
    }
    // console.log(detail)
    // this.detail = detail
    this.getData()
  },
  methods: {
    getData() {
      this.detail = infoData
    },
  }
}
</script>

<style lang="less" scoped>
.book-detail {
  padding-top: 276px;
}
.book-content {
  position: relative;
  background: #f5f5f5;
}
.book-main {
  margin-bottom: 16px;
  background: #fff;
}
.book-cover {
  position: absolute;
  width: 310px;
  height: 416px;
  left: 50%;
  top: -130px;
  transform: translate(-50%);
  z-index: 5;
}
.download {
  flex-direction: row-reverse;
  padding: 32px 32px 0 0;
  .icon {
    width: 64px;
    height: 64px;
  }
}
.book-name {
  margin-top: 200px;
  font-size: 40px;
  color: #323232;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
}
.book-author {
  margin-top: 16px;
  line-height: 40px;
  color: @primary;
  .book-num {
    margin-right: 40px;
    color: #b7b7b7;
    font-size: 24px;
  }
  .author-icon {
    width: 28px;
    height: 28px;
    margin-right: 10px;
  }
  .van-icon {
    font-size: 24px;
  }
}
.book-score {
  height: 40px;
  margin-top: 24px;
  font-size: 36px;
  font-weight: 600;
  .van-rate {
    margin-left: 10px;
  }
}
.add-btn {
  width: 320px;
  height: 80px;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 10px;
  &:first-child {
    margin-right: 46px;
  }
}
.tag-list {
  padding: 32px 40px 0;
  .van-button {
    margin-right: 32px;
    margin-bottom: 16px;
  }
  .van-button__text {
    color: #a3a8b4;
  }
}
.van-cell__title {
  font-size: 36px;
  font-weight: 500;
}
.book-desc {
  padding: 0 32px;
  color: #8e93a1;
  line-height: 48px;
}
.desc-more {
  line-height: 100px;
  color: @primary;
  .van-icon {
    margin-left: 10px;
  }
}
.book-income {
  background: #fff;
  .van-card__content {
    min-height: auto;
  }
  .van-card__thumb {
    width: 56px;
    height: 56px;
  }
  .van-card__title {
    color: #646464;
    line-height: 40px;
    font-size: 28px;
  }
  .van-card__desc {
    color: #8e93a1;
  }
}
.book-chapter {
  background: #f6faff;
  height: 100px;
  .van-cell__title {
    font-size: 28px;
    font-weight: 500;
  }
  .txt {
    margin-left: 10px;
    font-size: 24px;
    color: #8e93a1;
  }
  .van-icon-arrow {
    font-size: 24px;
  }
}
.book-relation {
  background: #fef9f9;
  height: 160px;
  .van-card__header {
    align-items: center;
  }
  .van-card__content {
    min-height: auto;
  }
  .van-card__thumb {
    width: 88px;
    height: 92px;
  }
  .van-card__title {
    line-height: 40px;
    font-size: 28px;
  }
  .van-card__desc {
    color: @primary;
  }
}
.book-momment {
  margin-bottom: 16px;
}
.momment-cell {
  .txt {
    font-size: 24px;
    color: @txt;
    margin-left: 16px;
  }
  .van-cell__value {
    font-size: 28px;
    color: #4a90e2;
    .icon {
      width: 32px;
      height: 32px;
      margin-right: 10px;
    }
  }
  .momment-go {
    flex-direction: row-reverse;
  }
}
.momment-more {
  line-height: 100px;
  color: @primary;
}
.module {
  .van-cell {
    height: 3rem;
    // background: #f6faff;
  }
  .van-cell__title {
    flex: none;
  }
  .van-cell__value {
    font-size: 0.6rem;
    color: #b7b7b7;
  }
}
</style>
