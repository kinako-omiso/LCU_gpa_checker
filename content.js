function calculateAndDisplayGPA() {
  const table = document.querySelector('table');
  if (!table) return;
  if (!table.innerText.includes('得点')) {
    return;
  }
  const rows = document.querySelectorAll('table tbody tr');
  
  let totalCredits = 0;
  let totalGP = 0;

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');

    if (cells.length < 8) return;

    // 画像の列順（0始まり）: 5番目が単位、6番目が点数
    const creditsStr = cells[5].innerText.trim();
    const scoreStr = cells[6].innerText.trim();

    const credits = parseFloat(creditsStr);
    const score = parseFloat(scoreStr); 
    if (isNaN(score)) return;

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

  // 画面上部に結果を表示する
  const resultDiv = document.createElement('div');
  resultDiv.style.padding = '15px';
  resultDiv.style.margin = '20px auto';
  resultDiv.style.maxWidth = '800px';
  resultDiv.style.backgroundColor = '#e3f2fd';
  resultDiv.style.borderLeft = '6px solid #1976d2';
  resultDiv.style.fontSize = '18px';
  resultDiv.style.fontWeight = 'bold';
  resultDiv.style.borderRadius = '4px';
  resultDiv.innerHTML = ` 総合GPA: <span>${gpa}</span> (取得単位数: ${totalCredits})`;

  // 成績テーブルの上あたりに挿入
  const tableWrapper = document.querySelector('table').parentNode;
  tableWrapper.insertBefore(resultDiv, tableWrapper.firstChild);
}

// ページ読み込み完了後に実行
window.addEventListener('load', calculateAndDisplayGPA);