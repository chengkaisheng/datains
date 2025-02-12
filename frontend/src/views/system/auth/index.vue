<template>
  <div>
    <de-main-container :style="{ height: 'calc(100vh - 56px)' }">
      <el-tabs v-model="authorityType" @tab-click="handleClick">
        <el-tab-pane name="authConfig">
          <template #label>
            {{ $t("auth.authConfig") }}
          </template>
          <auth-config @execute-axios="executeAxios" />
        </el-tab-pane>
      </el-tabs>
    </de-main-container>
  </div>
</template>

<script>
import DeMainContainer from "@/components/datains/DeMainContainer";
// import AuthConfig from "./AuthConfig";
import AuthConfig from "./authConfig.vue";
import { execute } from '@/api/system/dynamic'


export default {
  name: "SystemAuth",
  components: { DeMainContainer, AuthConfig },

  data() {
    return {
      authorityType: "authConfig",
    };
  },

  methods: {
    executeAxios(param) {
      execute(param)
      .then(res => {
        if (param.callBack) {
          param.callBack(res)
        }
      }).catch(e => {
        if (param.callBack) {
          param.callBack(e)
        }
      })
    },
    handleClick() {
      console.log("===>handleClick");
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
