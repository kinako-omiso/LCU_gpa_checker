function calculateAndDisplayGPA() {
  const table = document.querySelector('table');
  if (!table) return;

  // --- ★変更点1: 列のインデックスを動的に探す ---
  // 表の最初の行（見出し行）を取得。thだけでなくtdが使われている場合も考慮
  const headerRow = table.querySelector('tr');
  if (!headerRow) return;

  const headers = headerRow.querySelectorAll('th, td');
  
  // 見つからなかった場合の初期値として -1 を入れておく
  let creditIndex = -1;
  let scoreIndex = -1;

  // ヘッダーのセルを1つずつ確認して、インデックス（列番号）を記録
  headers.forEach((cell, index) => {
    const text = cell.innerText.trim();
    if (text === '単位') creditIndex = index;
    if (text === '得点') scoreIndex = index;
  });

  // もし「単位」か「得点」の列が見つからなかったら、この表は対象外として終了
  if (creditIndex === -1 || scoreIndex === -1) return;
  // ----------------------------------------------


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

  // （これ以降の表示UIを作成する処理は元のまま）
  const resultDiv = document.createElement('div');
  // ... (省略)
  resultDiv.innerHTML = `🌟 総合GPA: <span>${gpa}</span> (取得単位数: ${totalCredits})`;

  const tableWrapper = table.parentNode;
  tableWrapper.insertBefore(resultDiv, tableWrapper.firstChild);
}

// ページ読み込み完了後に実行
window.addEventListener('load', calculateAndDisplayGPA);