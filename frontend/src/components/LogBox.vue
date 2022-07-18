<template>
    <CCol id="logBox">
        <div
            v-for="log in logLines.slice().reverse()"
            :class="log.style"
            class="logLine"
            :key="log.id"
        >
        {{ log.text }}
        </div>
    </CCol>
</template>

<script>
export default {
  props: {
    logLines: Array
  }
}
</script>

<style scoped>
.logLine{
    white-space: pre-wrap;
    margin-left: 1rem;
    margin-top: .25rem;
    text-align: left;
    color: #d4d4d4;
    font-family: 'Source Code Pro', monospace;
    font-size: 20px;
}
#logBox {
    padding: 10px;
    background-color: #1e1e1e;
    /* background-image: url("@/assets/logo.png"); */
}
.info{
    color: #6699CC;
}
.error{
    color: #EC5f67;
}
.notification{
    color: #FAC863;
}
</style>
