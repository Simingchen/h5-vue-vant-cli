// 地区码列表
<template>
  <div class>
    <van-popup v-model="show" position="bottom" @close="close">
      <van-nav-bar title="选择国家" fixed left-arrow @click-left="close">
        <template #left>
          <van-icon name="cross" size="18" />
        </template>
      </van-nav-bar>

      <div class="con pt90">
        <form action="/">
          <van-search v-model.trim="searchTxt" shape="round" placeholder="请输入搜索关键词" @search="onSearch" @input="input" />
        </form>
        <div v-if="!resultList.length">
          <div class="code-list" v-for="item in codeList" :key="item.section">
            <van-cell :id="item.section" class="tit-cell" :title="item.section" :border="false" />
            <van-cell v-for="i in item.data" :key="i.region" @click="select(i)">
              <template #title>
                <van-tag class="tag" color="#f2f2f2">{{ i.region }}</van-tag>
                <span class="custom-title">{{ i.name }}</span>
              </template>
            </van-cell>
          </div>
          <!-- 侧边 -->
          <div class="side-list">
            <div class="item" v-for="item in codeList" :key="item.section" @click="scrollTo(item)">{{ item.section }}</div>
          </div>
        </div>
        <!-- 搜索结果 -->
        <div v-if="resultList.length">
          <div class="code-list" v-for="item in resultList" :key="item.region" @click="select(item)">
            <van-cell>
              <template #title>
                <van-tag class="tag" color="#f2f2f2">{{ item.region }}</van-tag>
                <span class="custom-title">{{ item.name }}</span>
              </template>
            </van-cell>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
