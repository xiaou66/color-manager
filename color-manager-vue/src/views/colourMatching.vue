<template>
  <div>
    <a-row type="flex" justify="center" >
      <a-col v-for="(item, index) in data" :key="index">
        <a-card :title="666" class="w-card-inner" :bodyStyle="{padding:'3px'}">
          <span  slot="extra">
              <a-icon type="search" @click="colorSeeHandler(getColors(item.code))"/>
              <a-icon style="padding-left: 8px;" type="plus"/>
          </span>
          <div class="item" :key="`sub-${subIndex}`" v-for="(subItem, subIndex) in getColors(item.code)" :style="`background:${subItem};`" >
            <span class="tip" @click="copy(subItem)">{{subItem}}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <div id="pagination">
      <a-pagination :defaultPageSize="51" :total="total" @change="dbGetData"/>
    </div>
    <a-modal v-model="colorSee.visible"  :bodyStyle="{'height':'300px','padding':'0'}" :footer="null" >
      <div class="item" :key="index" v-for="(item, index) in colorSee.currentColor" :style="`background: ${item};border-radius: 0;height:75px`" >
        <span class="tip" @click="copy(item)">{{item}}</span>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      total: 0,
      page: 0,
      colorSee: {
        visible: false,
        currentColor: []
      }
    }
  },
  created () {
    if (this.$store.state.db) {
      this.dbLoad()
    } else {
      this.getData(1)
    }
  },
  methods: {
    dbGetData (page = 1) {
      console.log(page)
      page -= 1
      const result = this.$store.state.db.exec('SELECT `data` FROM matching_colorhunt LIMIT ' + page * 51 + ',51')
      const items = result[0].values
      if (items.length === 0) {
        return
      }
      const data = []
      items.forEach((item, index) => {
        data.push(JSON.parse(item))
      })
      this.data = data
    },
    dbLoad () {
      const totalRes = this.$store.state.db.exec('SELECT COUNT() FROM matching_colorhunt')
      this.total = parseInt(totalRes[0].values[0][0])
      this.dbGetData()
    },
    copy (color) {
      this.$copyText(color).then(res => {
        console.log(res)
        this.$message.info(`复制成功-${res.text}`)
      })
    },
    colorSeeHandler (color) {
      this.colorSee.currentColor = color
      this.colorSee.visible = true
    },
    getData (page, type = 'new') {
      const formData = new FormData()
      formData.append('step', page - 1)
      formData.append('sort', type)
      /* fetch(`${this.$url.hunt}/hunt.php`, {
        method: 'POST',
        body: formData
      }).then(res => res.text())
        .then(text => {
          console.log(text)
          text = text.replace(/<[^>]+>/g, '').replace('arr = ', '').replace(', ];', ']')
          this.data = text
        }) */
      this.data = [{ id: '179373', code: '22283130475ef2a365ececec', date: '04/14/20', likes: '104' }, { id: '179310', code: '0779e44cbbb977d8d8eff3c6', date: '04/13/20', likes: '201' }, { id: '179335', code: '588da8ccafafe58a8ad8345f', date: '04/12/20', likes: '234' }, { id: '179398', code: 'dbdbdbf0a500cf7500000000', date: '04/11/20', likes: '306' }, { id: '179350', code: '511845900c3fc70039ff5733', date: '04/10/20', likes: '326' }, { id: '179542', code: 'f4f4f48ec6c56983aa8566aa', date: '04/09/20', likes: '400' }, { id: '178936', code: '202040543864ff6363ffbd69', date: '04/08/20', likes: '420' }, { id: '180305', code: 'efa8e4f8e1f4fff0f597e5ef', date: '04/07/20', likes: '449' }, { id: '178550', code: '442727eae7d9d2c6b2937d14', date: '04/06/20', likes: '326' }, { id: '179946', code: '342eadea6227f2a51ab9ebcc', date: '04/05/20', likes: '351' }, { id: '180051', code: '00bcd4b2ebf2ff5722dd2c00', date: '04/04/20', likes: '506' }, { id: '179675', code: 'ffbcbc3636364cd3c2b7efcd', date: '04/03/20', likes: '542' }, { id: '179682', code: 'f4e04df2ed6fcee3978db1ab', date: '04/02/20', likes: '427' }, { id: '179467', code: 'eb4559f78259aeefecf8eeee', date: '04/01/20', likes: '555' }, { id: '179481', code: '522d5bd7385efb7b6be7d39f', date: '03/31/20', likes: '601' }, { id: '179483', code: '3630624d4c7d827397d8b9c3', date: '03/30/20', likes: '798' }, { id: '178346', code: 'faf4fff3c62384468510375c', date: '03/29/20', likes: '570' }, { id: '178369', code: 'ffb6b6fde2e2aacfcf679b9b', date: '03/28/20', likes: '1055' }, { id: '177808', code: '856c8bd4ebd0a4c5c6ffeb99', date: '03/27/20', likes: '697' }, { id: '177842', code: 'faf4f4ef962d9c55185a3f11', date: '03/26/20', likes: '543' }, { id: '177867', code: 'ffa41b00083900508200a8cc', date: '03/25/20', likes: '1086' }, { id: '178387', code: 'ffaaa5fcf8f3ffd3b6698474', date: '03/24/20', likes: '1009' }, { id: '177581', code: 'ffd31dfae7cbffb385ff7272', date: '03/23/20', likes: '934' }, { id: '177825', code: '00bdaa400082fe346ef1e7b6', date: '03/22/20', likes: '833' }, { id: '177866', code: '2040513b697884a9accae8d5', date: '03/21/20', likes: '1162' }, { id: '177694', code: 'de7119dee3e211697918b0b0', date: '03/20/20', likes: '865' }, { id: '177869', code: '2b580c639a67d8ebb5d9bf77', date: '03/19/20', likes: '769' }, { id: '177314', code: 'f6d186fcf7bbcbe2b0f19292', date: '03/18/20', likes: '813' }, { id: '177749', code: '084177687466cd8d7bfbc490', date: '03/17/20', likes: '706' }, { id: '177316', code: 'f76a8cf8dc88f8fab8ccf0e1', date: '03/16/20', likes: '913' }, { id: '176853', code: 'ffd1bdffb0cdffffffc2f0fc', date: '03/15/20', likes: '1147' }, { id: '177317', code: 'd1f5d39dc6a77d5e2a231903', date: '03/14/20', likes: '735' }, { id: '176667', code: 'cff1effffffffbcffcbe79df', date: '03/13/20', likes: '1110' }, { id: '177052', code: '000000323232ff1e56ffac41', date: '03/12/20', likes: '1146' }, { id: '176401', code: 'ecfbfcffebd9ffc8bd235952', date: '03/11/20', likes: '1254' }, { id: '176439', code: '2c003e512b58fe346ed2fafb', date: '03/10/20', likes: '1111' }, { id: '175892', code: 'f3d1f4f5fcc1bae5e598d6ea', date: '03/09/20', likes: '1187' }, { id: '175777', code: '4813807f78d2efb1ffffe2ff', date: '03/08/20', likes: '1294' }, { id: '175532', code: '1eb2a6d4f8e8ffa34df67575', date: '03/07/20', likes: '1292' }, { id: '175336', code: '721b65b80d57f8615affd868', date: '03/06/20', likes: '1361' }]
      console.log(this.getColors(this.data[0].code))
    },
    getColors (colors) {
      let poi = 1
      const res = []
      let str = ''
      do {
        str = this.getColor(colors, poi)
        if (!str) break
        res.push(str)
        poi += 1
      } while (str)
      return res
    },
    getColor (colors, poi) {
      if (colors && poi) {
        const form = (poi - 1) * 6
        const str = colors.substr(form, 6)
        if (str) {
          return `#${str}`
        } else {
          return ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/pagination";
.w-card-inner {
  margin-right: 15px;
  margin-top: 5px;
  width: 176px;
  .w_box {
    width: 128px;
    height: 128px;
    border-radius: 50%;
    padding-right: 10px;
    margin: 0 auto;
  }
}
.w-card-inner {
  border-radius: 10px;
  overflow: hidden;
  width: 176px;
  margin-right: 15px;
  margin-top: 5px;
}
.item {
  width: 100%;
  height: 36px;
  position: relative;
  &:first-child {
    border-radius: 10px 10px 0 0;
  }
  &:last-child {
    border-radius:  0 0 10px 10px;
  }
  &:hover .tip {
    display: block;
  }
  .tip {
    background-color: rgba(0,0,0,.1);
    color: white;
    position: absolute;
    bottom: 0;
    display: none;
    cursor: pointer;
  }
}
</style>
