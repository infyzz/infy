<template>
  <footer class="footer shadow">
       <p class="copyright">Copyright © 2018 InfyBlog. Designed by <a href="http://aa0.cn">aa0.cn</a></p>
       <p class="icp">鄂ICP备15020931号-1	</p>
  </footer>
</template>
<script>
export default {
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../assets/_color.scss";
.footer {
  height: 85px;
  background: $footer_bg;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a{
    color: #000;
  }
  .copyright{
      font-size: 14px;
  }
  .icp{
      margin-top: 5px;
      font-size: 13px;
      color: #8c8989;
  }
}
@media (max-width: 1100px) {
    .footer{
        height: auto;
        padding: 20px;
        text-align: center;
        font-size: 14px;
    }
}
</style>