var resCode = {
  code: 0,
  data: [
    {
      data: [
        {
          pinyinName: 'aomentequ',
          name: '澳门特区',
          enName: 'Macao',
          region: '+853',
          isHot: 'true',
        },
        {
          pinyinName: 'hanguo',
          name: '韩国',
          enName: 'South Korea',
          region: '+82',
          isHot: 'true',
        },
        {
          pinyinName: 'meiguo',
          name: '美国',
          enName: 'United States',
          region: '+1',
          isHot: 'true',
        },
        {
          pinyinName: 'riben',
          name: '日本',
          enName: 'Japan',
          region: '+81',
          isHot: 'true',
        },
        {
          pinyinName: 'taiguo',
          name: '泰国',
          enName: 'Thailand',
          region: '+66',
          isHot: 'true',
        },
        {
          pinyinName: 'taiwandiqu',
          name: '台湾地区',
          enName: 'Taiwan',
          region: '+886',
          isHot: 'true',
        },
        {
          pinyinName: 'xianggang',
          name: '香港',
          enName: 'Hong Kong',
          region: '+852',
          isHot: 'true',
        },
        {
          pinyinName: 'xinjiapo',
          name: '新加坡',
          enName: 'Singapore',
          region: '+65',
          isHot: 'true',
        },
        {
          pinyinName: 'zhongguo',
          name: '中国',
          enName: 'China',
          region: '+86',
          isHot: 'true',
        },
      ],
      section: '热门',
    },
    {
      data: [
        {
          pinyinName: 'aerbaniya',
          name: '阿尔巴尼亚',
          enName: 'Albania',
          region: '+355',
          isHot: 'false',
        },
        {
          pinyinName: 'aerjiliya',
          name: '阿尔及利亚',
          enName: 'Algeria',
          region: '+213',
          isHot: 'false',
        },
        {
          pinyinName: 'afuhan',
          name: '阿富汗',
          enName: 'Afghanistan',
          region: '+93',
          isHot: 'false',
        },
        {
          pinyinName: 'agenting',
          name: '阿根廷',
          enName: 'Argentina',
          region: '+54',
          isHot: 'false',
        },
        {
          pinyinName: 'aierlan',
          name: '爱尔兰',
          enName: 'Ireland',
          region: '+353',
          isHot: 'false',
        },
        {
          pinyinName: 'aiji',
          name: '埃及',
          enName: 'Egypt',
          region: '+20',
          isHot: 'false',
        },
        {
          pinyinName: 'aisaiebiya',
          name: '埃塞俄比亚',
          enName: 'Ethiopia',
          region: '+251',
          isHot: 'false',
        },
        {
          pinyinName: 'aishaniya',
          name: '爱沙尼亚',
          enName: 'Estonia',
          region: '+372',
          isHot: 'false',
        },
        {
          pinyinName: 'alabolianheqiuzhangguo',
          name: '阿拉伯联合酋长国',
          enName: 'United Arab Emirates',
          region: '+971',
          isHot: 'false',
        },
        {
          pinyinName: 'aluba',
          name: '阿鲁巴',
          enName: 'Aruba',
          region: '+297',
          isHot: 'false',
        },
        {
          pinyinName: 'aman',
          name: '阿曼',
          enName: 'Oman',
          region: '+968',
          isHot: 'false',
        },
        {
          pinyinName: 'andaoer',
          name: '安道尔',
          enName: 'Andorra',
          region: '+376',
          isHot: 'false',
        },
        {
          pinyinName: 'angela',
          name: '安哥拉',
          enName: 'Angola',
          region: '+244',
          isHot: 'false',
        },
        {
          pinyinName: 'anguila',
          name: '安圭拉',
          enName: 'Anguilla',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'antiguahebabuda',
          name: '安提瓜和巴布达',
          enName: 'Antigua and Barbuda',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'aodaliya',
          name: '澳大利亚',
          enName: 'Australia',
          region: '+61',
          isHot: 'false',
        },
        {
          pinyinName: 'aodili',
          name: '奥地利',
          enName: 'Austria',
          region: '+43',
          isHot: 'false',
        },
        {
          pinyinName: 'aolanqundao',
          name: '奥兰群岛',
          enName: 'Åland Islands',
          region: '+358',
          isHot: 'false',
        },
        {
          pinyinName: 'asaibaijiang',
          name: '阿塞拜疆',
          enName: 'Azerbaijan',
          region: '+994',
          isHot: 'false',
        },
      ],
      section: 'A',
    },
    {
      data: [
        {
          pinyinName: 'babaduosi',
          name: '巴巴多斯',
          enName: 'Barbados',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'babuyaxinjineiya',
          name: '巴布亚新几内亚',
          enName: 'Papua New Guinea',
          region: '+675',
          isHot: 'false',
        },
        {
          pinyinName: 'bahama',
          name: '巴哈马',
          enName: 'Bahamas',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'baieluosi',
          name: '白俄罗斯',
          enName: 'Belarus',
          region: '+375',
          isHot: 'false',
        },
        {
          pinyinName: 'baimuda',
          name: '百慕大',
          enName: 'Bermuda',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'bajisitan',
          name: '巴基斯坦',
          enName: 'Pakistan',
          region: '+92',
          isHot: 'false',
        },
        {
          pinyinName: 'balagui',
          name: '巴拉圭',
          enName: 'Paraguay',
          region: '+595',
          isHot: 'false',
        },
        {
          pinyinName: 'balesitan',
          name: '巴勒斯坦',
          enName: 'Palestine',
          region: '+970',
          isHot: 'false',
        },
        {
          pinyinName: 'balin',
          name: '巴林',
          enName: 'Bahrain',
          region: '+973',
          isHot: 'false',
        },
        {
          pinyinName: 'banama',
          name: '巴拿马',
          enName: 'Panama',
          region: '+507',
          isHot: 'false',
        },
        {
          pinyinName: 'baojialiya',
          name: '保加利亚',
          enName: 'Bulgaria',
          region: '+359',
          isHot: 'false',
        },
        {
          pinyinName: 'baxi',
          name: '巴西',
          enName: 'Brazil',
          region: '+55',
          isHot: 'false',
        },
        {
          pinyinName: 'beining',
          name: '贝宁',
          enName: 'Benin',
          region: '+229',
          isHot: 'false',
        },
        {
          pinyinName: 'bilishi',
          name: '比利时',
          enName: 'Belgium',
          region: '+32',
          isHot: 'false',
        },
        {
          pinyinName: 'bilu',
          name: '秘鲁',
          enName: 'Peru',
          region: '+51',
          isHot: 'false',
        },
        {
          pinyinName: 'bingdao',
          name: '冰岛',
          enName: 'Iceland',
          region: '+354',
          isHot: 'false',
        },
        {
          pinyinName: 'bociwana',
          name: '博茨瓦纳',
          enName: 'Botswana',
          region: '+267',
          isHot: 'false',
        },
        {
          pinyinName: 'boduolige',
          name: '波多黎哥',
          enName: 'Puerto Rico',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'bolan',
          name: '波兰',
          enName: 'Poland',
          region: '+48',
          isHot: 'false',
        },
        {
          pinyinName: 'boliweiya',
          name: '玻利维亚',
          enName: 'Bolivia',
          region: '+591',
          isHot: 'false',
        },
        {
          pinyinName: 'bolizi',
          name: '伯里兹',
          enName: 'Belize',
          region: '+501',
          isHot: 'false',
        },
        {
          pinyinName: 'bonaierdao, shengyousitexiesidaohesabadao',
          name: '博奈尔岛, 圣尤斯特歇斯岛和萨巴岛',
          enName: 'Bonaire, Sint Eustatius and Saba',
          region: '+599',
          isHot: 'false',
        },
        {
          pinyinName: 'bosiniyaheheishangongheguo',
          name: '波斯尼亚和黑山共和国',
          enName: 'Bosnia and Herzegovina',
          region: '+387',
          isHot: 'false',
        },
        {
          pinyinName: 'budan',
          name: '不丹',
          enName: 'Bhutan',
          region: '+975',
          isHot: 'false',
        },
        {
          pinyinName: 'bujinafasuo',
          name: '布基纳法索',
          enName: 'Burkina Faso',
          region: '+226',
          isHot: 'false',
        },
        {
          pinyinName: 'bulongdi',
          name: '布隆迪',
          enName: 'Burundi',
          region: '+257',
          isHot: 'false',
        },
        {
          pinyinName: 'buweidao',
          name: '布韦岛',
          enName: 'Bouvet Island',
          region: '+47',
          isHot: 'false',
        },
      ],
      section: 'B',
    },
    {
      data: [
        {
          pinyinName: 'chaoxian',
          name: '朝鲜',
          enName: 'North Korea',
          region: '+850',
          isHot: 'false',
        },
        {
          pinyinName: 'chidaojineiya',
          name: '赤道几内亚',
          enName: 'Equatorial Guinea',
          region: '+240',
          isHot: 'false',
        },
      ],
      section: 'C',
    },
    {
      data: [
        {
          pinyinName: 'danmai',
          name: '丹麦',
          enName: 'Denmark',
          region: '+45',
          isHot: 'false',
        },
        {
          pinyinName: 'deguo',
          name: '德国',
          enName: 'Germany',
          region: '+49',
          isHot: 'false',
        },
        {
          pinyinName: 'dongdiwen',
          name: '东帝汶',
          enName: 'Timor-Leste',
          region: '+670',
          isHot: 'false',
        },
        {
          pinyinName: 'dongsamoya',
          name: '东萨摩亚',
          enName: 'American Samoa',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'dongsamoya',
          name: '东萨摩亚',
          enName: 'Samoa',
          region: '+685',
          isHot: 'false',
        },
        {
          pinyinName: 'duoge',
          name: '多哥',
          enName: 'Togo',
          region: '+228',
          isHot: 'false',
        },
        {
          pinyinName: 'duominijiagongheguo',
          name: '多米尼加共和国',
          enName: 'Dominican Republic',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'duominijialianbang',
          name: '多米尼加联邦',
          enName: 'Dominica',
          region: '+1',
          isHot: 'false',
        },
      ],
      section: 'D',
    },
    {
      data: [
        {
          pinyinName: 'eguaduoer',
          name: '厄瓜多尔',
          enName: 'Ecuador',
          region: '+593',
          isHot: 'false',
        },
        {
          pinyinName: 'eliteniya',
          name: '厄里特尼亚',
          enName: 'Eritrea',
          region: '+291',
          isHot: 'false',
        },
        {
          pinyinName: 'eluosi',
          name: '俄罗斯',
          enName: 'Russia',
          region: '+7',
          isHot: 'false',
        },
      ],
      section: 'E',
    },
    {
      data: [
        {
          pinyinName: 'faguo',
          name: '法国',
          enName: 'France',
          region: '+33',
          isHot: 'false',
        },
        {
          pinyinName: 'faluoqundao',
          name: '法罗群岛',
          enName: 'Faroe Islands',
          region: '+298',
          isHot: 'false',
        },
        {
          pinyinName: 'fandigang',
          name: '梵蒂冈',
          enName: 'Vatican',
          region: '+39',
          isHot: 'false',
        },
        {
          pinyinName: 'fashubolinixiya',
          name: '法属玻利尼西亚',
          enName: 'French Polynesia',
          region: '+689',
          isHot: 'false',
        },
        {
          pinyinName: 'fashuguiyanei',
          name: '法属圭亚那',
          enName: 'French Guiana',
          region: '+594',
          isHot: 'false',
        },
        {
          pinyinName: 'fashunantelinida',
          name: '法属南特立尼达',
          enName: 'French Southern Territories',
          region: '+260',
          isHot: 'false',
        },
        {
          pinyinName: 'feiji',
          name: '斐济',
          enName: 'Fiji',
          region: '+679',
          isHot: 'false',
        },
        {
          pinyinName: 'feilvbin',
          name: '菲律宾',
          enName: 'Philippines',
          region: '+63',
          isHot: 'false',
        },
        {
          pinyinName: 'fenlan',
          name: '芬兰',
          enName: 'Finland',
          region: '+358',
          isHot: 'false',
        },
        {
          pinyinName: 'fodejiao',
          name: '佛得角',
          enName: 'Cape Verde',
          region: '+238',
          isHot: 'false',
        },
        {
          pinyinName: 'fukelanqundao',
          name: '富克兰群岛',
          enName: 'Falkland Islands',
          region: '+500',
          isHot: 'false',
        },
      ],
      section: 'F',
    },
    {
      data: [
        {
          pinyinName: 'gangbiya',
          name: '冈比亚',
          enName: 'Gambia',
          region: '+220',
          isHot: 'false',
        },
        {
          pinyinName: 'gangguo',
          name: '刚果',
          enName: 'Congo',
          region: '+242',
          isHot: 'false',
        },
        {
          pinyinName: 'gangguominzhugongheguo',
          name: '刚果民主共和国',
          enName: 'The Democratic Republic Of Congo',
          region: '+243',
          isHot: 'false',
        },
        {
          pinyinName: 'geenxidao',
          name: '格恩西岛',
          enName: 'Guernsey',
          region: '+44',
          isHot: 'false',
        },
        {
          pinyinName: 'gelinglan',
          name: '格陵兰',
          enName: 'Greenland',
          region: '+299',
          isHot: 'false',
        },
        {
          pinyinName: 'gelinnada',
          name: '格林纳达',
          enName: 'Grenada',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'gelujiya',
          name: '格鲁吉亚',
          enName: 'Georgia',
          region: '+995',
          isHot: 'false',
        },
        {
          pinyinName: 'gelunbiya',
          name: '哥伦比亚',
          enName: 'Colombia',
          region: '+57',
          isHot: 'false',
        },
        {
          pinyinName: 'gesidalijia',
          name: '哥斯达黎加',
          enName: 'Costa Rica',
          region: '+506',
          isHot: 'false',
        },
        {
          pinyinName: 'guadeluopudao',
          name: '瓜德罗普岛',
          enName: 'Guadeloupe',
          region: '+590',
          isHot: 'false',
        },
        {
          pinyinName: 'guandao',
          name: '关岛',
          enName: 'Guam',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'guba',
          name: '古巴',
          enName: 'Cuba',
          region: '+53',
          isHot: 'false',
        },
        {
          pinyinName: 'guiyanei',
          name: '圭亚那',
          enName: 'Guyana',
          region: '+592',
          isHot: 'false',
        },
      ],
      section: 'G',
    },
    {
      data: [
        {
          pinyinName: 'haidi',
          name: '海地',
          enName: 'Haiti',
          region: '+509',
          isHot: 'false',
        },
        {
          pinyinName: 'hasakesitan',
          name: '哈萨克斯坦',
          enName: 'Kazakhstan',
          region: '+7',
          isHot: 'false',
        },
        {
          pinyinName: 'hedehemaiketangnaqundao',
          name: '赫德和麦克唐纳群岛',
          enName: 'Heard Island And McDonald Islands',
          region: '+672',
          isHot: 'false',
        },
        {
          pinyinName: 'heishan',
          name: '黑山',
          enName: 'Montenegro',
          region: '+382',
          isHot: 'false',
        },
        {
          pinyinName: 'helan',
          name: '荷兰',
          enName: 'Netherlands',
          region: '+31',
          isHot: 'false',
        },
        {
          pinyinName: 'heshuandeliesiqundao',
          name: '荷属安的列斯群岛',
          enName: 'Netherlands Antilles',
          region: '+599',
          isHot: 'false',
        },
        {
          pinyinName: 'heshushengmadingdao',
          name: '荷属圣马丁岛',
          enName: 'Sint Maarten (Dutch part)',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'hongdoulasi',
          name: '洪都拉斯',
          enName: 'Honduras',
          region: '+504',
          isHot: 'false',
        },
      ],
      section: 'H',
    },
    {
      data: [
        {
          pinyinName: 'jiana',
          name: '加纳',
          enName: 'Ghana',
          region: '+233',
          isHot: 'false',
        },
        {
          pinyinName: 'jianada',
          name: '加拿大',
          enName: 'Canada',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'jianpuzhai',
          name: '柬埔寨',
          enName: 'Cambodia',
          region: '+855',
          isHot: 'false',
        },
        {
          pinyinName: 'jiapeng',
          name: '加蓬',
          enName: 'Gabon',
          region: '+241',
          isHot: 'false',
        },
        {
          pinyinName: 'jibuti',
          name: '吉布提',
          enName: 'Djibouti',
          region: '+253',
          isHot: 'false',
        },
        {
          pinyinName: 'jiekegongheguo',
          name: '捷克共和国',
          enName: 'Czech Republic',
          region: '+420',
          isHot: 'false',
        },
        {
          pinyinName: 'jierjikesitan',
          name: '吉尔吉克斯坦',
          enName: 'Kyrgyzstan',
          region: '+996',
          isHot: 'false',
        },
        {
          pinyinName: 'jilibasi',
          name: '基里巴斯',
          enName: 'Kiribati',
          region: '+686',
          isHot: 'false',
        },
        {
          pinyinName: 'jinbabuwei',
          name: '津巴布韦',
          enName: 'Zimbabwe',
          region: '+263',
          isHot: 'false',
        },
        {
          pinyinName: 'jineiya',
          name: '几内亚',
          enName: 'Guinea',
          region: '+224',
          isHot: 'false',
        },
        {
          pinyinName: 'jineiyabishaogongheguo',
          name: '几内亚比绍共和国',
          enName: 'Guinea-Bissau',
          region: '+245',
          isHot: 'false',
        },
      ],
      section: 'J',
    },
    {
      data: [
        {
          pinyinName: 'kaimanqundao',
          name: '开曼群岛',
          enName: 'Cayman Islands',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'kamailong',
          name: '喀麦隆',
          enName: 'Cameroon',
          region: '+237',
          isHot: 'false',
        },
        {
          pinyinName: 'kataer',
          name: '卡塔尔',
          enName: 'Qatar',
          region: '+974',
          isHot: 'false',
        },
        {
          pinyinName: 'kekusiqundao',
          name: '科库斯群岛',
          enName: 'Cocos Islands',
          region: '+61',
          isHot: 'false',
        },
        {
          pinyinName: 'keluodiya',
          name: '克罗地亚',
          enName: 'Croatia',
          region: '+385',
          isHot: 'false',
        },
        {
          pinyinName: 'kemoluo',
          name: '科摩罗',
          enName: 'Comoros',
          region: '+269',
          isHot: 'false',
        },
        {
          pinyinName: 'kenniya',
          name: '肯尼亚',
          enName: 'Kenya',
          region: '+254',
          isHot: 'false',
        },
        {
          pinyinName: 'keweite',
          name: '科威特',
          enName: 'Kuwait',
          region: '+965',
          isHot: 'false',
        },
        {
          pinyinName: 'kukequndao',
          name: '库克群岛',
          enName: 'Cook Islands',
          region: '+682',
          isHot: 'false',
        },
        {
          pinyinName: 'kulasuodao',
          name: '库拉索岛',
          enName: 'Curaçao',
          region: '+599',
          isHot: 'false',
        },
      ],
      section: 'K',
    },
    {
      data: [
        {
          pinyinName: 'laisuotuo',
          name: '莱索托',
          enName: 'Lesotho',
          region: '+266',
          isHot: 'false',
        },
        {
          pinyinName: 'laowo',
          name: '老挝',
          enName: 'Laos',
          region: '+856',
          isHot: 'false',
        },
        {
          pinyinName: 'latuoweiya',
          name: '拉脱维亚',
          enName: 'Latvia',
          region: '+371',
          isHot: 'false',
        },
        {
          pinyinName: 'lianhequndao',
          name: '联合群岛',
          enName: 'Tokelau',
          region: '+690',
          isHot: 'false',
        },
        {
          pinyinName: 'libanen',
          name: '黎巴嫩',
          enName: 'Lebanon',
          region: '+961',
          isHot: 'false',
        },
        {
          pinyinName: 'libiliya',
          name: '利比里亚',
          enName: 'Liberia',
          region: '+231',
          isHot: 'false',
        },
        {
          pinyinName: 'libiya',
          name: '利比亚',
          enName: 'Libya',
          region: '+218',
          isHot: 'false',
        },
        {
          pinyinName: 'liezhidunshideng',
          name: '列支敦士登',
          enName: 'Liechtenstein',
          region: '+423',
          isHot: 'false',
        },
        {
          pinyinName: 'litaowan',
          name: '立陶宛',
          enName: 'Lithuania',
          region: '+370',
          isHot: 'false',
        },
        {
          pinyinName: 'liuniwangdao',
          name: '留尼汪岛',
          enName: 'Reunion',
          region: '+262',
          isHot: 'false',
        },
        {
          pinyinName: 'luomaniya',
          name: '罗马尼亚',
          enName: 'Romania',
          region: '+40',
          isHot: 'false',
        },
        {
          pinyinName: 'lusenbao',
          name: '卢森堡',
          enName: 'Luxembourg',
          region: '+352',
          isHot: 'false',
        },
        {
          pinyinName: 'luwangda',
          name: '卢旺达',
          enName: 'Rwanda',
          region: '+250',
          isHot: 'false',
        },
      ],
      section: 'L',
    },
    {
      data: [
        {
          pinyinName: 'madajiasijia',
          name: '马达加斯加',
          enName: 'Madagascar',
          region: '+261',
          isHot: 'false',
        },
        {
          pinyinName: 'maerdaifu',
          name: '马尔代夫',
          enName: 'Maldives',
          region: '+960',
          isHot: 'false',
        },
        {
          pinyinName: 'maerta',
          name: '马耳他',
          enName: 'Malta',
          region: '+356',
          isHot: 'false',
        },
        {
          pinyinName: 'malaixiya',
          name: '马来西亚',
          enName: 'Malaysia',
          region: '+60',
          isHot: 'false',
        },
        {
          pinyinName: 'malawei',
          name: '马拉维',
          enName: 'Malawi',
          region: '+265',
          isHot: 'false',
        },
        {
          pinyinName: 'mali',
          name: '马里',
          enName: 'Mali',
          region: '+223',
          isHot: 'false',
        },
        {
          pinyinName: 'mandao',
          name: '曼岛',
          enName: 'Isle Of Man',
          region: '+44',
          isHot: 'false',
        },
        {
          pinyinName: 'maoliqiusi',
          name: '毛里求斯',
          enName: 'Mauritius',
          region: '+230',
          isHot: 'false',
        },
        {
          pinyinName: 'maolitaniya',
          name: '毛里塔尼亚',
          enName: 'Mauritania',
          region: '+222',
          isHot: 'false',
        },
        {
          pinyinName: 'maqidunwangguo',
          name: '马其顿王国',
          enName: 'Macedonia',
          region: '+389',
          isHot: 'false',
        },
        {
          pinyinName: 'mashaoerqundao',
          name: '马绍尔群岛',
          enName: 'Marshall Islands',
          region: '+692',
          isHot: 'false',
        },
        {
          pinyinName: 'matinikedao',
          name: '马提尼克岛',
          enName: 'Martinique',
          region: '+596',
          isHot: 'false',
        },
        {
          pinyinName: 'mayuetedao',
          name: '马约特岛',
          enName: 'Mayotte',
          region: '+262',
          isHot: 'false',
        },
        {
          pinyinName: 'meishubeimaliyanaqundao',
          name: '美属北马里亚纳群岛',
          enName: 'Northern Mariana Islands',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'meishuweijingqundao',
          name: '美属维京群岛',
          enName: 'U.S. Virgin Islands',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'meishuxiaoaotelanqundao',
          name: '美属小奥特兰群岛',
          enName: 'United States Minor Outlying Islands',
          region: '+581',
          isHot: 'false',
        },
        {
          pinyinName: 'menggu',
          name: '蒙古',
          enName: 'Mongolia',
          region: '+976',
          isHot: 'false',
        },
        {
          pinyinName: 'mengjiala',
          name: '孟加拉',
          enName: 'Bangladesh',
          region: '+880',
          isHot: 'false',
        },
        {
          pinyinName: 'mengtesailaqundao',
          name: '蒙特塞拉群岛',
          enName: 'Montserrat',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'miandian',
          name: '缅甸',
          enName: 'Myanmar',
          region: '+95',
          isHot: 'false',
        },
        {
          pinyinName: 'mikeluonixiya',
          name: '密克罗尼西亚',
          enName: 'Micronesia',
          region: '+691',
          isHot: 'false',
        },
        {
          pinyinName: 'moerduowa',
          name: '摩尔多瓦',
          enName: 'Moldova',
          region: '+373',
          isHot: 'false',
        },
        {
          pinyinName: 'moluoge',
          name: '摩洛哥',
          enName: 'Morocco',
          region: '+212',
          isHot: 'false',
        },
        {
          pinyinName: 'monage',
          name: '摩纳哥',
          enName: 'Monaco',
          region: '+377',
          isHot: 'false',
        },
        {
          pinyinName: 'mosangbike',
          name: '莫桑比克',
          enName: 'Mozambique',
          region: '+258',
          isHot: 'false',
        },
        {
          pinyinName: 'moxige',
          name: '墨西哥',
          enName: 'Mexico',
          region: '+52',
          isHot: 'false',
        },
      ],
      section: 'M',
    },
    {
      data: [
        {
          pinyinName: 'namibiya',
          name: '纳米比亚',
          enName: 'Namibia',
          region: '+264',
          isHot: 'false',
        },
        {
          pinyinName: 'nanfei',
          name: '南非',
          enName: 'South Africa',
          region: '+27',
          isHot: 'false',
        },
        {
          pinyinName: 'nanjizhou',
          name: '南极洲',
          enName: 'Antarctica',
          region: '+672',
          isHot: 'false',
        },
        {
          pinyinName: 'nanqiaozhiyadaohenansangdeweiqidao',
          name: '南乔治亚岛和南桑德韦奇岛',
          enName: 'South Georgia And The South Sandwich Islands',
          region: '+500',
          isHot: 'false',
        },
        {
          pinyinName: 'nansudan',
          name: '南苏丹',
          enName: 'South Sudan',
          region: '+211',
          isHot: 'false',
        },
        {
          pinyinName: 'naolu',
          name: '瑙鲁',
          enName: 'Nauru',
          region: '+674',
          isHot: 'false',
        },
        {
          pinyinName: 'niboer',
          name: '尼泊尔',
          enName: 'Nepal',
          region: '+977',
          isHot: 'false',
        },
        {
          pinyinName: 'nijialagua',
          name: '尼加拉瓜',
          enName: 'Nicaragua',
          region: '+505',
          isHot: 'false',
        },
        {
          pinyinName: 'nirier',
          name: '尼日尔',
          enName: 'Niger',
          region: '+227',
          isHot: 'false',
        },
        {
          pinyinName: 'niriliya',
          name: '尼日利亚',
          enName: 'Nigeria',
          region: '+234',
          isHot: 'false',
        },
        {
          pinyinName: 'niuaidao',
          name: '纽埃岛',
          enName: 'Niue',
          region: '+683',
          isHot: 'false',
        },
        {
          pinyinName: 'nuofukedao',
          name: '诺福克岛',
          enName: 'Norfolk Island',
          region: '+672',
          isHot: 'false',
        },
        {
          pinyinName: 'nuowei',
          name: '挪威',
          enName: 'Norway',
          region: '+47',
          isHot: 'false',
        },
      ],
      section: 'N',
    },
    {
      data: [
        {
          pinyinName: 'palao',
          name: '帕劳',
          enName: 'Palau',
          region: '+680',
          isHot: 'false',
        },
        {
          pinyinName: 'pitekeendao',
          name: '皮特克恩岛',
          enName: 'Pitcairn',
          region: '+64',
          isHot: 'false',
        },
        {
          pinyinName: 'putaoya',
          name: '葡萄牙',
          enName: 'Portugal',
          region: '+351',
          isHot: 'false',
        },
      ],
      section: 'P',
    },
    {
      data: [
        {
          pinyinName: 'ruidian',
          name: '瑞典',
          enName: 'Sweden',
          region: '+46',
          isHot: 'false',
        },
        {
          pinyinName: 'ruishi',
          name: '瑞士',
          enName: 'Switzerland',
          region: '+41',
          isHot: 'false',
        },
      ],
      section: 'R',
    },
    {
      data: [
        {
          pinyinName: 'saerwaduo',
          name: '萨尔瓦多',
          enName: 'El Salvador',
          region: '+503',
          isHot: 'false',
        },
        {
          pinyinName: 'saierweiya',
          name: '塞尔维亚',
          enName: 'Serbia',
          region: '+381',
          isHot: 'false',
        },
        {
          pinyinName: 'sailaliang',
          name: '塞拉里昂',
          enName: 'Sierra Leone',
          region: '+232',
          isHot: 'false',
        },
        {
          pinyinName: 'saineijiaer',
          name: '塞内加尔',
          enName: 'Senegal',
          region: '+221',
          isHot: 'false',
        },
        {
          pinyinName: 'saipulusi',
          name: '塞浦路斯',
          enName: 'Cyprus',
          region: '+357',
          isHot: 'false',
        },
        {
          pinyinName: 'saisheerqundao',
          name: '塞舌尔群岛',
          enName: 'Seychelles',
          region: '+248',
          isHot: 'false',
        },
        {
          pinyinName: 'shatealabo',
          name: '沙特阿拉伯',
          enName: 'Saudi Arabia',
          region: '+966',
          isHot: 'false',
        },
        {
          pinyinName: 'shengbatailemidao',
          name: '圣巴泰勒米岛',
          enName: 'Saint Barthélemy',
          region: '+590',
          isHot: 'false',
        },
        {
          pinyinName: 'shengdandao',
          name: '圣诞岛',
          enName: 'Christmas Island',
          region: '+61',
          isHot: 'false',
        },
        {
          pinyinName: 'shengduomeihepulinxibi',
          name: '圣多美和普林西比',
          enName: 'Sao Tome And Principe',
          region: '+239',
          isHot: 'false',
        },
        {
          pinyinName: 'shenghelenadao',
          name: '圣赫勒拿岛',
          enName: 'Saint Helena',
          region: '+290',
          isHot: 'false',
        },
        {
          pinyinName: 'shengjiciheniweisi',
          name: '圣基茨和尼维斯',
          enName: 'Saint Kitts And Nevis',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'shengluxiya',
          name: '圣卢西亚',
          enName: 'Saint Lucia',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'shengmading',
          name: '圣马丁',
          enName: 'Saint Martin',
          region: '+590',
          isHot: 'false',
        },
        {
          pinyinName: 'shengmalinuo',
          name: '圣马力诺',
          enName: 'San Marino',
          region: '+378',
          isHot: 'false',
        },
        {
          pinyinName: 'shengpiaierhemikelongqundao',
          name: '圣皮埃尔和密克隆群岛',
          enName: 'Saint Pierre And Miquelon',
          region: '+508',
          isHot: 'false',
        },
        {
          pinyinName: 'shengwensentehegelinnadingsi',
          name: '圣文森特和格林纳丁斯',
          enName: 'Saint Vincent And The Grenadines',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'sililanka',
          name: '斯里兰卡',
          enName: 'Sri Lanka',
          region: '+94',
          isHot: 'false',
        },
        {
          pinyinName: 'siluofake',
          name: '斯洛伐克',
          enName: 'Slovakia',
          region: '+421',
          isHot: 'false',
        },
        {
          pinyinName: 'siluowenniya',
          name: '斯洛文尼亚',
          enName: 'Slovenia',
          region: '+386',
          isHot: 'false',
        },
        {
          pinyinName: 'siwaerbateheyangmayandao',
          name: '斯瓦尔巴特和扬马延岛',
          enName: 'Svalbard And Jan Mayen',
          region: '+47',
          isHot: 'false',
        },
        {
          pinyinName: 'siweishilan',
          name: '斯威士兰',
          enName: 'Swaziland',
          region: '+268',
          isHot: 'false',
        },
        {
          pinyinName: 'sudan',
          name: '苏丹',
          enName: 'Sudan',
          region: '+249',
          isHot: 'false',
        },
        {
          pinyinName: 'sulinan',
          name: '苏里南',
          enName: 'Suriname',
          region: '+597',
          isHot: 'false',
        },
        {
          pinyinName: 'suoluomenqundao',
          name: '所罗门群岛',
          enName: 'Solomon Islands',
          region: '+677',
          isHot: 'false',
        },
        {
          pinyinName: 'suomali',
          name: '索马里',
          enName: 'Somalia',
          region: '+252',
          isHot: 'false',
        },
      ],
      section: 'S',
    },
    {
      data: [
        {
          pinyinName: 'tajikesitan',
          name: '塔吉克斯坦',
          enName: 'Tajikistan',
          region: '+992',
          isHot: 'false',
        },
        {
          pinyinName: 'tangjia',
          name: '汤加',
          enName: 'Tonga',
          region: '+676',
          isHot: 'false',
        },
        {
          pinyinName: 'tansangniya',
          name: '坦桑尼亚',
          enName: 'Tanzania',
          region: '+255',
          isHot: 'false',
        },
        {
          pinyinName: 'tekesiqundaohekaikesiqundao',
          name: '特克斯群岛和凯科斯群岛',
          enName: 'Turks And Caicos Islands',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'telinidaheduobage',
          name: '特立尼达和多巴哥',
          enName: 'Trinidad and Tobago',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'tuerqi',
          name: '土耳其',
          enName: 'Turkey',
          region: '+90',
          isHot: 'false',
        },
        {
          pinyinName: 'tukumansitan',
          name: '土库曼斯坦',
          enName: 'Turkmenistan',
          region: '+993',
          isHot: 'false',
        },
        {
          pinyinName: 'tunisi',
          name: '突尼斯',
          enName: 'Tunisia',
          region: '+216',
          isHot: 'false',
        },
        {
          pinyinName: 'tuwalu',
          name: '图瓦卢',
          enName: 'Tuvalu',
          region: '+688',
          isHot: 'false',
        },
      ],
      section: 'T',
    },
    {
      data: [
        {
          pinyinName: 'walisiqundaohefutunaqundao',
          name: '瓦利斯群岛和富图纳群岛',
          enName: 'Wallis And Futuna',
          region: '+681',
          isHot: 'false',
        },
        {
          pinyinName: 'wanuatu',
          name: '瓦努阿图',
          enName: 'Vanuatu',
          region: '+678',
          isHot: 'false',
        },
        {
          pinyinName: 'weidimala',
          name: '危地马拉',
          enName: 'Guatemala',
          region: '+502',
          isHot: 'false',
        },
        {
          pinyinName: 'weineiruila',
          name: '委内瑞拉',
          enName: 'Venezuela',
          region: '+58',
          isHot: 'false',
        },
        {
          pinyinName: 'wenlai',
          name: '文莱',
          enName: 'Brunei',
          region: '+673',
          isHot: 'false',
        },
        {
          pinyinName: 'wuganda',
          name: '乌干达',
          enName: 'Uganda',
          region: '+256',
          isHot: 'false',
        },
        {
          pinyinName: 'wukelan',
          name: '乌克兰',
          enName: 'Ukraine',
          region: '+380',
          isHot: 'false',
        },
        {
          pinyinName: 'wulagui',
          name: '乌拉圭',
          enName: 'Uruguay',
          region: '+598',
          isHot: 'false',
        },
        {
          pinyinName: 'wuzibiekesitan',
          name: '乌兹别克斯坦',
          enName: 'Uzbekistan',
          region: '+998',
          isHot: 'false',
        },
      ],
      section: 'W',
    },
    {
      data: [
        {
          pinyinName: 'xiangyahaian',
          name: '象牙海岸',
          enName: "Côte d'Ivoire",
          region: '+225',
          isHot: 'false',
        },
        {
          pinyinName: 'xibanya',
          name: '西班牙',
          enName: 'Spain',
          region: '+34',
          isHot: 'false',
        },
        {
          pinyinName: 'xila',
          name: '希腊',
          enName: 'Greece',
          region: '+30',
          isHot: 'false',
        },
        {
          pinyinName: 'xinkeliduoniyaqundao',
          name: '新克里多尼亚群岛',
          enName: 'New Caledonia',
          region: '+687',
          isHot: 'false',
        },
        {
          pinyinName: 'xinxilan',
          name: '新西兰',
          enName: 'New Zealand',
          region: '+64',
          isHot: 'false',
        },
        {
          pinyinName: 'xiongyali',
          name: '匈牙利',
          enName: 'Hungary',
          region: '+36',
          isHot: 'false',
        },
        {
          pinyinName: 'xisahala',
          name: '西撒哈拉',
          enName: 'Western Sahara',
          region: '+212',
          isHot: 'false',
        },
        {
          pinyinName: 'xuliya',
          name: '叙利亚',
          enName: 'Syria',
          region: '+963',
          isHot: 'false',
        },
      ],
      section: 'X',
    },
    {
      data: [
        {
          pinyinName: 'yamaijia',
          name: '牙买加',
          enName: 'Jamaica',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'yameiniya',
          name: '亚美尼亚',
          enName: 'Armenia',
          region: '+374',
          isHot: 'false',
        },
        {
          pinyinName: 'yemen',
          name: '也门',
          enName: 'Yemen',
          region: '+967',
          isHot: 'false',
        },
        {
          pinyinName: 'yidali',
          name: '意大利',
          enName: 'Italy',
          region: '+39',
          isHot: 'false',
        },
        {
          pinyinName: 'yilake',
          name: '伊拉克',
          enName: 'Iraq',
          region: '+964',
          isHot: 'false',
        },
        {
          pinyinName: 'yilang',
          name: '伊朗',
          enName: 'Iran',
          region: '+98',
          isHot: 'false',
        },
        {
          pinyinName: 'yindu',
          name: '印度',
          enName: 'India',
          region: '+91',
          isHot: 'false',
        },
        {
          pinyinName: 'yindunixiya',
          name: '印度尼西亚',
          enName: 'Indonesia',
          region: '+62',
          isHot: 'false',
        },
        {
          pinyinName: 'yingguo',
          name: '英国',
          enName: 'United Kingdom',
          region: '+44',
          isHot: 'false',
        },
        {
          pinyinName: 'yingshuweijingqundao',
          name: '英属维京群岛',
          enName: 'British Virgin Islands',
          region: '+1',
          isHot: 'false',
        },
        {
          pinyinName: 'yingshuyinduyanglingdi',
          name: '英属印度洋领地',
          enName: 'British Indian Ocean Territory',
          region: '+246',
          isHot: 'false',
        },
        {
          pinyinName: 'yiselie',
          name: '以色列',
          enName: 'Israel',
          region: '+972',
          isHot: 'false',
        },
        {
          pinyinName: 'yuedan',
          name: '约旦',
          enName: 'Jordan',
          region: '+962',
          isHot: 'false',
        },
        {
          pinyinName: 'yuenan',
          name: '越南',
          enName: 'Vietnam',
          region: '+84',
          isHot: 'false',
        },
      ],
      section: 'Y',
    },
    {
      data: [
        {
          pinyinName: 'zanbiya',
          name: '赞比亚',
          enName: 'Zambia',
          region: '+260',
          isHot: 'false',
        },
        {
          pinyinName: 'zexidao',
          name: '泽西岛',
          enName: 'Jersey',
          region: '+44',
          isHot: 'false',
        },
        {
          pinyinName: 'zhade',
          name: '乍得',
          enName: 'Chad',
          region: '+235',
          isHot: 'false',
        },
        {
          pinyinName: 'zhibuluotuo',
          name: '直布罗陀',
          enName: 'Gibraltar',
          region: '+350',
          isHot: 'false',
        },
        {
          pinyinName: 'zhili',
          name: '智利',
          enName: 'Chile',
          region: '+56',
          isHot: 'false',
        },
        {
          pinyinName: 'zhongfeigongheguo',
          name: '中非共和国',
          enName: 'Central African Republic',
          region: '+236',
          isHot: 'false',
        },
      ],
      section: 'Z',
    },
  ],
  message: '',
}
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchTxt: '',
      codeList: resCode.data,
      resultList: [],
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onSearch() {},
    input() {
      var resultList = []

      // 剔除热门
      var list = this.codeList

      list.forEach((item) => {
        var tempList = []
        tempList = item.data.filter((i) => {
          return i.name.indexOf(this.searchTxt) != -1 || i.region.indexOf(this.searchTxt) != -1
        })
        if (tempList.length) {
          resultList = [...resultList, ...tempList]
        }
      })

      this.resultList = this.searchTxt ? resultList : []
    },
    // 选择项
    select(item) {
      this.$emit('success', item)
    },
    // 滚动跳转
    scrollTo(item) {
      console.log(item.section)
      const Element = document.querySelector('#' + item.section)
      console.log(Element)
      Element && Element.scrollIntoView()
    },
  },
}
</script>

<style lang="less" scoped>
.con {
  height: 100vh;
}
.tit-cell {
  background-color: #f8f8f8;
  line-height: 1;
  font-size: 24px;
}
.code-list {
  .tag {
    width: 100px;
    height: 56px;
    margin-right: 32px;
    font-size: 32px;
    text-align: center;
    justify-content: center;
    color: #333;
  }
}
.side-list {
  position: fixed;
  width: 68px;
  top: 50%;
  right: 0;
  overflow: hidden;
  transform: translate3d(0, -50%, 0);
  z-index: 805;
  .item {
    padding: 10px;
    color: #6190e8;
    font-size: 24px;
    text-align: center;
  }
}
</style>
