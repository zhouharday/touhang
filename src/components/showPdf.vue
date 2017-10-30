<template>
  <div class="cpdf">
   <div class="center">
     <div class="contor">
      <el-button @click="prev">上一页</el-button>
      <el-button @click="next">下一页</el-button>    
      <span>Page: <span v-text="page_num"></span> / <span v-text="page_count"></span></span>
          
      <el-button @click="addscale" icon="plus"></el-button>
      <el-button @click="minus" icon="minus"></el-button>
      <el-button id="prev" @click="closepdf">关闭</el-button>
     </div>
     <canvas class="canvasstyle" id="the-canvas"></canvas>
   </div>
  </div>
</template>
<script>
import PDFJS from '../../../static/pdf/pdf.js'
 import {
  mapActions,
  mapGetters
 } from 'vuex';
 export default {
  name: 'c-pdf',
  props: ['pdfurl'],
  data() {
    return {
     pdfDoc: null, //pdfjs 生成的对象
     pageNum: 1,//
     pageRendering: false,
     pageNumPending: null,
     scale: 1.2,//放大倍数
     page_num: 0,//当前页数
     page_count: 0,//总页数
     maxscale: 2,//最大放大倍数
     minscale: 0.8//最小放大倍数
    }
  },
  methods: {
    renderPage(num) { //渲染pdf
     let vm = this
     this.pageRendering = true;
     let canvas = document.getElementById('the-canvas')
     // Using promise to fetch the page
     this.pdfDoc.getPage(num).then(function(page) {
       var viewport = page.getViewport(vm.scale);
       //alert(vm.canvas.height)
       canvas.height = viewport.height;
       canvas.width = viewport.width;
 
       // Render PDF page into canvas context
       var renderContext = {
        canvasContext: vm.ctx,
        viewport: viewport
       };
       var renderTask = page.render(renderContext);
 
       // Wait for rendering to finish
       renderTask.promise.then(function() {
        vm.pageRendering = false;
        if(vm.pageNumPending !== null) {
          // New page rendering is pending
          vm.renderPage(vm.pageNumPending);
          vm.pageNumPending = null;
        }
       });
     });
     vm.page_num = vm.pageNum;
 
    },
    addscale() {//放大
     if(this.scale >= this.maxscale) {
       return
     }
     this.scale += 0.1;
     this.queueRenderPage(this.pageNum)
    },
    minus() {//缩小
     if(this.scale <= this.minscale) {
       return
     }
     this.scale -= 0.1;
     this.queueRenderPage(this.pageNum)
    },
    prev() {//上一页
     let vm = this
     if(vm.pageNum <= 1) {
       return;
     }
     vm.pageNum--;
     vm.queueRenderPage(vm.pageNum);
    },
    next() {//下一页
     let vm = this
     if(vm.pageNum >= vm.page_count) {
       return;
     }
     vm.pageNum++;
     vm.queueRenderPage(vm.pageNum);
    },
    closepdf() {//关闭PDF
     this.$emit('closepdf')
    },
    queueRenderPage(num) {
     if(this.pageRendering) {
       this.pageNumPending = num;
     } else {
       this.renderPage(num);
     }
    }
  },
  computed: {
    ctx() {
     let id = document.getElementById('the-canvas')
     return id.getContext('2d');
    }
  },
  mounted() {
    let vm = this
    PDFJS.getDocument(vm.pdfurl).then(function(pdfDoc_) { //初始化pdf
     vm.pdfDoc = pdfDoc_;
     vm.page_count = vm.pdfDoc.numPages
     vm.renderPage(vm.pageNum);
    });
  }
 }
</script>

<style lang="less">
  .cpdf {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  width: 100%;
  height: 100%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    text-align: center;
    height: 100%;
    overflow: auto;
    padding-top: 20px;
    .contor {
     margin-bottom: 10px;
    }
  }
 }
</style>