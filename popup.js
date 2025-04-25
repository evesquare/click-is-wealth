// ブラウザの言語を取得
const userLanguage = navigator.language || navigator.userLanguage;
const isJapanese = userLanguage.startsWith('ja');

// カウント表示を更新する関数
function updateClickCountDisplay() {
  chrome.storage.local.get(['clickCount'], function(result) {
    const count = result.clickCount || 0;
    const countElement = document.getElementById('clickCount');
    
    if (isJapanese) {
      // 日本語表示: X兆円
      countElement.textContent = `${count}兆円`;
    } else {
      // 英語表示: X billion $
      countElement.textContent = `$${count}`;
    }
  });
}

// リセットボタンのイベントリスナー
document.getElementById('resetButton').addEventListener('click', function() {
  chrome.storage.local.set({clickCount: 0}, function() {
    updateClickCountDisplay();
  });
});

// ポップアップが開かれたときにカウントを表示
document.addEventListener('DOMContentLoaded', function() {
  updateClickCountDisplay();
  
  // 言語に基づいてリセットボタンのテキストを更新
  if (!isJapanese) {
    document.getElementById('resetButton').textContent = 'Reset';
  }
});
