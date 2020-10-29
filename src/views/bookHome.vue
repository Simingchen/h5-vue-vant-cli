// 以懒加载的形式加载模块

<template>
  <div class="bookHome-page container">
    <!-- 右侧放大镜 -->
    <div class="tab-tool flex-row-center">
      <div
        class="item"
        @click="minxinTips"
        :style="{ backgroundImage: `url(${require(`@img/ic_shelf_audio_${isFixedTop ? 'black' : 'white'}.png`)})` }"
      ></div>
      <router-link
        class="item"
        to="bookrack/search"
        :style="{ backgroundImage: `url(${require(`@img/ic_shelf_search_${isFixedTop ? 'black' : 'white'}.png`)})` }"
      ></router-link>
    </div>
    <van-tabs v-model="active" sticky @scroll="tabScroll">
      <!-- 内容区 -->
      <van-tab :title="tab.name" v-for="(tab, index) in tabList" :key="index">
        <van-pull-refresh v-model="tab.refreshing" @refresh="onRefresh" style="min-height: 100vh">
          <van-list
            v-model="tab.loading"
            :finished="tab.finished"
            :finished-text="tab.likeList.length && '没有更多了'"
            @load="getLikeList"
          >
            <van-swipe
              class="home-swipe"
              lazy-render
              :autoplay="3000"
              :indicator-color="$config.primaryColor"
            >
              <van-swipe-item v-for="(item, index) in tab.bannerList" :key="index">
                <img class="img" :src="$config.imgUrl + item.showPhoto" />
              </van-swipe-item>
            </van-swipe>
            <!-- 导航 -->
            <div class="nav-list flex-box">
              <div class="item flex-start" v-for="(item, index) in tab.navList" :key="index">
                <img class="img" :src="$config.imgUrl + item.showPhoto" />
                {{ item.name }}
              </div>
            </div>
            <!-- 推荐 -->
            <recommendItem class="module" :list="tab.recommendList" />
            <!-- 模块 -->
            <div v-for="(item, moduleIndex) in tab.moduleList" :key="moduleIndex" class="module">
              <lazy-component>
                <!-- banner广告 -->
                <template v-if="moduleIndex == 2 || moduleIndex == 5 || moduleIndex == 8">
                  <van-image
                    width="100%"
                    height="5rem"
                    lazy-load
                    :src="$config.imgUrl + adList[moduleIndex].showPhoto"
                  />
                </template>
                <!-- 标题 -->
                <van-cell
                  v-if="moduleIndex != 7"
                  :title="item.name"
                  value="更多"
                  is-link
                  center
                  :border="false"
                />
                <!-- 上下结构样式 -->
                <bookItem
                  :limit="6"
                  :list="item.contents"
                  v-if="moduleIndex == 1 || moduleIndex == 3 || moduleIndex == 9 || moduleIndex == 10 || moduleIndex == 11"
                />
                <template v-if="moduleIndex == 0">
                  <bookItem2 :list="item.contents" :limit="1" />
                  <bookItem :list="item.contents" :limit="3" />
                </template>
                <!-- 左右换一换 -->
                <template v-if="moduleIndex == 7">
                  <van-cell :title="item.name" center :border="false" />
                  <bookItem :list="item.contents" :isChange="true" :limit="12" />
                </template>

                <!-- 上下换一换 -->
                <bookItem2
                  :list="item.contents"
                  :isChange="true"
                  :limit="12"
                  v-if="moduleIndex == 6"
                />
                <!-- 悬空样式 -->
                <bookItem3 :limit="4" :list="item.contents" v-if="moduleIndex == 2" />
                <!-- 左右多行swipe滑动样式 -->
                <bookItem4 :limit="12" :list="item.contents" v-if="moduleIndex == 4" />
                <!-- 左右单行滑动样式 -->
                <bookItem5 :limit="12" :list="item.contents" v-if="moduleIndex == 5" />
                <!-- 作者列表 -->
                <authorItem :limit="12" :list="item.contents" v-if="moduleIndex == 8" />
              </lazy-component>
            </div>
            <!-- 猜你喜欢 -->
            <lazy-component>
              <div class="module">
                <van-cell title="猜你喜欢" center :border="false" />
                <bookItem2 :list="tab.likeList" />
              </div>
            </lazy-component>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { throttle } from 'lodash'
