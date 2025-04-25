const userLanguage = navigator.language || navigator.userLanguage;
const isJapanese = userLanguage.startsWith('ja');

// カウント表示を更新する関数
function updateClickCountDisplay() {
  const countElement = document.getElementById('clickCount');
  if (!chrome.storage || !chrome.storage.local) {
    countElement.textContent = isJapanese ? 'エラーなのだ' : 'Error!';
    return;
  }
  chrome.storage.local.get(['clickCount'], function(result) {
    const count = result.clickCount || 0;
    if (isJapanese) {
      countElement.textContent = `${count}兆円`;
    } else {
      countElement.textContent = `$${count}`;
    }
  });
}

// リセットボタンのイベントリスナー
const resetBtn = document.getElementById('resetButton');
if (resetBtn) {
  resetBtn.addEventListener('click', function() {
    if (!chrome.storage || !chrome.storage.local) return;
    chrome.storage.local.set({clickCount: 0}, function() {
      updateClickCountDisplay();
    });
  });
}

// ポップアップが開かれたときにカウントを表示
document.addEventListener('DOMContentLoaded', function() {
  updateClickCountDisplay();

  // 多言語対応
  if (!isJapanese) {
    document.getElementById('resetButton').textContent = 'Reset';
    const assetLabel = document.getElementById('assetLabel');
    if (assetLabel) assetLabel.textContent = 'Asset: ';
    const descText = document.getElementById('descText');
    if (descText) descText.textContent = 'Click anywhere on the page and money will pop!';
  }
});
