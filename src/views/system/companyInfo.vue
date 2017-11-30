<template>
  <div class="companyInfo">
    <el-row style="width: 100%;" class="row">
      <el-col :span="16" :offset="4" class="col">
        <el-form :model="companyInfo" label-position="left" label-width="120px">
          <el-form-item label="企业名称:">
            <el-input v-model="companyInfo.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业logo:">
            <div>
              <div class="el-upload__text">
                <my-upload field="files" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" v-model="show" :width="300" :height="300" :url='upDataUrl' :params="params" :headers="headers" img-format="png">
                </my-upload>
                <span><img :src="imgDataUrl"></span>
                <div>
                  <el-button class="changeWidth" type="default" @click="toggleShow">点击选择上传文件</el-button>
                </div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10M</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item class="btn_wrapper">
            <el-button class="changeWidth" type="danger" @click="onSubmitOver">保 存</el-button>
            <!-- <el-button type="default" class="changeWidth">取消</el-button> -->
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { companyInfo } from "api/system";
import myUpload from "vue-image-crop-upload";

export default {
  data() {
    return {
      show: false,
      params: {},
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("token"))
      },
      imgDataUrl: JSON.parse(sessionStorage.getItem("logoSrc")).logo, // the datebase64 url of created image

      companyInfo: {
        name: JSON.parse(sessionStorage.getItem("merchants"))[0].merchant_name,
        image: JSON.parse(sessionStorage.getItem("logoSrc")).logo
      },
      fileAddress: this.$store.state.login.logoSrc.logo,
      file: "", //上传文件url
      upDataUrl: this.api + "/files/upload"
    };
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      if (jsonData.status == "200") {
        this.fileAddress = jsonData.filePath;
        this.companyInfo.image = jsonData.filePath;
      } else if (jsonData.status == "403") {
        this.$Message.error(jsonData.message);
      }
      console.log("field: " + field);
    },
    /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      this.imgDataUrl = "";
      console.log("field: " + field);
    },

    onSubmitOver() {
      companyInfo(this.fileAddress).then(res => {
        console.log(res);
        if (res.data.status == '200') {
          this.$store.state.login.logoSrc.logo = this.fileAddress;
          window.sessionStorage.setItem(
            "logoSrc",
            JSON.stringify(this.$store.state.login.logoSrc)
          );
          this.$Message.success(res.data.message);
        } else {
          this.$Message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../common/styles/mixin.less";
.companyInfo {
  .base-style();
  .row {
    padding-top: @height-small;
    .col {
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 24px;
    }
    .btn_wrapper {
      text-align: center;
      .changeWidth {
        width: 120px;
      }
    }
  }
}
</style>