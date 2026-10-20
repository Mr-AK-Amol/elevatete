(() => {
  // This only discourages casual access. Browser developer tools and source can never be fully disabled on a public website.
  document.addEventListener('contextmenu', event => {
    event.preventDefault();
    showProtectionNotice('Right-click is disabled on this website.');
  });
  document.addEventListener('keydown', event => {
    const key = (event.key || '').toLowerCase();
    const devToolsShortcut = key === 'f12' ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (event.ctrlKey && key === 'u');
    if (devToolsShortcut) {
      event.preventDefault();
      showProtectionNotice('This shortcut is disabled here. Website source may still be accessible through browser tools.');
    }
  });
  let noticeTimer;
  function showProtectionNotice(message) {
    let notice = document.getElementById('protectionNotice');
    if (!notice) {
      notice = document.createElement('div');
      notice.id = 'protectionNotice';
      notice.className = 'protection-notice';
      notice.setAttribute('role', 'status');
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => notice.classList.remove('visible'), 2400);
  }
})();