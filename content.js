function calculateAndDisplayGPA() {
  // すでに結果のUI（目印となるID）が表示されていたら、何もしないで終了
  if (document.getElementById('livecampus-gpa-result')) return;

  const table = document.querySelector('table');
  if (!table) return; // テーブルがまだ読み込まれていなければ終了

  // 「得点」が含まれない画面（別の成績サマリー画面など）なら終了
  if (!table.innerText.includes('得点')) return;

  // 表の最初の行（見出し行）を取得
  const headerRow = table.querySelector('tr');
  if (!headerRow) return;

  const headers = headerRow.querySelectorAll('th, td');
  
  let creditIndex = -1;
  let scoreIndex = -1;

  headers.forEach((cell, index) => {
    const text = cell.innerText.trim();
    if (text === '単位') creditIndex = index;
    if (text === '得点') scoreIndex = index;
  });

  if (creditIndex === -1 || scoreIndex === -1) return;

  const rows = table.querySelectorAll('tbody tr, tr');
  
  let totalCredits = 0;
  let totalGP = 0;

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    
    if (cells.length <= Math.max(creditIndex, scoreIndex)) return;

    const creditsStr = cells[creditIndex].innerText.trim();
    const scoreStr = cells[scoreIndex].innerText.trim();

    const credits = parseFloat(creditsStr);
    const score = parseFloat(scoreStr);

    if (isNaN(credits) || isNaN(score)) return;

    let gp = 0;
    if (score >= 90) gp = 4.0;
    else if (score >= 85) gp = 3.5;
    else if (score >= 80) gp = 3.0;
    else if (score >= 75) gp = 2.5;
    else if (score >= 70) gp = 2.0;
    else if (score >= 65) gp = 1.5;
    else if (score >= 60) gp = 1.0;
    else gp = 0.0;

    totalCredits += credits;
    totalGP += (credits * gp);
  });

  if (totalCredits === 0) return;

  const gpa = (totalGP / totalCredits).toFixed(3);

  const resultDiv = document.createElement('div');
  resultDiv.id = 'livecampus-gpa-result';
  resultDiv.style.padding = '15px';
  resultDiv.style.margin = '20px auto';
  resultDiv.style.maxWidth = '800px';
  resultDiv.style.backgroundColor = '#e3f2fd';
  resultDiv.style.borderLeft = '6px solid #1976d2';
  resultDiv.style.fontSize = '18px';
  resultDiv.style.fontWeight = 'bold';
  resultDiv.style.borderRadius = '4px';
  resultDiv.style.textAlign = 'center';
  resultDiv.innerHTML = `総合GPA: <span>${gpa}</span> (取得単位数: ${totalCredits})`;

  const tableWrapper = table.parentNode;
  tableWrapper.insertBefore(resultDiv, tableWrapper.firstChild);
}


const observer = new MutationObserver((mutations) => {
  calculateAndDisplayGPA();

});

// document.body を対象に、子要素の追加やテキストの変更を監視し始める
observer.observe(document.body, {
  childList: true, // 子ノードの追加・削除を監視
  subtree: true    // 対象ノードの子孫すべてを監視
});