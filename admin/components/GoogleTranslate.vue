<template>
    <div id="google_translate_element"></div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  
  onMounted(() => {
    const addTranslateScript = () => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      document.head.appendChild(script)
    }
  
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,es,fr,de,zh-CN,ja,ko,hi,th,vi,id,ms,fil,ta,bn,km,my,lo,si,ur,ne,ml,te,mr,gu,pa' },
        'google_translate_element'
      )
    }
  
    addTranslateScript()
  })
  </script>
  