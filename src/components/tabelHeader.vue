<template>
<div class="tableHeader">
    <div class="title" ref="title">
        <div class="desc">
            <slot></slot>
            <span v-show="data.desc" class="defaultcolor" ref="desc">{{data.desc}}</span>
        </div>
        <div class="btn" ref="btn" v-if="edit">
            <el-button v-for="(btn, index) in data.btnGroup" :key="btn.index" @click="handler(index, $event)" class="btnwrapper" ref="btnwrapper" v-show="!btn.show">
                <Icon :type="btn.icon" v-show="btn.icon"></Icon>
                <span v-show="btn.explain" class="explain">{{btn.explain}}</span>
            </el-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
  mounted() {
    this._theme();
  },
  props: {
    data: {
      type: Object,
      default: {} /*data默认格式 data: { desc: 'xxx',btnGroup: ['xxx','xxx']} */
    },
    theme: {
      type: String,
      default: "#2a3142"
    },
    edit: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handler(index, event) {
      if (index == 0) {
        this.$emit("add", event.target);
      } else if (index == 1) {
        this.$emit("show", event.target);
      } else if (index == 2) {
        this.$emit("down", event.target);
      } else {
        return;
      }
    },
    _theme() {
      this.$refs.title.style.background = this.theme;
      if (this.$refs.btnwrapper) {
        for (var i = 0; i < this.$refs.btnwrapper.length; i++) {
          var btnwrapper = this.$refs.btnwrapper;
          if (this.theme == "#2a3142") {
            btnwrapper[i].$el.style.color = "#fff";
          } else {
            btnwrapper[i].$el.style.color = "#1f2d3d";
          }
        }
      } else {
        return;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../common/styles/mixin.less";
.tableHeader {
  .title();
  .title {
    background: #fff;
  }
}
</style>
