// クリック回数を保存する関数
function incrementClickCount() {
  chrome.storage.local.get(['clickCount'], function(result) {
    const currentCount = result.clickCount || 0;
    const newCount = currentCount + 1;
    chrome.storage.local.set({clickCount: newCount});
  });
}

document.addEventListener('click', function(event) {
  // クリック回数をカウントアップ
  incrementClickCount();
  
  // 絵文字要素を作成
  const emoji = document.createElement('div');
  emoji.textContent = '💵';
  emoji.style.position = 'fixed';
  emoji.style.zIndex = '10000';
  emoji.style.pointerEvents = 'none'; // クリックイベントを妨げないようにする
  
  // カーソル右上に配置（少しランダム性を加える）
  const offsetX = 10 + Math.random() * 10;
  const offsetY = -10 - Math.random() * 10;
  emoji.style.left = `${event.clientX + offsetX}px`;
  emoji.style.top = `${event.clientY + offsetY}px`;
  
  // 絵文字のスタイル
  emoji.style.fontSize = '12px';
  emoji.style.transition = 'all 0.8s ease-out';
  emoji.style.opacity = '1';
  
  // bodyに追加
  document.body.appendChild(emoji);
  
  // ランダムな方向に浮かび上がるアニメーション
  const moveX = (Math.random() * 40) - 20;
  const moveY = -50 - (Math.random() * 30);
  
  setTimeout(() => {
    emoji.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${Math.random() * 30 - 15}deg)`;
    emoji.style.opacity = '0';
  }, 50);
  
  // アニメーション完了後に削除
  setTimeout(() => {
    if (emoji.parentNode) {
      document.body.removeChild(emoji);
    }
  }, 800);
});