var module2 = {
  code: 0,
  data: [
    {
      contents: [
        {
          selectionModuleId: 1,
          contentType: 1,
          name: '男生最爱',
          icon: '/104/3c5bd34239bdbdd44d5f93c8d40e67ae.png',
          style: 8,
          imgBg: '',
          contents: [
            { id: 100236, name: '黑腹老公易烊千玺', photoPath: '/2350/077426FD7D52E07C8A6DA316D399D956/2269830-1531021410000.jpg', intro: '(本小说会不定时的更新,请大家耐心等待,由于我是一位学生趴所以请多多支持和谅解,谢谢）\r\n我放下了自尊、固执、个性，却永远也放不下你。 ·————夏陌雪\r\n一年365天，一天24小时，一小时60分钟，一分钟60秒，这一生这一世，和你在一起的时光，只想延长一点再长一点·······————易烊千玺', author: '夏月酥', score: 6000, strScore: '6.0', clsId: 17, clsName: '纯爱小说', readCnt: 0 },
            { id: 100381, name: '左十一剑', photoPath: '/3711/45009636257A7311E78610F492C62EA0/1305534-1436516547000.jpg', intro: '他的剑与众不同，宽一寸，长一米，重九十八斤。\r\n心高气傲的他如今要挑战剑圣吴子宇。\r\n这一战早在半年前以传的沸沸扬扬，\r\n却没能有人知道他们在哪决战！', author: '郁枫卓', score: 6769, strScore: '6.8', clsId: 3, clsName: '武侠', readCnt: 0 },
            {
              id: 100314,
              name: '泣血洪城',
              photoPath: '/1679/A6EFDC41CA8C7CB3FDB7B505188CF5D9/365571.jpg',
              intro:
                '　　南昌，古称洪州、洪城。这座始建于春秋，历时三千年的古老城市迎来了它最绝望的一天。 \r\n　　公元1648年3月15日，清朝摄政王多尔衮派正黄旗满州固山额真谭泰为征南将军统帅满、蒙、汉兵马从北京赶赴江西镇压金声桓、王得仁起义。清军为攻南昌城，驱使从各地掠来的男女老幼挖掘壕沟，时值天气炎热，加之清军逼催，致死十余万人。以致臭味传数千里，苍蝇遮天蔽日。 \r\n　　围城半年，城中军民为不至饿死，从城中逃出，清军不论来降官兵还是难民，一律男子分而杀之，女子分而淫之。公元1649年正月19日，南昌城破。清军一路烧杀抢夺，奸淫掳掠。城中妇女无不哭天喊地，奋身跳入赣江，一时间，尸体塞满江面。就在此时，天空一声巨响，万里清空突然洒下瓢泼暴雨，更令人惊奇的是，雨水竟然是红色的。满城清军皆被这一幕震惊，居然忘记了继续屠杀。而我们的故事也正是从这里开始。 ',
              author: '洪城竖子',
              score: 6363,
              strScore: '6.4',
              clsId: 15,
              clsName: '时间穿越',
              readCnt: 0,
            },
            { id: 100372, name: '仙鼎烟云', photoPath: '/2098/A59418FAC98B37C0E4CE8A969936EE84/363117.jpg', intro: '       且看一个平凡的少年如何迈入修真的殿堂，而且又一步步的走向强者天下无敌，\r\n        体内的紫光一直并未他发觉妙用，将紫气灌入丹药可以提纯丹药的级别，药草可以瞬间炼成丹药，还有什么妙用并未被发现呢？\r\n       在弱肉强食的修真世界，丹药山呆不下去我独自修炼，丹药信手捏来，......\r\n       仙鼎烟云！\r\n       推荐精彩好书《战神破天道》《护花宝鉴》', author: '元贞', score: 6923, strScore: '6.9', clsId: 4, clsName: '仙侠', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 8,
          contentType: 1,
          name: '生活就是一个荷包蛋',
          icon: '/3/fe0f6582f6e2d8250ae2c63f450869b8.png',
          style: 3,
          imgBg: '',
          contents: [
            {
              id: 113919,
              name: 'remove-网游之帝皇崛起',
              photoPath: '/3711/A8669D0058AAE89FD6F9D914883BDA08/A8669D0058AAE89FD6F9D914883BDA08.jpg',
              intro: '    时隔两月，被巫妖王强夺身体导致强制删除角色的白熊重回游戏。这时候，他发现许多高端玩家莫名其妙地降到了低级……\n    一个类似死骑的职业，一把霜之哀伤，一位天才新人，共同铸就了一个帝皇崛起传说！\n    他自有称号“圣殿使者”，团队却称呼他“高铁司机”，好友称呼他“平民高手”，游戏公司称呼他“资料片杀手”！\n    书友交流群：9108537\n    帝皇团队群：207416411（验证：舍我其谁）\n    新浪微博：weibo.com/u/1760336634（求粉）\n',
              author: '坠落凡尘',
              score: 6181,
              strScore: '6.2',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
            { id: 112035, name: '恶魔囚笼', photoPath: '/24/95F6F3E182220FF8E5DD410AB7786F8C/95F6F3E182220FF8E5DD410AB7786F8C.jpg', intro: '    一款不受任何保护的地下游戏，一群追逐权利、财富、生命的玩家！\n    命不久矣的秦然，选择进入其中——为了活下去的机会！\n', author: '颓废龙', score: 6000, strScore: '6.0', clsId: 8, clsName: '游戏', readCnt: 0 },
            {
              id: 116282,
              name: 'remove-英雄无敌之尸山骨海',
              photoPath: '/3013/CECC3D31BD8DEA1F85E6503E847313CD/CECC3D31BD8DEA1F85E6503E847313CD.jpg',
              intro: '    混乱领主重现大地！咒死尸巫祭起无边死云！\n    君王护卫镇守陵墓！幽冥骑士举起血腥屠刀！\n    顶级的冥渊龙那浓郁的死气连圣龙的光辉都将被掩盖！\n    终极的冰霜巨龙的喷涂就连最炽烈的火山都将被冻结！\n    更广博浩渺的英雄无敌的世界！\n    更绚丽斑斓的百族争霸的大陆！\n    埋骨之地是终结之地，更是起源之地！\n    向天盟誓！化天下为那无边的尸山骨海！只为成就无上的英雄之名！！！\n    已开书友群：46041260~\n    群内很和谐，请礼貌用语和对本书感兴趣，有讨论剧情走向兴趣的玩家加\n',
              author: 'kiki龙',
              score: 6833,
              strScore: '6.8',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
            {
              id: 100311,
              name: '回头无岸',
              photoPath: '/525/AE448C91A035C173A2B28D1A57FDC50E/707630-1398513669000.jpg',
              intro: '欧阳建军放弃了让人羡慕的社团工作，毅然决然来到他朋友的小公司，是为了爱情，友情，还是亲情？最初他确实茫然，也陷入过极度痛苦。\r\n不屈不挠的精神和执着的性格，让他很快找到了人生的方向，获得了成功，赢得了无数鲜花、掌声和美女。　　\r\n痛苦的背后会有多少幸福？沧桑的背后会有多少绚烂？\r\n所以如果真的认定自己的目标了，就千万不要放弃，锲而不舍，永不回头，永不言弃……\r\n因为，我们回头无岸。\r\n',
              author: '翰岚杰',
              score: 6307,
              strScore: '6.3',
              clsId: 17,
              clsName: '纯爱小说',
              readCnt: 0,
            },
            { id: 115512, name: '我是一名赛车手', photoPath: '/783/23C80C5D30DE7D9B99BD6D2CAACD848D/900405-1413964945000.jpg', intro: '我从高中时代开始就被一个赛车教练看中，他认为我开车与别的赛车手有着差别，看我勇往直前，于是我就开始了自己的赛车生涯.....', author: '小孙悟空', score: 6363, strScore: '6.4', clsId: 9, clsName: '体育', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 44,
          contentType: 1,
          name: '模块三',
          style: 1,
          imgBg: '',
          contents: [
            { id: 179024, name: '女神征服战', photoPath: '/3104/E5A74870B84B55FCD7BBFC23D4EB2A40/675581-1398263412000.jpg', intro: '它站签约，50万完本。请关注我的最新作品，在17k更新。傲天成神，不一样的修真故事。', author: '草莓飞', score: 6363, strScore: '6.4', clsId: 4, clsName: '仙侠', readCnt: 0 },
            { id: 179017, name: '千草绥远芥末思', photoPath: '/2496/E572D8FC3C972CBCBFDE0E6FBFFE8E32/1497088-1447378205000.jpg', intro: '亲爱的读者朋友，请静心阅读我的小说，用鲜花和收藏支持我吧。', author: '念其少年心', score: 6000, strScore: '6.0', clsId: 8, clsName: '游戏', readCnt: 0 },
            { id: 179051, name: '混沌星诀', photoPath: '/2320/E6955E97720856C9C4BBAC64930AF884/590930-1372826134000.jpg', intro: '全力写作中....  \r\nps：新书推荐（混混妖孽）有喜欢的朋友可以出看看', author: '觉悟之中', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
            { id: 179046, name: '临天', photoPath: '/167/E67DDBE95C089F30F7538CCF4BF64F5F/78303.jpg', intro: '“临”古朴的神秘戒指！\r\n林峰，一个面腼腆，一面阴冷，一个神秘的大陆行者。\r\n一部临天神诀，一个万年器灵。\r\n铸就一个神话——临天。', author: '一家山水', score: 6000, strScore: '6.0', clsId: 12, clsName: '现代言情', readCnt: 0 },
            { id: 179035, name: '黑暗邪君', photoPath: '/3953/E60810D8DDA3A95B47178AD262FE55F0/2825801-1531366507000.jpg', intro: '非人，非鬼 非神 也非魔，用一腔热血闯出一个王朝，拥佳人入怀。\r\n破天命，驱邪魔，逐圣神，八方跪伏！', author: '惊蛰风', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
            {
              id: 179038,
              name: '百炼成巫',
              photoPath: '/3280/E63B0FAC6D18E619FE8E03ADC5DCD346/828402-1397044972000.jpg',
              intro:
                '楚安从半山腰掉落，一命呜呼，灵魂附身在，一个同样叫做楚安的少年身上，然而初临异世，危机便接踵而来，万般无奈之下被宗族的人，逼入九幽炼狱。\r\n在楚安快要绝望之时，发现巫族的修炼功法，并遭遇了万年一遇的战魂界，侥幸活了下来，为了躲避宗族的人谋害。\r\n楚安自废丹田，装疯卖傻，幸得他爷爷好友的帮助，成为了宗族旁系的一名族长。\r\n就在此时，强者的聚集地，号称拥有成仙秘密的仙灵学院，开始招收从战魂界活下来，三十岁以下的年轻人。\r\n为了回到号称古神之地的地球，曾经随遇而安，逆来顺受的楚安，加入了仙灵学院，开始了征战之路……浩瀚的仙灵界，无尽的宇宙虚空，百族争霸，神话传说中的人物，接踵而来……。\r\n',
              author: '星月观古',
              score: 6000,
              strScore: '6.0',
              clsId: 17,
              clsName: '纯爱小说',
              readCnt: 0,
            },
            {
              id: 179029,
              name: '修真之极剑道',
              photoPath: '/991/E5D105FEC1DF7468F691D2A8B81E9A24/71396.jpg',
              intro: '      李有才，天雷山上的一个胖子。\r\n      他最大的愿望就是长生。\r\n      可惜的是他的丹田无法存储天地元气，导致无法修真，从而沦为伙夫。\r\n      每天都受尽门派内正式弟子的欺负和嘲笑，而他还要笑呵呵的面对。\r\n      直到有一天，胖子突然死亡，再次醒来的时候，他的命运彻底的转变……    \r\n      我并不是要证明自己比别人强，我只是要别人知道，我失去的我一定能拿回来！\r\n\r\n                                                                                      ——胖子语录',
              author: '风之天舞',
              score: 6545,
              strScore: '6.5',
              clsId: 11,
              clsName: '古代言情',
              readCnt: 0,
            },
            {
              id: 179008,
              name: '灵幻初恋',
              photoPath: '/2752/E531193AFEDE2FF2E6453A7A55E175C4/1759929-1463486981000.jpg',
              intro: '小猫咪被披着羊皮的大灰狼欺骗感情，被教训被强上，被偷走了心。但是大灰狼的情敌可不止一个是两个，小猫咪被逼急了，咬人了，但是还是被三个大灰狼抓回来，好好教训\r\n“学长，我错了~~疼啊~~”\r\n“晚了，让我们好好伺候你吧！”\r\n茫茫人海中爱人不复存在，我何尝不是最伤心最痛的那个？为何他们还不了解我，只剩下鄙夷和嘲弄？\r\n我苦苦的在原地等待，口口声声的山盟海誓，给我的却是一个冷漠的背影，我得到的是失望，是心痛，那为什么不可以去追，因为我不会去追不爱我的人',
              author: '安易秀',
              score: 6000,
              strScore: '6.0',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
            { id: 179041, name: '天云策', photoPath: '/4032/E654AE95F959BAB0E740BAEBC7F2D159/2859274-1532010183000.jpg', intro: '哉圣大陆，混乱暴动一万年。\r\n混血才人戾云殊降生于乱世，\r\n誓要平息大陆，化解万年恩怨。', author: '炒奶糊', score: 6363, strScore: '6.4', clsId: 17, clsName: '纯爱小说', readCnt: 0 },
            {
              id: 179032,
              name: '樱花断魂',
              photoPath: '/430/E5D51A36338EC6ECFD24C277D27383FC/1018523-1414596946000.jpg',
              intro: '在一次驱灵任务中，她跟好友一同誓死抗敌她差点丧命，在危急关头他救了她，她抗敌时无力抵挡他替她灭敌，最终把敌人消灭，他什么都没留下就闪电般的消失了。在一次父母逼使下她逼于无奈入读了樱悦再次与他相遇，她只知道他是一个学生会会长，其他的身份她一概不知接下来她跟他会有什么样的发展。校园的诡异事件接二连三地发生她又怎样解决？他又会帮助她解决这些问题吗。。。。。。。。。。。。。。。。。。。。。\n想知道后面会怎样发展下去吗？请欣赏《校园异能之高手如云》',
              author: '蓝色落樱',
              score: 6000,
              strScore: '6.0',
              clsId: 2,
              clsName: '奇幻',
              readCnt: 0,
            },
            { id: 179045, name: '大梦玄帝', photoPath: '/1872/E668511F48E67C522FBDC61124CBEB5D/852569-1399424769000.jpg', intro: '这是一个玄气的世界，在这里，强者为尊。天梦。一个传说中的绝脉患者，一个被人注定活不过十八岁的少年。因一块玉佩，改变了他自己，也改变了这天地！让这天地，为他为尊。大梦玄帝，你值得拥有！', author: '洪家大少', score: 6363, strScore: '6.4', clsId: 17, clsName: '纯爱小说', readCnt: 0 },
            { id: 179015, name: '风火狂镭', photoPath: '/900/E5636E482D9984EAC883F1D90B472007/146919.jpg', intro: '一块神秘的玉石引发了一段壮丽的传说！让我们跟着主人公纵横魂者大陆！看主人公如何铸就神话！\r\n等级划分：魂者 魂师 大魂师 魂皇 魂王 魂灵 魂尊 魂渡 魂轮 魂圣 魂神 魂帝\r\n新人新书！', author: '天雪残痕', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 55,
          contentType: 1,
          name: '模块一',
          style: 1,
          imgBg: '',
          contents: [
            { id: 178970, name: '绿竹楼', photoPath: '/840/E3708F838451C373DB1EF0922FC1786F/520836-1371362804000.jpg', intro: '从小便喜欢无拘无束的云潜，被箫战缠上后，无奈之下，与他成为知己。他原本以为这个世界上已经没有比他更难缠之人了，却是因为他还没认识一个叫寒烟之人。', author: '蚀水之石', score: 6000, strScore: '6.0', clsId: 11, clsName: '古代言情', readCnt: 0 },
            {
              id: 178966,
              name: '神族之裔',
              photoPath: '/1394/E34E49F4ED3C28477705FA5A01B0E367/300.jpg',
              intro: '他是家族的天才，本该度过平凡又祥和的一生，不幸的灭门让他的人生跌落谷底。他和他本该是生死仇敌，却因为强者间的惺惺相惜成为朋友。她是学院的女神，天才，和他有着几乎相同的命运，命运让他们邂逅。她是神秘组织的杀手，却因为爱上了他失去生命。他和他是兄弟，共同走过艰辛的路程，他为了他甘愿失去性命......\r\n\r\n炼体\r\n阴力阶\r\n阳力阶\r\n天元阶\r\n生死元境\r\n通灵境\r\n灵转境\r\n化神境\r\n神境\r\n等级森严的大陆，究竟谁能主宰这世界？',
              author: '獨走',
              score: 6000,
              strScore: '6.0',
              clsId: 17,
              clsName: '纯爱小说',
              readCnt: 0,
            },
            { id: 178965, name: '末世求生之万噬魔帝', photoPath: '/2004/E34AB48757BD6F67ADFC02996BB25406/1160745-1430499382000.jpg', intro: '    原本平静的世界，出现了裂缝。\r\n    来自异世界的入侵者，开始屠杀。\r\n    人性的崩坏，到处的罪恶。\r\n    在这求生的路上，不断获得与失去的罗炎，该要怎么面对这一切。\r\n    “只有人类才能毁灭人类，也只有人类才能拯救人类。”————罗炎', author: '狱帝魔炎', score: 6000, strScore: '6.0', clsId: 8, clsName: '游戏', readCnt: 0 },
            { id: 178968, name: '冷月照：青丝成秋霜', photoPath: '/82/E35A0FCE925CE2854381BE1557084EEC/581713-1376493551000.jpg', intro: '        她赌气入宫，却再也无法与他厮守。\r\n        他宠她爱她，却只是把她当做替身。\r\n        她虽为替身，步步为营，终究于他心中，无可替代。\r\n        讲述一个奇女子的故事，新书前传。', author: '言午为许', score: 6000, strScore: '6.0', clsId: 12, clsName: '现代言情', readCnt: 0 },
            {
              id: 178993,
              name: '残缺苍穹',
              photoPath: '/2211/E4A88F9EEACB66237A6A9068C1B7221C/821865-1396488273000.jpg',
              intro:
                '     “战——战——战——”震慑灵魂的呐喊声发自九大陆不同种族之间。浓浓的战意如同旋风一样盘旋在各种族上空。随后迈着铿锵有力的步伐向着天空入侵者发动了悍不畏死的狂暴冲击。\r\n　　千丈之外，焚天天尊傲然挺立于空中，右手紧握毁灭噬天仗，随手一挥之间，天空落下的血雨便浓密了一倍，脸上淡无表情，以视万物为蝼蚁般的目光凌厉地俯视着大地上的众生。\r\n　　“攻——”焚天天尊身后的霸世军团爆发强烈的欢呼声，而后对着地面发起总攻击！\r\n　　“战——”地面上众神、魔齐声暴喝，神怒吼、魔咆哮，激着浓浓的杀意，怀着一往无前的气概，迈出整齐而迅捷的步伐，瞬间跨越千丈的空间，像一团噬血的战争狂云浩荡的涌向霸世军团。\r\n     嘿嘿……觉悟吧渺小如同蝼蚁般的生命接受来自天级的洗礼吧。”一连串的冷笑与不屑的话语出自焚天天尊之口，表明了对下方众神、魔的不屑一顾。猛然他面色一冷阴沉的一字一句顿道：“灭——世——浩——劫——。”',
              author: 'arronbin',
              score: 6000,
              strScore: '6.0',
              clsId: 95,
              clsName: '其它',
              readCnt: 0,
            },
            {
              id: 178957,
              name: '蚩邪剑之星龙诀',
              photoPath: '/789/E2EE86730DAB3173CB070E24DE06146C/1578658-1455516474000.jpg',
              intro: '    上古时期九黎部落酋长蚩尤为追求强大的力量，率领他的八十一位兄弟斩杀魔兽并将其筋骨引地狱亡灵铸造魔剑（魄虎），蚩尤有了魄虎之后不应天命嗜血成性而惹怒了天神。于是黄帝应天神之命讨伐蚩尤，涿鹿一战，黄帝借助天神九天玄女的帮助获得了这场战争的最终胜利。\r\n　　千年之后一个古老神秘的部落（灵族），他们与世隔绝世代守护着一把魔剑－－－蚩邪【魄虎】。一次天灾灵族衰败，蚩邪剑重现人间，魔族、巫神一族、灵族再现江湖，一场人间浩劫将至，他本是灵族守护者，却为爱成魔，为爱痴狂……',
              author: '谛陌轩',
              score: 6000,
              strScore: '6.0',
              clsId: 6,
              clsName: '历史',
              readCnt: 0,
            },
            { id: 178984, name: '仙途三生情', photoPath: '/1791/E439AF71F0FF295C299FE4E15BF04307/709714-1385720942000.jpg', intro: '本书已停更，后续发站会发出连接，感谢持续关注的朋友', author: '紫雲煙', score: 6000, strScore: '6.0', clsId: 11, clsName: '古代言情', readCnt: 0 },
            { id: 178998, name: '星魂赋', photoPath: '/994/E4D004B86C0DB13F3F139FBF89B5FD11/t5_14891885.jpg', intro: '这是一个人人修炼星魂的世界，彩虹的等级制度使得这片处处大陆充满了色彩。\r\n凌霄灵魂穿越，却肩负守护这片大陆的重责。\r\n情愫纠缠，心却相牵，两世为人，看透这世间尘寰！\r\n八荒城覆灭，天才怒，龙吟惊，四方动...\r\n成长之路，天才崛起，剿灭异魂师。\r\n', author: '与楠', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
            { id: 178975, name: '杀手之绝世女神', photoPath: '/2097/E3E15D4872D0E6CDE63AD84CF08E587A/365019.jpg', intro: '【女强文】"被我踩在脚下的人，从没有人可以翻身！”\r\n“你是我的！永远都是！别试图逃开！因为你没有决定权！”\r\n“江山和你，我都得不到！那我就杀了你，再毁了这江山给你陪葬！”\r\n这是一场混杂着血和泪的爱情纠葛；\r\n这是一段寻找身世之谜的魔幻旅程；\r\n这是一个让人不寒而栗的惊天阴谋；\r\n他们拼着命只为心中的一个信念：不断变强...变强...\r\n群号：130265508', author: '若米忧', score: 6000, strScore: '6.0', clsId: 10, clsName: '灵异', readCnt: 0 },
            {
              id: 178969,
              name: '泪之痕',
              photoPath: '/1901/E36B5FF81F84FE9B2CEA5DCBB30B7711/322651-1426332604000.jpg',
              intro: '什么是心，什么是爱，什么是幸福，什么……又是仇恨？\r\n她，从牢中出来的第一眼，就是他。而他，是否又是她将要守护一辈子的人？\r\n这个世界，共有五界：人界、魔族、鬼族、天使族，还有幻族……后来却发现，这世界……原来并不止四个界，还有一个十分隐秘的界——神界。\r\n这四界的纠纷，四界的生灵涂炭，什么时候才能停止？亦或是，合并为一个族？\r\n她的神秘老师、鬼族之王的往事，她的身世也是十分迷离……\r\n她的前世，是否就能改变她的选择？\r\n她命中注的的那人，究竟会是谁？四界的仇恨与纠纷，是否就能停止？请观看——《泪之痕》。',
              author: '千叶木褀',
              score: 6000,
              strScore: '6.0',
              clsId: 12,
              clsName: '现代言情',
              readCnt: 0,
            },
            {
              id: 178990,
              name: '狩猎星轮',
              photoPath: '/3343/E492E44A5BBA84395B6A0F12F8D20BFA/901379-1409940159000.jpg',
              intro:
                '  暗黑纪元5083年，在这个宇宙之间自由交涉的第两千年，遨游在广阔无边太空中的时空旅人们却再也找不到自己所航行的方向了。\r\n  自宇宙制约彻底崩坏，战争便宛如恶流席卷开来，蔓延至各个角落;掠夺者、狩猎者、贝姆哈特同盟各自为了自己所坚持的信仰而战斗，因此逐渐演变出许多拥有特殊能力的人，他们统称为“天之子”。\r\n  站立在战争与肃杀之中，任何的生命都变得如此弱小。少年停滞在风里抬头仰望天空……\r\n  （曾经，我被一个名为海贼王的信仰所感动；曾经我希望成为海贼王路飞的船员，一路经历各种惊心动魄的伟大冒险；而我现在才明白这个世界由自己主宰！伟大时代由自己来开辟！我是寂寞西呱呱，也是梦欲单飞。 坐下去，你只能是读者，站起来！自己就是大神！）',
              author: '梦欲单飞',
              score: 6000,
              strScore: '6.0',
              clsId: 12,
              clsName: '现代言情',
              readCnt: 0,
            },
            { id: 178964, name: '万世', photoPath: '/3726/E34635B97967E3F645759725AF2F3060/516436-1365145119000.jpg', intro: '         是不是想脱离痛苦，是不是没有现在希望的一切，绝望，感叹，羡慕，欣赏，欣慰，悲伤，该如何。。。。。\r\n      万年如一世，一世如一生。\r\n      忘记过去，现在的现在，就是心的所想，让人们都记得你，不曾忘却。\r\n      你会感到骄傲，你是最闪耀的，在众多世间中，以你为准。\r\n      万世之世，有你。', author: '雨依花落', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 56,
          contentType: 1,
          name: '模块二',
          style: 1,
          imgBg: '',
          contents: [
            { id: 178765, name: '云笙记', photoPath: '/1048/DC25BB21F80C721F48B3120C740139F5/972428-1426241235000.jpg', intro: '如果在某次宴会上不小心听到了不该听到的东西怎么办？\r\n跑！\r\n那如果不小心被神界皇子认成他的情人又怎么办？\r\n这个......我还真没想过！\r\n因一场意外，他们相遇。\r\n却因一场意外，转眼间，他们已成陌路人。', author: '雨轩雅阁', score: 6166, strScore: '6.2', clsId: 11, clsName: '古代言情', readCnt: 0 },
            { id: 178940, name: '狂暴之战', photoPath: '/3962/E22A8C84DD6805DCABF014203D24660C/300.jpg', intro: '这是一个实力至上的大陆，里面三国鼎立。同时各国又拥有各种能力的人才，为了强大的力量，他们一直都在追求着。而本作的主角便是令人闻之色变的狂暴种族唯一幸存者，到底她的命运会如何呢？请戳进来看看吧！     ', author: '刀锋w', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
            {
              id: 178704,
              name: '奇侠仁妃',
              photoPath: '/9/D9F2402F5722C365887FC6646A796D80/981835-1535175558000.jpg',
              intro: '刘若天，一位出身名门、风流倜傥、幽默风趣、能言善辩、不畏强权的“全能男神”；徐紫嫣，一位身世坎坷、心地善良、善解人意、天生丽质、倾国倾城的“完美女神”。\r\n机缘巧合，两人不期而遇；初次见面，两人一见钟情。阴差阳错，两人双双穿越清朝初年。大清盛世，突然来了两个“不速之客”，从此再无太平！\r\n斗心智、玩计谋、五花八门、样样精通，戏恶霸、惩刁奴、坚定不移、成功逆袭。锄奸邪、扬正义、扶危济贫、心系家国，入皇宫、成贵妃、惩恶扬善、不忘初心。\r\n读一部穿越小说，品一回世间百态。让我们共同见证，前途漫漫人生路。\r\n',
              author: '御龙圣君',
              score: 7142,
              strScore: '7.1',
              clsId: 11,
              clsName: '古代言情',
              readCnt: 0,
            },
            {
              id: 178941,
              name: '碧玉龙王',
              photoPath: '/1364/E2449003790C2AED30DA22674C91BDBE/898705-1422001313000.jpg',
              intro: '人生几多失意，为何偏偏选中我？\r\n身世成谜，命运多舛的熊週，幼年家遭变故，亲人横死，自己为奴九道，却因身手敏捷，在山庄培养战奴的“训练营”中脱颖而出，成为“冷血十三鹰”，沦为杀人的机器。\r\n而山庄的凤岚，却是他血雨腥风生涯中的一朵白莲花，纯洁而脆弱，直到那一天——\r\n熊週绝不敢相信凤岚就这样死在自己的眼前，他愤而出手，和一群为了自由的奴隶们，摧毁了他眼中无比憎恨的九道山庄！世事难料，那场大火烧毁的山庄不过是个躯壳，而针对他的一场更大的阴谋正在慢慢酝酿……\r\n阳光虽然刺眼，但它也给你带来了温暖，你的剑，又怎么能刺向太阳？',
              author: '古风吹残月',
              score: 6000,
              strScore: '6.0',
              clsId: 95,
              clsName: '其它',
              readCnt: 0,
            },
            {
              id: 178945,
              name: '星魂大陆之二十八星宿',
              photoPath: '/3119/E25EFCF8C57289A4B58104F12DE70CF9/821847-1396827880000.jpg',
              intro:
                '一位普通的少年从现实世界穿越而来。\r\n在这里，一个名为星魂大陆的异度空间。\r\n在这里，一个没有魔法，\r\n没有斗气，没有超能力的异世国度。\r\n上演着一个传奇，一个属于楚浩宇的传奇。\r\n当然，这个传奇，不只是属于楚浩宇一个人的。\r\n远古传说，星魂大陆曾经是诞生过28星宿的一个奇空间。\r\n28星宿分四象，四象分东方青龙，西方白虎，南方朱雀，北方玄武。\r\n东方青龙依此分角、亢、氐、房、心、尾、箕七宿，\r\n北方玄武依此分斗、牛、女、虚、危、室、壁七宿，\r\n西方白虎依此分奎、娄、胃、昴、毕、觜、参七宿，\r\n南方朱雀依此分井、鬼、柳、星、张、翼、轸七宿。\r\n楚浩宇带领着28星宿一步一步的缔造了一个传奇，一个属于28星宿的传奇。\r\n（请读者和大大们随手点一下收藏，有花的送点花花，有票子的送一点票票，感谢！）',
              author: '轩辕军军',
              score: 6000,
              strScore: '6.0',
              clsId: 95,
              clsName: '其它',
              readCnt: 0,
            },
            { id: 177772, name: '木兰词张昭曲', photoPath: '/2081/B7C5C4964C8F22548589E4ADB2562AE2/300.jpg', intro: '乱世中走过，更知相守的难能可贵。出世与入世，功利与洒脱，尘网与桃源，其实并不难以抉择。不管来世如何，今生只望与你天荒地老。\n待我长发及腰，你我携手可好？', author: '少青青', score: 6666, strScore: '6.7', clsId: 12, clsName: '现代言情', readCnt: 0 },
            { id: 178953, name: '超神学院之超兽武装', photoPath: '/2307/E2AA7C8EFD2449D0DA4834D586B002AA/2863035-1532263681000.jpg', intro: '叶笑，前世酷爱动漫，尤其迷超神学院、超兽武装。可惜，命运悲惨，15岁因为车祸丧失父母，爷爷奶奶也因悲痛过度，去世了。在一天雷雨交加的夜里，对着闪电大喊，“来啊，电死我啊”。雷电满足了他的愿望，可他发现自己并没有死，而是穿越到了超神学院。', author: '莲雨幻轩', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
            { id: 178948, name: '夜梦蓝空', photoPath: '/2332/E276491A2166A1C5663CF74D1F72CFE6/421855-1352609685000.jpg', intro: '亲爱的读者朋友，请静心阅读我的小说，用鲜花和收藏支持我吧。', author: '时若空', score: 6000, strScore: '6.0', clsId: 5, clsName: '都市', readCnt: 0 },
            { id: 178951, name: '九劫浮屠', photoPath: '/860/E29A3C2679F3CCA8F6BA62DBF64702EB/477033-1360335995000.jpg', intro: '他为了复仇甚至不惜将自己的灵魂出卖给魔鬼，命运牵扯着每一个人，将前行的人推向未知的旅途。看似乎静的尘世又将掀起怎样的腥风血雨？天象惊变，星辰紊乱，巨大的秘密在这样的恐惧与不安中缓缓浮出水面，身处在这乱世旋涡中的人，又该如何掌握自己的命运？……\r\n    震慑九天十地。号令天下苍生。力压当世无敌。唯我魔之道。九劫浮屠。轮灭众生\r\n    替天行道恨谁杀谁', author: '不许点灯', score: 6000, strScore: '6.0', clsId: 95, clsName: '其它', readCnt: 0 },
            { id: 178106, name: '囚天仙途', photoPath: '/1295/C46CB84E31AB75948CB6ED8ED27A4F54/775515-1393320123000.jpg', intro: '在怨恨之中诞生，在生死的边缘游历，撼动着天地的规则。\r\n一切的一切，成为铸造他王者道路的基石！\r\n陈杰！', author: '飘渺越少', score: 6727, strScore: '6.7', clsId: 4, clsName: '仙侠', readCnt: 0 },
            { id: 177623, name: '特战警魂', photoPath: '/2685/B1A77D6C44BED4E44274DB50ED8609A8/2014843-1470276924000.jpg', intro: '亲爱的读者朋友，请静心阅读我的小说，用鲜花和收藏支持我吧。', author: '凌影天尊', score: 7300, strScore: '7.3', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 178943, name: '网游之成就高手', photoPath: '/3079/E24A7AD981C6B98CBB180070CA597DCC/770418-1391618254000.jpg', intro: '...', author: '小黑影', score: 6000, strScore: '6.0', clsId: 5, clsName: '都市', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 57,
          contentType: 1,
          name: '模块三',
          style: 1,
          imgBg: '',
          contents: [
            { id: 155843, name: 'remove-天剑真言', photoPath: '/253/0872AF29822ED0205FA0D5F203FBA1B3/0872AF29822ED0205FA0D5F203FBA1B3.jpg', intro: '冷月之刀，无往不利。\n    飞星不出，谁与争锋？\n    无敌天剑，横扫天下。\n    无上真言，流传万古！\n    本书主要讲述一个平凡少年为了修成逆天之剑而进行逆天的传奇故事。\n    敬请期待！\n    各位书友要是觉得《天剑真言》还不错的话请不要忘记向您qq群和微博里的朋友推荐哦！天剑真言最新章节,天剑真言无弹窗,天剑真言全文阅读.\n', author: '轩流风', score: 7000, strScore: '7.0', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 177364, name: '被遗忘的魔法国度', photoPath: '/2460/A906624BAA6B418D5F7E8AAD87F5323B/30390.jpg', intro: '一个来自21世纪的青年\r\n一幕幕令人想都不敢想的事情，在他眼前发生。\r\n当经历了许多事之后，他渐渐地习惯了这样一个世界。', author: '舞蹈家', score: 6181, strScore: '6.2', clsId: 12, clsName: '现代言情', readCnt: 0 },
            {
              id: 166159,
              name: 'remove-七界传说',
              photoPath: '/1697/8F0DE01071A5EEFC3F2F5AEA8494FE18/8F0DE01071A5EEFC3F2F5AEA8494FE18.jpg',
              intro: '本书讲述一个天生残缺一魂一魄的少年陆云，无意随父亲入西蜀，得遇一怪人传授十年修真法诀，后得到六千年前，百世先祖所留之神兵，并进入六院中的易园修炼，从而进入一个神奇的世界。随着陆云修为的加深，也渐渐了解到了所谓的七界传说，并从修身界，逐一进入其余六界，展开了一段神奇诡异，别开生面的旅行。\n    千年修真界，流传着五派六院七界之传说。陆云先天残缺，一条逆天之路，夹着几份难忘的爱情与友情，一路之上，历经磨难，可最后的结果，会是什么呢？\n    本书中有相当多的神奇怪异之事，神仙佛道，妖魔鬼怪，邪灵阴魂，百兽齐聚。正与邪，谁对谁错，是与非善恶无常。何为天，何为地，神仙鬼怪谁能看透？\n',
              author: '心梦无痕',
              score: 6100,
              strScore: '6.1',
              clsId: 3,
              clsName: '武侠',
              readCnt: 0,
            },
            { id: 170739, name: 'remove-凡人修仙传', photoPath: '/1478/C99AF543CB817E4D346804675B73F325/C99AF543CB817E4D346804675B73F325.jpg', intro: '一个普通山村小子，偶然下进入到当地江湖小门派，成了一名记名弟子。他以这样身份，如何在门派中立足,如何以平庸的资质进入到修仙者的行列，从而笑傲三界之中！\n    各位书友要是觉得《凡人修仙传》还不错的话请不要忘记向您qq群和微博里的朋友推荐哦！\n', author: '忘语', score: 6300, strScore: '6.3', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 158410, name: '九阴九阳之阴阳神功', photoPath: '/3271/341F7935DE97A06DC351654689D883CE/341F7935DE97A06DC351654689D883CE.jpg', intro: '千年世家弃子孔玉得到天尊的传承，万千功法集于一身，以五行均衡之体演化天地阴阳，以巫族血脉修炼九转玄功。\n    因至爱身死，为寻复活之法造下无边杀戮。孔玉以古武只手破天，以祖巫神通破灭宇宙洪荒，与天道圣人周旋，聚集天地五方旗，终成混元无极教主，在无量量劫中傲视群雄，笑傲天下。\n', author: '娶猫的老鼠', score: 6363, strScore: '6.4', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 168742, name: '北冥神剑', photoPath: '/1337/B0444E6F28ACD394832F1FD49DA3AA67/B0444E6F28ACD394832F1FD49DA3AA67.jpg', intro: '极北之地到处冰天雪地，寒冷异常，为何这里一处小小的寒叶谷，竟然四季如春？\n    这里，究竟隐藏着怎样的秘密？\n    年轻的少主池中天会遇到怎样的江湖奇遇？\n    风平浪静的武林，又为何再起波澜？\n    所有的一切，都来得太突然了，突然的让人目不暇接，让人无所适从。\n    书友群：36742190；欢迎各位读者们加入，你们的每一分支持，都是我最大的幸福！\n', author: '池衡水榭', score: 6166, strScore: '6.2', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 154012, name: '九阴邪君', photoPath: '/2651/31BA4B093443243EB17B44C176EC4019/31BA4B093443243EB17B44C176EC4019.jpg', intro: '', author: '聂小刀', score: 6000, strScore: '6.0', clsId: 15, clsName: '时间穿越', readCnt: 0 },
            {
              id: 167625,
              name: '风流邪尊修仙记',
              photoPath: '/3974/A7860A6382CEA4DE6C13D3BE76595DFD/A7860A6382CEA4DE6C13D3BE76595DFD.jpg',
              intro: '明末是仙道衰弱的开端，一场波及整个天下的仙魔大战使得仙魔佛妖等等所有的修仙教派元气大伤，整个仙道危急，二百年后就会被西夷的一种全新的文明所代替。 仙道衰微！佛道衰微！魔道衰微！这个时候恶人常笑来了！ 这个世界上没有所谓的仙侠，有的只是一个个在烘炉之中挣扎求存的弱小生灵！ ＊＊＊＊＊ 三生出品必属精品 ＊＊＊＊＊＊＊＊ 这是三生的第四本买断书，之前已经完本三本书，总计五百余万字，其间基本未曾断更过，各位可以放心阅读！三生书友群 天道十三层 182875680《速加》 杀神群 65061774《满》 人道洪炉 12213790《满》【【【【日更万字】】】】\n',
              author: '三生万物',
              score: 6363,
              strScore: '6.4',
              clsId: 3,
              clsName: '武侠',
              readCnt: 0,
            },
            { id: 163019, name: '血脉录', photoPath: '/2144/7592B3CBD0D332F88108DF516C0D3FD9/7592B3CBD0D332F88108DF516C0D3FD9.jpg', intro: '神龙、凤凰、麒麟以己身精血造人；人的血液中蕴含着远古神魔的血脉，拥有着无限的潜力；引天地灵气洗涤血脉，开发潜能，一步一步引导出血脉中的力量，成仙做祖。无边广袤的世界，无穷无尽的法宝玄功，带领你进入一个奇特的仙侠世界。修炼境界：凝血、化形、通天、仙人、神魔。*****老月新书，《法师奥义》已经发表，希望大家支持！\n', author: '月中阴', score: 7000, strScore: '7.0', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 153740, name: 'remove-绝代神主', photoPath: '/1785/E2C7360BC2E459D0022CE581FB7745F5/E2C7360BC2E459D0022CE581FB7745F5.jpg', intro: '【最热爽文】苏家少主苏莫，觉醒出逆天武魂，却被认为是最低级的垃圾武魂，受尽屈辱……且看苏莫如何凭借着逆天武魂，一路崛起，一路逆袭……练奇功、得奇宝、闯绝地、战天骄，吞噬无尽生灵，融合诸天血脉，鏖战天下，举世无敌！【vip书友群570815745，正版读者入群请出示粉丝值验证！】\n', author: '百里龙虾', score: 6727, strScore: '6.7', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 162985, name: '吕清广本纪', photoPath: '/3076/6F93076BA07337E6CA76EC8BF2782589/6F93076BA07337E6CA76EC8BF2782589.jpg', intro: '本书所录俱为真实绝无虚假，史实详尽，科学严谨。所提到的仙佛神魔都进行了逐一的调查了解，保证真实可靠，在写作中得到耶和华、撒旦、释迦牟尼、地藏菩萨等的配合举证，他们对证言证词都毒誓，向**保证每句话都真实可靠。本书为内部参考资料，非修真界内部人员严禁外传。\n', author: '半了散人', score: 6666, strScore: '6.7', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 154517, name: '横扫异界之无敌天尊', photoPath: '/83/F383E38E756829DC934C302F03922E1D/F383E38E756829DC934C302F03922E1D.jpg', intro: '得神剑，练神功，为着心中的执念不断超越自我。战强敌，战神魔，更是以力抗天！\n    无敌战技，风云大陆，谁主沉浮？\n    ========\n    新书《不死武皇》开启，附上17k/book/群号 272162474\n', author: 'xiao少爷', score: 6727, strScore: '6.7', clsId: 1, clsName: '玄幻', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 59,
          contentType: 1,
          name: '有图模块五',
          style: 1,
          imgBg: '',
          contents: [
            { id: 149031, name: '万古至尊', photoPath: '/1458/89CD7401C4F89E147D1980E95A3F43EB/89CD7401C4F89E147D1980E95A3F43EB.jpg', intro: '"/> \n<meta property="og:image" content="https://www.x23us.com/files/article/image/50/50549/50549s.jpg\n', author: '太一生水', score: 5636, strScore: '5.6', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 147934, name: '九道神龙诀', photoPath: '/1907/0F1924ED315E17BF55D3E1925CA1AE63/0F1924ED315E17BF55D3E1925CA1AE63.jpg', intro: '九道神龙诀乃是九界至高无上，最为精妙的神典。但千万年来，无一修炼至极，而张小风无意间得到，以其独特的机遇和个性，将九道神龙诀修到了顶峰，且看他如何逍遥世间，猎尽天下美女，掌握至上之道。\n', author: '言鼎1', score: 6400, strScore: '6.4', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 151925, name: 'remove-武道霸主', photoPath: '/3837/BD371DD1C3CCD2B049F1D49108D5D6D3/BD371DD1C3CCD2B049F1D49108D5D6D3.jpg', intro: '【阅读有奖】朋友，我看你骨骼精奇，是万中无一的武学奇才，维护世界和平就靠你了，我这有本秘籍——《武道霸主》，见与你有缘，就托付给你了。\n', author: '蜀狂人', score: 6727, strScore: '6.7', clsId: 1, clsName: '玄幻', readCnt: 0 },
            {
              id: 146297,
              name: '重生之宗门崛起',
              photoPath: '/2395/451595979CE8788365AC80335B98EB07/451595979CE8788365AC80335B98EB07.jpg',
              intro: '数千年的等待只为今朝。道玄圣宗，修仙界八大圣地之一。然一朝之间灭门除名。宗内一纨绔子弟面对亲朋好友的惨死，回顾以前的种种，心中怒气悔恨交叉在一起化作一股怨气，想要与敌首同归于尽。奈何奈何……死前立下誓言，纵然轮回万年转世千次我亦归来报仇雪恨。死后化作怨灵不堕轮回，仅靠满腔的执念和一丝血脉之力投胎于本族后辈。虽已过几千年，然此恨无期。今生转世而来就是为了前世的誓言。\n',
              author: '皮卡超忍',
              score: 6500,
              strScore: '6.5',
              clsId: 1,
              clsName: '玄幻',
              readCnt: 0,
            },
            { id: 150716, name: '极品乡村生活', photoPath: '/433/9AA14BF7F81FD48A81700BD91D205998/9AA14BF7F81FD48A81700BD91D205998.jpg', intro: '    看个流星，砸破头，无缘无故成为有房有地小农民，        吃穿不愁，找老婆，        撵狗抓鸡，烧条鱼，逗娃娃，        野菜也香甜，没事瞅瞅那啥美女，生活淡淡乡村。        有限与世无争，生活惬意乡村小宅男。        ……………………        【平时：建了一个群，群号：228998742，乡亲们没事可以聊聊，晾一晾家乡小吃，风俗，自己儿养的小宠物，花草。\n', author: '名窑', score: 6200, strScore: '6.2', clsId: 12, clsName: '现代言情', readCnt: 0 },
            { id: 153122, name: '无极剑神', photoPath: '/3452/DC7AF80B85191FD1AD01B5C2287EAA54/DC7AF80B85191FD1AD01B5C2287EAA54.jpg', intro: '天武大陆，宗门林立，弱肉强食，适者生存，为救亲人，苏云一念成魔，偶获逆天剑匣，习得惊世剑诀，一把由十万八千口仙剑镇压的神秘之剑，铸就了一段不朽剑神传说！（书友群：131602520；祝融之臂vip订阅群：2734885【订阅的朋友加】）\n', author: '火神', score: 6363, strScore: '6.4', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 149815, name: 'remove-至尊召唤师', photoPath: '/2082/9A5E82ECACDB59218AEE92DE56B19B0B/9A5E82ECACDB59218AEE92DE56B19B0B.jpg', intro: '"/> \n<meta property="og:image" content="https://www.x23us.com/files/article/image/55/55830/55830s.jpg\n', author: '神也发愁', score: 6666, strScore: '6.7', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 149809, name: '六界神君', photoPath: '/3741/992492760BF5D9C0BBDA9183E17D47B7/992492760BF5D9C0BBDA9183E17D47B7.jpg', intro: '一个孤儿轮回到未知世界中一个家族中的废物身上，在机缘巧合下得到远古传承，收服妖兽，在家族比试中一鸣惊人！从此在人界历经万难，最终达到人类修炼顶峰！为寻找与自己相伴多年的伙伴，战妖圣、斩魔将、破仙阵、闯鬼门、入神殿，在六界掀起一场腥风血雨的战争！最终称霸六…\n', author: '风中嘟嘟', score: 6100, strScore: '6.1', clsId: 1, clsName: '玄幻', readCnt: 0 },
            {
              id: 152688,
              name: '我就是太平洋',
              photoPath: '/1921/F0B7959A539920F7CBF729522521BA00/F0B7959A539920F7CBF729522521BA00.jpg',
              intro: '唐海，一名美国河道清洁工，一觉醒来，发现自己居然可以附身江海！然后，海神的故事出现了！“虽然现在我只能控制一条城镇小河，但我迟早要控制所有海洋！”“喂，老总吗？我这就把美国海军布防图发给你！”“该死的猴子，别逼我开大招放海啸！”“这条20米长的鲨鱼是我的宠物，这不卖的！”“今年干旱太严重？我觉得接下来几天都会有雨！”“每天下雨3小时，撒哈拉迟早会变成热带雨林！”“什么？非洲农业不发达，你找我要金克拉……”河道清洁工最后成为了世界著名养殖专家、自然学家、生物学家、环境治理专家、冒险家！……这是一本yy爽文，也是一本美食教材，希望大家喜欢！……\n',
              author: '敢为',
              score: 6363,
              strScore: '6.4',
              clsId: 5,
              clsName: '都市',
              readCnt: 0,
            },
            { id: 152729, name: 'remove-光灵行传', photoPath: '/566/CE3CAFE0F1E4CE00C016B9C670617DE7/CE3CAFE0F1E4CE00C016B9C670617DE7.jpg', intro: '人类弱者的弑神逆袭，走向霸者的复仇之路。\n    命运纠葛的爱恨情仇，谈笑风雨的回眸厮杀。\n    -\n    复仇少年亚瑟，充满荆棘与坎坷的霸者征途！\n    永劫之魂，不朽不灭；剑指神魔，谁与争锋！\n    -\n    亚瑟，少年人类弱者！\n    亚瑟，扭转世界命运的弑神！\n    且看风雨归来路……\n', author: '雷文d维克萨斯', score: 6500, strScore: '6.5', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 146123, name: 'remove-兽破苍穹', photoPath: '/3033/C0BC38737378069CC0E78907790AD979/C0BC38737378069CC0E78907790AD979.jpg', intro: '    倾国倾城的大教圣女、绝代芳华的豪迈女侠、素衣清雅的过路妹子、不食烟火的天上仙子、才貌双全的一代名妓、雍容华贵的娇蛮小姐、风华绝代的大姐姐！在这个强者为尊英雄遍地的时代，且看落魄的废柴七少爷如何问鼎巅峰，掀起惊天狂澜，又是如何万花丛中独领风骚，引得群芳只为他而艳……&amp;quot;\n', author: '妖夜', score: 6727, strScore: '6.7', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 148101, name: '唐寅在异界', photoPath: '/1801/6C7B75A0328959E5BC9C204E616AE1DB/6C7B75A0328959E5BC9C204E616AE1DB.jpg', intro: '"/> \n<meta property="og:image" content="https://www.x23us.com/files/article/image/0/567/567s.jpg\n', author: '六道', score: 6300, strScore: '6.3', clsId: 1, clsName: '玄幻', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 60,
          contentType: 1,
          name: '男频模块一',
          style: 1,
          imgBg: '',
          contents: [
            { id: 131578, name: '大娱乐家', photoPath: '/1956/C6B4134C7254BFD4629CDA9BD988C8FE/C6B4134C7254BFD4629CDA9BD988C8FE.jpg', intro: '重生之人，活在娱乐圈的故事。\n', author: '高大的豆丁', score: 6400, strScore: '6.4', clsId: 5, clsName: '都市', readCnt: 0 },
            { id: 100000, name: '霸世浮图', photoPath: '/540/0EB9E6AC045490136838444853450910/1512498-1447944517000.jpg', intro: '南朝萧梁武帝太清元年（公元547年），东魏丞相高欢病死，其子高澄继任。侯景素来与高澄不和，于是据河南之地反，先欲投西魏，后又改投梁朝。高澄两路出兵，南讨侯景。武卫将军元柱等率数万大军日夜兼程，在颍川之北与侯景相遇，程越的第二人生，就在这血与火的中原大地拉开了序幕......\r\n“南朝四百八十寺，多少楼台烟雨中”，当此乱世，谁将怀浮图之慈悲，行霹雳之手段，纵横南北，霸凌天下。', author: '易大有', score: 6666, strScore: '6.7', clsId: 6, clsName: '历史', readCnt: 0 },
            { id: 122336, name: '睁眼撞鬼', photoPath: '/1942/ED58FDA02C1EBF92368963139F4A5612/ED58FDA02C1EBF92368963139F4A5612.jpg', intro: '    大学第一天报到，谁曾想宿舍后面是个鬼窟，结果她便与鬼夜夜同床。稀里糊涂的成了鬼新娘，这只艳鬼还化身大学教授，白天晚上的欺负她。驱鬼师师兄，巫师舍友，教授鬼丈夫，她的大学生活还真精彩啊！直到有一天，这只鬼携鬼魅大军而来，她才浑然知道，原来他就是传说中的鬼王大人啊！\n', author: '左眼', score: 6727, strScore: '6.7', clsId: 10, clsName: '灵异', readCnt: 0 },
            {
              id: 126141,
              name: '异世为僧',
              photoPath: '/1846/8F526DC00E465317FBA812DBF269ED5E/8F526DC00E465317FBA812DBF269ED5E.jpg',
              intro: '    萧舒继《金庸世界里的道士》后之新作。\n    转世降临，出家为僧，真能离情绝欲，慧剑斩情丝？\n    修炼武功，有天下第一之志，可世间天才如夜空繁星，他真可达成？\n    金刚不坏，身陷红尘，落入花丛，真能不垢不坏？\n    一切皆在《异世为僧》，讲述一个和尚的精彩人生。\n    vip群：129395774，\n    普通群（般若寺）：129397232，\n    普通群（澄静寺）：129396968\n    每周二晚上线。\n',
              author: '萧舒',
              score: 5818,
              strScore: '5.8',
              clsId: 1,
              clsName: '玄幻',
              readCnt: 0,
            },
            {
              id: 122342,
              name: '实习小道长',
              photoPath: '/1744/F5B0148FE3B325998C8891C36BC094E4/F5B0148FE3B325998C8891C36BC094E4.jpg',
              intro: '    一具竖着浮在水中的无名女尸被打捞上案之后，城南市便接二连三的在半夜三更时发生了恐怖碎尸案！\n    来自北区分局的菜鸟林非跟着师傅老胡在调查碎尸案时竟无意中解开一个几年前被定为“意外”的交通案件！\n    这到底是巧合？还是有人在暗中布下的阴谋？\n    .......\n    “哥们儿！那是吸血鬼不是僵尸！”\n    “有差别吗？”\n    “吸血鬼你得用十字架！僵尸才用桃木剑……”\n    “咦！别搞得这么严谨嘛！都说了、我还在实习，拿错装备很正常的啦！”\n    “艹……”\n',
              author: '八黎',
              score: 6200,
              strScore: '6.2',
              clsId: 10,
              clsName: '灵异',
              readCnt: 0,
            },
            {
              id: 129522,
              name: '宠你成瘾：霸道恶少温柔爱',
              photoPath: '/2116/4ACF1FEC1A20FDB59906AECBC2853FD8/4ACF1FEC1A20FDB59906AECBC2853FD8.jpg',
              intro: '【霸道深情男主vs聪慧小娇女】当年，他强势介入她的青春，割裂她与初恋的一切。他霸道地向世人宣誓她是他的！可她天生倔强，让他想要，却得不到！四年后，他霸气回归。在他处心积虑的算计下，她一步步走入他撒下的网，被他爱在心尖，深情眷宠着。可他的爱太深沉，时而霸道温柔，时而冷酷绝情，让她困惑，决定寻找真正的他……谁知，却发现他背景强大，且有多重身份……男主：邱峻（沈逸峻）；女主：温海蓝\n',
              author: '演练(书坊)',
              score: 6428,
              strScore: '6.4',
              clsId: 5,
              clsName: '都市',
              readCnt: 0,
            },
            {
              id: 122329,
              name: '非正常人类异闻录',
              photoPath: '/1979/E4D88E3F7232789D38BFD7E4BD25FC46/E4D88E3F7232789D38BFD7E4BD25FC46.jpg',
              intro: '    我叫张大道，道号张全道。在第七人民医院被人研究！\n    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n    贫道张全道，专业摸骨批命，棺材翻新,抛光,打蜡。回收二手僵尸,寻龙点穴、批发黑驴蹄、黑狗血。代写1~3年级小学作业，寻找走失猫狗，抓小三。\n    专业报仇打小人、改风水、妨祖坟！量大从优！有发票！\n    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n    书友群200人小群：四八一三五五零一二。进群报书名，\n',
              author: '精分三代',
              score: 6100,
              strScore: '6.1',
              clsId: 10,
              clsName: '灵异',
              readCnt: 0,
            },
            {
              id: 125111,
              name: '财色无边',
              photoPath: '/205/3A5E545F07E515782A72BFD06C84769A/3A5E545F07E515782A72BFD06C84769A.jpg',
              intro:
                '    平凡的人拥有了不平凡的本事之后，开启一段传奇之旅。他是新一代的赌神，他是新一代的翡翠王，他是新一代的收藏家。而更为传奇的是他鉴定宝物的过程，只说真假，没有理由。\n    被称为惜字如金的一言大师！\n    “大师您看看，我这个元青花是真的还是假的！”\n    “假的”\n    “怎么可能，大师你说说”\n    “滚，老子一分钟几百万上下，哪有那么多时间，不信自己去找科学仪器鉴定！”\n    同他惜字如金一样出名的是他风流韵事，传说中被他看了一眼的女人，都有可能怀孕，你信吗，反正我信了！\n    “完了，大师看了我的肚子一眼，我不会有了吧！”一个恐龙级女人道。\n    旁边几个国色天香的美女，怒视着一脸委屈的张扬，这样的货色你也看，难道真的是好色到极致，生冷不忌了！\n',
              author: '我杀破狼',
              score: 6500,
              strScore: '6.5',
              clsId: 12,
              clsName: '现代言情',
              readCnt: 0,
            },
            { id: 130842, name: '隐身侍卫', photoPath: '/557/C253F61D85C23335811EB129488719C5/C253F61D85C23335811EB129488719C5.jpg', intro: '无意间触电后的张易，发现自已竟然可以隐去身体，变成一个透明人，意外的惊喜让他开启了新的人生。冷艳的公司老总，火爆的美女警花，调皮捣蛋的富家千金。抱歉，我是一个正直的人，我从来不会利用我的隐身技能偷窥美女，因为我只会站在美女面前大胆的看！你看不见我，你看不见我，你看不见我……保镖新群：24173796\n', author: '桃子卖没了(书坊)', score: 6000, strScore: '6.0', clsId: 5, clsName: '都市', readCnt: 0 },
            { id: 179745, name: '战警传说之望月天狼当排行榜书名过长时显示是否正常', photoPath: '/3085/FFA8460149F4C3F27264D63C8C133DE7/449048-1385516844000.jpg', intro: '　厌烦了战争的战争之王，因杀人过多，被派到华夏，过普通生活，为了世界不在被战争破坏，重上战场.......................\r\n', author: '战警传说之望月天狼当排行榜书名过长时显示是否正常', score: 7166, strScore: '7.2', clsId: 95, clsName: '其它', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 61,
          contentType: 1,
          name: '男频模块三',
          style: 1,
          imgBg: '',
          contents: [
            { id: 110021, name: '末世魔神游戏', photoPath: '/3740/65DADDB87D455CAB0E663C226DF45332/65DADDB87D455CAB0E663C226DF45332.jpg', intro: '    整个地球成为了一个游戏竞技场，想要在这残酷的末日生存下去，只有拿起手中的武器，不断的战斗，打怪升级，不断强化自己。\n    唐天经过不懈的努力，最终推倒地球上百级最终boos，发现这只是打通了第一张地图而已。\n    看唐天登顶残酷地球竞技场，带领种族争雄绝望种族争霸场，最终打穿地狱神魔游戏场……\n    ————末世只是开始……\n', author: '石闻', score: 6545, strScore: '6.5', clsId: 8, clsName: '游戏', readCnt: 0 },
            { id: 112035, name: '恶魔囚笼', photoPath: '/24/95F6F3E182220FF8E5DD410AB7786F8C/95F6F3E182220FF8E5DD410AB7786F8C.jpg', intro: '    一款不受任何保护的地下游戏，一群追逐权利、财富、生命的玩家！\n    命不久矣的秦然，选择进入其中——为了活下去的机会！\n', author: '颓废龙', score: 6000, strScore: '6.0', clsId: 8, clsName: '游戏', readCnt: 0 },
            { id: 110011, name: '七色佛珠', photoPath: '/562/4BD5CFA3116C33A779D2CACD61CF9A04/4BD5CFA3116C33A779D2CACD61CF9A04.jpg', intro: '    拥有绝顶厨艺的阳叶盛，屈身在一个小饭馆，因为一个极品老板娘。\n    拥有超凡武艺的阳叶盛，投身在一个大酒吧，也因为一个极品老板娘。\n    后来，阳叶盛自己做了老板，越来越多的极品老板娘出现了……\n', author: '杨老三', score: 6100, strScore: '6.1', clsId: 12, clsName: '现代言情', readCnt: 0 },
            { id: 115512, name: '我是一名赛车手', photoPath: '/783/23C80C5D30DE7D9B99BD6D2CAACD848D/900405-1413964945000.jpg', intro: '我从高中时代开始就被一个赛车教练看中，他认为我开车与别的赛车手有着差别，看我勇往直前，于是我就开始了自己的赛车生涯.....', author: '小孙悟空', score: 6363, strScore: '6.4', clsId: 9, clsName: '体育', readCnt: 0 },
            { id: 111975, name: '网游之天下第一', photoPath: '/574/7F6B780B31D1C988EE5B5C335FFC7C9A/7F6B780B31D1C988EE5B5C335FFC7C9A.jpg', intro: '    与仇人同归于尽的柳云重生了，带着顶尖乾坤者记忆的他回到了十年前，回到了被妹妹赶出家门的那一天，被人退婚的那一天，而且还是《玄界》刚刚开启后的第三天.....\n    但这一切都不重要，重要的是，他蓦然想起一件本该十年后才知道的惊天秘密...\n', author: '火神', score: 6363, strScore: '6.4', clsId: 8, clsName: '游戏', readCnt: 0 },
            {
              id: 116306,
              name: '异界职业玩家',
              photoPath: '/3039/DAB9BF786118C25AAEE7F09AE3CAD429/DAB9BF786118C25AAEE7F09AE3CAD429.jpg',
              intro: '    带着自己宗师级的生活技能穿越了，本来靠着游戏中生活技能活得风生水起的林辰，发现在这个世界不是你能够赚钱就能得到敬仰的，反而会招来致命的麻烦。\n    在自己的世界以钱为尊，但是穿越到了这块大陆却是强者为尊，所以，为了自己的小命着想，林辰不得不拿起手中的长剑，开始了升级之旅。\n    物品等级设定：普通级、精良级、完美级、史诗级、传说级、至尊级、神级。\n    普通企鹅群：37416699\n    vip企鹅群：73116374\n',
              author: '涂章溢',
              score: 6200,
              strScore: '6.2',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
            { id: 110025, name: '英雄无敌之穷途末路', photoPath: '/886/668C62DECE7B7CE18E48E53C8EC5FAA6/668C62DECE7B7CE18E48E53C8EC5FAA6.jpg', intro: '    没有bug的运气，没有神一样的技能，更没有引无数美女竞折腰的风采，无奈再次进入虚拟世界，为的也只是一份工作而已。而有的只是曾经的一份经验，一份坚持，一份渴望，以及赌上一切的理由。\n    主角不会是无缘无故的好人，更不会是无缘无故的恶人，主角拼上了一切，却一直不知道自己到底想要的是什么~~~~~!\n    一篇类似英雄无敌的网游\n', author: '失忆闹钟', score: 6181, strScore: '6.2', clsId: 8, clsName: '游戏', readCnt: 0 },
            {
              id: 113919,
              name: 'remove-网游之帝皇崛起',
              photoPath: '/3711/A8669D0058AAE89FD6F9D914883BDA08/A8669D0058AAE89FD6F9D914883BDA08.jpg',
              intro: '    时隔两月，被巫妖王强夺身体导致强制删除角色的白熊重回游戏。这时候，他发现许多高端玩家莫名其妙地降到了低级……\n    一个类似死骑的职业，一把霜之哀伤，一位天才新人，共同铸就了一个帝皇崛起传说！\n    他自有称号“圣殿使者”，团队却称呼他“高铁司机”，好友称呼他“平民高手”，游戏公司称呼他“资料片杀手”！\n    书友交流群：9108537\n    帝皇团队群：207416411（验证：舍我其谁）\n    新浪微博：weibo.com/u/1760336634（求粉）\n',
              author: '坠落凡尘',
              score: 6181,
              strScore: '6.2',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
            {
              id: 116282,
              name: 'remove-英雄无敌之尸山骨海',
              photoPath: '/3013/CECC3D31BD8DEA1F85E6503E847313CD/CECC3D31BD8DEA1F85E6503E847313CD.jpg',
              intro: '    混乱领主重现大地！咒死尸巫祭起无边死云！\n    君王护卫镇守陵墓！幽冥骑士举起血腥屠刀！\n    顶级的冥渊龙那浓郁的死气连圣龙的光辉都将被掩盖！\n    终极的冰霜巨龙的喷涂就连最炽烈的火山都将被冻结！\n    更广博浩渺的英雄无敌的世界！\n    更绚丽斑斓的百族争霸的大陆！\n    埋骨之地是终结之地，更是起源之地！\n    向天盟誓！化天下为那无边的尸山骨海！只为成就无上的英雄之名！！！\n    已开书友群：46041260~\n    群内很和谐，请礼貌用语和对本书感兴趣，有讨论剧情走向兴趣的玩家加\n',
              author: 'kiki龙',
              score: 6833,
              strScore: '6.8',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
            {
              id: 110014,
              name: '重生之玩转魔兽世界',
              photoPath: '/1632/62928E746C6613CAEB01AC1931C7E60D/62928E746C6613CAEB01AC1931C7E60D.jpg',
              intro: '    当版本落后时，做别人早已做烂的事情，你是否感到无所作为；在首杀榜单上，没有一家国服公会，你是否感到耻辱不屈；当版本更新时，一件装备坐骑的删除绝版，你是否感到遗憾后悔......\n    而现在一个公测时期魔兽世界的老玩家，突然有一天重生了，凭借着领先于暴雪设计师的经验，带领着他的公会在魔兽世界里踏上巅峰，让老外们目瞪结舌，让世界也为之一颤。\n    这里是一个老玩家的6年多来的点点滴滴，有悲伤痛苦，有欢笑高兴，就让我们跟着猪脚一起扫平那曾经的遗憾。\n    书友1群（人满）：8872238.书友2群：3194560.\n',
              author: '我心飘零',
              score: 6400,
              strScore: '6.4',
              clsId: 8,
              clsName: '游戏',
              readCnt: 0,
            },
          ],
        },
        {
          selectionModuleId: 62,
          contentType: 1,
          name: '男频模块二',
          style: 1,
          imgBg: '',
          contents: [
            { id: 100293, name: '墨染你爱我吗', photoPath: '', intro: '他爱他，他也爱他，但是他的他终究没成为属于他的他，这未免是一种遗憾阿，在最美的年华只为遇到他，最终我还是失去了他。', author: '墨染阿布', score: 6300, strScore: '6.3', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100459, name: '听风念旧人', photoPath: '/902/AB9CF5D99FFE1A3DAB0106CF4EDD49D8/2107891-1472435293000.jpg', intro: '她，16岁叛逆的不良少女。\n他，17岁乖张的清戾少年。\n他，17岁暖心的陌路天使。\n她说，谢谢你让我的心沸腾过，\n即使你从未真正的向我走来过。\n他说，南方也有他的梦，\n却义无反顾地走向北方。\n他们，终将陪她在青春这条路上猖獗\n最后的最后，人走茶凉，而她只能听风念旧人\n', author: '徐果果同学呦', score: 7076, strScore: '7.1', clsId: 14, clsName: '青春校园', readCnt: 0 },
            {
              id: 100303,
              name: '冷少的淡漠仆',
              photoPath: '',
              intro: '                    冷少的淡漠仆 \r\n简介： 不是说男人喜欢活泼开朗的女人吗？所以某女过着优雅又沉默寡言的自由生活，可为什么还是会遇到高富帅冷峻瑾呢…… 某女：“不好意思，我是淑女性的，不是活泼性的，不是你们喜欢的类型，OK，我不是你的菜”某男：“我特别，就喜欢你这类型的，你怎么知道我好吃你” 某女：“-_-||……” 为什么嘛不按常理出牌呢？ 与世隔绝又淑女倔强的她和多金高富帅又无情冷漠的他，如何相遇呢？…… 请看下文\r\n                  \r\n    \r\n',
              author: '魅莲儿',
              score: 6100,
              strScore: '6.1',
              clsId: 129,
              clsName: '漫威未上架',
              readCnt: 0,
            },
            { id: 100309, name: '娄伯底先生', photoPath: '/3302/4CEFB4949BC1820B032E237735943F01/2784854-1523708491000.jpg', intro: '  生所为之终结，终结之物乃为自身。\r\n  踏平乱世，却未曾寻找到过自己。\r\n  躬身于黑暗，堕落于黑暗，逝去于黑暗，重生于黑暗，潜行于黑暗，奋起于黑暗。\r\n  名为娄伯底.', author: '恒宇HengYu', score: 6545, strScore: '6.5', clsId: 5, clsName: '都市', readCnt: 0 },
            { id: 100943, name: '少年高官', photoPath: '/2698/3E30298ECFA5E287FBD50BB3B8101638/3E30298ECFA5E287FBD50BB3B8101638.jpg', intro: '    入政界难，少年入政界更难，少年成为高官更是难上加难。    牺牲回到少年时代后，郭拙诚利用前世的记忆，为陷入困境的父亲铺垫了一条接近政界高层的便捷之路，也为自己布局了一条快速掌权的仕途之道。    他白手缔造了一个举足轻重的权力世家，他暗暗构建了一个经济帝国。\n', author: '老井古柳', score: 6500, strScore: '6.5', clsId: 128, clsName: '漫威', readCnt: 0 },
            { id: 100291, name: '她听见风的声音', photoPath: '', intro: '我似乎轻轻作了个梦， 醒来后整个季节的风， 正吹在脸庞！', author: '莹若玺', score: 6100, strScore: '6.1', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100302, name: '莱辛', photoPath: '', intro: '  有时，\n  莱辛总在想，初遇少年时，我未嫁他未娶。\n  现在怎么就成了我未嫁他已经娶了哪。', author: '粗枝', score: 6000, strScore: '6.0', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100441, name: '笑驴外传', photoPath: '/2396/D61FBDA4FBB4EB5E284D5E429B25CE05/1552727-1449716740000.jpg', intro: '笑驴外传，用开心面对人生，开开心心过好每一天。让您天天笑口常开，就在《笑驴外传》。', author: '驴子街', score: 6545, strScore: '6.5', clsId: 7, clsName: '军事', readCnt: 0 },
            {
              id: 100568,
              name: '三国刘阿斗',
              photoPath: '/674/CC77833C6C30E044091457149A6EE393/365818.jpg',
              intro: '老四一阵失望：“靠，吓吓人也不错，至少气势上还是很猛吧，呵呵。咦，这么晚了？走，上街吃夜宵去，我去叫陈肯他们，还有欧阳十方，我请客哈。对了，你喝不喝酒？吃不吃肉？玩过女人没有，你年轻的时候有没有结过婚？你控制桃木剑造型那么帅，跑到富贵人家里去摆个祭坛，作法起来应该很吊吧？很来钱吧？你那个…………” \r\n　　两人就这样出了房门，让门外的家丁带路去找欧阳十方，两人远去的背影，一个猥琐，一个头上黑线狂冒……',
              author: '摩诘',
              score: 7000,
              strScore: '7.0',
              clsId: 6,
              clsName: '历史',
              readCnt: 0,
            },
            { id: 100301, name: '沧海为难桑田', photoPath: '', intro: '百般滋味陪你走过的这一段岁月，年少时的了然一身，岁月几番周折。再无模样。', author: '食而无味', score: 6500, strScore: '6.5', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100288, name: '纵使青春荒芜繁华如梦', photoPath: '', intro: '   就那么一眼，即便隔着屏幕，在无法阻挡藏她那颗蠢蠢欲动的心。离他近一点，不需要太近，远远的，真真切切的能够看着他就好。\r\n   他是那样的耀眼，在她荒芜的青春道路上，像是一道暖暖的阳光，荒凉中竟开出花来··· \r\n   就像扑火的飞蛾，却在这炽烈的灼热中翩翩起舞，\r\n   纵使青春荒芜繁华如梦。', author: '沐墓', score: 6400, strScore: '6.4', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100457, name: '龙在兴业', photoPath: '/2102/E38382A341D2B90E17BE6AB67BE48026/1358022-1466327680000.jpg', intro: '    强者的世界，实力为尊，血雨腥风中闯出一条属于自己的修炼之路。神挡杀神，佛挡杀佛，坚韧的耐力，奸诈的心机，一步步的安排都在他的计划中。这里是一个奇异的世界，一切神秘慢慢地揭开面纱，等待着追求的脚步，就从这里开始。\r\n    他来自隐秘的家族，身上有着逆天的神器，再一次次的冒险中凸显自己的价值，这里是一个充满想象的世界，一切都有可能发生，这就是寻找自我的一个过程。 \r\n\r\n', author: '王尧天', score: 6500, strScore: '6.5', clsId: 2, clsName: '奇幻', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 63,
          contentType: 1,
          name: '男频模块四',
          style: 1,
          imgBg: '',
          contents: [
            { id: 100252, name: '哪年那年那些年', photoPath: '', intro: '一个少年转变成一代枭雄的故事', author: '雷神S', score: 6400, strScore: '6.4', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100264, name: '扼梦', photoPath: '', intro: '这是一个从不信鬼神但是喜欢看灵异故事（？）的普通大学生沈弈，在连续好几天梦到了同一个女人后，终于有一天晚上被这个女鬼摇了床，从此踏上帮鬼圆梦（？）之路地故事。\r\n\r\n连续好几天梦到同一个女鬼后。\r\n沈弈，“我靠……原来我不是想吃烤肉了，是想要女人了。”\r\n女鬼：“……你口味真重。”\r\n她上下扫了一眼，“你这样真的是压人而不是被压得那一个吗？”\r\n沈弈，“你闭嘴，出去。”\r\n\r\n天甜文，小甜文，绝对不虐，真的，信我。', author: 'flip', score: 6400, strScore: '6.4', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100253, name: '末法维度', photoPath: '', intro: '笙陵的力作《末法维度》', author: '笙陵', score: 6500, strScore: '6.5', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100247, name: '通向异界之路', photoPath: '', intro: '已删除', author: '一座城堡', score: 6500, strScore: '6.5', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            {
              id: 142044,
              name: '综漫变身超能行',
              photoPath: '/3377/61EA97EB745C9A590D559E8FED520054/zongmanbianshenchaonengxing.jpg',
              intro: '五好少年的他变成了少女！她该如何抉择？\r\n　　\r\n　　    被富家大小姐倒追的她！应该如何面对？\r\n　　\r\n　　    到另外一个世界的她！究竟如何生存下去？\r\n　　\r\n　　    魔法！科学！异能！人！神！仙！什么才是最强？\r\n　　\r\n　　    好吧我扯够了，这只是一本伪无敌流综漫小说而已~~~由于主角是不死之身所以我让她干什么，她就得干什么~~~\r\n　　\r\n　　    纯属休闲娱乐作品，仅供蛋疼人士观看，蛋蛋终结者和公务猿勿入~',
              author: '害羞仙鹤使',
              score: 6000,
              strScore: '6.0',
              clsId: 1,
              clsName: '玄幻',
              readCnt: 0,
            },
            { id: 100251, name: '甜妻莫逃走', photoPath: '', intro: '十六岁的生日上，找回了自己的身世。一夜间，成为了A市的千金大小姐。失去了养育自己的父母，这让十六岁的她，难以接受。一直以为哥哥和未婚夫破坏掉自己原本幸福，快乐的生活，使她有了敌意……接下来共处的日子，会发生什么呢？', author: '温子苏', score: 6300, strScore: '6.3', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100249, name: '假如我有异能', photoPath: '', intro: '小花花一枝的力作《假如我有异能》，男主角杨小刀在突然得到一个古董手机后，从手机里得到了各种各样的异能，他成为了高考状元，打抱不平，勇闯黑道，经商致富，开始了他潇洒的都市生活，', author: '小花花一枝', score: 6100, strScore: '6.1', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 142634, name: '泡妞大宗师', photoPath: '/282/88255FDA925FA95863617005D8211659/paoniudazongshi.jpg', intro: '项羽的武技、唐伯虎的画技、王羲之的书法、华佗的医技……融无数人杰最牛的技能于一身。貂蝉、文姬、二乔、飞燕、玉环、国内佳丽、国外美人……泡古今中外最美的妞儿于一屋。', author: '嚣张农民', score: 6666, strScore: '6.7', clsId: 5, clsName: '都市', readCnt: 0 },
            { id: 142144, name: '功高权重', photoPath: '/1244/E39E46DCEECB38965AC5EB727AC86B30/gonggaoquanzhong.jpg', intro: '郭拙诚重生回到了少年时代，没有显赫的家世可以利用，他就推动父亲上位，白手缔造了一个权力世家；没有庞大的家产可以挥霍，他就暗暗地构建了一个经济帝国。他高调时，扮老虎吃猪，将对手连毛带皮连骨头全部吃下；他低调时，披上羊皮，连纯情的村姑都为他撑腰。当然，他没有忘记为自己布局一条快捷掌权的仕途之道。', author: '老井古柳', score: 6400, strScore: '6.4', clsId: 3, clsName: '武侠', readCnt: 0 },
            { id: 144014, name: 'remove-丹武至尊', photoPath: '/2638/161EAF071986812AD2BC64C09F490630/161EAF071986812AD2BC64C09F490630.jpg', intro: '因为一个手镯，秦飞从家族天才成为万人耻笑的废人。为守护心中那份责任，他战恶少，杀霸主，斗苍天……太古凶兽、九天神灵、地狱幽魔、洪荒百族，无尽世界，无尽宇宙，至尊降临……\n', author: '耀火', score: 6727, strScore: '6.7', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 144946, name: 'remove-白石主神', photoPath: '/2552/28C942495184373F1CDB0F2C41D193CE/28C942495184373F1CDB0F2C41D193CE.jpg', intro: '新书《超级魔法农场系统》已经发布，大家可以点击我的笔名，在全部作品里查看，或站内直接搜索书名即可！这是一个魔法与斗气交织的世界，地火水风雷光暗七大元素编织出一个又一个光怪陆离的魔法、招式。七系中谁主沉浮？令人闻风丧胆的亡灵大军属于哪一系？炼金师如何将一瓶瓶神奇的炼金药剂制造出来？而他偏偏得到了一种七系元素以外的能量，欢迎进入白石主神的世界前来探寻！\n', author: '沧河贝壳', score: 6545, strScore: '6.5', clsId: 1, clsName: '玄幻', readCnt: 0 },
            { id: 100265, name: '倾世天下之虬龙瓶', photoPath: '', intro: '     只要我活在世上一天，便不会让你作恶非为！\r\n   这世间，有这这样一个人，为了一个信念，坚守，便能长久！\r\n   “天是无尽头的，就像我的信念！”\r\n\r\n        我管他什么生死轮回，我一定要为天下除害！', author: '初久墨梅', score: 6500, strScore: '6.5', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
          ],
        },
        {
          selectionModuleId: 64,
          contentType: 1,
          name: '男频模块五',
          style: 1,
          imgBg: '',
          contents: [
            { id: 100223, name: '纪元时', photoPath: '', intro: '  ', author: '梦幽思雪', score: 6500, strScore: '6.5', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 139419, name: '美女的贴身男秘', photoPath: '/349/10EC603483FA056E608F4BBE7927FB21/10EC603483FA056E608F4BBE7927FB21.jpg', intro: '', author: '夜黑风高打老虎', score: 6363, strScore: '6.4', clsId: 15, clsName: '时间穿越', readCnt: 0 },
            {
              id: 100225,
              name: '灿白之时间让我留住你',
              photoPath: '',
              intro:
                '哦，我的爱人，你此刻在哪？我还可以找回你吗？因该不会了吧，毕竟我伤你那么深……\r\n“我有一个故事，它属于我的曾经。”\r\n它也属于你啊，我爱的人。\r\n“我认识过一个人，他有一双漂亮的眼睛，大大的，很漂亮，也很清澈。”\r\n这个人是我最爱的人哎。\r\n“他有着这个世界上最漂灿烂的笑，他的笑很灿烂，能给人带去快乐。”\r\n哦，这个人很美好。\r\n“他有着黄金比例一般的身材和从画中走来一般的容颜。”\r\n这个人，刚巧也爱我哎。\r\n“他还有一个很好听的名字，叫：朴灿烈。”\r\n是繁盛的果实的意思哎。\r\n“可是我却把他弄丢了，你们说，我该怎么办？”\r\n灿烈啊，我该怎样才能把你找到？\r\n现在的你，还有多长时间可以容你再等下去？\r\n我还有机会看到你吗？\r\n我最爱的灿烈啊，现在的你，还发病吗？\r\n会很痛吗？\r\n痛的话，就别笑了，我看着，心疼。\r\n可是我现在好像没资格说这些话了哎。\r\n呀，好咸啊，哦，我好像哭了哎，可是你却再也不会为我擦眼泪了。\r\n灿烈啊，你说现在的伯贤是不是很活该啊？\r\n是呀，\r\n谁叫他弄丢了朴灿烈呢？\r\n可是啊，灿烈，伯贤好想你啊，真的好想你啊……',
              author: '水中镜月',
              score: 6100,
              strScore: '6.1',
              clsId: 129,
              clsName: '漫威未上架',
              readCnt: 0,
            },
            { id: 100222, name: '七号公馆', photoPath: '', intro: '璀璨的霓虹灯下，闪烁的，不仅仅是绚丽的色彩，还有许多未知。\r\n当古老存在的传说慢慢变成现实，通往阴阳界的七号公馆成为了那霓虹下最阴暗的角落。\r\n你无法掌控人生，但却可以改变人生，七号公馆的大门，随时为你敞开，交易，只是各取所需...\r\n人鬼之间，从来都是相互依存，灵魂的交易或许正是人性最深处的渴望，当一切变得诡异而又正常，矛盾而又融洽，七号公馆所带来的，又是福还是祸呢...也许，当我走进七号公馆的那一刻起，我就已经不属于自己了...', author: '玉千胜', score: 6400, strScore: '6.4', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100219, name: '大秦铁骑吊打全球', photoPath: '', intro: '当大秦帝国即将被农民起义军打得分崩离析之际，漠北的长城军团，岭南的南方军团，以及撤退出咸阳奔向漠北的首都近卫军团总兵力百万之重的精锐秦军去了哪？\n这一直是一个迷。主角在山顶上俯瞰大地时，却十分尴尬的被一只鹰惊到，失足落入悬崖之中，回到了秦朝，还成了漠北军团统帅的侄子，从此踏上了改变历史的伟大征途。', author: '河煌汤汤', score: 6100, strScore: '6.1', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100218, name: '我的是传奇', photoPath: '', intro: '我，名叫罗林，再一次出门游玩时意外穿越到了宋朝(和我国宋朝并不是一回事)，在那里我遇到了是是非非，开始结交好友，勇闯江湖，经历战场厮杀，官场角斗，情场失意与得意。发生了许多惊险的事也发生了许多啼笑皆非的故事，这一切都成为了我的传奇。', author: '隐眼', score: 6000, strScore: '6.0', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            {
              id: 137685,
              name: '剑道独神',
              photoPath: '/2807/85FE6A03C61233F8A08D5CA5467CDAE9/85FE6A03C61233F8A08D5CA5467CDAE9.jpg',
              intro: '剑者，当有锋芒。宁折不屈，宁断不弯，不屈不饶，无所畏惧，任何一切阻碍一切抵挡，都无需犹豫无需多虑。相信你手中之剑，仅凭你手中之剑，披荆斩棘勇往直前，直达剑道彼岸踏上神坛！谨以此书，献给你们和我所喜爱的剑还有所挚爱的剑道！在这里，你会看到各种各样的剑，你会看到千奇百怪包囊万象的剑术剑技，还有不同类型天才之间的争锋，直指剑道巅峰，相争神坛！（会员点击推荐票收藏评价打赏统统都要！请各位观看的剑客们，花费你们几秒钟的时间，登陆会员再阅读，增加会员点击，六道感激不尽！）剑道主群：23143022（欢迎支持本书的起点vip剑客加入，入群后请表明身份）\n',
              author: '六道沉沦',
              score: 6300,
              strScore: '6.3',
              clsId: 1,
              clsName: '玄幻',
              readCnt: 0,
            },
            { id: 100221, name: '超级少女蓝若曦', photoPath: '', intro: '蓝若曦竟然遇到了种种令人惊奇的事……她遇到了外星人……会易容的外星人……会说话的筷子，……等等令人惊奇的事。最后妈妈竟然告诉她，你不是我们亲╭(╯3╰)╮生的孩子，你是一个外星⭐人给我们的，他们叫我们好好照顾你，当时我们也没有孩子，就收留了你，这也是你能知道外星人在说什么的原因了，一切突变使蓝若曦没有了方向，她会怎么办呢？', author: '汤圆妹', score: 6300, strScore: '6.3', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100217, name: '冷王弃妃之逆袭女王', photoPath: '/101/599201AB701013D07169CC45C7F80D4E/1253664-1433043407000.jpg', intro: '一朝穿越成为冷王弃妃。处处受人排挤，陷害她·她又会如何让反击', author: '田妹', score: 6500, strScore: '6.5', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 100226, name: '规则游戏之龙欲啸天', photoPath: '/879/7A6FAAF993138C2E8D9AF0D479B7E348/2222432-1478325301000.jpg', intro: '爱一个人是否久远\r\n', author: '三耳书生', score: 6200, strScore: '6.2', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
            { id: 133177, name: '抗日之铁血军魂', photoPath: '/2746/5048E8C0B7739B4FC342B151599C23F1/5048E8C0B7739B4FC342B151599C23F1.jpg', intro: '“告诉狼牙的弟兄，我不要任何俘虏，我要的是结果，结果，明白吗！”“我可以死，但是我的心不能死，我的国家和民族不能死！”“军人，唯一的归宿，就是死在战场上！”“我不入地狱，谁入地狱！”——摘自《陆山元帅回忆录》谨以此书向为了国家独立、领土完整、民族自由而牺牲的中国军人致敬！请看长风铁血归来！\n', author: '长风', score: 6100, strScore: '6.1', clsId: 15, clsName: '时间穿越', readCnt: 0 },
            { id: 100220, name: '大唐穿越之秦怀道', photoPath: '', intro: '一朝醉酒，穿越盛唐，名将之后，看我如何称霸这盛唐', author: '倾月四少', score: 6200, strScore: '6.2', clsId: 129, clsName: '漫威未上架', readCnt: 0 },
          ],
        },
      ],
      type: 1,
    },
    {
      contents: [
        { id: 5, bookType: 1, theName: '送你一个BUG', theIntr: '接不接', theImg: '/89/2ced2df48affefb64028c3f43cd7d049.jpg', showLocation: 2, lookNum: 12, likeNum: 3, stepNum: 1, recommendBy: 'lale大仙女', isLike: 0, isStep: 0 },
        { id: 6, bookType: 1, theName: '送你两个BUG', theIntr: '接不接\r\n', theImg: '/106/6dae96889acf396473f3e5c74061c572.jpg', showLocation: 2, lookNum: 11, likeNum: 2, stepNum: 0, recommendBy: 'lale大仙女', isLike: 0, isStep: 0 },
        { id: 7, bookType: 1, theName: '送你三个BUG', theIntr: '接不接', theImg: '/90/69e02968cb6bff25b03dbd76e92ba65e.jpg', showLocation: 2, lookNum: 12, likeNum: 1, stepNum: 0, recommendBy: 'lale大仙女', isLike: 0, isStep: 0 },
        { id: 8, bookType: 1, theName: '你被抛弃了', theIntr: '往期推荐便是你的家', theImg: '/34/c97f3c60ffc4a82f855ede1b24a8acbe.jpg', showLocation: 2, lookNum: 19, likeNum: 3, stepNum: 1, recommendBy: 'lale大仙女', isLike: 0, isStep: 0 },
      ],
      type: 2,
    },
    { contents: [], type: 3 },
    { contents: [], type: 4 },
  ],
  enumCode: 'SUCCESS',
  msg: '4',
  success: true,
}

var module3 = {
  code: 0,
  data: [
    { id: 63, showLocation: 14, name: '最强剑神', showPhoto: '/41/c3f79177b49817333739eff5ee1c6d82.jpg', targetType: 100, targetAddress: 'mt.app://web?titleBar=1&fullScreen=1&url=https%3A%2F%2Fwww.imitu3.com%2Flucky%3Fi%3D4', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 102, showLocation: 12, name: '十一活动', showPhoto: '/63/476276724bca807f81424fb281e990cf.png', targetType: 10, targetAddress: '118', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 103, showLocation: 8, name: '精选插入横幅广告01', showPhoto: '/52/2dc645b8a8015f1a145b50b89d00ef4b.jpg', targetType: 10, targetAddress: '118', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 124, showLocation: 3, name: '-仅mahua渠道-首页banner', showPhoto: '/49/8ad2d4c1d1a6277dae4422773c8c09ba.jpg', targetType: 100, targetAddress: 'mt.app://web?titleBar=1&fullScreen=1&url=https%3A%2F%2Fimitu3.com%2Flucky%3Fi%3D20', durationSecond: 10, type: 1, remark: '撒打发手动阀手动阀', adType: 1, backgroundColor: '#66000e' },
    { id: 57, showLocation: 3, name: '十一活动', showPhoto: '/94/88157f184ea128f5fe1fb6822f2cb98f.jpg', targetType: 10, targetAddress: '118', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#002266' },
    { id: 105, showLocation: 8, name: '精选插入横幅广告02', showPhoto: '/74/fcaff57f2c959d425a8e9ed98704d211.jpg', targetType: 7, targetAddress: '130', durationSecond: 0, type: 1, remark: 'koudaiqipai/2/azgw.501290.com/0_1_1_111', adType: 2, backgroundColor: '' },
    { id: 146, showLocation: 2, name: '十一活动', showPhoto: '/16/82038ef912da6191cc3a4d956047d54d.png', targetType: 10, targetAddress: '118', durationSecond: 0, type: 1, remark: '口交换机和', adType: 2, backgroundColor: '' },
    { id: 108, showLocation: 3, name: '阅览天下所有渠道-首页banner', showPhoto: '/68/c7f1d5cdaa86ee3d9541feb039e777d3.jpeg', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#666100' },
    { id: 142, showLocation: 8, name: '精选插入横幅广告03', showPhoto: '/123/7ff678a3b676d0c9496ae6c4637533ff.jpg', targetType: 8, targetAddress: '14', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 58, showLocation: 3, name: '-仅test渠道-首页banner', showPhoto: '/31/56a4f0ffe951e89ff318a7b37099ef84.jpg', targetType: 100, targetAddress: 'mt.app://web?titleBar=1&fullScreen=1&url=http%3A%2F%2Fimitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#00664d' },
    { id: 144, showLocation: 8, name: '精选插入横幅广告04', showPhoto: '/75/dafee7913267a9687556e332516fef53.jpg', targetType: 10, targetAddress: '104', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 145, showLocation: 8, name: '精选插入横幅广告05', showPhoto: '/121/f02568d60b84877a79b22f9218b977b4.jpg', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 129, showLocation: 3, name: '阅览-testaa-首页banner', showPhoto: '/122/ec0c43d36bc61d82250e10fb086eed3c.jpg', targetType: 10, targetAddress: '104', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#225577' },
    { id: 44, showLocation: 9, name: '榜单', showPhoto: '/38/a457795030e51f0231c5f6a2c3a856f5.png', targetType: 6, targetAddress: 'bangdan', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 139, showLocation: 3, name: '新加精选banner', showPhoto: '/100/d57e7eb0722c6831015361937bf692b6.jpg', targetType: 0, targetAddress: '', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 45, showLocation: 9, name: '日更', showPhoto: '/74/b16b1ede076ca4f568ad57f4943e9fcc.png', targetType: 6, targetAddress: 'rigeng', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 46, showLocation: 9, name: '完本', showPhoto: '/58/85b4f024cca650006552c86cb1113b14.png', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 178, showLocation: 3, name: '话题评论', showPhoto: '/16/8527b6135c700b51d03e36e8adb7dcfb.jpg', targetType: 10, targetAddress: '116', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 179, showLocation: 3, name: '话题评论', showPhoto: '/125/12f6f442da4530bbb8174704b80185a6.jpg', targetType: 10, targetAddress: '105', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 15, showLocation: 10, name: '玄幻', showPhoto: '/42/897a910ba5f0b39c89a91223256b7835.png', targetType: 3, targetAddress: '16', durationSecond: 0, type: 1, remark: '男频金刚区', adType: 1, backgroundColor: '' },
    { id: 17, showLocation: 10, name: '日更', showPhoto: '/17/a2f7a7e93f780affa096f00e1e66f276.png', targetType: 6, targetAddress: 'rigeng', durationSecond: 0, type: 1, remark: '男频金刚区', adType: 1, backgroundColor: '' },
    { id: 18, showLocation: 10, name: '完本', showPhoto: '/30/553e4ca111bb91f8adf86a226f7b51e7.png', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '男频金刚区', adType: 1, backgroundColor: '' },
    { id: 21, showLocation: 11, name: '古代言情', showPhoto: '/107/4ae8007bc4834349b046545498494515.png', targetType: 3, targetAddress: '11', durationSecond: 0, type: 1, remark: '男频金刚区', adType: 1, backgroundColor: '' },
    { id: 22, showLocation: 11, name: '日更', showPhoto: '/93/2ce57764f538732fabf74ca4f0a85473.png', targetType: 6, targetAddress: 'rigeng', durationSecond: 0, type: 1, remark: '男频金刚区', adType: 1, backgroundColor: '' },
    { id: 23, showLocation: 11, name: '完本', showPhoto: '/69/4fd4fddf00dff455c21b3e21fde7d969.png', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '男频金刚区', adType: 1, backgroundColor: '' },
    { id: 59, showLocation: 4, name: '灵武帝', showPhoto: '/29/2edd329422091d2641b2c2ff750abf9a.jpg', targetType: 10, targetAddress: '108', durationSecond: 0, type: 1, remark: 'lqfewf人人', adType: 1, backgroundColor: '' },
    { id: 60, showLocation: 4, name: '绝世武魂', showPhoto: '/75/1695d519bc14b0f0a90a0e13441bf308.jpg', targetType: 10, targetAddress: '107', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 62, showLocation: 5, name: '三国演义', showPhoto: '/52/ce1ed0426e87bb246005c62567551c02.jpg', targetType: 2, targetAddress: '172649', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 100, showLocation: 17, name: '我的世界里', showPhoto: '/79/481e4159cf4d5e50b4696be8bb76a75f.jpeg', targetType: 7, targetAddress: '150', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 104, showLocation: 16, name: '男频插入横幅广告01', showPhoto: '/61/69f0baf078699a12e065aa974b3c6859.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 106, showLocation: 18, name: '出版插入横幅广告', showPhoto: '/61/69f0baf078699a12e065aa974b3c6859.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 110, showLocation: 17, name: '有声插入横幅广告', showPhoto: '/61/69f0baf078699a12e065aa974b3c6859.jpg', targetType: 1, targetAddress: 'www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 112, showLocation: 21, name: '听书插入横幅广告', showPhoto: '/29/669ffe5134ae26dd5f596b1db9bec36e.png', targetType: 1, targetAddress: 'https:www.mituyuedu.comh', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 151, showLocation: 20, name: '阅读器底部广告1--商业', showPhoto: '/74/fcaff57f2c959d425a8e9ed98704d211.jpg', targetType: 1, targetAddress: 'https://www.mituyuedu.com', durationSecond: 0, type: 1, remark: '速度放缓的发表的发表地方借口罢了士大夫的发表发现分别是打不死的发表', adType: 2, backgroundColor: '' },
    { id: 152, showLocation: 20, name: '阅读器底部广告2--商业', showPhoto: '/107/2640680e09cf42d1181ae096fccf7bf9.jpg', targetType: 6, targetAddress: 'qiandao', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 153, showLocation: 16, name: '男频插入横幅广告02', showPhoto: '/107/2640680e09cf42d1181ae096fccf7bf9.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 157, showLocation: 4, name: 'lale实在太美了', showPhoto: '/89/d74783d455cb6b6f2c9ddb8a57058f25.mov', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 2, remark: '冯绍峰', adType: 1, backgroundColor: '' },
    { id: 158, showLocation: 4, name: '兔兔阅读', showPhoto: '/52/be951815d1b590afeb33bdfe07acdcee.jpg', targetType: 0, targetAddress: '', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 162, showLocation: 19, name: '阅读器顶部广告1--商业', showPhoto: '/69/d2f638b2e0230acc459e0fd93465eeaa.jpg', targetType: 10, targetAddress: '118', durationSecond: 1, type: 1, remark: '小说详情', adType: 2, backgroundColor: '' },
    { id: 170, showLocation: 14, name: 'lale实在太美了', showPhoto: '/124/83606e4881b661d8c8d9c6da8e4daa0b.jpg', targetType: 100, targetAddress: 'mt.app://web?titleBar=1&fullScreen=1&url=https%3A%2F%2Fwww.imitu3.com%2Flucky%3Fi%3D5', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 187, showLocation: 20, name: '阅读器底部广告3--商业', showPhoto: '/29/2edd329422091d2641b2c2ff750abf9a.jpg', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 188, showLocation: 20, name: '阅读器底部广告4--商业', showPhoto: '/89/a050addff365ec36e2636a77a2cf0b44.jfif', targetType: 10, targetAddress: '118', durationSecond: 0, type: 1, remark: '发', adType: 2, backgroundColor: '' },
    { id: 189, showLocation: 20, name: '阅读器底部广告5--非商业', showPhoto: '/56/01f5634f00b5c455883c46f36940024b.jfif', targetType: 0, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 192, showLocation: 19, name: '阅读器顶部广告2--非商业', showPhoto: '/29/2edd329422091d2641b2c2ff750abf9a.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 197, showLocation: 23, name: '章节末-商业', showPhoto: '/47/3c37190fcf495a6cbc334827259cdea7.png', targetType: 6, targetAddress: 'wanben', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 199, showLocation: 24, name: '阅读器全屏-商业', showPhoto: '/64/d2601ba9e8e5ba1f550f6d51096f1900.png', targetType: 2, targetAddress: '100660', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 208, showLocation: 13, name: '非商业', showPhoto: '/4/faa97f9062e433611f461851f568e7b7.gif', targetType: 1, targetAddress: 'https://dtil.madrid1.cn/5056/h', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
    { id: 209, showLocation: 22, name: '十一活动', showPhoto: '/63/476276724bca807f81424fb281e990cf.png', targetType: 100, targetAddress: 'mt.app://web?titleBar=1&fullScreen=1&url=http%3A%2F%2F192.168.8.102%3A8080%2F', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 210, showLocation: 26, name: '漫画首页banner1', showPhoto: '/61/9a7395a32225d352b951d24bc50eb437.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#F9F900' },
    { id: 211, showLocation: 25, name: '漫画榜单', showPhoto: '/12/61f7862ebdf7a368131253ca9acefbe8.png', targetType: 6, targetAddress: 'cartoonBangDan', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 212, showLocation: 25, name: '漫画追番', showPhoto: '/109/53c5ccf583660a1ab87bff482bfc7496.png', targetType: 6, targetAddress: 'cartoonSerialNumber', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 213, showLocation: 25, name: '漫画分类', showPhoto: '/107/a26ff27840e435dc7ee697ada6caa9ed.png', targetType: 6, targetAddress: 'cartoonCls', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 215, showLocation: 25, name: '签到', showPhoto: '/7/9b47eb93217491da28d0d033c84e9330.png', targetType: 6, targetAddress: 'qiandao', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 216, showLocation: 27, name: '漫画首页横幅--商业', showPhoto: '/120/dab55922c44d99d852d680a62f16995a.png', targetType: 11, targetAddress: '193', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '#225577' },
    { id: 217, showLocation: 28, name: '漫画首页悬浮窗', showPhoto: '/68/a64583e5429399fe640a3551bd862578.png', targetType: 100, targetAddress: 'mt.app://web?titleBar=1&fullScreen=1&url=https%3A%2F%2Fimitu3.com%2Flucky%3Fi%3D20', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#66000e' },
    { id: 218, showLocation: 29, name: '漫画阅读器悬浮-商业', showPhoto: '/83/47ef626c381d2aa706d0bc2d468be893.png', targetType: 10, targetAddress: '118', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '#66000e' },
    { id: 219, showLocation: 30, name: '漫画阅读器末章节广告1', showPhoto: '/47/3c37190fcf495a6cbc334827259cdea7.png', targetType: 6, targetAddress: 'cartoonSerialNumber', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '#225577' },
    { id: 220, showLocation: 31, name: '漫画阅读器全屏广告1', showPhoto: '/103/d515d98d33fa114ac614dcee51eeff54.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#002266' },
    { id: 221, showLocation: 27, name: '漫画横幅广告2--非商业', showPhoto: '/83/47ef626c381d2aa706d0bc2d468be893.png', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#225577' },
    { id: 222, showLocation: 30, name: '漫画阅读器末章节广告2', showPhoto: '/44/61fde7dadcb4764be7aa52b245658851.jpg', targetType: 8, targetAddress: '14', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '#225577' },
    { id: 224, showLocation: 26, name: '首页banner2', showPhoto: '/5/135f99059ab4cb1113e06e852bca367a.jpg', targetType: 6, targetAddress: 'cartoonBangDan', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '#28004D' },
    { id: 228, showLocation: 1, name: '兔兔阅读', showPhoto: '/94/d3b06a372ed474ff6e6dd5447f2376d0.jpg', targetType: 1, targetAddress: 'https://www.imitu3.com', durationSecond: 0, type: 1, remark: '', adType: 1, backgroundColor: '' },
    { id: 229, showLocation: 19, name: '阅读器顶部广告3--商业', showPhoto: '/52/2dc645b8a8015f1a145b50b89d00ef4b.jpg', targetType: 1, targetAddress: 'https://www.baidu.com', durationSecond: 5, type: 1, remark: 'dadasfasf', adType: 2, backgroundColor: '' },
    { id: 230, showLocation: 19, name: '阅读器顶部广告4--商业', showPhoto: '/83/47ef626c381d2aa706d0bc2d468be893.png', targetType: 0, targetAddress: '', durationSecond: 0, type: 1, remark: '', adType: 2, backgroundColor: '' },
  ],
  enumCode: 'SUCCESS',
  msg: '64',
  success: true,
}

var likeList = {
  code: 0,
  count: 90,
  data: [
    { author: '陈唐', chapterCnt: 22, clsId: 17, clsIdSecond: 68, clsName: '纯爱小说 - 现代纯爱', createTime: '2019-07-16 21:41:36', downCnt: 0, esScore: 0, fullFlag: 1, id: 178141, intro: '陈唐的力作《世界纪元》', isOnShelf: 0, lastUpdate: '2018-03-16 16:12:29', loveCnt: 0, name: '世界纪元', photoPath: '', postDate: '2016-05-19 14:21:58.000', readCnt: 0, relTagName: [], retention: 857, score: 6000, status: 1, strScore: '6.0', wordCnt: 53916 },
    {
      author: '前世高僧',
      chapterCnt: 20,
      clsId: 1,
      clsIdSecond: 21,
      clsName: '玄幻 - 高武世界',
      createTime: '2019-07-16 21:33:37',
      downCnt: 0,
      esScore: 0,
      fullFlag: 1,
      id: 177342,
      intro: '主题征文第一期·末世\r\n李峰已经连续三天没有吃东西了，现在他已经饿的两眼直冒金星，但他仍然艰难的走向道国家宣传局门口，因为他听说在那里只要领取一个游戏头盔就能每天领到十元钱的生活费……',
      isOnShelf: 0,
      lastUpdate: '2013-08-04 21:49:56',
      loveCnt: 0,
      name: '网游之末世传奇',
      photoPath: '',
      postDate: '2012-08-16 22:20:31.000',
      readCnt: 0,
      relTagName: [],
      retention: 857,
      score: 6000,
      status: 1,
      strScore: '6.0',
      wordCnt: 42564,
    },
    { author: '夏默涵', chapterCnt: 8, clsId: 11, clsIdSecond: 62, clsName: '古代言情 - 宫斗宅斗', createTime: '2019-07-16 21:53:57', downCnt: 0, esScore: 0, fullFlag: 1, id: 179537, intro: '历经种种散散合合，恩恩怨怨之后，他们千年的情，是终成正果还是再约千年？', isOnShelf: 0, lastUpdate: '2011-12-04 12:15:23', loveCnt: 0, name: '倾城颜：情迷倾世冷皇', photoPath: '/4012/F83F58FB896F8B061261C86708717F99/133627.jpg', postDate: '2011-09-24 23:56:02.000', readCnt: 0, relTagName: [], retention: 954, score: 7750, status: 1, strScore: '7.8', wordCnt: 14102 },
    {
      author: '萧舒',
      chapterCnt: 2936,
      clsId: 1,
      clsIdSecond: 18,
      clsName: '玄幻 - 东方玄幻',
      createTime: '2018-11-03 19:21:53',
      downCnt: 0,
      esScore: 125,
      fullFlag: 2,
      id: 126141,
      intro: '    萧舒继《金庸世界里的道士》后之新作。\n    转世降临，出家为僧，真能离情绝欲，慧剑斩情丝？\n    修炼武功，有天下第一之志，可世间天才如夜空繁星，他真可达成？\n    金刚不坏，身陷红尘，落入花丛，真能不垢不坏？\n    一切皆在《异世为僧》，讲述一个和尚的精彩人生。\n    vip群：129395774，\n    普通群（般若寺）：129397232，\n    普通群（澄静寺）：129396968\n    每周二晚上线。\n',
      isOnShelf: 0,
      lastUpdate: '2013-07-04 00:00:00',
      loveCnt: 0,
      name: '异世为僧',
      photoPath: '/1846/8F526DC00E465317FBA812DBF269ED5E/8F526DC00E465317FBA812DBF269ED5E.jpg',
      postDate: '',
      readCnt: 0,
      relTagName: [],
      retention: 735,
      score: 5818,
      status: 1,
      strScore: '5.8',
      wordCnt: 14161366,
    },
    {
      author: '西山谣',
      chapterCnt: 3166,
      clsId: 1,
      clsIdSecond: 20,
      clsName: '玄幻 - 王朝争霸',
      createTime: '2018-11-03 22:46:07',
      downCnt: 0,
      esScore: 250,
      fullFlag: 2,
      id: 145408,
      intro: '地球末日降临，《魔师》最强玩家风浩意外穿越异世界。\n    在这个世界，修炼自带基因加点，实力依赖属性装备，战斗全靠数据技能。\n    风浩本以为自己能够纵横异界，奈何地球人的属性成长太差，只能靠炼药术当个副职业玩家。\n    但是当他觉醒出逆天种族天赋的时候，一切都改变了！\n    我种花家的天赋是什么？\n    没错，就是种树！而且要种出一颗最强的天赋树！\n    【这其实就是一颗小树苗成长为参天大树的故事】\n    各位书友要是觉得《最强天赋树》还不错的话请不要忘记向您qq群和微博里的朋友推荐哦！最强天赋树最新章节,最强天赋树无弹窗,最强天赋树全文阅读.\n',
      isOnShelf: 0,
      lastUpdate: '2018-10-30 19:19:00',
      loveCnt: 0,
      name: '最强天赋树',
      photoPath: '/2629/33EB1DCD99E943BA802BCF468C4494E7/33EB1DCD99E943BA802BCF468C4494E7.jpg',
      postDate: '',
      readCnt: 0,
      relTagName: [],
      retention: 2290,
      score: 6666,
      status: 1,
      strScore: '6.7',
      wordCnt: 7249316,
    },
    {
      author: '娶猫的老鼠',
      chapterCnt: 2944,
      clsId: 3,
      clsIdSecond: 26,
      clsName: '武侠 - 现代武侠',
      createTime: '2018-11-04 02:05:48',
      downCnt: 0,
      esScore: 350,
      fullFlag: 2,
      id: 158410,
      intro: '千年世家弃子孔玉得到天尊的传承，万千功法集于一身，以五行均衡之体演化天地阴阳，以巫族血脉修炼九转玄功。\n    因至爱身死，为寻复活之法造下无边杀戮。孔玉以古武只手破天，以祖巫神通破灭宇宙洪荒，与天道圣人周旋，聚集天地五方旗，终成混元无极教主，在无量量劫中傲视群雄，笑傲天下。\n',
      isOnShelf: 0,
      lastUpdate: '2017-06-30 01:36:00',
      loveCnt: 0,
      name: '九阴九阳之阴阳神功',
      photoPath: '/3271/341F7935DE97A06DC351654689D883CE/341F7935DE97A06DC351654689D883CE.jpg',
      postDate: '',
      readCnt: 0,
      relTagName: [],
      retention: 1812,
      score: 6363,
      status: 1,
      strScore: '6.4',
      wordCnt: 6085560,
    },
  ],
  enumCode: 'SUCCESS',
  msg: '6',
  pageCount: 15,
  pageNo: 1,
  pageSize: 6,
  success: true,
}

import recommendItem from '@components/book/recommendItem.vue'
import bookItem from '@components/book/bookItem.vue'
import bookItem2 from '@components/book/bookItem2.vue'
import bookItem3 from '@components/book/bookItem3.vue'
import bookItem4 from '@components/book/bookItem4.vue'
import bookItem5 from '@components/book/bookItem5.vue'
import authorItem from '@components/book/authorItem.vue'
export default {
  layout: 'homeLayout',
  components: {
    recommendItem,
    bookItem,
    bookItem2,
    bookItem3,
    bookItem4,
    bookItem5,
    authorItem,
  },
  data() {
    return {
      active: 0,
      isFixedTop: false,
      tabList: [],
      likeList: [],
      adList: [],
    }
  },
  created() {
    this.getTabList()
    this.getLikeList()
    
    // store 使用
    this.$store.commit('axiosCancle/set', 12345)
    console.log(this.$store.getters['axiosCancle/list'])
    this.$store.commit('axiosCancle/remove')
    console.log(this.$store.getters['axiosCancle/list'])
  },
  methods: {
    getTabList() {
      var list = [
        {
          name: '推荐',
          loading: false,
          finished: false,
          refreshing: false,
          bannerList: [],
          navList: [],
          module: [],
          likeList: [],
        },
        {
          name: '男生',
          loading: false,
          finished: false,
          refreshing: false,
          bannerList: [],
          navList: [],
          module: [],
          likeList: [],
        },
        {
          name: '女生',
          loading: false,
          finished: false,
          refreshing: false,
          bannerList: [],
          navList: [],
          module: [],
          likeList: [],
        },
        {
          name: '出版',
          loading: false,
          finished: false,
          refreshing: false,
          bannerList: [],
          navList: [],
          module: [],
          likeList: [],
        },
      ]
      // list = [...list, ...list]

      list = list.map((item) => {
        return {
          ...item,
          bannerList: module3.data.filter((item) => item.showLocation == 3),
          navList: module3.data.filter((item) => item.showLocation == 9),
          moduleList: module2.data[0].contents,
          recommendList: module2.data[1].contents,
          likeList: likeList.data,
        }
      })
      console.log(module2.data[0].contents)
      this.tabList = list

      this.adList = Object.freeze(module3.data)
    },
    getLikeList() {
      const curTab = this.tabList[this.active]
      curTab.loading = false
      curTab.likeList = [...curTab.likeList, ...likeList.data]
    },
    // 下拉刷新
    onRefresh() {
      console.log('下拉刷新')
      const curTab = this.tabList[this.active]
      curTab.refreshing = false
      curTab.loading = false
      curTab.finished = true
    },
    // 页面滚动，顶部切换颜色
    tabScroll: throttle(function (value) {
      this.isFixedTop = value.isFixed
    }, 100),
  },
}
</script>

<style lang="less" scoped>
.bookHome-page {
  position: relative;
  background: #e9f0f8;
  &:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 1px;
    top: -3px;
    box-shadow: 0px 1px 100px 100px rgba(0, 0, 0, 0.6);
    z-index: 10;
  }
}
.van-tabs {
  padding-bottom: 100px;
}
.tab-tool {
  position: fixed;
  top: 0;
  right: 30px;
  height: 88px;
  z-index: 100;
  .item {
    width: 65px;
    height: 88px;
    background-size: 50px 50px;
    background-position: center center;
    background-repeat: no-repeat;
  }
}
.home-swipe {
  position: relative;
  height: 550px;
  &:after {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 750px;
    height: 40px;
    content: '';
    background: url('../assets/img/icon_jinxuan_wan_i.png') 0 0 no-repeat;
    background-size: 750px 40px;
    z-index: 1;
  }
  .img {
    width: 100%;
    height: 550px;
  }
}
.van-cell {
  height: 120px;
  background: #f6faff;
}
.van-cell__title {
  font-size: 40px;
  font-weight: 600;
}
.van-cell__value {
  flex: none;
  font-size: 24px;
  color: #b7b7b7;
}
.van-icon-arrow {
  font-size: 24px;
  color: #b7b7b7;
}
.nav-list {
  flex-wrap: wrap;
  padding: 0 0px 32px;
  margin-bottom: 16px;
  background: #f6faff;
  .item {
    flex-direction: column;
    flex-basis: 20%;
    padding-top: 34px;
    font-size: 28px;
    color: #323232;
    line-height: 40px;
  }
  .img {
    width: 96px;
    height: 96px;
  }
}
.module {
  margin-top: 20px;
  background: #f6faff;
}
</style>
<style lang="less">
.bookHome-page {
  .van-sticky {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
  }
  .van-tab {
    color: #fff;
    font-size: 32px;
  }
  .van-tab--active {
    font-size: 40px;
  }
  .van-tabs__nav {
    width: 550px;
    background: transparent;
  }
  .van-tabs__line {
    width: 36px;
    background-color: #fff;
  }
  .van-swipe__indicator--active {
    width: 24px;
    border-radius: 12px;
  }
  .van-sticky--fixed {
    background: #fff;
    .van-tab {
      color: #323232;
    }
    .van-tab--active {
      color: @primary;
    }
    .van-tabs__line {
      background-color: @primary;
    }
  }
}
</style>
